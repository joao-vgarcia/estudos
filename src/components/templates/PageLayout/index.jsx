export default function PageLayout({ children }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-10 p-6 md:p-12">
      {children}
    </main>
  )
}
