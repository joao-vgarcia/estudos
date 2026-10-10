import { ENGLISH } from '@/constants/dictionary/english'
import { WRONG_ENGLISH } from '@/constants/dictionary/wrongEnglish'
import { ENGLISH_LOCALE } from '@/constants/locale'
import { getForeignDictationQuestions } from './dictationService'
import {
  getListeningChoiceQuestions,
  getPictureChoiceQuestions,
  getPictureTranslationQuestions,
  getTranslationQuestions,
  getTranslationTrueFalseQuestions,
} from './translationService'

const ENGLISH_VOCABULARY = {
  language: 'inglês',
  translations: ENGLISH,
  wrongTranslations: WRONG_ENGLISH,
  speechLocale: ENGLISH_LOCALE,
}

export function getEnglishVocabularyQuestions() {
  return getTranslationQuestions(ENGLISH_VOCABULARY)
}

export function getEnglishPictureQuestions() {
  return getPictureTranslationQuestions(ENGLISH_VOCABULARY)
}

export function getEnglishPictureChoiceQuestions() {
  return getPictureChoiceQuestions(ENGLISH_VOCABULARY)
}

export function getEnglishListeningQuestions() {
  return getListeningChoiceQuestions(ENGLISH_VOCABULARY)
}

export function getEnglishTrueFalseQuestions() {
  return getTranslationTrueFalseQuestions(ENGLISH_VOCABULARY)
}

export function getEnglishDictationQuestions() {
  return getForeignDictationQuestions(ENGLISH_VOCABULARY)
}
