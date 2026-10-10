// O fundo verde vem do body (index.css)
export default function PageLayout({ menu, children }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b-4 border-white/25 p-6 md:w-96 md:border-b-0 md:border-r-4">
        {menu}
      </aside>
      <main className="flex flex-1 flex-col gap-10 p-6 md:p-12">{children}</main>
    </div>
  )
}
