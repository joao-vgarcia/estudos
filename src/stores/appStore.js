import { create } from 'zustand'
import { STEPS } from '@/constants/quiz'
import { fetchQuizQuestions, fetchRetryQuestions } from '@/services/quizService'
import { getLatestAttempts, isCorrectAnswer } from '@/utils/quizGrading'
import { buildQuestionView, buildResult } from './quizViewModels'

const initialState = {
  step: STEPS.START,
  isLoading: false,
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

  const startRound = async (attempts, fetchQuestions) => {
    update({ ...initialState, step: STEPS.QUESTIONS, isLoading: true, attempts })
    const fetchedQuestions = await fetchQuestions()
    const questions = fetchedQuestions.map((question, index) => {
      const id = attempts.length + index
      return { ...question, id, slotId: question.slotId ?? id }
    })
    update({ questions, answers: new Array(questions.length).fill(null), isLoading: false })
  }

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

    startQuiz: () => startRound([], fetchQuizQuestions),

    retrySubject: (subjectId) => {
      const { attempts } = get()
      const missedQuestions = getLatestAttempts(attempts).filter(
        (attempt) => attempt.subjectId === subjectId && !attempt.isCorrect,
      )
      if (missedQuestions.length === 0) return
      return startRound(attempts, () => fetchRetryQuestions(missedQuestions, attempts))
    },

    answerQuestion: (answer) => {
      const { answers, currentIndex } = get()
      update({ answers: answers.with(currentIndex, answer === '' ? null : answer) })
    },

    goToNextQuestion: () => {
      const { questions, answers, currentIndex } = get()
      if (answers[currentIndex] == null) return
      if (currentIndex === questions.length - 1) {
        finishRound()
        return
      }
      update({ currentIndex: currentIndex + 1 })
    },
  }
})
