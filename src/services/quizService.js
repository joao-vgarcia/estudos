import { DIFFICULTIES, QUESTION_KINDS, QUESTION_TYPES, SUBJECTS } from '@/constants/quiz'
import { shuffle } from '@/utils/random'
import {
  getEnglishDictationQuestions,
  getEnglishListeningQuestions,
  getEnglishPictureChoiceQuestions,
  getEnglishPictureQuestions,
  getEnglishTrueFalseQuestions,
  getEnglishVocabularyQuestions,
} from './englishService'
import { getMathQuestions, getMathTrueFalseQuestions, getVisualCountingQuestions } from './mathService'
import {
  getPictureSpellingQuestions,
  getPluralQuestions,
  getPortugueseDictationQuestions,
  getPortugueseTrueFalseQuestions,
  getSpellingQuestions,
  getSynonymQuestions,
} from './portugueseService'
import {
  getSpanishDictationQuestions,
  getSpanishListeningQuestions,
  getSpanishPictureChoiceQuestions,
  getSpanishPictureQuestions,
  getSpanishTrueFalseQuestions,
  getSpanishVocabularyQuestions,
} from './spanishService'

const SUBJECT_MODULES = {
  [SUBJECTS.MATH]: {
    title: 'Matemática',
    fetchers: {
      [QUESTION_KINDS.OPERATIONS]: getMathQuestions,
      [QUESTION_KINDS.COUNTING]: getVisualCountingQuestions,
      [QUESTION_KINDS.TRUE_FALSE]: getMathTrueFalseQuestions,
    },
  },
  [SUBJECTS.PORTUGUESE]: {
    title: 'Português',
    fetchers: {
      [QUESTION_KINDS.PLURAL]: getPluralQuestions,
      [QUESTION_KINDS.SPELLING]: getSpellingQuestions,
      [QUESTION_KINDS.PICTURE_NAME]: getPictureSpellingQuestions,
      [QUESTION_KINDS.SYNONYM]: getSynonymQuestions,
      [QUESTION_KINDS.TRUE_FALSE]: getPortugueseTrueFalseQuestions,
      [QUESTION_KINDS.DICTATION]: getPortugueseDictationQuestions,
    },
  },
  [SUBJECTS.ENGLISH]: {
    title: 'Inglês',
    fetchers: {
      [QUESTION_KINDS.VOCABULARY]: getEnglishVocabularyQuestions,
      [QUESTION_KINDS.PICTURE_NAME]: getEnglishPictureQuestions,
      [QUESTION_KINDS.PICTURE_CHOICE]: getEnglishPictureChoiceQuestions,
      [QUESTION_KINDS.TRUE_FALSE]: getEnglishTrueFalseQuestions,
      [QUESTION_KINDS.LISTENING]: getEnglishListeningQuestions,
      [QUESTION_KINDS.DICTATION]: getEnglishDictationQuestions,
    },
  },
  [SUBJECTS.SPANISH]: {
    title: 'Espanhol',
    fetchers: {
      [QUESTION_KINDS.VOCABULARY]: getSpanishVocabularyQuestions,
      [QUESTION_KINDS.PICTURE_NAME]: getSpanishPictureQuestions,
      [QUESTION_KINDS.PICTURE_CHOICE]: getSpanishPictureChoiceQuestions,
      [QUESTION_KINDS.TRUE_FALSE]: getSpanishTrueFalseQuestions,
      [QUESTION_KINDS.LISTENING]: getSpanishListeningQuestions,
      [QUESTION_KINDS.DICTATION]: getSpanishDictationQuestions,
    },
  },
}

const SHUFFLED_OPTION_TYPES = [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.IMAGE_CHOICE]

const MAX_FETCHES = 10

function prepareQuestion(question, { subjectId, kind, maxResult }) {
  const type = question.type ?? QUESTION_TYPES.MULTIPLE_CHOICE
  return {
    ...question,
    subject: SUBJECT_MODULES[subjectId].title,
    subjectId,
    kind,
    maxResult,
    difficulty: question.difficulty ?? DIFFICULTIES.EASY,
    type,
    ...(SHUFFLED_OPTION_TYPES.includes(type) && { options: shuffle(question.options) }),
  }
}

async function fetchPreparedQuestions(source) {
  const { subjectId, kind, maxResult } = source
  const questions = await SUBJECT_MODULES[subjectId].fetchers[kind]({ maxResult })
  return questions.map((question) => prepareQuestion(question, source))
}

function getQuestionKey({ subjectId, prompt, word, image, correctAnswer }) {
  return [subjectId, prompt, word, image, correctAnswer].join('|')
}

function groupBy(list, getKey) {
  const groups = new Map()
  for (const item of list) {
    const key = getKey(item)
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  return [...groups.values()]
}

function pickVaried(questions, count) {
  const groups = shuffle(groupBy(shuffle(questions), ({ kind }) => kind))
  const picked = []
  while (picked.length < count && groups.some((group) => group.length > 0)) {
    for (const group of groups) {
      if (group.length > 0 && picked.length < count) picked.push(group.shift())
    }
  }
  return shuffle(picked)
}

async function fetchSubjectPool({ subjectId, maxResult }) {
  const kinds = Object.keys(SUBJECT_MODULES[subjectId].fetchers)
  const questionLists = await Promise.all(kinds.map((kind) => fetchPreparedQuestions({ subjectId, kind, maxResult })))
  return questionLists.flat()
}

async function collectQuestions({ subjectId, difficulty, maxResult, count }, seenKeys) {
  const collected = []

  for (let fetchCount = 0; fetchCount < MAX_FETCHES && collected.length < count; fetchCount++) {
    const pool = (await fetchSubjectPool({ subjectId, maxResult })).filter(
      (question) => question.difficulty === difficulty,
    )
    if (pool.length === 0) break
    const freshQuestions = new Map(
      pool.filter((question) => !seenKeys.has(getQuestionKey(question))).map((question) => [getQuestionKey(question), question]),
    )
    const chosen = pickVaried([...freshQuestions.values()], count - collected.length)
    chosen.forEach((question) => seenKeys.add(getQuestionKey(question)))
    collected.push(...chosen)
  }

  return collected
}

export async function fetchQuestions(blocks, difficulty, answeredQuestions) {
  const seenKeys = new Set(answeredQuestions.map(getQuestionKey))
  const questionLists = await Promise.all(
    blocks.map((block) => collectQuestions({ difficulty, ...block }, seenKeys)),
  )
  return questionLists.flat()
}

async function fetchReplacements(missedQuestions, seenKeys) {
  const [{ subjectId, kind, maxResult, difficulty }] = missedQuestions
  const replacements = []

  for (let fetchCount = 0; fetchCount < MAX_FETCHES; fetchCount++) {
    const candidates = await fetchPreparedQuestions({ subjectId, kind, maxResult })
    for (const candidate of candidates) {
      const key = getQuestionKey(candidate)
      if (candidate.difficulty !== difficulty || seenKeys.has(key)) continue
      seenKeys.add(key)
      replacements.push({ ...candidate, slotId: missedQuestions[replacements.length].slotId })
      if (replacements.length === missedQuestions.length) return replacements
    }
  }

  return replacements
}

export async function fetchRetryQuestions(missedQuestions, answeredQuestions) {
  const seenKeys = new Set(answeredQuestions.map(getQuestionKey))
  const groups = groupBy(
    missedQuestions,
    ({ subjectId, kind, maxResult, difficulty }) => `${subjectId}|${kind}|${maxResult}|${difficulty}`,
  )
  const replacementLists = await Promise.all(groups.map((group) => fetchReplacements(group, seenKeys)))
  return replacementLists.flat().toSorted((first, second) => first.slotId - second.slotId)
}
