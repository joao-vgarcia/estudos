export function watchAway({ onLeave, onReturn }) {
  let awaySince = null

  const leave = () => {
    if (awaySince !== null) return
    awaySince = Date.now()
    onLeave()
  }

  const comeBack = () => {
    if (awaySince === null) return
    const since = awaySince
    awaySince = null
    onReturn(since)
  }

  const handleVisibilityChange = () => {
    if (document.hidden) leave()
    else if (document.hasFocus()) comeBack()
  }

  window.addEventListener('blur', leave)
  window.addEventListener('pagehide', leave)
  window.addEventListener('focus', comeBack)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  if (document.hidden) leave()
  return () => {
    window.removeEventListener('blur', leave)
    window.removeEventListener('pagehide', leave)
    window.removeEventListener('focus', comeBack)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}
