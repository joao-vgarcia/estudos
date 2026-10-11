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
import { getRemainingLeisureMs, isLeisureRunning } from '@/utils/leisure'
import { canAdvance, getAttemptsToRetry, getLevelAttempts, isCorrectAnswer } from '@/utils/quizGrading'
import { buildAwayNotice, buildQuestionView, buildResult, buildSessionView } from './quizViewModels'

const initialState = {
  step: STEPS.START,
  isLoading: false,
  levelIndex: 0,
  round: ROUNDS.LEVEL,
  questions: [],
  answers: [],
  currentIndex: 0,
  attempts: [],
}

function createBlankAnswers(questions) {
  return questions.map(({ parts }) => parts?.map(() => null) ?? null)
}

function getAwayPenaltyFactor(step) {
  return step === STEPS.QUESTIONS ? QUIZ_AWAY_PENALTY_FACTOR : AWAY_PENALTY_FACTOR
}

export const useAppStore = create((set, get) => {
  const update = (partialState) => {
    const nextState = { ...get(), ...partialState }
    set({ ...partialState, questionView: buildQuestionView(nextState), result: buildResult(nextState) })
  }

  const withSession = (session) => ({ session, ...buildSessionView(session) })

  const startRound = async ({ levelIndex, attempts, round }, fetchRoundQuestions) => {
    update({ ...initialState, step: STEPS.QUESTIONS, isLoading: true, levelIndex, round, attempts })
    const fetchedQuestions = await fetchRoundQuestions()
    const questions = fetchedQuestions.map((question, index) => {
      const id = attempts.length + index
      return { ...question, id, slotId: question.slotId ?? id, levelIndex, isBonus: round === ROUNDS.BONUS }
    })
    update({ questions, answers: createBlankAnswers(questions), isLoading: false })
  }

  const startLevel = (levelIndex, attempts) =>
    startRound({ levelIndex, attempts, round: ROUNDS.LEVEL }, () =>
      fetchQuestions(LEVELS[levelIndex].questions, LEVELS[levelIndex].difficulty, attempts),
    )

  const beginLevel = (levelIndex, attempts) => {
    const session = startSession()
    update(withSession(session))
    if (session.repetitions[levelIndex] === 0) return
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
      const correctCount = roundAttempts.filter(({ isCorrect }) => isCorrect).length
      update(withSession(addEarnedMinutes(correctCount * LEVELS[levelIndex].bonus.minutesPerQuestion)))
    } else if (get().result.hasPassed) {
      update(withSession(completeLevel(levelIndex, LEVELS[levelIndex].reward)))
    }
  }

  const finishLeisure = () => {
    const session = isSessionExpired(get().session) ? loadSession() : stopLeisure()
    update({ ...withSession(session), isLeisureOver: true })
  }

  const warnQuizAway = (awayMs, lostMs) => {
    const isRestarted = awayMs > QUIZ_AWAY_LIMIT_MS
    if (isRestarted) update({ answers: createBlankAnswers(get().questions), currentIndex: 0 })
    update({ awayNotice: buildAwayNotice({ awayMs, lostMs, isRestarted }) })
  }

  return {
    ...initialState,
    ...withSession(settleAway()),
    questionView: null,
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

    dismissLeisureOver: () => update({ isLeisureOver: false }),

    leavePage: () => {
      const { step, session } = get()
      update({ isAway: true })
      if (isLeisureRunning(session) || getRemainingLeisureMs(session) === 0) return
      update(withSession(markAway(getAwayPenaltyFactor(step))))
    },

    returnToPage: (awayMs) => {
      const { step, session: previousSession } = get()
      const session = settleAway()
      const lostMs = Math.max(getRemainingLeisureMs(previousSession) - getRemainingLeisureMs(session), 0)
      update({ ...withSession(session), isAway: false })
      if (step === STEPS.QUESTIONS) warnQuizAway(awayMs, lostMs)
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
        fetchQuestions(LEVELS[levelIndex].bonus.questions, LEVELS[levelIndex].difficulty, attempts),
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
      const { questions, answers, currentIndex } = get()
      if (!canAdvance(answers[currentIndex])) return
      if (currentIndex === questions.length - 1) {
        finishRound()
        return
      }
      update({ currentIndex: currentIndex + 1 })
    },
  }
})
