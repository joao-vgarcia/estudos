import { SPANISH } from '@/constants/dictionary/spanish'
import { WRONG_SPANISH } from '@/constants/dictionary/wrongSpanish'
import { SPANISH_LOCALE } from '@/constants/locale'
import { getForeignDictationQuestions } from './dictationService'
import { getTranslationQuestions } from './translationService'

const AMBIGUOUS_DICTATION_WORDS = ['arcoíris']

export function getSpanishVocabularyQuestions() {
  return getTranslationQuestions({ language: 'espanhol', translations: SPANISH, wrongTranslations: WRONG_SPANISH })
}

export function getSpanishDictationQuestions() {
  return getForeignDictationQuestions({
    language: 'espanhol',
    translations: SPANISH,
    speechLocale: SPANISH_LOCALE,
    excludedWords: AMBIGUOUS_DICTATION_WORDS,
  })
}
