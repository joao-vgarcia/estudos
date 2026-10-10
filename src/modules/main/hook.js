import { useCallback } from 'react'
import { useAppStore } from '@/stores/appStore'

function entrarTelaCheia() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
}

function sairTelaCheia() {
  if (document.fullscreenElement) document.exitFullscreen()
}

function falar(texto) {
  const sintese = window.speechSynthesis
  if (!sintese || !texto) return
  sintese.cancel()
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'pt-BR'
  fala.rate = 0.8
  const voz = sintese.getVoices().find((v) => v.lang.replace('_', '-') === 'pt-BR')
  if (voz) fala.voice = voz
  sintese.speak(fala)
}

export function useMain() {
  const etapa = useAppStore((s) => s.etapa)
  const carregando = useAppStore((s) => s.carregando)
  const visao = useAppStore((s) => s.visao)
  const resultado = useAppStore((s) => s.resultado)
  const comecar = useAppStore((s) => s.comecar)
  const responder = useAppStore((s) => s.responder)
  const avancar = useAppStore((s) => s.avancar)

  const onComecar = useCallback(() => {
    entrarTelaCheia()
    comecar()
  }, [comecar])
  const onResponder = useCallback((resposta) => responder(resposta), [responder])
  const onOuvir = useCallback(() => falar(visao?.fala), [visao?.fala])
  const onAvancar = useCallback(() => {
    window.speechSynthesis?.cancel()
    avancar()
  }, [avancar])
  const onSair = useCallback(() => sairTelaCheia(), [])

  return { etapa, carregando, visao, resultado, onComecar, onResponder, onOuvir, onAvancar, onSair }
}
