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
  const continueToNextLevel = useAppStore((state) => state.continueToNextLevel)
  const retryMissed = useAppStore((state) => state.retryMissed)
  const playBonus = useAppStore((state) => state.playBonus)
  const answerQuestion = useAppStore((state) => state.answerQuestion)
  const goToNextQuestion = useAppStore((state) => state.goToNextQuestion)

  const runInFullscreen = useCallback((action) => {
    enterFullscreen()
    window.scrollTo(0, 0)
    action()
  }, [])
  const onStart = useCallback(() => runInFullscreen(startQuiz), [runInFullscreen, startQuiz])
  const onContinue = useCallback(() => runInFullscreen(continueToNextLevel), [runInFullscreen, continueToNextLevel])
  const onRetry = useCallback(() => runInFullscreen(retryMissed), [runInFullscreen, retryMissed])
  const onBonus = useCallback(() => runInFullscreen(playBonus), [runInFullscreen, playBonus])
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
    onContinue,
    onRetry,
    onBonus,
    onAnswer: answerQuestion,
    onListen,
    onNext,
    onExit: exitFullscreen,
  }
}
