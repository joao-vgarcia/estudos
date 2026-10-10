import Emoji from '@/components/atoms/Emoji'

export default function RewardBadge({ reward, hasGlow = false }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-3xl bg-white px-6 py-5 text-center text-positive-dark shadow-[0_6px_0_rgb(0_0_0/0.15)] sm:flex-row sm:gap-5 sm:text-left ${hasGlow ? 'animate-glow' : ''}`}
    >
      <span className="inline-block animate-wiggle">
        <Emoji symbol="🎁" size="md" />
      </span>
      <div className="flex flex-col">
        <span className="text-2xl font-medium">Você ganhou</span>
        <span className="font-display text-4xl sm:text-5xl">{reward}</span>
        <span className="text-2xl font-medium">de atividades de lazer!</span>
      </div>
    </div>
  )
}
