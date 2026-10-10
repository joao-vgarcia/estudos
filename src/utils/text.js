import { LOCALE } from '@/constants/locale'

export function normalizeText(text) {
  return text?.trim().replace(/\s+/g, ' ').toLocaleLowerCase(LOCALE)
}

export function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}

const MINUTES_PER_HOUR = 60

export function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR)
  const minutes = totalMinutes % MINUTES_PER_HOUR
  return [hours > 0 && formatCount(hours, 'hora', 'horas'), minutes > 0 && formatCount(minutes, 'minuto', 'minutos')]
    .filter(Boolean)
    .join(' e ')
}

export function removePunctuation(text) {
  return text?.replace(/[.,;:!?]/g, '')
}

export function removeAccents(text) {
  return text?.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
