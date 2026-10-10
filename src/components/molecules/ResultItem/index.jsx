import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'

const statusStyles = {
  correct: { background: 'bg-positive', icon: 'check', label: 'Acertou' },
  wrong: { background: 'bg-negative', icon: 'x', label: 'Errou' },
}

export default function ResultItem({ prompt, givenAnswer, correctAnswer, isCorrect }) {
  const status = isCorrect ? statusStyles.correct : statusStyles.wrong

  return (
    <li className="flex items-start gap-4 rounded-3xl bg-black/10 p-5">
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${status.background}`}
      >
        <Icon name={status.icon} size={28} />
        <span className="sr-only">{status.label}</span>
      </span>
      <div className="flex flex-col gap-1">
        <Text>{prompt}</Text>
        <Text variant="muted">Sua resposta: {givenAnswer}</Text>
        {!isCorrect && <Text variant="muted">Resposta certa: {correctAnswer}</Text>}
      </div>
    </li>
  )
}
