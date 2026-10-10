import { ENGLISH } from '@/constants/dictionary/english'
import { WRONG_ENGLISH } from '@/constants/dictionary/wrongEnglish'
import { getTranslationQuestions } from './translationService'

export function getEnglishVocabularyQuestions() {
  return getTranslationQuestions({ language: 'inglês', translations: ENGLISH, wrongTranslations: WRONG_ENGLISH })
}
