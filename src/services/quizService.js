import { DIFFICULTIES, QUESTION_TYPES, SUBJECTS } from '@/constants/quiz'
import { shuffle } from '@/utils/random'
import { getEnglishDictationQuestions, getEnglishVocabularyQuestions } from './englishService'
import { getMathQuestions } from './mathService'
import { getPluralQuestions, getPortugueseDictationQuestions, getSpellingQuestions } from './portugueseService'
import { getSpanishDictationQuestions, getSpanishVocabularyQuestions } from './spanishService'

const SUBJECT_MODULES = [
  { id: SUBJECTS.MATH, title: 'Matemática', fetchers: [getMathQuestions] },
  {
    id: SUBJECTS.PORTUGUESE,
    title: 'Português',
    fetchers: [getPluralQuestions, getSpellingQuestions, getPortugueseDictationQuestions],
  },
  { id: SUBJECTS.ENGLISH, title: 'Inglês', fetchers: [getEnglishVocabularyQuestions, getEnglishDictationQuestions] },
  { id: SUBJECTS.SPANISH, title: 'Espanhol', fetchers: [getSpanishVocabularyQuestions, getSpanishDictationQuestions] },
]

const DIFFICULTY_ORDER = [DIFFICULTIES.EASY, DIFFICULTIES.MEDIUM, DIFFICULTIES.HARD]

const MAX_REPLACEMENT_FETCHES = 10

function compareDifficulty(first, second) {
  return DIFFICULTY_ORDER.indexOf(first.difficulty) - DIFFICULTY_ORDER.indexOf(second.difficulty)
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
    ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: shuffle(question.options) }),
  }
}

async function fetchPreparedQuestions(subjectModule, fetcherIndex) {
  const questions = await subjectModule.fetchers[fetcherIndex]()
  return questions.map((question) => prepareQuestion(question, subjectModule, fetcherIndex))
}

async function fetchSubjectQuestions(subjectModule) {
  const questionLists = await Promise.all(
    subjectModule.fetchers.map((_, fetcherIndex) => fetchPreparedQuestions(subjectModule, fetcherIndex)),
  )
  return questionLists.flat().toSorted(compareDifficulty)
}

export async function fetchQuizQuestions() {
  const questionsBySubject = await Promise.all(SUBJECT_MODULES.map(fetchSubjectQuestions))
  return questionsBySubject.flat()
}

function getQuestionKey({ subjectId, prompt, correctAnswer }) {
  return [subjectId, prompt, correctAnswer].join('|')
}

function groupByOrigin(questions) {
  const groups = new Map()
  for (const question of questions) {
    const key = `${question.fetcherIndex}|${question.difficulty}`
    groups.set(key, [...(groups.get(key) ?? []), question])
  }
  return [...groups.values()]
}

async function fetchReplacements(missedQuestions, seenKeys) {
  const [{ subjectId, fetcherIndex, difficulty }] = missedQuestions
  const subjectModule = SUBJECT_MODULES.find(({ id }) => id === subjectId)
  const replacements = []

  for (let fetchCount = 0; fetchCount < MAX_REPLACEMENT_FETCHES; fetchCount++) {
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
  const replacementLists = await Promise.all(
    groupByOrigin(missedQuestions).map((group) => fetchReplacements(group, seenKeys)),
  )
  return replacementLists.flat().toSorted(compareDifficulty)
}
