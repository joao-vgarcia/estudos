import { create } from 'zustand'
import { AWAY_PENALTY_FACTOR, QUIZ_AWAY_LIMIT_MS, QUIZ_AWAY_PENALTY_FACTOR } from '@/constants/leisure'
import { LEVELS } from '@/constants/levels'
import { ROUNDS, STEPS } from '@/constants/quiz'
import { fetchQuestions, fetchRetryQuestions } from '@/services/quizService'
import {
  addEarnedMinutes,
  completeLevel,
  isSessionExpired,
  loadSession,
  markAway,
  settleAway,
  startLeisure,
  startSession,
  stopLeisure,
} from '@/services/sessionService'
import { getAwayLeisureMs, getRemainingLeisureMs, isLeisureRunning } from '@/utils/leisure'
import { canPlayLevel, getBonusReward } from '@/utils/levels'
import { canAdvance, getAttemptsToRetry, getLevelAttempts, isCorrectAnswer } from '@/utils/quizGrading'
import { getElapsedMs } from '@/utils/timer'
import { buildAwayNotice, buildQuestionTimer, buildQuestionView, buildResult, buildSessionView } from './quizViewModels'

const initialState = {
  step: STEPS.START,
  isLoading: false,
  levelIndex: 0,
  round: ROUNDS.LEVEL,
  questions: [],
  answers: [],
  currentIndex: 0,
  questionStartedAt: null,
  attempts: [],
}

function createBlankAnswer({ parts }) {
  return parts?.map(() => null) ?? null
}

function createBlankAnswers(questions) {
  return questions.map(createBlankAnswer)
}

function getAwayPenaltyFactor(step) {
  return step === STEPS.QUESTIONS ? QUIZ_AWAY_PENALTY_FACTOR : AWAY_PENALTY_FACTOR
}

export const useAppStore = create((set, get) => {
  const update = (partialState) => {
    const nextState = { ...get(), ...partialState }
    set({
      ...partialState,
      questionView: buildQuestionView(nextState),
      questionTimer: buildQuestionTimer(nextState),
      result: buildResult(nextState),
    })
  }

  const showQuestion = (partialState) => update({ ...partialState, questionStartedAt: Date.now() })

  const withSession = (session) => ({ session, ...buildSessionView(session) })

  const startRound = async ({ levelIndex, attempts, round }, fetchRoundQuestions) => {
    update({ ...initialState, step: STEPS.QUESTIONS, isLoading: true, levelIndex, round, attempts })
    const fetchedQuestions = await fetchRoundQuestions()
    const questions = fetchedQuestions.map((question, index) => {
      const id = attempts.length + index
      return { ...question, id, slotId: question.slotId ?? id, levelIndex, isBonus: round === ROUNDS.BONUS }
    })
    showQuestion({ questions, answers: createBlankAnswers(questions), isLoading: false })
  }

  const startLevel = (levelIndex, attempts) =>
    startRound({ levelIndex, attempts, round: ROUNDS.LEVEL }, () =>
      fetchQuestions(LEVELS[levelIndex].questions, attempts),
    )

  const beginLevel = (levelIndex, attempts) => {
    const session = startSession()
    update(withSession(session))
    if (!canPlayLevel(session, levelIndex)) return
    return startLevel(levelIndex, attempts)
  }

  const finishRound = () => {
    const { questions, answers, attempts, levelIndex, round } = get()
    const roundAttempts = questions.map((question, index) => ({
      ...question,
      answer: answers[index],
      isCorrect: isCorrectAnswer(answers[index], question),
    }))
    update({ step: STEPS.RESULT, attempts: [...attempts, ...roundAttempts] })
    if (round === ROUNDS.BONUS) {
      update(withSession(addEarnedMinutes(getBonusReward(roundAttempts))))
    } else if (get().result.hasPassed) {
      update(withSession(completeLevel(levelIndex, LEVELS[levelIndex].reward)))
    }
  }

  const showNextQuestion = () => {
    const { questions, currentIndex } = get()
    if (currentIndex === questions.length - 1) {
      finishRound()
      return
    }
    showQuestion({ currentIndex: currentIndex + 1 })
  }

  const expireQuestion = () => {
    const { questions, answers, currentIndex } = get()
    update({ answers: answers.with(currentIndex, createBlankAnswer(questions[currentIndex])) })
    showNextQuestion()
  }

  const finishLeisure = () => {
    const session = isSessionExpired(get().session) ? loadSession() : stopLeisure()
    update({ ...withSession(session), isLeisureOver: true })
  }

  const warnQuizAway = (awayMs, lostMs) => {
    const isRestarted = awayMs > QUIZ_AWAY_LIMIT_MS
    if (isRestarted) showQuestion({ answers: createBlankAnswers(get().questions), currentIndex: 0 })
    update({ awayNotice: buildAwayNotice({ awayMs, lostMs, isRestarted }) })
  }

  return {
    ...initialState,
    ...withSession(settleAway()),
    questionView: null,
    questionTimer: null,
    result: null,
    isAway: false,
    isLeisureOver: false,
    awayNotice: null,

    startQuiz: (levelIndex) => beginLevel(levelIndex, []),

    goToStart: () => update({ ...initialState, ...withSession(loadSession()) }),

    refreshSession: () => {
      if (isSessionExpired(get().session)) update(withSession(loadSession()))
    },

    startLeisure: () => update(withSession(startLeisure())),

    pauseLeisure: () => update(withSession(stopLeisure())),

    tickLeisure: () => {
      const { session, leisure } = get()
      if (!isLeisureRunning(session)) return
      if (isSessionExpired(session) || getRemainingLeisureMs(session) === 0) {
        finishLeisure()
        return
      }
      const sessionView = buildSessionView(session)
      if (sessionView.leisure.clock !== leisure.clock) update(sessionView)
    },

    tickAway: () => {
      const { session, isLeisureOver } = get()
      if (!session.away || isLeisureOver || getAwayLeisureMs(session) < getRemainingLeisureMs(session)) return
      update({ isLeisureOver: true })
    },

    dismissLeisureOver: () => update({ isLeisureOver: false }),

    leavePage: () => {
      const { step, session } = get()
      update({ isAway: true })
      if (isLeisureRunning(session) || getRemainingLeisureMs(session) === 0) return
      update(withSession(markAway(getAwayPenaltyFactor(step))))
    },

    returnToPage: (awaySince) => {
      const { step, session: previousSession } = get()
      const session = settleAway()
      const lostMs = Math.max(getRemainingLeisureMs(previousSession) - getRemainingLeisureMs(session), 0)
      update({ ...withSession(session), isAway: false })
      if (step === STEPS.QUESTIONS) warnQuizAway(getElapsedMs(awaySince), lostMs)
    },

    dismissAwayNotice: () => update({ awayNotice: null }),

    continueToNextLevel: () => {
      const { levelIndex, attempts, result } = get()
      if (!result?.nextLevelTitle) return
      return beginLevel(levelIndex + 1, attempts)
    },

    retryMissed: () => {
      const { levelIndex, attempts } = get()
      const missedQuestions = getAttemptsToRetry(getLevelAttempts(attempts, levelIndex))
      if (missedQuestions.length === 0) return
      return startRound({ levelIndex, attempts, round: ROUNDS.RETRY }, () =>
        fetchRetryQuestions(missedQuestions, attempts),
      )
    },

    playBonus: () => {
      const { levelIndex, attempts, result } = get()
      if (!result?.bonusOffer) return
      return startRound({ levelIndex, attempts, round: ROUNDS.BONUS }, () =>
        fetchQuestions(LEVELS[levelIndex].bonus, attempts),
      )
    },

    answerQuestion: (answer, partIndex) => {
      const { answers, currentIndex } = get()
      const value = answer === '' ? null : answer
      const currentAnswer = answers[currentIndex]
      const nextAnswer = Array.isArray(currentAnswer) ? currentAnswer.with(partIndex, value) : value
      update({ answers: answers.with(currentIndex, nextAnswer) })
    },

    goToNextQuestion: () => {
      const { answers, currentIndex } = get()
      if (!canAdvance(answers[currentIndex])) return
      showNextQuestion()
    },

    tickQuestionTimer: () => {
      const questionTimer = buildQuestionTimer(get())
      if (!questionTimer) return
      if (questionTimer.isExpired) {
        expireQuestion()
        return
      }
      if (questionTimer.clock !== get().questionTimer?.clock) update({ questionTimer })
    },
  }
})
