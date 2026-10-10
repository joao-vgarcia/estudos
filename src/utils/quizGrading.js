import { normalizeText, removeAccents } from '@/utils/text'

function normalizeAnswer(answer, ignoresAccents) {
  const normalized = normalizeText(answer)
  return ignoresAccents ? removeAccents(normalized) : normalized
}

function isMatchingAnswer(givenAnswer, correctAnswer, ignoresAccents) {
  return normalizeAnswer(givenAnswer, ignoresAccents) === normalizeAnswer(correctAnswer, ignoresAccents)
}

export function gradeParts(givenAnswers, { parts, ignoresAccents }) {
  return parts.map((part, index) => ({
    ...part,
    givenAnswer: givenAnswers[index],
    isCorrect: isMatchingAnswer(givenAnswers[index], part.correctAnswer, ignoresAccents),
  }))
}

export function isCorrectAnswer(givenAnswer, question) {
  if (question.parts) return gradeParts(givenAnswer, question).every(({ isCorrect }) => isCorrect)
  return isMatchingAnswer(givenAnswer, question.correctAnswer, question.ignoresAccents)
}

export function isAnswered(answer) {
  return Array.isArray(answer) ? answer.every((value) => value != null) : answer != null
}

export function getLatestAttempts(attempts) {
  return [...new Map(attempts.map((attempt) => [attempt.slotId, attempt])).values()]
}
