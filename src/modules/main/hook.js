import { useCallback } from 'react'
import { useAppStore } from '@/stores/appStore'

export function useMain() {
  const moduloAtivo = useAppStore((s) => s.moduloAtivo)
  const menu = useAppStore((s) => s.menu)
  const selecionarModulo = useAppStore((s) => s.selecionarModulo)

  const onSelecionarModulo = useCallback((id) => selecionarModulo(id), [selecionarModulo])

  return { moduloAtivo, menu, onSelecionarModulo }
}
