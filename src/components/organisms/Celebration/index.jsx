import AnimatedEmoji from '@/components/atoms/AnimatedEmoji'
import Emoji from '@/components/atoms/Emoji'
import Text from '@/components/atoms/Text'
import Confetti from '@/components/molecules/Confetti'
import RewardBadge from '@/components/molecules/RewardBadge'

export default function Celebration({
  title,
  message,
  emojis,
  gifs,
  confettiCount,
  isConfettiContinuous,
  hasGlow,
  hasShine,
  reward,
  correctCount,
  total,
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Confetti count={confettiCount} isContinuous={isConfettiContinuous} />
      {gifs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {gifs.map((gif, index) => (
            <span key={gif} className="inline-block animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
              <AnimatedEmoji emoji={gif} />
            </span>
          ))}
        </div>
      )}
      {emojis.length > 0 && (
        <div className="flex justify-center gap-4">
          {emojis.map((emoji, index) => (
            <span key={emoji} className="inline-block animate-bounce" style={{ animationDelay: `${index * 0.15}s` }}>
              <Emoji symbol={emoji} size={emojis.length > 1 ? 'md' : 'lg'} />
            </span>
          ))}
        </div>
      )}
      <div className="flex animate-pop flex-col gap-3">
        <Text as="h3" variant={hasShine ? 'shine' : 'title'}>{title}</Text>
        <Text variant="subtitle">{message}</Text>
        <Text variant="muted">Você acertou {correctCount} de {total}.</Text>
      </div>
      <RewardBadge reward={reward} hasGlow={hasGlow} />
    </div>
  )
}
