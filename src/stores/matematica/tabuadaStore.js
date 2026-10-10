import { getTabuada } from '@/services/matematicaService'
import { createQuizStore } from '../createQuizStore'

// Sorteia uma tabuada entre 2 e 9 a cada carregamento.
const sortearNumero = () => Math.floor(Math.random() * 8) + 2

export const useTabuadaStore = createQuizStore('tabuada', () => getTabuada(sortearNumero()))
