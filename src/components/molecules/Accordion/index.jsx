import Icon from '@/components/atoms/Icon'

export default function Accordion({ title, children }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl border-4 border-white bg-white/15 px-6 py-4 transition hover:bg-white/30 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        {title}
        <span className="shrink-0 transition-transform duration-300 group-open:rotate-180">
          <Icon name="chevron-down" size={36} />
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  )
}
