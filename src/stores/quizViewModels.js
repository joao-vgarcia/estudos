import { PASSING_RATE, QUESTION_TYPES, STEPS } from '@/constants/quiz'
import { getLatestAttempts } from '@/utils/quizGrading'

function summarizeScore(items) {
  return {
    correctCount: items.filter(({ isCorrect }) => isCorrect).length,
    total: items.length,
  }
}

function buildSection(subjectId, gradedQuestions) {
  const items = gradedQuestions.filter((item) => item.subjectId === subjectId)
  const score = summarizeScore(items)
  return {
    subjectId,
    title: items[0].subject,
    ...score,
    hasPassed: score.correctCount / score.total > PASSING_RATE,
    canRetry: score.correctCount < score.total,
    items,
  }
}

export function buildQuestionView({ step, questions, answers, currentIndex }) {
  const question = questions[currentIndex]
  if (step !== STEPS.QUESTIONS || !question) return null

  const answer = answers[currentIndex]
  const subjectQuestions = questions.filter(({ subject }) => subject === question.subject)

  return {
    id: question.id,
    subject: question.subject,
    subjectId: question.subjectId,
    difficulty: question.difficulty,
    type: question.type,
    prompt: question.prompt,
    hint: question.hint,
    options: question.options,
    answer: answer ?? '',
    speechText: question.type === QUESTION_TYPES.DICTATION ? question.correctAnswer : undefined,
    speechLocale: question.speechLocale,
    position: subjectQuestions.indexOf(question) + 1,
    total: subjectQuestions.length,
    canAdvance: answer != null,
    isLastQuestion: currentIndex === questions.length - 1,
  }
}

export function buildResult({ step, attempts }) {
  if (step !== STEPS.RESULT) return null

  const gradedQuestions = getLatestAttempts(attempts).map((attempt) => ({
    id: attempt.id,
    subject: attempt.subject,
    subjectId: attempt.subjectId,
    difficulty: attempt.difficulty,
    prompt: attempt.prompt,
    givenAnswer: attempt.answer,
    correctAnswer: attempt.correctAnswer,
    isCorrect: attempt.isCorrect,
  }))
  const subjectIds = [...new Set(gradedQuestions.map(({ subjectId }) => subjectId))]
  const sections = subjectIds.map((subjectId) => buildSection(subjectId, gradedQuestions))

  return {
    ...summarizeScore(gradedQuestions),
    sections,
    canExit: sections.every(({ hasPassed }) => hasPassed),
  }
}
