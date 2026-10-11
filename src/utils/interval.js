export function startInterval(callback, delay) {
  const worker = new Worker(new URL('../workers/interval.js', import.meta.url), { type: 'module' })
  worker.onmessage = () => callback()
  worker.postMessage(delay)
  return () => worker.terminate()
}
