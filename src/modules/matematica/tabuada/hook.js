import { useCallback, useEffect } from 'react'
import { useTabuadaStore } from '@/stores/matematica/tabuadaStore'

export function useTabuada() {
  const carregando = useTabuadaStore((s) => s.carregando)
  const visao = useTabuadaStore((s) => s.visao)
  const carregarQuestoes = useTabuadaStore((s) => s.carregarQuestoes)
  const selecionarAlternativa = useTabuadaStore((s) => s.selecionarAlternativa)
  const avancar = useTabuadaStore((s) => s.avancar)

  useEffect(() => {
    carregarQuestoes()
  }, [carregarQuestoes])

  const onSelecionar = useCallback((alternativa) => selecionarAlternativa(alternativa), [selecionarAlternativa])
  const onAvancar = useCallback(() => avancar(), [avancar])

  return { carregando, visao, onSelecionar, onAvancar }
}
