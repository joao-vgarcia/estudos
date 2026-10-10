const sizes = {
  xs: 'text-2xl',
  sm: 'text-4xl md:text-5xl',
  md: 'text-6xl sm:text-7xl',
  lg: 'text-8xl sm:text-9xl',
}

export default function Emoji({ symbol, size = 'md' }) {
  return <span className={`font-emoji leading-none ${sizes[size]}`}>{symbol}</span>
}
