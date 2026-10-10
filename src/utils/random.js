export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(list) {
  const shuffled = [...list]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = randomInt(0, index)
    const current = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = current
  }
  return shuffled
}

export function randomItem(list) {
  return list[randomInt(0, list.length - 1)]
}

export function randomItems(list, count) {
  return shuffle(list).slice(0, count)
}

export function balancedBooleans(count) {
  return shuffle(Array.from({ length: count }, (_, index) => index % 2 === 0))
}
