import { DIFFICULTIES } from '@/constants/quiz'

export const LEVELS = [
  {
    title: 'Fácil',
    difficulty: DIFFICULTIES.EASY,
    reward: '15 minutos',
    celebration: {
      title: 'Parabéns!',
      message: 'Você mandou muito bem no nível Fácil!',
      emojis: ['🎉'],
      gifs: [],
      confettiCount: 40,
      isConfettiContinuous: false,
      hasGlow: false,
      hasShine: false,
    },
  },
  {
    title: 'Médio',
    difficulty: DIFFICULTIES.MEDIUM,
    reward: '30 minutos',
    celebration: {
      title: 'Uau, que incrível!',
      message: 'Você arrasou no nível Médio!',
      emojis: ['🤩', '🎉', '🌟'],
      gifs: [],
      confettiCount: 90,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: false,
    },
  },
  {
    title: 'Difícil',
    difficulty: DIFFICULTIES.HARD,
    reward: '1 hora',
    fallback: { difficulty: DIFFICULTIES.MEDIUM, count: 10 },
    celebration: {
      title: 'Você zerou o desafio!',
      message: 'Nível Difícil completo. Você é demais!',
      emojis: [],
      gifs: ['🏆', '🥳', '🎉', '🤩'],
      confettiCount: 160,
      isConfettiContinuous: true,
      hasGlow: true,
      hasShine: true,
    },
  },
]
