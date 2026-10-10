import { create } from 'zustand'
import { STEPS } from '@/constants/quiz'
import { fetchQuizQuestions } from '@/services/quizService'
import { buildQuestionView, buildResult } from './quizViewModels'

const initialState = {
  step: STEPS.START,
  isLoading: false,
  questions: [],
  answers: [],
  currentIndex: 0,
}

export const useAppStore = create((set, get) => {
  const update = (partialState) => {
    const nextState = { ...get(), ...partialState }
    set({ ...partialState, questionView: buildQuestionView(nextState), result: buildResult(nextState) })
  }

  return {
    ...initialState,
    questionView: null,
    result: null,

    startQuiz: async () => {
      update({ ...initialState, step: STEPS.QUESTIONS, isLoading: true })
      const questions = await fetchQuizQuestions()
      update({ questions, answers: new Array(questions.length).fill(null), isLoading: false })
    },

    answerQuestion: (answer) => {
      const { answers, currentIndex } = get()
      update({ answers: answers.with(currentIndex, answer === '' ? null : answer) })
    },

    goToNextQuestion: () => {
      const { questions, answers, currentIndex } = get()
      if (answers[currentIndex] == null) return
      if (currentIndex === questions.length - 1) {
        update({ step: STEPS.RESULT })
        return
      }
      update({ currentIndex: currentIndex + 1 })
    },
  }
})
