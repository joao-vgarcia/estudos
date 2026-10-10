import { normalizeText, removeAccents } from '@/utils/text'

function normalizeAnswer(answer, ignoresAccents) {
  const normalized = normalizeText(answer)
  return ignoresAccents ? removeAccents(normalized) : normalized
}

export function isCorrectAnswer(givenAnswer, { correctAnswer, ignoresAccents }) {
  return normalizeAnswer(givenAnswer, ignoresAccents) === normalizeAnswer(correctAnswer, ignoresAccents)
}

export function getLatestAttempts(attempts) {
  return [...new Map(attempts.map((attempt) => [attempt.slotId, attempt])).values()]
}
