import { formatDuration } from '@/utils/text'

export const LEISURE_TICK_MS = 250

export const QUIZ_AWAY_LIMIT_MS = 30 * 1000

export const AWAY_PENALTY_FACTOR = 1

export const QUIZ_AWAY_PENALTY_FACTOR = 2

export const QUIZ_AWAY_LIMIT_MESSAGE = `Se ficar fora por mais de ${formatDuration(QUIZ_AWAY_LIMIT_MS)}, o questionário recomeça do início.`

export const LEISURE_OVER_ALARM = {
  title: 'O tempo de lazer acabou!',
  body: 'Hora de voltar para os estudos.',
}

export const QUIZ_AWAY_ALARM = {
  title: 'Volte para o questionário!',
  body: QUIZ_AWAY_LIMIT_MESSAGE,
}
