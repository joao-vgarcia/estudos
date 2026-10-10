import { useCallback, useEffect } from 'react'
import { useMatematicaDificilStore } from '@/stores/matematica/matematicaDificilStore'
import { useMatematicaFacilStore } from '@/stores/matematica/matematicaFacilStore'

// Exemplo de módulo que usa duas stores ao mesmo tempo.
export function useProblemas() {
  const facilCarregando = useMatematicaFacilStore((s) => s.carregando)
  const facilVisao = useMatematicaFacilStore((s) => s.visao)
  const carregarFaceis = useMatematicaFacilStore((s) => s.carregarQuestoes)
  const selecionarFacil = useMatematicaFacilStore((s) => s.selecionarAlternativa)
  const avancarFacil = useMatematicaFacilStore((s) => s.avancar)

  const dificilCarregando = useMatematicaDificilStore((s) => s.carregando)
  const dificilVisao = useMatematicaDificilStore((s) => s.visao)
  const carregarDificeis = useMatematicaDificilStore((s) => s.carregarQuestoes)
  const selecionarDificil = useMatematicaDificilStore((s) => s.selecionarAlternativa)
  const avancarDificil = useMatematicaDificilStore((s) => s.avancar)

  useEffect(() => {
    carregarFaceis()
    carregarDificeis()
  }, [carregarFaceis, carregarDificeis])

  const onSelecionarFacil = useCallback((alternativa) => selecionarFacil(alternativa), [selecionarFacil])
  const onAvancarFacil = useCallback(() => avancarFacil(), [avancarFacil])
  const onSelecionarDificil = useCallback((alternativa) => selecionarDificil(alternativa), [selecionarDificil])
  const onAvancarDificil = useCallback(() => avancarDificil(), [avancarDificil])

  return {
    facil: { carregando: facilCarregando, visao: facilVisao, onSelecionar: onSelecionarFacil, onAvancar: onAvancarFacil },
    dificil: { carregando: dificilCarregando, visao: dificilVisao, onSelecionar: onSelecionarDificil, onAvancar: onAvancarDificil },
  }
}
