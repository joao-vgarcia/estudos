import { EMOJIS } from '@/constants/dictionary/emojis'
import { PLURALS } from '@/constants/dictionary/plurals'
import { SENTENCES } from '@/constants/dictionary/sentences'
import { SYNONYMS } from '@/constants/dictionary/synonyms'
import { WORDS } from '@/constants/dictionary/words'
import { WRONG_PLURALS } from '@/constants/dictionary/wrongPlurals'
import { WRONG_SPELLINGS } from '@/constants/dictionary/wrongSpellings'
import { WRONG_SYNONYMS } from '@/constants/dictionary/wrongSynonyms'
import { LOCALE } from '@/constants/locale'
import { DIFFICULTIES, QUESTIONS_PER_MODULE } from '@/constants/quiz'
import { randomItem, randomItems } from '@/utils/random'
import { getDictationQuestions } from './dictationService'
import { fakeRequest } from './fakeRequest'
import { getTrueFalseQuestions } from './trueFalseService'

const DICTATION_ENTRIES = SENTENCES.map((sentence) => ({ word: sentence }))

const PICTURE_WORDS = Object.keys(EMOJIS)

const SYNONYM_WORDS = Object.keys(SYNONYMS)

const TRUE_FALSE_STATEMENTS = [
  (isTrue) => {
    const word = randomItem(WORDS)
    return `O plural de "${word}" é "${isTrue ? PLURALS[word] : randomItem(WRONG_PLURALS[word])}".`
  },
  (isTrue) => {
    const word = randomItem(WORDS)
    return `A palavra "${isTrue ? word : randomItem(WRONG_SPELLINGS[word])}" está escrita corretamente.`
  },
  (isTrue) => {
    const word = randomItem(SYNONYM_WORDS)
    return `"${isTrue ? SYNONYMS[word] : randomItem(WRONG_SYNONYMS[word])}" tem o mesmo significado que "${word}".`
  },
]

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

export function getPictureSpellingQuestions() {
  return fakeRequest(
    randomItems(PICTURE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: 'Como se escreve o nome desta figura?',
      image: EMOJIS[word],
      options: [word, ...WRONG_SPELLINGS[word]],
      correctAnswer: word,
    })),
  )
}

export function getSynonymQuestions() {
  return fakeRequest(
    randomItems(SYNONYM_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: 'Qual palavra tem o mesmo significado que:',
      word,
      options: [SYNONYMS[word], ...WRONG_SYNONYMS[word]],
      correctAnswer: SYNONYMS[word],
    })),
  )
}

export function getPortugueseTrueFalseQuestions() {
  return getTrueFalseQuestions({
    items: Array.from({ length: QUESTIONS_PER_MODULE }, () => randomItem(TRUE_FALSE_STATEMENTS)),
    buildStatement: (buildPrompt, isTrue) => ({ prompt: buildPrompt(isTrue) }),
    difficulty: DIFFICULTIES.MEDIUM,
  })
}

export function getPortugueseDictationQuestions() {
  return getDictationQuestions({
    entries: DICTATION_ENTRIES,
    prompt: 'Ditado: ouça e escreva a frase',
    speechLocale: LOCALE,
    dictationUnit: 'frase',
  })
}
