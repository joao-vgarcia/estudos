export default function PageLayout({ menu, children }) {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside className="border-b border-slate-200 bg-slate-50 p-4 md:w-72 md:border-b-0 md:border-r">
        {menu}
      </aside>
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">{children}</main>
    </div>
  )
}
