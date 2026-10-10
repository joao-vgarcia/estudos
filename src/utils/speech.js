import { LOCALE } from '@/constants/locale'

const SPEECH_RATE = 0.8

function getVoiceLocale(voice) {
  return voice.lang.replace('_', '-')
}

function findVoice(synthesis, locale) {
  const voices = synthesis.getVoices()
  const [language] = locale.split('-')
  return (
    voices.find((voice) => getVoiceLocale(voice) === locale) ??
    voices.find((voice) => getVoiceLocale(voice).split('-')[0] === language)
  )
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}

export function speak(text, locale = LOCALE) {
  const synthesis = window.speechSynthesis
  if (!synthesis || !text) return
  stopSpeaking()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = locale
  utterance.rate = SPEECH_RATE
  const voice = findVoice(synthesis, locale)
  if (voice) utterance.voice = voice
  synthesis.speak(utterance)
}
