import Icon from '@/components/atoms/Icon'

const ICON_SIZE = 32

const variants = {
  primary: 'bg-positive text-white shadow-[0_6px_0_var(--color-positive-dark)] enabled:hover:brightness-110',
  negative: 'bg-negative text-white shadow-[0_6px_0_var(--color-negative-dark)] enabled:hover:brightness-110',
  secondary: 'border-4 border-white bg-white/15 text-white enabled:hover:bg-white/30',
  selected: 'border-4 border-white bg-white text-positive-dark',
}

export default function Button({
  children,
  onClick,
  startIcon,
  endIcon,
  variant = 'primary',
  disabled = false,
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-3 rounded-3xl px-8 py-4 text-3xl font-semibold transition enabled:active:translate-y-1.5 enabled:active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:border-transparent disabled:bg-white/15 disabled:text-white/60 disabled:shadow-none ${variants[variant]}`}
    >
      {startIcon && <Icon name={startIcon} size={ICON_SIZE} />}
      {children}
      {endIcon && <Icon name={endIcon} size={ICON_SIZE} />}
    </button>
  )
}
