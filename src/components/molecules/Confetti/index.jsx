import { useState } from 'react'
import { randomInt, randomItem } from '@/utils/random'

const COLORS = [
  'var(--color-positive)',
  'var(--color-negative)',
  'var(--color-math-easy)',
  'var(--color-portuguese-easy)',
  'var(--color-english-easy)',
  'var(--color-spanish-easy)',
  '#ffd43b',
  '#ffffff',
]

function createPieces(count, isContinuous) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    style: {
      left: `${randomInt(0, 100)}%`,
      width: `${randomInt(8, 14)}px`,
      height: `${randomInt(10, 20)}px`,
      borderRadius: randomInt(0, 1) === 1 ? '9999px' : '2px',
      backgroundColor: randomItem(COLORS),
      animationDuration: `${randomInt(2800, 5200)}ms`,
      animationDelay: `${isContinuous ? -randomInt(0, 5000) : randomInt(0, 900)}ms`,
      animationIterationCount: isContinuous ? 'infinite' : 1,
      '--confetti-drift': `${randomInt(-90, 90)}px`,
    },
  }))
}

export default function Confetti({ count, isContinuous = false }) {
  const [pieces] = useState(() => createPieces(count, isContinuous))
  if (pieces.length === 0) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:hidden">
      {pieces.map(({ id, style }) => (
        <span key={id} className="absolute -top-5 block animate-confetti" style={style} />
      ))}
    </div>
  )
}
