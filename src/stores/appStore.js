import { create } from 'zustand'
import { STEPS } from '@/constants/quiz'
import { fetchQuizQuestions, fetchRetryQuestions } from '@/services/quizService'
import { getLatestAttempts, isAnswered, isCorrectAnswer } from '@/utils/quizGrading'
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
    update({ questions, answers: questions.map(({ parts }) => parts?.map(() => null) ?? null), isLoading: false })
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

    answerQuestion: (answer, partIndex) => {
      const { answers, currentIndex } = get()
      const value = answer === '' ? null : answer
      const currentAnswer = answers[currentIndex]
      const nextAnswer = Array.isArray(currentAnswer) ? currentAnswer.with(partIndex, value) : value
      update({ answers: answers.with(currentIndex, nextAnswer) })
    },

    goToNextQuestion: () => {
      const { questions, answers, currentIndex } = get()
      if (!isAnswered(answers[currentIndex])) return
      if (currentIndex === questions.length - 1) {
        finishRound()
        return
      }
      update({ currentIndex: currentIndex + 1 })
    },
  }
})
