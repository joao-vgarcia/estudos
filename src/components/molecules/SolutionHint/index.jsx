import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Accordion from '@/components/molecules/Accordion'

export default function SolutionHint({ message, steps }) {
  return (
    <Accordion
      title={
        <span className="flex items-center gap-3 text-3xl font-semibold text-white">
          <Icon name="lightbulb" size={32} />
          Dica
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        <Text variant="muted">{message}</Text>
        <ol className="flex flex-col gap-3">
          {steps.map(({ expression, note }) => (
            <li
              key={expression}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-3xl bg-white/15 px-6 py-4"
            >
              <Text as="span">{expression}</Text>
              {note && <Text as="span" variant="muted">{note}</Text>}
            </li>
          ))}
        </ol>
      </div>
    </Accordion>
  )
}
