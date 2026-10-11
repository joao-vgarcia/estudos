import { QUIZ_AWAY_LIMIT_MESSAGE, QUIZ_AWAY_LIMIT_MS } from '@/constants/leisure'
import { LEVELS } from '@/constants/levels'
import {
  BONUS_TIME_LIMIT_FACTOR,
  QUESTION_TIME_CRITICAL_RATE,
  QUESTION_TIME_LIMITS_MS,
  QUESTION_TIME_STAGES,
  QUESTION_TIME_URGENT_RATE,
} from '@/constants/questionTimer'
import { QUESTION_TYPES, ROUNDS, STEPS } from '@/constants/quiz'
import { getEarnedLeisureMs, getRemainingLeisureMs, isLeisureRunning } from '@/utils/leisure'
import { canPlayLevel, getBonusReward, getMaxBonusReward, isLevelUnlocked } from '@/utils/levels'
import {
  canAdvance,
  getAttemptsToRetry,
  getBonusAttempts,
  getLevelAttempts,
  gradeParts,
  hasReachedPassingRate,
} from '@/utils/quizGrading'
import { formatClock, formatDuration, formatMinutes } from '@/utils/text'
import { getElapsedMs } from '@/utils/timer'

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
    passage: attempt.passage,
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

function buildLeisureView(session) {
  const remainingMs = getRemainingLeisureMs(session)
  const earnedMs = getEarnedLeisureMs(session)
  return {
    time: formatDuration(remainingMs),
    clock: formatClock(remainingMs),
    progress: earnedMs > 0 ? remainingMs / earnedMs : 0,
    isRunning: isLeisureRunning(session),
    isAvailable: remainingMs > 0,
  }
}

export function buildSessionView(session) {
  const { repetitions } = session
  return {
    levelOptions: LEVELS.map((level, index) => ({
      index,
      title: level.title,
      stars: index + 1,
      reward: level.reward,
      bonusReward: getMaxBonusReward(level),
      repetitions: level.repetitions,
      remainingRepetitions: Math.min(repetitions[index], level.repetitions),
      requiredLevelTitle: isLevelUnlocked(session, index) ? undefined : LEVELS[index - 1].title,
    })),
    leisure: buildLeisureView(session),
  }
}

export function buildAwayNotice({ awayMs, lostMs, isRestarted }) {
  return [
    `Você ficou fora por ${formatDuration(awayMs)}.`,
    lostMs > 0 && `Você perdeu ${formatDuration(lostMs)} do tempo de lazer.`,
    isRestarted
      ? `Como passou de ${formatDuration(QUIZ_AWAY_LIMIT_MS)}, o questionário recomeçou do início.`
      : QUIZ_AWAY_LIMIT_MESSAGE,
  ].filter(Boolean)
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
    bonusReward: round === ROUNDS.BONUS ? formatMinutes(question.minutesPerQuestion) : undefined,
    type: question.type,
    prompt: question.prompt,
    hint: question.hint,
    solutionHint: question.solutionHint,
    image: question.image,
    word: question.word,
    imageGrid: question.imageGrid,
    passage: question.passage,
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

function getQuestionTimeLimitMs({ difficulty, isBonus }) {
  return QUESTION_TIME_LIMITS_MS[difficulty] * (isBonus ? BONUS_TIME_LIMIT_FACTOR : 1)
}

function getQuestionTimeStage(progress) {
  if (progress <= QUESTION_TIME_CRITICAL_RATE) return QUESTION_TIME_STAGES.CRITICAL
  if (progress <= QUESTION_TIME_URGENT_RATE) return QUESTION_TIME_STAGES.URGENT
  return QUESTION_TIME_STAGES.NORMAL
}

export function buildQuestionTimer({ step, questions, currentIndex, questionStartedAt }, now = Date.now()) {
  const question = questions[currentIndex]
  if (step !== STEPS.QUESTIONS || !question) return null

  const limitMs = getQuestionTimeLimitMs(question)
  const remainingMs = Math.max(limitMs - getElapsedMs(questionStartedAt, now), 0)
  const progress = remainingMs / limitMs

  return {
    clock: formatClock(remainingMs),
    progress,
    stage: getQuestionTimeStage(progress),
    isExpired: remainingMs === 0,
  }
}

export function buildResult({ step, attempts, levelIndex, session }) {
  if (step !== STEPS.RESULT) return null

  const level = LEVELS[levelIndex]
  const levelAttempts = getLevelAttempts(attempts, levelIndex)
  const gradedQuestions = levelAttempts.map(gradeAttempt)
  const subjectIds = [...new Set(gradedQuestions.map(({ subjectId }) => subjectId))]
  const sections = subjectIds.map((subjectId) => buildSection(subjectId, gradedQuestions))
  const hasPassed = sections.every((section) => section.hasPassed)
  const bonusAttempts = getBonusAttempts(attempts, levelIndex)
  const bonusItems = bonusAttempts.map(gradeAttempt)
  const bonusScore = summarizeScore(bonusItems)
  const bonusMinutes = getBonusReward(bonusAttempts)
  const hasPlayedBonus = bonusItems.length > 0

  return {
    ...summarizeScore(gradedQuestions),
    sections,
    levelTitle: level.title,
    hasPassed,
    reward: formatMinutes(level.reward + bonusMinutes),
    celebration: level.celebration,
    bonusOffer:
      hasPassed && level.bonus && !hasPlayedBonus
        ? {
            questionCount: countQuestions(level.bonus),
            reward: formatMinutes(getMaxBonusReward(level)),
          }
        : undefined,
    bonusResult: hasPlayedBonus
      ? { ...bonusScore, reward: bonusMinutes > 0 ? formatMinutes(bonusMinutes) : undefined, items: bonusItems }
      : undefined,
    nextLevelTitle: hasPassed && canPlayLevel(session, levelIndex + 1) ? LEVELS[levelIndex + 1].title : undefined,
    retryCount: hasPassed ? 0 : getAttemptsToRetry(levelAttempts).length,
  }
}
