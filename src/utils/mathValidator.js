export function isValidMathQuestion({ result }, [minResult, maxResult]) {
  return Number.isInteger(result) && result >= minResult && result <= maxResult
}
