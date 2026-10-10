export default function TextInput({ value, onChange, label, autoFocus = false }) {
  return (
    <input
      type="text"
      lang="pt-BR"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      aria-label={label}
      placeholder="?"
      value={value}
      autoFocus={autoFocus}
      onChange={(evento) => onChange(evento.target.value.trimStart())}
      className="w-full rounded-3xl border-4 border-white bg-white/15 px-8 py-4 text-center text-4xl font-semibold text-white transition placeholder:text-white/60 focus:bg-white/30 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
    />
  )
}
