import { getQuestoesGramatica } from '@/services/portuguesService'
import { createQuizStore } from '../createQuizStore'

export const useGramaticaStore = createQuizStore('gramatica', getQuestoesGramatica)
