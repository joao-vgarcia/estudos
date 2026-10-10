import { create } from 'zustand'
import { LEVELS } from '@/constants/levels'
import { STEPS } from '@/constants/quiz'
import { fetchLevelQuestions, fetchRetryQuestions } from '@/services/quizService'
import { canAdvance, getAttemptsToRetry, getLevelAttempts, isCorrectAnswer } from '@/utils/quizGrading'
import { buildQuestionView, buildResult } from './quizViewModels'

const initialState = {
  step: STEPS.START,
  isLoading: false,
  levelIndex: 0,
  isRetry: false,
  questions: [],
  answers: [],
  currentIndex: 0,
  attempts: [],
}

export const useAppStore = create((set, get) => {
  const update = (partialState) => {
    const nextState = { ...get(), ...partialState }
    set({ ...partialState, questionView: buildQuestionView(nextState), result: buildResult(nextState) })
  }

  const startRound = async ({ levelIndex, attempts, isRetry }, fetchQuestions) => {
    update({ ...initialState, step: STEPS.QUESTIONS, isLoading: true, levelIndex, isRetry, attempts })
    const fetchedQuestions = await fetchQuestions()
    const questions = fetchedQuestions.map((question, index) => {
      const id = attempts.length + index
      return { ...question, id, slotId: question.slotId ?? id, levelIndex }
    })
    update({ questions, answers: questions.map(({ parts }) => parts?.map(() => null) ?? null), isLoading: false })
  }

  const startLevel = (levelIndex, attempts) =>
    startRound({ levelIndex, attempts, isRetry: false }, () => fetchLevelQuestions(LEVELS[levelIndex], attempts))

  const finishRound = () => {
    const { questions, answers, attempts } = get()
    const roundAttempts = questions.map((question, index) => ({
      ...question,
      answer: answers[index],
      isCorrect: isCorrectAnswer(answers[index], question),
    }))
    update({ step: STEPS.RESULT, attempts: [...attempts, ...roundAttempts] })
  }

  return {
    ...initialState,
    questionView: null,
    result: null,

    startQuiz: () => startLevel(0, []),

    continueToNextLevel: () => {
      const { levelIndex, attempts, result } = get()
      if (!result?.hasPassed || levelIndex === LEVELS.length - 1) return
      return startLevel(levelIndex + 1, attempts)
    },

    retryMissed: () => {
      const { levelIndex, attempts } = get()
      const missedQuestions = getAttemptsToRetry(getLevelAttempts(attempts, levelIndex))
      if (missedQuestions.length === 0) return
      return startRound({ levelIndex, attempts, isRetry: true }, () => fetchRetryQuestions(missedQuestions, attempts))
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
