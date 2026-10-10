import { getQuestoesDificeis } from '@/services/matematicaService'
import { createQuizStore } from '../createQuizStore'

export const useMatematicaDificilStore = createQuizStore('matematicaDificil', getQuestoesDificeis)
