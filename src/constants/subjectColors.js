import { DIFFICULTIES, SUBJECTS } from '@/constants/quiz'

const SUBJECT_BACKGROUNDS = {
  [SUBJECTS.MATH]: {
    [DIFFICULTIES.EASY]: 'bg-math-easy',
    [DIFFICULTIES.MEDIUM]: 'bg-math-medium',
    [DIFFICULTIES.HARD]: 'bg-math-hard',
  },
  [SUBJECTS.PORTUGUESE]: {
    [DIFFICULTIES.EASY]: 'bg-portuguese-easy',
    [DIFFICULTIES.MEDIUM]: 'bg-portuguese-medium',
    [DIFFICULTIES.HARD]: 'bg-portuguese-hard',
  },
  [SUBJECTS.ENGLISH]: {
    [DIFFICULTIES.EASY]: 'bg-english-easy',
    [DIFFICULTIES.MEDIUM]: 'bg-english-medium',
    [DIFFICULTIES.HARD]: 'bg-english-hard',
  },
  [SUBJECTS.SPANISH]: {
    [DIFFICULTIES.EASY]: 'bg-spanish-easy',
    [DIFFICULTIES.MEDIUM]: 'bg-spanish-medium',
    [DIFFICULTIES.HARD]: 'bg-spanish-hard',
  },
}

const NEUTRAL_BACKGROUND = 'bg-black/10'

export function getSubjectBackground(subjectId, difficulty) {
  return SUBJECT_BACKGROUNDS[subjectId]?.[difficulty] ?? NEUTRAL_BACKGROUND
}
