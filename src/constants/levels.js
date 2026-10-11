import { DIFFICULTIES, SUBJECTS } from '@/constants/quiz'

const BASIC_MATH = { subjectId: SUBJECTS.MATH, maxResult: 30 }

const ADVANCED_MATH = { subjectId: SUBJECTS.MATH, maxResult: 50 }

export const LEVELS = [
  {
    title: '1',
    difficulty: DIFFICULTIES.EASY,
    reward: 10,
    repetitions: 4,
    questions: [
      { ...BASIC_MATH, count: 5 },
      { subjectId: SUBJECTS.PORTUGUESE, count: 5 },
    ],
    bonus: {
      minutesPerQuestion: 2,
      questions: [{ subjectId: SUBJECTS.ENGLISH, count: 1 }],
    },
    celebration: {
      title: 'Parabéns!',
      message: 'Você mandou muito bem no nível 1!',
      emojis: ['🎉'],
      gifs: [],
      confettiCount: 40,
      isConfettiContinuous: false,
      hasGlow: false,
      hasShine: false,
    },
  },
  {
    title: '2',
    difficulty: DIFFICULTIES.EASY,
    reward: 20,
    repetitions: 4,
    questions: [
      { ...BASIC_MATH, count: 10 },
      { subjectId: SUBJECTS.PORTUGUESE, count: 5 },
    ],
    bonus: {
      minutesPerQuestion: 2,
      questions: [{ subjectId: SUBJECTS.ENGLISH, count: 2 }],
    },
    celebration: {
      title: 'Muito bem!',
      message: 'Você foi demais no nível 2!',
      emojis: ['😄', '🎉'],
      gifs: [],
      confettiCount: 60,
      isConfettiContinuous: false,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '3',
    difficulty: DIFFICULTIES.MEDIUM,
    reward: 30,
    repetitions: 4,
    questions: [
      { ...ADVANCED_MATH, count: 5 },
      { subjectId: SUBJECTS.PORTUGUESE, count: 10 },
      { subjectId: SUBJECTS.ENGLISH, count: 1 },
    ],
    bonus: {
      minutesPerQuestion: 3,
      questions: [
        { subjectId: SUBJECTS.ENGLISH, count: 1 },
        { subjectId: SUBJECTS.SPANISH, count: 1 },
      ],
    },
    celebration: {
      title: 'Uau, que incrível!',
      message: 'Você arrasou no nível 3!',
      emojis: ['🤩', '🎉', '🌟'],
      gifs: [],
      confettiCount: 90,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '4',
    difficulty: DIFFICULTIES.MEDIUM,
    reward: 45,
    repetitions: 3,
    questions: [
      { ...ADVANCED_MATH, count: 10 },
      { subjectId: SUBJECTS.PORTUGUESE, count: 10 },
      { subjectId: SUBJECTS.ENGLISH, count: 2 },
    ],
    bonus: {
      minutesPerQuestion: 3,
      questions: [
        { ...ADVANCED_MATH, count: 1 },
        { subjectId: SUBJECTS.ENGLISH, count: 1 },
        { subjectId: SUBJECTS.SPANISH, count: 1 },
      ],
    },
    celebration: {
      title: 'Que fera!',
      message: 'Nível 4 completo. Falta só um!',
      emojis: [],
      gifs: ['🥳', '🎉', '🤩'],
      confettiCount: 120,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '5',
    difficulty: DIFFICULTIES.HARD,
    reward: 60,
    repetitions: 2,
    questions: [
      { ...ADVANCED_MATH, count: 10 },
      { subjectId: SUBJECTS.PORTUGUESE, difficulty: DIFFICULTIES.MEDIUM, count: 15 },
      { subjectId: SUBJECTS.ENGLISH, difficulty: DIFFICULTIES.MEDIUM, count: 5 },
      { subjectId: SUBJECTS.SPANISH, difficulty: DIFFICULTIES.MEDIUM, count: 1 },
    ],
    bonus: {
      minutesPerQuestion: 5,
      questions: [
        { ...ADVANCED_MATH, count: 3 },
        { subjectId: SUBJECTS.PORTUGUESE, difficulty: DIFFICULTIES.MEDIUM, count: 2 },
      ],
    },
    celebration: {
      title: 'Você zerou o desafio!',
      message: 'Nível 5 completo. Você é demais!',
      emojis: [],
      gifs: ['🏆', '🥳', '🎉', '🤩'],
      confettiCount: 160,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
]
