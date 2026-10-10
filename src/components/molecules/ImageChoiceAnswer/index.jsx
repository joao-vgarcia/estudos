import Emoji from '@/components/atoms/Emoji'
import OptionButton from '@/components/molecules/OptionButton'

export default function ImageChoiceAnswer({ options, answer, onAnswer }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {options.map((option) => (
        <OptionButton
          key={option}
          label={<Emoji symbol={option} size="md" />}
          isSelected={option === answer}
          onClick={() => onAnswer(option)}
        />
      ))}
    </div>
  )
}
