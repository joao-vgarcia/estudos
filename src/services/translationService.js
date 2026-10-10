import { EMOJIS } from '@/constants/dictionary/emojis'
import { WORDS } from '@/constants/dictionary/words'
import { DIFFICULTIES, QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { randomItem, randomItems, shuffle } from '@/utils/random'
import { fakeRequest } from './fakeRequest'
import { getTrueFalseQuestions } from './trueFalseService'

const PICTURE_WORDS = Object.keys(EMOJIS)
const PICTURE_DISTRACTORS_COUNT = 3

function invertTranslations(translations) {
  return Object.fromEntries(Object.entries(translations).map(([word, translation]) => [translation, word]))
}

function getPictureOptions(word, { translations, wrongTranslations }) {
  const wordsByTranslation = invertTranslations(translations)
  const curatedEmojis = wrongTranslations[word].map((translation) => EMOJIS[wordsByTranslation[translation]])
  const distractors = [...new Set([...curatedEmojis, ...shuffle(Object.values(EMOJIS))])]
    .filter((emoji) => emoji && emoji !== EMOJIS[word])
    .slice(0, PICTURE_DISTRACTORS_COUNT)
  return [EMOJIS[word], ...distractors]
}

export function getTranslationQuestions({ language, translations, wrongTranslations }) {
  return fakeRequest(
    randomItems(WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: `Como se diz "${word}" em ${language}?`,
      options: [translations[word], ...wrongTranslations[word]],
      correctAnswer: translations[word],
    })),
  )
}

export function getPictureTranslationQuestions({ language, translations, wrongTranslations }) {
  return fakeRequest(
    randomItems(PICTURE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: `Como se escreve o nome desta figura em ${language}?`,
      image: EMOJIS[word],
      options: [translations[word], ...wrongTranslations[word]],
      correctAnswer: translations[word],
    })),
  )
}

export function getPictureChoiceQuestions(vocabulary) {
  return fakeRequest(
    randomItems(PICTURE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.IMAGE_CHOICE,
      prompt: 'Qual figura representa a palavra:',
      word: vocabulary.translations[word],
      options: getPictureOptions(word, vocabulary),
      correctAnswer: EMOJIS[word],
    })),
  )
}

export function getListeningChoiceQuestions(vocabulary) {
  return fakeRequest(
    randomItems(PICTURE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.IMAGE_CHOICE,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: `Ouça a palavra em ${vocabulary.language} e escolha a figura`,
      speechText: vocabulary.translations[word],
      speechLocale: vocabulary.speechLocale,
      options: getPictureOptions(word, vocabulary),
      correctAnswer: EMOJIS[word],
    })),
  )
}

export function getTranslationTrueFalseQuestions({ language, translations, wrongTranslations }) {
  return getTrueFalseQuestions({
    items: randomItems(WORDS, QUESTIONS_PER_MODULE),
    buildStatement: (word, isTrue) => ({
      prompt: `Em ${language}, "${word}" se diz "${isTrue ? translations[word] : randomItem(wrongTranslations[word])}".`,
    }),
  })
}
