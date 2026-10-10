export default function Input({ label, onChange, ...inputProps }) {
  return (
    <input
      type="text"
      autoComplete="off"
      aria-label={label}
      placeholder="?"
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-3xl border-4 border-white bg-white/15 px-8 py-4 text-center text-4xl font-semibold text-white transition placeholder:text-white/60 focus:bg-white/30 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
      {...inputProps}
    />
  )
}
