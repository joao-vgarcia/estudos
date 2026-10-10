export default function Container({ children }) {
  return (
    <section className="flex flex-col gap-8 rounded-[2.5rem] bg-black/10 p-6 md:p-10">
      {children}
    </section>
  )
}
