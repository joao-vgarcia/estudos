import Emoji from '@/components/atoms/Emoji'
import ProgressBar from '@/components/atoms/ProgressBar'

export default function LeisureTimeBadge({ time, clock, progress, isRunning }) {
  if (isRunning) {
    return (
      <section className="flex min-h-[50vh] w-full animate-expand flex-col items-center justify-center gap-8 rounded-[2.5rem] bg-white p-8 text-positive-dark shadow-[0_6px_0_rgb(0_0_0/0.15)] md:p-12">
        <span className="flex items-center gap-3 text-2xl font-medium">
          <Emoji symbol="⏰" size="xs" />
          Aproveite seu tempo de lazer!
        </span>
        <span role="timer" className="font-display text-8xl tracking-wide tabular-nums sm:text-9xl">
          {clock}
        </span>
        <ProgressBar value={progress} label="Tempo de lazer restante" />
      </section>
    )
  }

  return (
    <div className="flex items-center gap-3 self-center rounded-full bg-white px-6 py-3 text-positive-dark shadow-[0_6px_0_rgb(0_0_0/0.15)]">
      <Emoji symbol="⏰" size="xs" />
      <span className="text-2xl font-medium">
        Tempo de lazer: <span className="font-display tracking-wide">{time}</span>
      </span>
    </div>
  )
}
