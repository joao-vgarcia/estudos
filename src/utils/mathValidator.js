import { MATH_OPERATIONS } from '@/constants/math'

const MAX_ADDITION_RESULT = 100
const MAX_MULTIPLICATION_RESULT = 100

const RESULT_RULES = {
  [MATH_OPERATIONS.ADDITION]: (result) => result <= MAX_ADDITION_RESULT,
  [MATH_OPERATIONS.SUBTRACTION]: (result) => result > 0,
  [MATH_OPERATIONS.MULTIPLICATION]: (result) => result < MAX_MULTIPLICATION_RESULT,
  [MATH_OPERATIONS.DIVISION]: (result) => Number.isInteger(result) && result > 0,
}

export function isValidMathQuestion({ operation, result }) {
  return RESULT_RULES[operation]?.(result) ?? false
}
