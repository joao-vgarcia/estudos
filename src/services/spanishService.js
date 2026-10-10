import { SPANISH } from '@/constants/dictionary/spanish'
import { WRONG_SPANISH } from '@/constants/dictionary/wrongSpanish'
import { SPANISH_LOCALE } from '@/constants/locale'
import { getForeignDictationQuestions } from './dictationService'
import {
  getListeningChoiceQuestions,
  getPictureChoiceQuestions,
  getPictureTranslationQuestions,
  getTranslationQuestions,
  getTranslationTrueFalseQuestions,
} from './translationService'

const AMBIGUOUS_DICTATION_WORDS = ['arcoíris']

const SPANISH_VOCABULARY = {
  language: 'espanhol',
  translations: SPANISH,
  wrongTranslations: WRONG_SPANISH,
  speechLocale: SPANISH_LOCALE,
}

export function getSpanishVocabularyQuestions() {
  return getTranslationQuestions(SPANISH_VOCABULARY)
}

export function getSpanishPictureQuestions() {
  return getPictureTranslationQuestions(SPANISH_VOCABULARY)
}

export function getSpanishPictureChoiceQuestions() {
  return getPictureChoiceQuestions(SPANISH_VOCABULARY)
}

export function getSpanishListeningQuestions() {
  return getListeningChoiceQuestions(SPANISH_VOCABULARY)
}

export function getSpanishTrueFalseQuestions() {
  return getTranslationTrueFalseQuestions(SPANISH_VOCABULARY)
}

export function getSpanishDictationQuestions() {
  return getForeignDictationQuestions({ ...SPANISH_VOCABULARY, excludedWords: AMBIGUOUS_DICTATION_WORDS })
}
