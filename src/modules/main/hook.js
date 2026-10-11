import { useCallback, useEffect } from 'react'
import { LEISURE_OVER_ALARM, LEISURE_TICK_MS, QUIZ_AWAY_ALARM } from '@/constants/leisure'
import { STEPS } from '@/constants/quiz'
import { SESSION_REFRESH_INTERVAL_MS } from '@/constants/session'
import { useAppStore } from '@/stores/appStore'
import { requestNotificationPermission, startAlarm, unlockAudio } from '@/utils/alarm'
import { watchAway } from '@/utils/focus'
import { enterFullscreen, exitFullscreen } from '@/utils/fullscreen'
import { startInterval } from '@/utils/interval'
import { speak, stopSpeaking } from '@/utils/speech'

export function useMain() {
  const step = useAppStore((state) => state.step)
  const isLoading = useAppStore((state) => state.isLoading)
  const questionView = useAppStore((state) => state.questionView)
  const result = useAppStore((state) => state.result)
  const levelOptions = useAppStore((state) => state.levelOptions)
  const leisure = useAppStore((state) => state.leisure)
  const isAway = useAppStore((state) => state.isAway)
  const isLeisureOver = useAppStore((state) => state.isLeisureOver)
  const awayNotice = useAppStore((state) => state.awayNotice)
  const startQuiz = useAppStore((state) => state.startQuiz)
  const goToStart = useAppStore((state) => state.goToStart)
  const refreshSession = useAppStore((state) => state.refreshSession)
  const startLeisure = useAppStore((state) => state.startLeisure)
  const pauseLeisure = useAppStore((state) => state.pauseLeisure)
  const tickLeisure = useAppStore((state) => state.tickLeisure)
  const dismissLeisureOver = useAppStore((state) => state.dismissLeisureOver)
  const leavePage = useAppStore((state) => state.leavePage)
  const returnToPage = useAppStore((state) => state.returnToPage)
  const dismissAwayNotice = useAppStore((state) => state.dismissAwayNotice)
  const continueToNextLevel = useAppStore((state) => state.continueToNextLevel)
  const retryMissed = useAppStore((state) => state.retryMissed)
  const playBonus = useAppStore((state) => state.playBonus)
  const answerQuestion = useAppStore((state) => state.answerQuestion)
  const goToNextQuestion = useAppStore((state) => state.goToNextQuestion)

  const isQuizAway = step === STEPS.QUESTIONS && isAway

  useEffect(() => {
    if (step !== STEPS.START) return
    const intervalId = setInterval(refreshSession, SESSION_REFRESH_INTERVAL_MS)
    return () => clearInterval(intervalId)
  }, [step, refreshSession])

  useEffect(() => watchAway({ onLeave: leavePage, onReturn: returnToPage }), [leavePage, returnToPage])

  useEffect(() => {
    if (!leisure.isRunning) return
    return startInterval(tickLeisure, LEISURE_TICK_MS)
  }, [leisure.isRunning, tickLeisure])

  useEffect(() => {
    if (!isLeisureOver) return
    return startAlarm(LEISURE_OVER_ALARM)
  }, [isLeisureOver])

  useEffect(() => {
    if (!isQuizAway) return
    stopSpeaking()
    return startAlarm(QUIZ_AWAY_ALARM)
  }, [isQuizAway])

  const runInFullscreen = useCallback((action) => {
    unlockAudio()
    enterFullscreen()
    window.scrollTo(0, 0)
    action()
  }, [])
  const onStart = useCallback(
    (levelIndex) => runInFullscreen(() => startQuiz(levelIndex)),
    [runInFullscreen, startQuiz],
  )
  const onMenu = useCallback(() => {
    exitFullscreen()
    window.scrollTo(0, 0)
    goToStart()
  }, [goToStart])
  const onStartLeisure = useCallback(() => {
    unlockAudio()
    startLeisure()
    requestNotificationPermission()
  }, [startLeisure])
  const onDismissAwayNotice = useCallback(() => runInFullscreen(dismissAwayNotice), [runInFullscreen, dismissAwayNotice])
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
    levelOptions,
    leisure,
    isLeisureOver,
    awayNotice,
    onStart,
    onMenu,
    onStartLeisure,
    onPauseLeisure: pauseLeisure,
    onDismissLeisureOver: dismissLeisureOver,
    onDismissAwayNotice,
    onContinue,
    onRetry,
    onBonus,
    onAnswer: answerQuestion,
    onListen,
    onNext,
  }
}
