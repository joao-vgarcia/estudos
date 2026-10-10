import { LOCALE } from '@/constants/locale'

export function normalizeText(text) {
  return text?.trim().replace(/\s+/g, ' ').toLocaleLowerCase(LOCALE)
}

export function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}

export function removePunctuation(text) {
  return text?.replace(/[.,;:!?]/g, '')
}

export function removeAccents(text) {
  return text?.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
