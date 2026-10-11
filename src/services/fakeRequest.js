export function fakeRequest(data, ms = 100) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
