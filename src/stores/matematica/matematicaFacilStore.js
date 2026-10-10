import { getQuestoesFaceis } from '@/services/matematicaService'
import { createQuizStore } from '../createQuizStore'

export const useMatematicaFacilStore = createQuizStore('matematicaFacil', getQuestoesFaceis)
