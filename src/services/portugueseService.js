import { QUESTION_TYPES } from '@/constants/quiz'
import { fakeRequest } from './fakeRequest'

const DICTATION_WORDS = ['gato', 'avião', 'batata', 'futebol']

export function getGrammarQuestions() {
  return fakeRequest([
    { id: 1, prompt: 'Qual palavra é um substantivo?', options: ['Correr', 'Casa', 'Bonito', 'Rapidamente'], correctAnswer: 'Casa' },
    { id: 2, prompt: 'Qual é o plural de "pão"?', options: ['Pãos', 'Pães', 'Pãoes', 'Pões'], correctAnswer: 'Pães' },
    { id: 3, prompt: 'Qual palavra está escrita corretamente?', options: ['Excessão', 'Exceção', 'Esceção', 'Exseção'], correctAnswer: 'Exceção' },
  ])
}

export function getDictationQuestions() {
  return fakeRequest(
    DICTATION_WORDS.map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.DICTATION,
      prompt: 'Ditado: ouça e escreva a palavra',
      correctAnswer: word,
    })),
  )
}
