import { LOCALE } from '@/constants/locale'

export function normalizeText(text) {
  return text?.trim().toLocaleLowerCase(LOCALE)
}
