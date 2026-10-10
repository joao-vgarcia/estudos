import { useCallback, useEffect } from 'react'
import { useVocabularioStore } from '@/stores/ingles/vocabularioStore'

export function useVocabulario() {
  const carregando = useVocabularioStore((s) => s.carregando)
  const visao = useVocabularioStore((s) => s.visao)
  const carregarQuestoes = useVocabularioStore((s) => s.carregarQuestoes)
  const selecionarAlternativa = useVocabularioStore((s) => s.selecionarAlternativa)
  const avancar = useVocabularioStore((s) => s.avancar)

  useEffect(() => {
    carregarQuestoes()
  }, [carregarQuestoes])

  const onSelecionar = useCallback((alternativa) => selecionarAlternativa(alternativa), [selecionarAlternativa])
  const onAvancar = useCallback(() => avancar(), [avancar])

  return { carregando, visao, onSelecionar, onAvancar }
}
