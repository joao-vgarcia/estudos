import { MS_PER_MINUTE } from '@/constants/time'
import { getDeadlineMs, getElapsedMs, getRemainingMs } from '@/utils/timer'

export function getEarnedLeisureMs({ earnedMinutes }) {
  return earnedMinutes * MS_PER_MINUTE
}

export function isLeisureRunning({ leisureEndsAt }) {
  return Boolean(leisureEndsAt)
}

export function getRemainingLeisureMs(session, now = Date.now()) {
  if (isLeisureRunning(session)) return getRemainingMs(session.leisureEndsAt, now)
  return Math.max(getEarnedLeisureMs(session) - session.spentLeisureMs, 0)
}

export function getLeisureEndMs(session, now = Date.now()) {
  return getDeadlineMs(getRemainingLeisureMs(session, now), now)
}

export function getElapsedLeisureMs({ leisureStartedAt }, now = Date.now()) {
  return getElapsedMs(leisureStartedAt, now)
}

export function getAwayLeisureMs({ away }, now = Date.now()) {
  return away ? getElapsedMs(away.since, now) * away.penaltyFactor : 0
}
