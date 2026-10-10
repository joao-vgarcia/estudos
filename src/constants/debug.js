const DEBUG_HOSTNAMES = ['localhost', '127.0.0.1']

export const DEBUG_MODE = DEBUG_HOSTNAMES.includes(globalThis.location?.hostname)
