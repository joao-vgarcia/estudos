import { LEVELS } from '@/constants/levels'
import { SESSION_DURATION_MS, SESSION_STORAGE_KEY } from '@/constants/session'
import { getEarnedLeisureMs, getRemainingLeisureMs, isLeisureRunning } from '@/utils/leisure'
import { unlockNextLevel } from '@/utils/levels'

function createSession(unlockedLevels = []) {
  return {
    startedAt: null,
    repetitions: LEVELS.map(({ repetitions }) => repetitions),
    unlockedLevels,
    earnedMinutes: 0,
    spentLeisureMs: 0,
    leisureStartedAt: null,
    leisureEndsAt: null,
    away: null,
  }
}

function isValidSession(session) {
  return (
    Array.isArray(session?.repetitions) &&
    session.repetitions.length === LEVELS.length &&
    Array.isArray(session.unlockedLevels) &&
    Number.isFinite(session.earnedMinutes) &&
    Number.isFinite(session.spentLeisureMs)
  )
}

function readSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY))
    return isValidSession(session) ? session : createSession()
  } catch {
    return createSession()
  }
}

function saveSession(session) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch {}
  return session
}

export function isSessionExpired({ startedAt }) {
  if (!startedAt) return false
  const startDate = new Date(startedAt)
  const now = new Date()
  return now - startDate >= SESSION_DURATION_MS || now.toDateString() !== startDate.toDateString()
}

export function loadSession() {
  const session = readSession()
  return isSessionExpired(session) ? saveSession(createSession(session.unlockedLevels)) : session
}

export function startSession() {
  const session = loadSession()
  return session.startedAt ? session : saveSession({ ...session, startedAt: new Date().toISOString() })
}

function changeSession(session, change) {
  return saveSession({ ...session, ...change(session) })
}

function updateSession(change) {
  return changeSession(startSession(), change)
}

export function completeLevel(levelIndex, minutes) {
  return updateSession(({ repetitions, unlockedLevels, earnedMinutes }) => ({
    repetitions: repetitions.with(levelIndex, Math.max(repetitions[levelIndex] - 1, 0)),
    unlockedLevels: unlockNextLevel(unlockedLevels, levelIndex),
    earnedMinutes: earnedMinutes + minutes,
  }))
}

export function addEarnedMinutes(minutes) {
  return updateSession(({ earnedMinutes }) => ({ earnedMinutes: earnedMinutes + minutes }))
}

export function startLeisure() {
  return changeSession(loadSession(), (session) => {
    if (isLeisureRunning(session)) return {}
    const now = Date.now()
    return {
      leisureStartedAt: new Date(now).toISOString(),
      leisureEndsAt: new Date(now + getRemainingLeisureMs(session, now)).toISOString(),
    }
  })
}

export function stopLeisure() {
  return changeSession(loadSession(), (session) => {
    if (!isLeisureRunning(session)) return {}
    const elapsedMs = Date.now() - new Date(session.leisureStartedAt)
    return {
      spentLeisureMs: Math.min(session.spentLeisureMs + elapsedMs, getEarnedLeisureMs(session)),
      leisureStartedAt: null,
      leisureEndsAt: null,
    }
  })
}

export function markAway(penaltyFactor) {
  return changeSession(loadSession(), (session) =>
    session.away ? {} : { away: { since: new Date().toISOString(), penaltyFactor } },
  )
}

export function settleAway() {
  return changeSession(loadSession(), (session) => {
    if (!session.away) return {}
    const awayMs = Date.now() - new Date(session.away.since)
    return {
      spentLeisureMs: Math.min(
        session.spentLeisureMs + awayMs * session.away.penaltyFactor,
        getEarnedLeisureMs(session),
      ),
      away: null,
    }
  })
}
