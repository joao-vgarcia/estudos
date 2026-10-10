import { fakeRequest } from './fakeRequest'

export async function getQuestoesGramatica() {
  return await fakeRequest([
    { id: 1, enunciado: 'Qual palavra é um substantivo?', alternativas: ['Correr', 'Casa', 'Bonito', 'Rapidamente'], resposta: 'Casa' },
    { id: 2, enunciado: 'Qual é o plural de "pão"?', alternativas: ['Pãos', 'Pães', 'Pãoes', 'Pões'], resposta: 'Pães' },
    { id: 3, enunciado: 'Qual palavra está escrita corretamente?', alternativas: ['Excessão', 'Exceção', 'Esceção', 'Exseção'], resposta: 'Exceção' },
  ])
}

export async function getDitado() {
  return await fakeRequest(
    ['gato', 'avião', 'batata', 'futebol'].map((palavra, i) => ({
      id: i + 1,
      tipo: 'ditado',
      enunciado: 'Ditado: ouça e escreva a palavra',
      resposta: palavra,
    })),
  )
}
