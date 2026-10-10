import { QUESTION_TYPES } from '@/constants/quiz'
import { randomInt, shuffle } from '@/utils/random'
import { getVocabularyQuestions } from './englishService'
import { getEasyQuestions, getMultiplicationTable } from './mathService'
import { getDictationQuestions, getGrammarQuestions } from './portugueseService'

const MIN_TABLE_NUMBER = 2
const MAX_TABLE_NUMBER = 9

const SUBJECTS = [
  {
    title: 'Matemática',
    fetchers: [() => getMultiplicationTable(randomInt(MIN_TABLE_NUMBER, MAX_TABLE_NUMBER)), getEasyQuestions],
  },
  { title: 'Português', fetchers: [getGrammarQuestions, getDictationQuestions] },
  { title: 'Inglês', fetchers: [getVocabularyQuestions] },
]

function prepareQuestion(question, subject) {
  const type = question.type ?? QUESTION_TYPES.MULTIPLE_CHOICE
  return {
    ...question,
    subject,
    type,
    ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: shuffle(question.options) }),
  }
}

async function fetchSubjectQuestions({ title, fetchers }) {
  const questionLists = await Promise.all(fetchers.map((fetchQuestions) => fetchQuestions()))
  return questionLists.flat().map((question) => prepareQuestion(question, title))
}

export async function fetchQuizQuestions() {
  const questionsBySubject = await Promise.all(SUBJECTS.map(fetchSubjectQuestions))
  return questionsBySubject.flat().map((question, index) => ({ ...question, id: index }))
}
