import { PLURALS } from '@/constants/dictionary/plurals'
import { WORDS } from '@/constants/dictionary/words'
import { WRONG_PLURALS } from '@/constants/dictionary/wrongPlurals'
import { WRONG_SPELLINGS } from '@/constants/dictionary/wrongSpellings'
import { LOCALE } from '@/constants/locale'
import { QUESTIONS_PER_MODULE } from '@/constants/quiz'
import { randomItems } from '@/utils/random'
import { getDictationQuestions } from './dictationService'
import { fakeRequest } from './fakeRequest'

const DICTATION_ENTRIES = [...new Set([...WORDS, ...Object.values(PLURALS)])].map((word) => ({ word }))

export function getPluralQuestions() {
  return fakeRequest(
    randomItems(WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: `Qual é o plural de "${word}"?`,
      options: [PLURALS[word], ...WRONG_PLURALS[word]],
      correctAnswer: PLURALS[word],
    })),
  )
}

export function getSpellingQuestions() {
  return fakeRequest(
    randomItems(WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: 'Qual palavra está escrita corretamente?',
      options: [word, ...WRONG_SPELLINGS[word]],
      correctAnswer: word,
    })),
  )
}

export function getPortugueseDictationQuestions() {
  return getDictationQuestions({
    entries: DICTATION_ENTRIES,
    prompt: 'Ditado: ouça e escreva a palavra',
    speechLocale: LOCALE,
  })
}
