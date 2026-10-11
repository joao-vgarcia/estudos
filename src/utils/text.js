import { LOCALE } from '@/constants/locale'

export function normalizeText(text) {
  return text?.trim().replace(/\s+/g, ' ').toLocaleLowerCase(LOCALE)
}

export function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}

const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE

const listFormat = new Intl.ListFormat(LOCALE, { type: 'conjunction' })

function splitDuration(ms) {
  const totalSeconds = Math.ceil(ms / MS_PER_SECOND)
  return {
    hours: Math.floor(totalSeconds / SECONDS_PER_HOUR),
    minutes: Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
    seconds: totalSeconds % SECONDS_PER_MINUTE,
  }
}

function padTime(value) {
  return String(value).padStart(2, '0')
}

export function formatDuration(ms) {
  const { hours, minutes, seconds } = splitDuration(ms)
  const parts = [
    hours > 0 && formatCount(hours, 'hora', 'horas'),
    minutes > 0 && formatCount(minutes, 'minuto', 'minutos'),
    seconds > 0 && formatCount(seconds, 'segundo', 'segundos'),
  ].filter(Boolean)
  return parts.length > 0 ? listFormat.format(parts) : formatCount(0, 'minuto', 'minutos')
}

export function formatMinutes(totalMinutes) {
  return formatDuration(totalMinutes * SECONDS_PER_MINUTE * MS_PER_SECOND)
}

export function formatClock(ms) {
  const { hours, minutes, seconds } = splitDuration(ms)
  return hours > 0 ? `${hours}:${padTime(minutes)}:${padTime(seconds)}` : `${minutes}:${padTime(seconds)}`
}

export function removePunctuation(text) {
  return text?.replace(/[.,;:!?]/g, '')
}

export function removeAccents(text) {
  return text?.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
