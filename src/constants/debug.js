const DEBUG_HOSTNAMES = ['localhost', '127.0.0.1']

const DEBUG_TIMER_SPEED = 10

export const DEBUG_MODE = DEBUG_HOSTNAMES.includes(globalThis.location?.hostname)

export const TIMER_SPEED = DEBUG_MODE ? DEBUG_TIMER_SPEED : 1
