import { QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { randomItems } from '@/utils/random'
import { normalizeText, removeAccents } from '@/utils/text'
import { fakeRequest } from './fakeRequest'

function isSameWord(first, second) {
  return removeAccents(normalizeText(first)) === removeAccents(normalizeText(second))
}

export function getDictationQuestions({ entries, prompt, speechLocale, ignoresAccents = false }) {
  return fakeRequest(
    randomItems(entries, QUESTIONS_PER_MODULE).map(({ word, hint }, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.DICTATION,
      prompt,
      hint,
      correctAnswer: word,
      speechLocale,
      ignoresAccents,
    })),
  )
}

export function getForeignDictationQuestions({ language, translations, speechLocale, excludedWords = [] }) {
  const entries = Object.entries(translations)
    .filter(([translation, word]) => !excludedWords.includes(word) && !isSameWord(translation, word))
    .map(([translation, word]) => ({ word, hint: `Tradução: ${translation}` }))
  return getDictationQuestions({
    entries,
    prompt: `Ditado em ${language}: ouça e escreva a palavra`,
    speechLocale,
    ignoresAccents: true,
  })
}
