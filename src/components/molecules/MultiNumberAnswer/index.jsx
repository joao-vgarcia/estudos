import NumberInput from '@/components/atoms/NumberInput'
import Text from '@/components/atoms/Text'

export default function MultiNumberAnswer({ parts, onAnswer }) {
  return (
    <div className="flex flex-col gap-6">
      {parts.map(({ label, answer }, index) => (
        <div key={label} className="flex flex-col gap-3">
          <Text>{label}</Text>
          <NumberInput
            label={label}
            value={answer}
            onChange={(value) => onAnswer(value, index)}
            autoFocus={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
