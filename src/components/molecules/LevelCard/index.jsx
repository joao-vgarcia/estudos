import Button from '@/components/atoms/Button'
import Emoji from '@/components/atoms/Emoji'
import { formatCount } from '@/utils/text'

export default function LevelCard({ title, stars, reward, bonusReward, repetitions, remainingRepetitions, onClick }) {
  return (
    <Button variant="secondary" disabled={remainingRepetitions === 0} onClick={onClick}>
      <span className="flex flex-col items-center gap-3 py-2">
        <span className="font-display text-4xl tracking-wide sm:text-5xl">Nível {title}</span>
        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: stars }, (_, index) => (
            <Emoji key={index} symbol="⭐" size="xs" />
          ))}
        </span>
        <span className="sr-only">{formatCount(stars, 'estrela', 'estrelas')}</span>
        <span>{reward} min</span>
        <span className="text-2xl font-medium text-white/85">+ até {bonusReward} min de bônus</span>
        <span className="flex gap-2" aria-hidden="true">
          {Array.from({ length: repetitions }, (_, index) => (
            <span key={index} className={index < remainingRepetitions ? '' : 'opacity-40 grayscale'}>
              <Emoji symbol="📘" size="xs" />
            </span>
          ))}
        </span>
        <span className="sr-only">
          {formatCount(remainingRepetitions, 'jogada restante', 'jogadas restantes')} de {repetitions}
        </span>
      </span>
    </Button>
  )
}
