import { useId } from 'react'
import Button from '@/components/atoms/Button'
import Emoji from '@/components/atoms/Emoji'

export default function AlertDialog({ emoji, title, messages, actionLabel, onAction }) {
  const titleId = useId()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex w-full max-w-2xl animate-pop flex-col items-center gap-6 rounded-[2.5rem] bg-white p-8 text-center text-positive-dark shadow-[0_6px_0_rgb(0_0_0/0.15)] md:p-12"
      >
        <span className="inline-block animate-wiggle">
          <Emoji symbol={emoji} size="lg" />
        </span>
        <h2 id={titleId} className="font-display text-4xl tracking-wide sm:text-5xl">
          {title}
        </h2>
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <p key={message} className="text-2xl font-medium">
              {message}
            </p>
          ))}
        </div>
        <Button variant="primary" endIcon="check" autoFocus onClick={onAction}>
          {actionLabel}
        </Button>
      </section>
    </div>
  )
}
