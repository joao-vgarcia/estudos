import Emoji from '@/components/atoms/Emoji'

export default function QuestionRewardBadge({ reward }) {
  return (
    <span className="flex items-center gap-3 rounded-full bg-white px-5 py-2 text-positive-dark shadow-[0_6px_0_rgb(0_0_0/0.15)]">
      <span className="inline-block animate-wiggle" aria-hidden="true">
        <Emoji symbol="🎁" size="xs" />
      </span>
      <span className="text-2xl font-medium">
        Vale <span className="font-display tracking-wide">+{reward}</span>
      </span>
    </span>
  )
}
