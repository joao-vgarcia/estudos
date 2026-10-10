import { getQuestoesVocabulario } from '@/services/inglesService'
import { createQuizStore } from '../createQuizStore'

export const useVocabularioStore = createQuizStore('vocabulario', getQuestoesVocabulario)
