import { fakeRequest } from './fakeRequest'

export async function getQuestoesFaceis() {
  return await fakeRequest([
    { id: 1, enunciado: '2 + 2 = ?', alternativas: ['3', '4', '5', '6'], resposta: '4' },
    { id: 2, enunciado: '10 - 3 = ?', alternativas: ['6', '7', '8', '13'], resposta: '7' },
    { id: 3, enunciado: '5 + 6 = ?', alternativas: ['10', '11', '12', '56'], resposta: '11' },
  ])
}

export async function getQuestoesDificeis() {
  return await fakeRequest([
    { id: 1, enunciado: '12 × 12 = ?', alternativas: ['124', '144', '154', '1212'], resposta: '144' },
    { id: 2, enunciado: '√81 = ?', alternativas: ['8', '9', '18', '27'], resposta: '9' },
    { id: 3, enunciado: '15% de 200 = ?', alternativas: ['15', '20', '30', '35'], resposta: '30' },
  ])
}

export async function getTabuada(numero) {
  return await fakeRequest(
    Array.from({ length: 10 }, (_, i) => {
      const multiplicador = i + 1
      const resultado = numero * multiplicador
      return {
        id: multiplicador,
        enunciado: `${numero} × ${multiplicador} = ?`,
        alternativas: [resultado, resultado + numero, resultado - 1, resultado + 2].map(String),
        resposta: String(resultado),
      }
    }),
  )
}
