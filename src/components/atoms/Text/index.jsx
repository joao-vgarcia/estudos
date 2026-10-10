const variantes = {
  title: 'text-2xl font-bold text-slate-900',
  subtitle: 'text-lg font-semibold text-slate-800',
  body: 'text-base text-slate-700',
  muted: 'text-sm text-slate-500',
}

export default function Text({ children, as: Tag = 'p', variant = 'body' }) {
  return <Tag className={variantes[variant]}>{children}</Tag>
}
