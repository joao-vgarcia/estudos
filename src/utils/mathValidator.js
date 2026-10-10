const MIN_RESULT = 2
const MAX_RESULT = 50

export function isValidMathQuestion({ result }) {
  return Number.isInteger(result) && result >= MIN_RESULT && result <= MAX_RESULT
}
