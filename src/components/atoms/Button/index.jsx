// Ações usam azul (positivo) e vermelho (negativo), com "degrau" 3D de botão de brinquedo
const variantes = {
  primary: 'bg-positivo text-white shadow-[0_6px_0_var(--color-positivo-escuro)] enabled:hover:brightness-110',
  negative: 'bg-negativo text-white shadow-[0_6px_0_var(--color-negativo-escuro)] enabled:hover:brightness-110',
  secondary: 'border-4 border-white bg-white/15 text-white enabled:hover:bg-white/30',
  correct: 'border-4 border-white bg-positivo text-white',
  wrong: 'border-4 border-white bg-negativo text-white',
  dimmed: 'border-4 border-white/30 text-white/50',
}

export default function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-3 rounded-3xl px-8 py-4 text-3xl font-semibold transition enabled:active:translate-y-1.5 enabled:active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:border-transparent disabled:bg-white/15 disabled:text-white/60 disabled:shadow-none ${variantes[variant]}`}
    >
      {children}
    </button>
  )
}
