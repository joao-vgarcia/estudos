import { QUESTION_TYPES } from '@/constants/quiz'
import { fakeRequest } from './fakeRequest'

const MULTIPLICATION_TABLE_SIZE = 10

export function getEasyQuestions() {
  return fakeRequest([
    { id: 1, prompt: '2 + 2 = ?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 2, prompt: '10 - 3 = ?', options: ['6', '7', '8', '13'], correctAnswer: '7' },
    { id: 3, prompt: '5 + 6 = ?', options: ['10', '11', '12', '56'], correctAnswer: '11' },
  ])
}

export function getHardQuestions() {
  return fakeRequest([
    { id: 1, prompt: '12 × 12 = ?', options: ['124', '144', '154', '1212'], correctAnswer: '144' },
    { id: 2, prompt: '√81 = ?', options: ['8', '9', '18', '27'], correctAnswer: '9' },
    { id: 3, prompt: '15% de 200 = ?', options: ['15', '20', '30', '35'], correctAnswer: '30' },
  ])
}

export function getMultiplicationTable(number) {
  return fakeRequest(
    Array.from({ length: MULTIPLICATION_TABLE_SIZE }, (_, index) => {
      const multiplier = index + 1
      return {
        id: multiplier,
        type: QUESTION_TYPES.NUMBER,
        prompt: `${number} × ${multiplier} = ?`,
        correctAnswer: String(number * multiplier),
      }
    }),
  )
}
