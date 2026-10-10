import { LOCALE } from '@/constants/locale'

const SPEECH_RATE = 0.8

function findLocaleVoice(synthesis) {
  return synthesis.getVoices().find((voice) => voice.lang.replace('_', '-') === LOCALE)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}

export function speak(text) {
  const synthesis = window.speechSynthesis
  if (!synthesis || !text) return
  stopSpeaking()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = LOCALE
  utterance.rate = SPEECH_RATE
  const voice = findLocaleVoice(synthesis)
  if (voice) utterance.voice = voice
  synthesis.speak(utterance)
}
