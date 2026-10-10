const variants = {
  title: 'font-display text-4xl uppercase tracking-wide text-white text-shadow-md sm:text-5xl md:text-6xl',
  subtitle: 'text-3xl font-semibold text-white text-shadow-sm sm:text-4xl md:text-5xl',
  body: 'text-2xl text-white',
  muted: 'text-2xl font-medium text-white/85',
  highlight: 'font-display text-4xl tracking-wide text-white text-shadow-md sm:text-6xl',
  shine:
    'animate-shine bg-linear-to-r from-yellow-200 via-white to-yellow-200 bg-size-[200%_auto] bg-clip-text font-display text-5xl uppercase tracking-wide text-transparent drop-shadow-md sm:text-6xl md:text-7xl',
}

export default function Text({ children, as: Tag = 'p', variant = 'body' }) {
  return <Tag className={variants[variant]}>{children}</Tag>
}
