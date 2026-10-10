import { DEBUG_MODE } from '@/constants/debug'
import { PASSING_RATE } from '@/constants/quiz'
import { normalizeText, removeAccents, removePunctuation } from '@/utils/text'

function normalizeAnswer(answer, { ignoresAccents, ignoresPunctuation }) {
  const normalized = normalizeText(ignoresPunctuation ? removePunctuation(answer) : answer)
  return ignoresAccents ? removeAccents(normalized) : normalized
}

function isMatchingAnswer(givenAnswer, correctAnswer, rules) {
  return normalizeAnswer(givenAnswer, rules) === normalizeAnswer(correctAnswer, rules)
}

export function gradeParts(givenAnswers, { parts, ignoresAccents, ignoresPunctuation }) {
  return parts.map((part, index) => ({
    ...part,
    givenAnswer: givenAnswers[index],
    isCorrect: isMatchingAnswer(givenAnswers[index], part.correctAnswer, { ignoresAccents, ignoresPunctuation }),
  }))
}

export function isCorrectAnswer(givenAnswer, question) {
  if (question.parts) return gradeParts(givenAnswer, question).every(({ isCorrect }) => isCorrect)
  return isMatchingAnswer(givenAnswer, question.correctAnswer, question)
}

function isAnswered(answer) {
  return Array.isArray(answer) ? answer.every((value) => value != null) : answer != null
}

export function canAdvance(answer) {
  return DEBUG_MODE || isAnswered(answer)
}

export function getLatestAttempts(attempts) {
  return [...new Map(attempts.map((attempt) => [attempt.slotId, attempt])).values()]
}

export function getLevelAttempts(attempts, levelIndex) {
  return getLatestAttempts(attempts).filter((attempt) => attempt.levelIndex === levelIndex)
}

export function hasReachedPassingRate(attempts) {
  return DEBUG_MODE || attempts.filter(({ isCorrect }) => isCorrect).length / attempts.length >= PASSING_RATE
}

export function getAttemptsToRetry(levelAttempts) {
  const subjectIds = [...new Set(levelAttempts.map(({ subjectId }) => subjectId))]
  const failedSubjectIds = subjectIds.filter(
    (subjectId) => !hasReachedPassingRate(levelAttempts.filter((attempt) => attempt.subjectId === subjectId)),
  )
  return levelAttempts.filter((attempt) => failedSubjectIds.includes(attempt.subjectId) && !attempt.isCorrect)
}
