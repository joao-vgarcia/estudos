import { useCallback } from 'react'
import { useAppStore } from '@/stores/appStore'
import { enterFullscreen, exitFullscreen } from '@/utils/fullscreen'
import { speak, stopSpeaking } from '@/utils/speech'

export function useMain() {
  const step = useAppStore((state) => state.step)
  const isLoading = useAppStore((state) => state.isLoading)
  const questionView = useAppStore((state) => state.questionView)
  const result = useAppStore((state) => state.result)
  const startQuiz = useAppStore((state) => state.startQuiz)
  const answerQuestion = useAppStore((state) => state.answerQuestion)
  const goToNextQuestion = useAppStore((state) => state.goToNextQuestion)
  const retrySubject = useAppStore((state) => state.retrySubject)

  const onStart = useCallback(() => {
    enterFullscreen()
    startQuiz()
  }, [startQuiz])
  const onRetry = useCallback(
    (subjectId) => {
      enterFullscreen()
      retrySubject(subjectId)
    },
    [retrySubject],
  )
  const onListen = useCallback(
    () => speak(questionView?.speechText, questionView?.speechLocale),
    [questionView?.speechText, questionView?.speechLocale],
  )
  const onNext = useCallback(() => {
    stopSpeaking()
    goToNextQuestion()
  }, [goToNextQuestion])

  return {
    step,
    isLoading,
    questionView,
    result,
    onStart,
    onRetry,
    onAnswer: answerQuestion,
    onListen,
    onNext,
    onExit: exitFullscreen,
  }
}
