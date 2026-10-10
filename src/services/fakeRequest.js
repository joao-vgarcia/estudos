// Simula uma chamada externa: devolve `data` depois de `ms` milissegundos.
export function fakeRequest(data, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
