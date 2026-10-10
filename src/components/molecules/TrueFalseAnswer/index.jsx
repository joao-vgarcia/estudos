import OptionButton from '@/components/molecules/OptionButton'
import { TRUE_FALSE_OPTIONS } from '@/constants/quiz'

const choices = [
  { label: TRUE_FALSE_OPTIONS.TRUE, icon: 'check' },
  { label: TRUE_FALSE_OPTIONS.FALSE, icon: 'x' },
]

export default function TrueFalseAnswer({ answer, onAnswer }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {choices.map(({ label, icon }) => (
        <OptionButton
          key={label}
          label={label}
          startIcon={icon}
          isSelected={label === answer}
          onClick={() => onAnswer(label)}
        />
      ))}
    </div>
  )
}
