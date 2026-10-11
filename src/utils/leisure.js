const MS_PER_MINUTE = 60 * 1000

export function getEarnedLeisureMs({ earnedMinutes }) {
  return earnedMinutes * MS_PER_MINUTE
}

export function isLeisureRunning({ leisureEndsAt }) {
  return Boolean(leisureEndsAt)
}

export function getRemainingLeisureMs(session, now = Date.now()) {
  if (isLeisureRunning(session)) return Math.max(new Date(session.leisureEndsAt) - now, 0)
  return Math.max(getEarnedLeisureMs(session) - session.spentLeisureMs, 0)
}
