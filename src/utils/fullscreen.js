export function enterFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
}

export function exitFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen()
}
