import { LEVELS } from '@/constants/levels'
import { QUESTION_TYPES, STEPS } from '@/constants/quiz'
import { canAdvance, getAttemptsToRetry, getLevelAttempts, gradeParts, hasReachedPassingRate } from '@/utils/quizGrading'

function summarizeScore(items) {
  return {
    correctCount: items.filter(({ isCorrect }) => isCorrect).length,
    total: items.length,
  }
}

function buildSection(subjectId, gradedQuestions) {
  const items = gradedQuestions.filter((item) => item.subjectId === subjectId)
  return {
    subjectId,
    title: items[0].subject,
    ...summarizeScore(items),
    hasPassed: hasReachedPassingRate(items),
    items,
  }
}

export function buildQuestionView({ step, questions, answers, currentIndex, levelIndex, isRetry }) {
  const question = questions[currentIndex]
  if (step !== STEPS.QUESTIONS || !question) return null

  const answer = answers[currentIndex]
  const subjectQuestions = questions.filter(({ subject }) => subject === question.subject)

  return {
    id: question.id,
    subject: question.subject,
    subjectId: question.subjectId,
    difficulty: question.difficulty,
    levelTitle: LEVELS[levelIndex].title,
    isRetry,
    type: question.type,
    prompt: question.prompt,
    hint: question.hint,
    image: question.image,
    word: question.word,
    imageGrid: question.imageGrid,
    options: question.options,
    answer: answer ?? '',
    parts: question.parts?.map(({ label }, index) => ({ label, answer: answer[index] ?? '' })),
    speechText: question.speechText ?? (question.type === QUESTION_TYPES.DICTATION ? question.correctAnswer : undefined),
    speechLocale: question.speechLocale,
    dictationUnit: question.dictationUnit,
    canListen: Boolean(question.speechText),
    position: subjectQuestions.indexOf(question) + 1,
    total: subjectQuestions.length,
    canAdvance: canAdvance(answer),
    isLastQuestion: currentIndex === questions.length - 1,
  }
}

export function buildResult({ step, attempts, levelIndex }) {
  if (step !== STEPS.RESULT) return null

  const level = LEVELS[levelIndex]
  const levelAttempts = getLevelAttempts(attempts, levelIndex)
  const gradedQuestions = levelAttempts.map((attempt) => ({
    id: attempt.id,
    subject: attempt.subject,
    subjectId: attempt.subjectId,
    difficulty: attempt.difficulty,
    prompt: attempt.prompt,
    image: attempt.image,
    word: attempt.word ?? attempt.speechText,
    imageGrid: attempt.imageGrid,
    givenAnswer: attempt.answer,
    correctAnswer: attempt.correctAnswer,
    parts: attempt.parts && gradeParts(attempt.answer, attempt),
    explanation: attempt.explanation,
    isCorrect: attempt.isCorrect,
  }))
  const subjectIds = [...new Set(gradedQuestions.map(({ subjectId }) => subjectId))]
  const sections = subjectIds.map((subjectId) => buildSection(subjectId, gradedQuestions))
  const hasPassed = sections.every((section) => section.hasPassed)

  return {
    ...summarizeScore(gradedQuestions),
    sections,
    levelTitle: level.title,
    hasPassed,
    reward: level.reward,
    celebration: level.celebration,
    nextLevelTitle: hasPassed ? LEVELS[levelIndex + 1]?.title : undefined,
    retryCount: hasPassed ? 0 : getAttemptsToRetry(levelAttempts).length,
  }
}
