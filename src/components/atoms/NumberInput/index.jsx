export default function NumberInput({ value, onChange, label, autoFocus = false }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      aria-label={label}
      placeholder="?"
      value={value}
      autoFocus={autoFocus}
      onChange={(evento) => onChange(evento.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''))}
      className="w-full rounded-3xl border-4 border-white bg-white/15 px-8 py-4 text-center text-4xl font-semibold text-white transition placeholder:text-white/60 focus:bg-white/30 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
    />
  )
}
