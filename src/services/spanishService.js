import { SPANISH } from '@/constants/dictionary/spanish'
import { WRONG_SPANISH } from '@/constants/dictionary/wrongSpanish'
import { getTranslationQuestions } from './translationService'

export function getSpanishVocabularyQuestions() {
  return getTranslationQuestions({ language: 'espanhol', translations: SPANISH, wrongTranslations: WRONG_SPANISH })
}
