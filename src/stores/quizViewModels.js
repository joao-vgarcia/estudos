import { LEVELS } from '@/constants/levels'
import { QUESTION_TYPES, ROUNDS, STEPS } from '@/constants/quiz'
import {
  canAdvance,
  getAttemptsToRetry,
  getBonusAttempts,
  getLevelAttempts,
  gradeParts,
  hasReachedPassingRate,
} from '@/utils/quizGrading'
import { formatMinutes } from '@/utils/text'

const ROUND_LABELS = {
  [ROUNDS.RETRY]: 'Revisão',
  [ROUNDS.BONUS]: 'Bônus',
}

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

function gradeAttempt(attempt) {
  return {
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
  }
}

function countQuestions(blocks) {
  return blocks.reduce((total, { count }) => total + count, 0)
}

export function buildQuestionView({ step, questions, answers, currentIndex, levelIndex, round }) {
  const question = questions[currentIndex]
  if (step !== STEPS.QUESTIONS || !question) return null

  const answer = answers[currentIndex]
  const groupQuestions =
    round === ROUNDS.BONUS ? questions : questions.filter(({ subject }) => subject === question.subject)

  return {
    id: question.id,
    subject: question.subject,
    subjectId: question.subjectId,
    difficulty: question.difficulty,
    levelTitle: LEVELS[levelIndex].title,
    roundLabel: ROUND_LABELS[round],
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
    position: groupQuestions.indexOf(question) + 1,
    total: groupQuestions.length,
    canAdvance: canAdvance(answer),
    isLastQuestion: currentIndex === questions.length - 1,
  }
}

export function buildResult({ step, attempts, levelIndex }) {
  if (step !== STEPS.RESULT) return null

  const level = LEVELS[levelIndex]
  const levelAttempts = getLevelAttempts(attempts, levelIndex)
  const gradedQuestions = levelAttempts.map(gradeAttempt)
  const subjectIds = [...new Set(gradedQuestions.map(({ subjectId }) => subjectId))]
  const sections = subjectIds.map((subjectId) => buildSection(subjectId, gradedQuestions))
  const hasPassed = sections.every((section) => section.hasPassed)
  const bonusItems = getBonusAttempts(attempts, levelIndex).map(gradeAttempt)
  const bonusScore = summarizeScore(bonusItems)
  const bonusMinutes = bonusScore.correctCount * level.bonus.minutesPerQuestion
  const hasPlayedBonus = bonusItems.length > 0

  return {
    ...summarizeScore(gradedQuestions),
    sections,
    levelTitle: level.title,
    hasPassed,
    reward: formatMinutes(level.reward + bonusMinutes),
    celebration: level.celebration,
    bonusOffer:
      hasPassed && !hasPlayedBonus
        ? {
            questionCount: countQuestions(level.bonus.questions),
            reward: formatMinutes(level.bonus.minutesPerQuestion),
          }
        : undefined,
    bonusResult: hasPlayedBonus
      ? { ...bonusScore, reward: bonusMinutes > 0 ? formatMinutes(bonusMinutes) : undefined, items: bonusItems }
      : undefined,
    nextLevelTitle: hasPassed ? LEVELS[levelIndex + 1]?.title : undefined,
    retryCount: hasPassed ? 0 : getAttemptsToRetry(levelAttempts).length,
  }
}
