import { TIMER_SPEED } from '@/constants/debug'

export function getElapsedMs(since, now = Date.now()) {
  return (now - new Date(since)) * TIMER_SPEED
}

export function getRemainingMs(until, now = Date.now()) {
  return Math.max((new Date(until) - now) * TIMER_SPEED, 0)
}

export function getDeadlineMs(durationMs, now = Date.now()) {
  return now + durationMs / TIMER_SPEED
}
