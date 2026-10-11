const PERCENT = 100

export default function ProgressBar({ value, label }) {
  const percent = Math.round(value * PERCENT)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={PERCENT}
      aria-valuenow={percent}
      className="h-6 w-full overflow-hidden rounded-full bg-positive/15"
    >
      <div
        className="h-full rounded-full bg-positive transition-[width] duration-1000 ease-linear"
        style={{ width: `${value * PERCENT}%` }}
      />
    </div>
  )
}
