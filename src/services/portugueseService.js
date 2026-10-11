import { ANTONYMS } from '@/constants/dictionary/antonyms'
import { DIMINUTIVES } from '@/constants/dictionary/diminutives'
import { EMOJIS } from '@/constants/dictionary/emojis'
import { FEMININES } from '@/constants/dictionary/feminines'
import { FILL_IN_SENTENCES } from '@/constants/dictionary/fillInSentences'
import { PLURALS } from '@/constants/dictionary/plurals'
import { PUNCTUATION_SENTENCES } from '@/constants/dictionary/punctuationSentences'
import { READINGS } from '@/constants/dictionary/readings'
import { SENTENCES } from '@/constants/dictionary/sentences'
import { SYLLABLES } from '@/constants/dictionary/syllables'
import { SYNONYMS } from '@/constants/dictionary/synonyms'
import { WORDS } from '@/constants/dictionary/words'
import { WRONG_ANTONYMS } from '@/constants/dictionary/wrongAntonyms'
import { WRONG_DIMINUTIVES } from '@/constants/dictionary/wrongDiminutives'
import { WRONG_FEMININES } from '@/constants/dictionary/wrongFeminines'
import { WRONG_PLURALS } from '@/constants/dictionary/wrongPlurals'
import { WRONG_SPELLINGS } from '@/constants/dictionary/wrongSpellings'
import { WRONG_SYNONYMS } from '@/constants/dictionary/wrongSynonyms'
import { LOCALE } from '@/constants/locale'
import { DIFFICULTIES, QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { randomInt, randomItem, randomItems } from '@/utils/random'
import { formatCount, normalizeText, removeAccents } from '@/utils/text'
import { getDictationQuestions } from './dictationService'
import { fakeRequest } from './fakeRequest'
import { getTrueFalseQuestions } from './trueFalseService'

const DICTATION_ENTRIES = SENTENCES.map((sentence) => ({ word: sentence }))

const PICTURE_WORDS = Object.keys(EMOJIS)

const SYNONYM_WORDS = Object.keys(SYNONYMS)

const ANTONYM_WORDS = Object.keys(ANTONYMS)

const FEMININE_WORDS = Object.keys(FEMININES)

const DIMINUTIVE_WORDS = Object.keys(DIMINUTIVES)

const SYLLABLE_WORDS = Object.keys(SYLLABLES)

const SIMPLE_WORDS = WORDS.filter((word) => !word.includes('-'))

const AMBIGUOUS_PLURAL_WORDS = ['vulcão']

const WRITTEN_PLURAL_WORDS = SIMPLE_WORDS.filter((word) => !AMBIGUOUS_PLURAL_WORDS.includes(word))

const WRITTEN_PICTURE_WORDS = PICTURE_WORDS.filter((word) => !word.includes('-'))

const READING_QUESTIONS = READINGS.flatMap(({ text, questions }) => questions.map((question) => ({ text, ...question })))

const VOWEL_PATTERN = /[aeiouáéíóúâêôãõà]/i

const SYLLABLE_COUNT_OPTIONS = 4

const SPLIT_WRONG_OPTIONS = 3

const ALPHABETICAL_OPTIONS = 4

const BLANK = '___'

const PUNCTUATION_MARKS = {
  '.': 'Ponto final ( . )',
  '?': 'Ponto de interrogação ( ? )',
  '!': 'Ponto de exclamação ( ! )',
}

function countSyllables(word) {
  return SYLLABLES[word].split('-').length
}

function hasVowel(syllable) {
  return VOWEL_PATTERN.test(syllable)
}

function getWrongSplits(syllables) {
  const variants = syllables.slice(0, -1).flatMap((syllable, index) => {
    const next = syllables[index + 1]
    const replace = (...parts) => [...syllables.slice(0, index), ...parts, ...syllables.slice(index + 2)]
    return [
      replace(syllable.slice(0, -1), syllable.slice(-1) + next),
      replace(syllable + next[0], next.slice(1)),
      replace(syllable + next),
    ]
  })
  return [...new Set(variants.filter((parts) => parts.every(hasVowel)).map((parts) => parts.join('-')))]
}

const SPLIT_WORDS = SYLLABLE_WORDS.filter(
  (word) => getWrongSplits(SYLLABLES[word].split('-')).length >= SPLIT_WRONG_OPTIONS,
)

function toBaseForm(word) {
  return removeAccents(normalizeText(word))
}

function compareAlphabetically(first, second) {
  return toBaseForm(first).localeCompare(toBaseForm(second), LOCALE)
}

function pickAlphabeticalOptions() {
  let options
  do {
    options = randomItems(SIMPLE_WORDS, ALPHABETICAL_OPTIONS)
  } while (new Set(options.map(toBaseForm)).size < ALPHABETICAL_OPTIONS)
  return options
}

function getSyllableCountOptions(count) {
  const start = Math.max(1, count - randomInt(0, SYLLABLE_COUNT_OPTIONS - 1))
  return Array.from({ length: SYLLABLE_COUNT_OPTIONS }, (_, index) => String(start + index))
}

function getWrongSyllableCount(count) {
  return count === 1 || randomInt(0, 1) === 1 ? count + 1 : count - 1
}

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
  (isTrue) => {
    const word = randomItem(ANTONYM_WORDS)
    return `"${isTrue ? ANTONYMS[word] : randomItem(WRONG_ANTONYMS[word])}" é o contrário de "${word}".`
  },
  (isTrue) => {
    const word = randomItem(FEMININE_WORDS)
    return `O feminino de "${word}" é "${isTrue ? FEMININES[word] : randomItem(WRONG_FEMININES[word])}".`
  },
  (isTrue) => {
    const word = randomItem(DIMINUTIVE_WORDS)
    return `O diminutivo de "${word}" é "${isTrue ? DIMINUTIVES[word] : randomItem(WRONG_DIMINUTIVES[word])}".`
  },
  (isTrue) => {
    const word = randomItem(SYLLABLE_WORDS)
    const count = countSyllables(word)
    return `A palavra "${word}" tem ${formatCount(isTrue ? count : getWrongSyllableCount(count), 'sílaba', 'sílabas')}.`
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

export function getAntonymQuestions() {
  return fakeRequest(
    randomItems(ANTONYM_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: 'Qual palavra é o contrário de:',
      word,
      options: [ANTONYMS[word], ...WRONG_ANTONYMS[word]],
      correctAnswer: ANTONYMS[word],
    })),
  )
}

export function getSyllableCountQuestions() {
  return fakeRequest(
    randomItems(SYLLABLE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      prompt: 'Quantas sílabas tem a palavra:',
      word,
      options: getSyllableCountOptions(countSyllables(word)),
      correctAnswer: String(countSyllables(word)),
    })),
  )
}

export function getSyllableSplitQuestions() {
  return fakeRequest(
    randomItems(SPLIT_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: 'Qual é a separação de sílabas correta?',
      word,
      options: [SYLLABLES[word], ...randomItems(getWrongSplits(SYLLABLES[word].split('-')), SPLIT_WRONG_OPTIONS)],
      correctAnswer: SYLLABLES[word],
    })),
  )
}

export function getFeminineQuestions() {
  return fakeRequest(
    randomItems(FEMININE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: 'Qual é o feminino de:',
      word,
      options: [FEMININES[word], ...WRONG_FEMININES[word]],
      correctAnswer: FEMININES[word],
    })),
  )
}

export function getDiminutiveQuestions() {
  return fakeRequest(
    randomItems(DIMINUTIVE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: 'Qual é o diminutivo de:',
      word,
      options: [DIMINUTIVES[word], ...WRONG_DIMINUTIVES[word]],
      correctAnswer: DIMINUTIVES[word],
    })),
  )
}

export function getAlphabeticalOrderQuestions() {
  return fakeRequest(
    Array.from({ length: QUESTIONS_PER_MODULE }, (_, index) => {
      const options = pickAlphabeticalOptions()
      return {
        id: index + 1,
        difficulty: DIFFICULTIES.MEDIUM,
        prompt: 'Qual destas palavras vem primeiro na ordem alfabética?',
        options,
        correctAnswer: options.toSorted(compareAlphabetically)[0],
      }
    }),
  )
}

export function getFillInTheBlankQuestions() {
  return fakeRequest(
    randomItems(FILL_IN_SENTENCES, QUESTIONS_PER_MODULE).map(({ sentence, answer, wrongAnswers }, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: 'Qual palavra completa a frase?',
      passage: sentence,
      options: [answer, ...wrongAnswers],
      correctAnswer: answer,
    })),
  )
}

export function getPunctuationQuestions() {
  return fakeRequest(
    randomItems(PUNCTUATION_SENTENCES, QUESTIONS_PER_MODULE).map(({ sentence, mark }, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.MEDIUM,
      prompt: 'Qual sinal de pontuação completa a frase?',
      passage: `${sentence} ${BLANK}`,
      options: Object.values(PUNCTUATION_MARKS),
      correctAnswer: PUNCTUATION_MARKS[mark],
    })),
  )
}

export function getPortugueseTrueFalseQuestions() {
  return getTrueFalseQuestions({
    items: Array.from({ length: QUESTIONS_PER_MODULE }, () => randomItem(TRUE_FALSE_STATEMENTS)),
    buildStatement: (buildPrompt, isTrue) => ({ prompt: buildPrompt(isTrue) }),
  })
}

export function getReadingQuestions() {
  return fakeRequest(
    randomItems(READING_QUESTIONS, QUESTIONS_PER_MODULE).map(({ text, question, answer, wrongAnswers }, index) => ({
      id: index + 1,
      difficulty: DIFFICULTIES.HARD,
      prompt: question,
      passage: text,
      options: [answer, ...wrongAnswers],
      correctAnswer: answer,
    })),
  )
}

export function getWrittenPluralQuestions() {
  return fakeRequest(
    randomItems(WRITTEN_PLURAL_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.TEXT,
      difficulty: DIFFICULTIES.HARD,
      prompt: 'Escreva o plural de:',
      word,
      correctAnswer: PLURALS[word],
    })),
  )
}

export function getWrittenPictureNameQuestions() {
  return fakeRequest(
    randomItems(WRITTEN_PICTURE_WORDS, QUESTIONS_PER_MODULE).map((word, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.TEXT,
      difficulty: DIFFICULTIES.HARD,
      prompt: 'Escreva o nome desta figura:',
      hint: `Dica: começa com "${word[0]}" e tem ${formatCount([...word].length, 'letra', 'letras')}.`,
      image: EMOJIS[word],
      correctAnswer: word,
    })),
  )
}

export function getPortugueseDictationQuestions() {
  return getDictationQuestions({
    entries: DICTATION_ENTRIES,
    prompt: 'Ditado: ouça e escreva a frase',
    speechLocale: LOCALE,
    dictationUnit: 'frase',
  })
}
