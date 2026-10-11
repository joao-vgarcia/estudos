import { startInterval } from '@/utils/interval'
import { shout, stopSpeaking } from '@/utils/speech'

const ALARM_INTERVAL_MS = 3000
const TITLE_FLASH_INTERVAL_MS = 500
const SIREN_DURATION_S = 2.5
const SIREN_SWEEP_S = 0.2
const SIREN_LOW_FREQUENCY = 1000
const SIREN_HIGH_FREQUENCY = 3000
const SIREN_FREQUENCY_OFFSETS = [0, 45]
const SIREN_VOLUME = 0.5
const SIREN_FADE_S = 0.02
const VIBRATION_PATTERN = [500, 100, 500, 100, 500]
const NOTIFICATION_TAG = 'estudos-alarm'

let audioContext

function getAudioContext() {
  if (!globalThis.AudioContext) return null
  audioContext ??= new AudioContext()
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {})
  return audioContext
}

function playSiren() {
  const context = getAudioContext()
  if (context?.state !== 'running') return () => {}
  const startTime = context.currentTime
  const endTime = startTime + SIREN_DURATION_S
  const gain = context.createGain()
  gain.gain.setValueAtTime(SIREN_VOLUME, startTime)
  gain.gain.setValueAtTime(SIREN_VOLUME, endTime - SIREN_FADE_S)
  gain.gain.linearRampToValueAtTime(0, endTime)
  gain.connect(context.destination)
  SIREN_FREQUENCY_OFFSETS.forEach((offset) => {
    const oscillator = context.createOscillator()
    oscillator.type = 'square'
    for (let sweepTime = startTime; sweepTime < endTime; sweepTime += SIREN_SWEEP_S) {
      oscillator.frequency.setValueAtTime(SIREN_LOW_FREQUENCY + offset, sweepTime)
      oscillator.frequency.linearRampToValueAtTime(SIREN_HIGH_FREQUENCY + offset, sweepTime + SIREN_SWEEP_S)
    }
    oscillator.connect(gain)
    oscillator.start(startTime)
    oscillator.stop(endTime)
  })
  return () => gain.disconnect()
}

function canShout({ shout: text }) {
  return Boolean(globalThis.speechSynthesis && text)
}

function showNotification({ title, body }) {
  if (globalThis.Notification?.permission !== 'granted') return null
  try {
    const notification = new Notification(title, { body, tag: NOTIFICATION_TAG, requireInteraction: true })
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
    return notification
  } catch {
    return null
  }
}

export function unlockAudio() {
  getAudioContext()
}

export function requestNotificationPermission() {
  if (globalThis.Notification?.permission === 'default') Notification.requestPermission()
}

export function startAlarm(message) {
  const originalTitle = document.title
  const notification = showNotification(message)
  let isTitleFlashing = false
  let isShoutTurn = true
  let stopSiren = () => {}

  const flashTitle = () => {
    isTitleFlashing = !isTitleFlashing
    document.title = isTitleFlashing ? `⚠️ ${message.title}` : originalTitle
  }

  const ring = () => {
    navigator.vibrate?.(VIBRATION_PATTERN)
    isShoutTurn = canShout(message) && !isShoutTurn
    if (isShoutTurn) {
      shout(message.shout)
      return
    }
    stopSiren = playSiren()
  }

  window.focus()
  flashTitle()
  ring()
  const stopFlashing = startInterval(flashTitle, TITLE_FLASH_INTERVAL_MS)
  const stopRinging = startInterval(ring, ALARM_INTERVAL_MS)

  return () => {
    stopRinging()
    stopFlashing()
    stopSiren()
    stopSpeaking()
    notification?.close()
    document.title = originalTitle
  }
}
