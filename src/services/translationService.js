import { WORDS } from '@/constants/dictionary/words'
import { QUESTIONS_PER_MODULE } from '@/constants/quiz'
import { randomItems } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

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
