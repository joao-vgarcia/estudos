import { DIFFICULTIES, QUESTION_TYPES, TRUE_FALSE_OPTIONS } from '@/constants/quiz'
import { balancedBooleans } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

export function getTrueFalseQuestions({ items, buildStatement, difficulty = DIFFICULTIES.EASY }) {
  const answers = balancedBooleans(items.length)
  return fakeRequest(
    items.map((item, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.TRUE_FALSE,
      difficulty,
      ...buildStatement(item, answers[index]),
      correctAnswer: answers[index] ? TRUE_FALSE_OPTIONS.TRUE : TRUE_FALSE_OPTIONS.FALSE,
    })),
  )
}
