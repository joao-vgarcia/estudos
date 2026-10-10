export default function Container({ children }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {children}
    </section>
  )
}
