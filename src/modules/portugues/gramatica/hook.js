import { useCallback, useEffect } from 'react'
import { useGramaticaStore } from '@/stores/portugues/gramaticaStore'

export function useGramatica() {
  const carregando = useGramaticaStore((s) => s.carregando)
  const visao = useGramaticaStore((s) => s.visao)
  const carregarQuestoes = useGramaticaStore((s) => s.carregarQuestoes)
  const selecionarAlternativa = useGramaticaStore((s) => s.selecionarAlternativa)
  const avancar = useGramaticaStore((s) => s.avancar)

  useEffect(() => {
    carregarQuestoes()
  }, [carregarQuestoes])

  const onSelecionar = useCallback((alternativa) => selecionarAlternativa(alternativa), [selecionarAlternativa])
  const onAvancar = useCallback(() => avancar(), [avancar])

  return { carregando, visao, onSelecionar, onAvancar }
}
