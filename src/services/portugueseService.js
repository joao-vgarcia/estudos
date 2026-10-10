import { PLURALS } from '@/constants/dictionary/plurals'
import { WORDS } from '@/constants/dictionary/words'
import { WRONG_PLURALS } from '@/constants/dictionary/wrongPlurals'
import { QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { randomItems } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

const DICTATION_WORDS = [...new Set([...WORDS, ...Object.values(PLURALS)])]

export function getPluralQuestions() {
  return fakeRequest(
    randomItems(WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: `Qual é o plural de "${word}"?`,
      options: [PLURALS[word], ...WRONG_PLURALS[word]],
      correctAnswer: PLURALS[word],
    })),
  )
}

export function getSpellingQuestions() {
  return fakeRequest([
    { id: 1, prompt: 'Qual palavra está escrita corretamente?', options: ['Excessão', 'Exceção', 'Esceção', 'Exseção'], correctAnswer: 'Exceção' },
  ])
}

export function getDictationQuestions() {
  return fakeRequest(
    randomItems(DICTATION_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.DICTATION,
      prompt: 'Ditado: ouça e escreva a palavra',
      correctAnswer: word,
    })),
  )
}
