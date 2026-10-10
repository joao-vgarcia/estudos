import OptionButton from '@/components/molecules/OptionButton'

export default function MultipleChoiceAnswer({ options, answer, onAnswer }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {options.map((option) => (
        <OptionButton key={option} label={option} isSelected={option === answer} onClick={() => onAnswer(option)} />
      ))}
    </div>
  )
}
