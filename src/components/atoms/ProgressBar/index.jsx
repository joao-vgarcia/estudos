const PERCENT = 100

const TIMER_TRACK = 'bg-white/40 shadow-[0_4px_0_rgb(0_0_0/0.15)]'

const variants = {
  primary: 'h-6 bg-positive/15 text-positive',
  timer: `h-6 text-positive ${TIMER_TRACK}`,
  urgent: `h-10 text-negative ${TIMER_TRACK}`,
  critical: `h-14 text-negative ${TIMER_TRACK}`,
}

export default function ProgressBar({ value, label, variant = 'primary' }) {
  const percent = Math.round(value * PERCENT)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={PERCENT}
      aria-valuenow={percent}
      className={`w-full overflow-hidden rounded-full transition-[height] duration-300 ${variants[variant]}`}
    >
      <div
        className="h-full rounded-full bg-current transition-[width] duration-1000 ease-linear"
        style={{ width: `${value * PERCENT}%` }}
      />
    </div>
  )
}
