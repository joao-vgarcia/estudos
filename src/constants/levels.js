import { DIFFICULTIES, QUESTION_KINDS, SUBJECTS } from '@/constants/quiz'

const EASY_MATH = { subjectId: SUBJECTS.MATH, difficulty: DIFFICULTIES.EASY, maxResult: 30 }

const MEDIUM_MATH = { subjectId: SUBJECTS.MATH, difficulty: DIFFICULTIES.MEDIUM, maxResult: 50 }

const HARD_MATH = { subjectId: SUBJECTS.MATH, difficulty: DIFFICULTIES.HARD, maxResult: 50 }

const EASY_TIMES_TABLE = { ...EASY_MATH, kind: QUESTION_KINDS.TIMES_TABLE }

const HARD_EQUATION = { ...HARD_MATH, kind: QUESTION_KINDS.EQUATION }

const EASY_PORTUGUESE = { subjectId: SUBJECTS.PORTUGUESE, difficulty: DIFFICULTIES.EASY }

const MEDIUM_PORTUGUESE = { subjectId: SUBJECTS.PORTUGUESE, difficulty: DIFFICULTIES.MEDIUM }

const HARD_PORTUGUESE = { subjectId: SUBJECTS.PORTUGUESE, difficulty: DIFFICULTIES.HARD }

const EASY_ENGLISH = { subjectId: SUBJECTS.ENGLISH, difficulty: DIFFICULTIES.EASY }

const MEDIUM_ENGLISH = { subjectId: SUBJECTS.ENGLISH, difficulty: DIFFICULTIES.MEDIUM }

const EASY_SPANISH = { subjectId: SUBJECTS.SPANISH, difficulty: DIFFICULTIES.EASY }

export const LEVELS = [
  {
    title: '1',
    reward: 5,
    repetitions: 2,
    questions: [{ ...EASY_TIMES_TABLE, count: 5 }],
    bonus: [{ ...EASY_TIMES_TABLE, count: 5, minutesPerQuestion: 1 }],
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
    reward: 5,
    repetitions: 2,
    questions: [{ ...EASY_TIMES_TABLE, count: 10 }],
    bonus: [{ ...EASY_TIMES_TABLE, count: 5, minutesPerQuestion: 1 }],
    celebration: {
      title: 'Muito bem!',
      message: 'Você foi demais no nível 2!',
      emojis: ['😄', '🎉'],
      gifs: [],
      confettiCount: 50,
      isConfettiContinuous: false,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '3',
    reward: 5,
    repetitions: 3,
    questions: [
      { ...EASY_MATH, count: 10 },
      { ...EASY_PORTUGUESE, count: 5 },
    ],
    bonus: [{ ...EASY_TIMES_TABLE, count: 5, minutesPerQuestion: 1 }],
    celebration: {
      title: 'Uau, que incrível!',
      message: 'Você arrasou no nível 3!',
      emojis: ['🤩', '🎉', '🌟'],
      gifs: [],
      confettiCount: 60,
      isConfettiContinuous: false,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '4',
    reward: 10,
    repetitions: 2,
    questions: [
      { ...EASY_MATH, count: 8 },
      { ...MEDIUM_MATH, count: 2 },
      { ...EASY_PORTUGUESE, count: 10 },
    ],
    bonus: [{ ...EASY_MATH, count: 3, minutesPerQuestion: 1 },
    { ...MEDIUM_MATH, count: 1, minutesPerQuestion: 2 }],
    celebration: {
      title: 'Que fera!',
      message: 'Nível 4 completo!',
      emojis: [],
      gifs: ['🥳', '🎉'],
      confettiCount: 75,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '5',
    reward: 10,
    repetitions: 3,
    questions: [
      { ...EASY_MATH, count: 10 },
      { ...MEDIUM_MATH, count: 5 },
      { ...EASY_PORTUGUESE, count: 7 },
      { ...MEDIUM_PORTUGUESE, count: 3 },
    ],
    bonus: [
      { ...EASY_MATH, count: 1, minutesPerQuestion: 1 },
      { ...MEDIUM_MATH, count: 1, minutesPerQuestion: 2 },
      { ...EASY_ENGLISH, count: 1, minutesPerQuestion: 2 },
    ],
    celebration: {
      title: 'Você é fera!',
      message: 'Nível 5 completo. O nível 6 está liberado!',
      emojis: [],
      gifs: ['🥳', '🎉', '🤩'],
      confettiCount: 90,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '6',
    isLocked: true,
    reward: 20,
    repetitions: 3,
    questions: [
      { ...EASY_MATH, count: 5 },
      { ...MEDIUM_MATH, count: 10 },
      { ...EASY_PORTUGUESE, count: 6 },
      { ...MEDIUM_PORTUGUESE, count: 6 },
      { ...EASY_ENGLISH, count: 3 },
    ],
    bonus: [
      { ...HARD_MATH, count: 2, minutesPerQuestion: 4 },
      { ...EASY_SPANISH, count: 1, minutesPerQuestion: 2 },
    ],
    celebration: {
      title: 'Mandou bem demais!',
      message: 'Nível 6 completo. O nível 7 está liberado!',
      emojis: [],
      gifs: ['😎', '🎉', '🤩'],
      confettiCount: 100,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: '7',
    isLocked: true,
    reward: 25,
    repetitions: 3,
    questions: [
      { ...MEDIUM_MATH, count: 14 },
      { ...HARD_MATH, count: 4 },
      { ...EASY_PORTUGUESE, count: 4 },
      { ...MEDIUM_PORTUGUESE, count: 9 },
      { ...EASY_ENGLISH, count: 3 },
      { ...MEDIUM_ENGLISH, count: 1 },
    ],
    bonus: [
      { ...HARD_MATH, count: 3, minutesPerQuestion: 4 },
      { ...HARD_PORTUGUESE, count: 1, minutesPerQuestion: 3 },
    ],
    celebration: {
      title: 'Que show!',
      message: 'Nível 7 completo. O nível 8 está liberado!',
      emojis: [],
      gifs: ['🔥', '🥳', '🎉'],
      confettiCount: 115,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
  {
    title: '8',
    isLocked: true,
    reward: 30,
    repetitions: 3,
    questions: [
      { ...MEDIUM_MATH, count: 12 },
      { ...HARD_MATH, count: 8 },
      { ...MEDIUM_PORTUGUESE, count: 12 },
      { ...HARD_PORTUGUESE, count: 3 },
      { ...EASY_ENGLISH, count: 3 },
      { ...MEDIUM_ENGLISH, count: 2 },
    ],
    bonus: [
      {... MEDIUM_MATH, count: 2, minutesPerQuestion: 2 },
      { ...HARD_MATH, count: 3, minutesPerQuestion: 4 },
      { ...HARD_PORTUGUESE, count: 1, minutesPerQuestion: 4 },
      { ...EASY_ENGLISH, count: 1, minutesPerQuestion: 2 },
      { ...EASY_SPANISH, count: 1, minutesPerQuestion: 3 },
    ],
    celebration: {
      title: 'Imparável!',
      message: 'Nível 8 completo. O nível 9 está liberado!',
      emojis: [],
      gifs: ['🚀', '🥳', '🎉'],
      confettiCount: 130,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
  {
    title: '9',
    isLocked: true,
    reward: 35,
    repetitions: 3,
    questions: [
      { ...MEDIUM_MATH, count: 10 },
      { ...HARD_MATH, count: 12 },
      { ...MEDIUM_PORTUGUESE, count: 10 },
      { ...HARD_PORTUGUESE, count: 6 },
      { ...EASY_ENGLISH, count: 1 },
      { ...MEDIUM_ENGLISH, count: 4 },
      { ...EASY_SPANISH, count: 2 },
    ],
    bonus: [
      { ...MEDIUM_MATH, count: 2, minutesPerQuestion: 2 },
      { ...HARD_MATH, count: 4, minutesPerQuestion: 3 },
      { ...MEDIUM_PORTUGUESE, count: 1, minutesPerQuestion: 2 },
      { ...HARD_PORTUGUESE, count: 1, minutesPerQuestion: 3 },
      { ...EASY_ENGLISH, count: 1, minutesPerQuestion: 2 },
      { ...EASY_SPANISH, count: 1, minutesPerQuestion: 2 },
    ],
    celebration: {
      title: 'Quase no topo!',
      message: 'Nível 9 completo. Falta só o nível 10!',
      emojis: [],
      gifs: ['💪', '🥳', '🎉', '🤩'],
      confettiCount: 145,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
  {
    title: '10',
    isLocked: true,
    reward: 45,
    repetitions: 3,
    questions: [
      { ...MEDIUM_MATH, count: 9 },
      { ...HARD_MATH, count: 15 },
      { ...MEDIUM_PORTUGUESE, count: 8 },
      { ...HARD_PORTUGUESE, count: 9 },
      { ...MEDIUM_ENGLISH, count: 6 },
      { ...EASY_SPANISH, count: 3 },
    ],
    bonus: [
      { ...MEDIUM_MATH, count: 2, minutesPerQuestion: 2 },
      { ...HARD_MATH, count: 5, minutesPerQuestion: 3 },
      { ...MEDIUM_PORTUGUESE, count: 1, minutesPerQuestion: 2 },
      { ...HARD_PORTUGUESE, count: 1, minutesPerQuestion: 3 },
      { ...MEDIUM_ENGLISH, count: 1, minutesPerQuestion: 2 },
      { ...EASY_SPANISH, count: 1, minutesPerQuestion: 2 },
      {...HARD_EQUATION, count: 1, minutesPerQuestion: 7 }
    ],
    celebration: {
      title: 'Você zerou o desafio!',
      message: 'Nível 10 completo. Você é demais!',
      emojis: [],
      gifs: ['🏆', '🥳', '🎉', '🤩'],
      confettiCount: 160,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
]
