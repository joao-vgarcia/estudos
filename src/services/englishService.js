import { fakeRequest } from './fakeRequest'

export function getVocabularyQuestions() {
  return fakeRequest([
    { id: 1, prompt: 'Como se diz "cachorro" em inglês?', options: ['Cat', 'Dog', 'Bird', 'Fish'], correctAnswer: 'Dog' },
    { id: 2, prompt: 'O que significa "apple"?', options: ['Banana', 'Uva', 'Maçã', 'Pera'], correctAnswer: 'Maçã' },
    { id: 3, prompt: 'Como se diz "azul" em inglês?', options: ['Red', 'Green', 'Yellow', 'Blue'], correctAnswer: 'Blue' },
  ])
}
