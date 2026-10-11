import { startInterval } from '@/utils/interval'

const ALARM_INTERVAL_MS = 1500
const BEEP_DURATION_S = 0.5
const BEEP_FREQUENCIES = [880, 660]
const BEEP_VOLUME = 0.2
const BEEP_MIN_VOLUME = 0.001
const VIBRATION_PATTERN = [300, 200, 300]
const NOTIFICATION_TAG = 'estudos-alarm'

let audioContext

function getAudioContext() {
  if (!globalThis.AudioContext) return null
  audioContext ??= new AudioContext()
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {})
  return audioContext
}

function beep() {
  const context = getAudioContext()
  if (context?.state !== 'running') return
  const startTime = context.currentTime
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'square'
  BEEP_FREQUENCIES.forEach((frequency, index) => {
    oscillator.frequency.setValueAtTime(frequency, startTime + (index * BEEP_DURATION_S) / BEEP_FREQUENCIES.length)
  })
  gain.gain.setValueAtTime(BEEP_VOLUME, startTime)
  gain.gain.exponentialRampToValueAtTime(BEEP_MIN_VOLUME, startTime + BEEP_DURATION_S)
  oscillator.connect(gain).connect(context.destination)
  oscillator.start(startTime)
  oscillator.stop(startTime + BEEP_DURATION_S)
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

  const ring = () => {
    isTitleFlashing = !isTitleFlashing
    document.title = isTitleFlashing ? `⚠️ ${message.title}` : originalTitle
    beep()
  }

  window.focus()
  navigator.vibrate?.(VIBRATION_PATTERN)
  ring()
  const stopRinging = startInterval(ring, ALARM_INTERVAL_MS)

  return () => {
    stopRinging()
    notification?.close()
    document.title = originalTitle
  }
}
