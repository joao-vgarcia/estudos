import { create } from 'zustand'

// Base compartilhada pelas stores de exercício: toda a regra do quiz mora aqui.
// Os módulos só leem `carregando` e `visao` e disparam as ações.

const estadoInicial = {
  questoes: [],
  indiceAtual: 0,
  selecionada: null,
  acertos: 0,
  carregando: false,
  finalizado: false,
}

function embaralhar(lista) {
  return [...lista].sort(() => Math.random() - 0.5)
}

function statusDaAlternativa(questao, selecionada, alternativa) {
  if (selecionada === null) return 'idle'
  if (alternativa === questao.resposta) return 'correct'
  if (alternativa === selecionada) return 'wrong'
  return 'dimmed'
}

// Monta tudo o que os visuais precisam, já pronto para renderizar.
function montarVisao({ questoes, indiceAtual, selecionada, acertos, finalizado }) {
  const total = questoes.length
  const questao = questoes[indiceAtual]

  if (finalizado) {
    return {
      enunciado: `Fim! Você acertou ${acertos} de ${total}.`,
      alternativas: [],
      placar: '',
      podeAvancar: true,
      textoBotao: 'Recomeçar',
    }
  }

  if (!questao) {
    return { enunciado: '', alternativas: [], placar: '', podeAvancar: false, textoBotao: 'Próxima' }
  }

  return {
    enunciado: questao.enunciado,
    alternativas: questao.alternativas.map((alternativa) => ({
      label: alternativa,
      status: statusDaAlternativa(questao, selecionada, alternativa),
    })),
    placar: `Questão ${indiceAtual + 1} de ${total} · ${acertos} acerto(s)`,
    podeAvancar: selecionada !== null,
    textoBotao: indiceAtual + 1 === total ? 'Ver resultado' : 'Próxima',
  }
}

export function createQuizStore(nome, buscarQuestoes) {
  return create((set, get) => {
    const atualizar = (parcial) => {
      set({ ...parcial, visao: montarVisao({ ...get(), ...parcial }) })
    }

    return {
      ...estadoInicial,
      visao: montarVisao(estadoInicial),

      carregarQuestoes: async () => {
        console.log(`estou na store ${nome}: carregarQuestoes`)
        atualizar({ ...estadoInicial, carregando: true })
        const questoes = await buscarQuestoes()
        atualizar({
          questoes: questoes.map((q) => ({ ...q, alternativas: embaralhar(q.alternativas) })),
          carregando: false,
        })
      },

      selecionarAlternativa: (alternativa) => {
        console.log(`estou na store ${nome}: selecionarAlternativa`)
        const { questoes, indiceAtual, selecionada, acertos } = get()
        if (selecionada !== null) return
        const acertou = questoes[indiceAtual]?.resposta === alternativa
        atualizar({ selecionada: alternativa, acertos: acertou ? acertos + 1 : acertos })
      },

      avancar: () => {
        console.log(`estou na store ${nome}: avancar`)
        const { indiceAtual, questoes, finalizado } = get()
        if (finalizado) {
          get().carregarQuestoes()
          return
        }
        if (indiceAtual + 1 >= questoes.length) {
          atualizar({ finalizado: true })
          return
        }
        atualizar({ indiceAtual: indiceAtual + 1, selecionada: null })
      },
    }
  })
}
