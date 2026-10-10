import { DIFFICULTIES, QUESTIONS_PER_SUBJECT, QUESTION_TYPES, SUBJECTS } from '@/constants/quiz'
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

const SUBJECT_MODULES = [
  {
    id: SUBJECTS.MATH,
    title: 'Matemática',
    fetchers: [getMathQuestions, getVisualCountingQuestions, getMathTrueFalseQuestions],
  },
  {
    id: SUBJECTS.PORTUGUESE,
    title: 'Português',
    fetchers: [
      getPluralQuestions,
      getSpellingQuestions,
      getPictureSpellingQuestions,
      getSynonymQuestions,
      getPortugueseTrueFalseQuestions,
      getPortugueseDictationQuestions,
    ],
  },
  {
    id: SUBJECTS.ENGLISH,
    title: 'Inglês',
    fetchers: [
      getEnglishVocabularyQuestions,
      getEnglishPictureQuestions,
      getEnglishPictureChoiceQuestions,
      getEnglishTrueFalseQuestions,
      getEnglishListeningQuestions,
      getEnglishDictationQuestions,
    ],
  },
  {
    id: SUBJECTS.SPANISH,
    title: 'Espanhol',
    fetchers: [
      getSpanishVocabularyQuestions,
      getSpanishPictureQuestions,
      getSpanishPictureChoiceQuestions,
      getSpanishTrueFalseQuestions,
      getSpanishListeningQuestions,
      getSpanishDictationQuestions,
    ],
  },
]

const SUBJECT_ORDER = SUBJECT_MODULES.map(({ id }) => id)

const SHUFFLED_OPTION_TYPES = [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.IMAGE_CHOICE]

const MAX_FETCHES = 10

function compareSubject(first, second) {
  return SUBJECT_ORDER.indexOf(first.subjectId) - SUBJECT_ORDER.indexOf(second.subjectId)
}

function prepareQuestion(question, { id, title }, fetcherIndex) {
  const type = question.type ?? QUESTION_TYPES.MULTIPLE_CHOICE
  return {
    ...question,
    subject: title,
    subjectId: id,
    fetcherIndex,
    difficulty: question.difficulty ?? DIFFICULTIES.EASY,
    type,
    ...(SHUFFLED_OPTION_TYPES.includes(type) && { options: shuffle(question.options) }),
  }
}

async function fetchPreparedQuestions(subjectModule, fetcherIndex) {
  const questions = await subjectModule.fetchers[fetcherIndex]()
  return questions.map((question) => prepareQuestion(question, subjectModule, fetcherIndex))
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
  const groups = shuffle(groupBy(shuffle(questions), ({ fetcherIndex }) => fetcherIndex))
  const picked = []
  while (picked.length < count && groups.some((group) => group.length > 0)) {
    for (const group of groups) {
      if (group.length > 0 && picked.length < count) picked.push(group.shift())
    }
  }
  return shuffle(picked)
}

async function fetchSubjectPool(subjectModule) {
  const questionLists = await Promise.all(
    subjectModule.fetchers.map((_, fetcherIndex) => fetchPreparedQuestions(subjectModule, fetcherIndex)),
  )
  return questionLists.flat()
}

async function collectQuestions(subjectModule, { difficulty, count }, seenKeys) {
  const collected = []

  for (let fetchCount = 0; fetchCount < MAX_FETCHES && collected.length < count; fetchCount++) {
    const pool = (await fetchSubjectPool(subjectModule)).filter((question) => question.difficulty === difficulty)
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

async function fetchLevelSubjectQuestions(subjectModule, { difficulty, fallback }, seenKeys) {
  const questions = await collectQuestions(subjectModule, { difficulty, count: QUESTIONS_PER_SUBJECT }, seenKeys)
  if (questions.length > 0 || !fallback) return questions
  return collectQuestions(subjectModule, fallback, seenKeys)
}

export async function fetchLevelQuestions(level, answeredQuestions) {
  const seenKeys = new Set(answeredQuestions.map(getQuestionKey))
  const questionsBySubject = await Promise.all(
    SUBJECT_MODULES.map((subjectModule) => fetchLevelSubjectQuestions(subjectModule, level, seenKeys)),
  )
  return questionsBySubject.flat()
}

async function fetchReplacements(missedQuestions, seenKeys) {
  const [{ subjectId, fetcherIndex, difficulty }] = missedQuestions
  const subjectModule = SUBJECT_MODULES.find(({ id }) => id === subjectId)
  const replacements = []

  for (let fetchCount = 0; fetchCount < MAX_FETCHES; fetchCount++) {
    const candidates = await fetchPreparedQuestions(subjectModule, fetcherIndex)
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
    ({ subjectId, fetcherIndex, difficulty }) => `${subjectId}|${fetcherIndex}|${difficulty}`,
  )
  const replacementLists = await Promise.all(groups.map((group) => fetchReplacements(group, seenKeys)))
  return replacementLists.flat().toSorted(compareSubject)
}
