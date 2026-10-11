import { LEVELS } from '@/constants/levels'

export function isLevelUnlocked({ unlockedLevels }, levelIndex) {
  return !LEVELS[levelIndex].isLocked || unlockedLevels.includes(levelIndex)
}

export function canPlayLevel(session, levelIndex) {
  return levelIndex < LEVELS.length && isLevelUnlocked(session, levelIndex) && session.repetitions[levelIndex] > 0
}

export function unlockNextLevel(unlockedLevels, levelIndex) {
  const nextIndex = levelIndex + 1
  if (!LEVELS[nextIndex]?.isLocked || unlockedLevels.includes(nextIndex)) return unlockedLevels
  return [...unlockedLevels, nextIndex]
}

export function getMaxBonusReward({ bonus = [] }) {
  return bonus.reduce((total, { count, minutesPerQuestion }) => total + count * minutesPerQuestion, 0)
}

export function getBonusReward(bonusAttempts) {
  return bonusAttempts.reduce((total, { isCorrect, minutesPerQuestion }) => total + (isCorrect ? minutesPerQuestion : 0), 0)
}
