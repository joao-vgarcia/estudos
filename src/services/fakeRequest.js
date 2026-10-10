export function fakeRequest(data, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
