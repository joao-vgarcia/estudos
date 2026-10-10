const variants = {
  title: 'font-display text-4xl uppercase tracking-wide text-white text-shadow-md sm:text-5xl md:text-6xl',
  subtitle: 'text-3xl font-semibold text-white text-shadow-sm sm:text-4xl md:text-5xl',
  body: 'text-2xl text-white',
  muted: 'text-2xl font-medium text-white/85',
}

export default function Text({ children, as: Tag = 'p', variant = 'body' }) {
  return <Tag className={variants[variant]}>{children}</Tag>
}
