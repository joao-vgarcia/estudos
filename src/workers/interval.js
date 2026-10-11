let intervalId

self.onmessage = ({ data: delay }) => {
  clearInterval(intervalId)
  intervalId = setInterval(() => self.postMessage(null), delay)
}
