import { fakeRequest } from './fakeRequest'

export async function getQuestoesVocabulario() {
  return await fakeRequest([
    { id: 1, enunciado: 'Como se diz "cachorro" em inglês?', alternativas: ['Cat', 'Dog', 'Bird', 'Fish'], resposta: 'Dog' },
    { id: 2, enunciado: 'O que significa "apple"?', alternativas: ['Banana', 'Uva', 'Maçã', 'Pera'], resposta: 'Maçã' },
    { id: 3, enunciado: 'Como se diz "azul" em inglês?', alternativas: ['Red', 'Green', 'Yellow', 'Blue'], resposta: 'Blue' },
  ])
}
