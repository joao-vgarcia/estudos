import { DIFFICULTIES } from '@/constants/quiz'
import { MS_PER_MINUTE } from '@/constants/time'

export const QUESTION_TIME_LIMITS_MS = {
  [DIFFICULTIES.EASY]: 5 * MS_PER_MINUTE,
  [DIFFICULTIES.MEDIUM]: 10 * MS_PER_MINUTE,
  [DIFFICULTIES.HARD]: 15 * MS_PER_MINUTE,
}

export const BONUS_TIME_LIMIT_FACTOR = 0.5

export const QUESTION_TIME_STAGES = {
  NORMAL: 'normal',
  URGENT: 'urgent',
  CRITICAL: 'critical',
}

export const QUESTION_TIME_URGENT_RATE = 0.2

export const QUESTION_TIME_CRITICAL_RATE = 0.1
