import { ENGLISH } from '@/constants/dictionary/english'
import { WRONG_ENGLISH } from '@/constants/dictionary/wrongEnglish'
import { ENGLISH_LOCALE } from '@/constants/locale'
import { getForeignDictationQuestions } from './dictationService'
import { getTranslationQuestions } from './translationService'

export function getEnglishVocabularyQuestions() {
  return getTranslationQuestions({ language: 'inglês', translations: ENGLISH, wrongTranslations: WRONG_ENGLISH })
}

export function getEnglishDictationQuestions() {
  return getForeignDictationQuestions({ language: 'inglês', translations: ENGLISH, speechLocale: ENGLISH_LOCALE })
}
