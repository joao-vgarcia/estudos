import { QUESTION_TYPES } from '@/constants/quiz'
import { shuffle } from '@/utils/random'
import { getEnglishDictationQuestions, getEnglishVocabularyQuestions } from './englishService'
import { getMathQuestions } from './mathService'
import { getPluralQuestions, getPortugueseDictationQuestions, getSpellingQuestions } from './portugueseService'
import { getSpanishDictationQuestions, getSpanishVocabularyQuestions } from './spanishService'

const SUBJECTS = [
  { title: 'Matemática', fetchers: [getMathQuestions] },
  { title: 'Português', fetchers: [getPluralQuestions, getSpellingQuestions, getPortugueseDictationQuestions] },
  { title: 'Inglês', fetchers: [getEnglishVocabularyQuestions, getEnglishDictationQuestions] },
  { title: 'Espanhol', fetchers: [getSpanishVocabularyQuestions, getSpanishDictationQuestions] },
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
