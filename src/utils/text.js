import { LOCALE } from '@/constants/locale'

export function normalizeText(text) {
  return text?.trim().toLocaleLowerCase(LOCALE)
}

export function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}

export function removeAccents(text) {
  return text?.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}
