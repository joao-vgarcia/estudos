import { create } from 'zustand'

// Estado do módulo principal: qual módulo secundário está ativo.
const modulos = [
  { id: 'portugues-gramatica', label: 'Português · Gramática', icon: 'book' },
  { id: 'matematica-tabuada', label: 'Matemática · Tabuada', icon: 'calculator' },
  { id: 'matematica-problemas', label: 'Matemática · Problemas', icon: 'sigma' },
  { id: 'ingles-vocabulario', label: 'Inglês · Vocabulário', icon: 'languages' },
]

const montarMenu = (moduloAtivo) => modulos.map((m) => ({ ...m, ativo: m.id === moduloAtivo }))

export const useAppStore = create((set) => ({
  moduloAtivo: modulos[0].id,
  menu: montarMenu(modulos[0].id),

  selecionarModulo: (id) => {
    console.log('estou na store app: selecionarModulo')
    set({ moduloAtivo: id, menu: montarMenu(id) })
  },
}))
