const variantes = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100',
  correct: 'bg-emerald-100 text-emerald-800 border border-emerald-500',
  wrong: 'bg-rose-100 text-rose-800 border border-rose-500',
  dimmed: 'bg-white text-slate-400 border border-slate-200',
}

export default function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantes[variant]}`}
    >
      {children}
    </button>
  )
}
