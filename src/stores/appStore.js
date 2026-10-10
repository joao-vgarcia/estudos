import { create } from 'zustand'
import { getQuestoesVocabulario } from '@/services/inglesService'
import { getQuestoesFaceis, getTabuada } from '@/services/matematicaService'
import { getDitado, getQuestoesGramatica } from '@/services/portuguesService'

const sortearNumero = () => Math.floor(Math.random() * 8) + 2

const normalizar = (texto) => texto?.trim().toLocaleLowerCase('pt-BR')

const materias = [
  { titulo: 'Matemática', buscadores: [() => getTabuada(sortearNumero()), getQuestoesFaceis] },
  { titulo: 'Português', buscadores: [getQuestoesGramatica, getDitado] },
  { titulo: 'Inglês', buscadores: [getQuestoesVocabulario] },
]

const estadoInicial = {
  etapa: 'inicio',
  carregando: false,
  questoes: [],
  respostas: [],
  indiceAtual: 0,
}

function embaralhar(lista) {
  return [...lista].sort(() => Math.random() - 0.5)
}

async function buscarQuestoes() {
  const porMateria = await Promise.all(
    materias.map(async ({ titulo, buscadores }) => {
      const listas = await Promise.all(buscadores.map((buscar) => buscar()))
      return listas.flat().map((q) =>
        q.tipo
          ? { ...q, materia: titulo }
          : { ...q, materia: titulo, tipo: 'alternativas', alternativas: embaralhar(q.alternativas) },
      )
    }),
  )
  return porMateria.flat()
}

function montarVisao({ etapa, questoes, respostas, indiceAtual }) {
  const questao = questoes[indiceAtual]
  if (etapa !== 'questoes' || !questao) return null

  const selecionada = respostas[indiceAtual]
  const daMateria = questoes.filter((q) => q.materia === questao.materia)
  const ultima = indiceAtual + 1 === questoes.length

  return {
    titulo: questao.materia,
    enunciado: questao.enunciado,
    tipo: questao.tipo,
    ...(questao.tipo === 'alternativas'
      ? {
          alternativas: questao.alternativas.map((alternativa) => ({
            label: alternativa,
            status: alternativa === selecionada ? 'selected' : 'idle',
          })),
        }
      : { resposta: selecionada ?? '' }),
    ...(questao.tipo === 'ditado' && { fala: questao.resposta }),
    placar: `Questão ${daMateria.indexOf(questao) + 1} de ${daMateria.length}`,
    podeAvancar: selecionada != null,
    textoBotao: ultima ? 'Ver resultado' : 'Próxima',
  }
}

function montarResultado({ etapa, questoes, respostas }) {
  if (etapa !== 'resultado') return null

  const corrigidas = questoes.map((questao, i) => ({
    materia: questao.materia,
    enunciado: questao.enunciado,
    respostaDada: respostas[i],
    respostaCerta: questao.resposta,
    acertou: normalizar(respostas[i]) === normalizar(questao.resposta),
  }))
  const contarAcertos = (lista) => lista.filter((q) => q.acertou).length

  return {
    placar: `Você acertou ${contarAcertos(corrigidas)} de ${corrigidas.length}.`,
    secoes: materias.map(({ titulo }) => {
      const itens = corrigidas.filter((q) => q.materia === titulo)
      return { titulo, placar: `${contarAcertos(itens)} de ${itens.length}`, itens }
    }),
  }
}

export const useAppStore = create((set, get) => {
  const atualizar = (parcial) => {
    const estado = { ...get(), ...parcial }
    set({ ...parcial, visao: montarVisao(estado), resultado: montarResultado(estado) })
  }

  return {
    ...estadoInicial,
    visao: null,
    resultado: null,

    comecar: async () => {
      console.log('estou na store app: comecar')
      atualizar({ ...estadoInicial, etapa: 'questoes', carregando: true })
      const questoes = await buscarQuestoes()
      atualizar({ questoes, respostas: questoes.map(() => null), carregando: false })
    },

    responder: (resposta) => {
      console.log('estou na store app: responder')
      const { respostas, indiceAtual } = get()
      atualizar({ respostas: respostas.with(indiceAtual, resposta === '' ? null : resposta) })
    },

    avancar: () => {
      console.log('estou na store app: avancar')
      const { questoes, respostas, indiceAtual } = get()
      if (respostas[indiceAtual] == null) return
      if (indiceAtual + 1 >= questoes.length) {
        atualizar({ etapa: 'resultado' })
        return
      }
      atualizar({ indiceAtual: indiceAtual + 1 })
    },
  }
})
