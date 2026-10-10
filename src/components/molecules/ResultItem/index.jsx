import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import { getSubjectBackground } from '@/constants/subjectColors'

const statusStyles = {
  correct: { background: 'bg-positive', icon: 'check', label: 'Acertou' },
  wrong: { background: 'bg-negative', icon: 'x', label: 'Errou' },
}

function AnswerDetails({ givenAnswer, correctAnswer, isCorrect }) {
  return (
    <>
      <Text variant="muted">Sua resposta: {givenAnswer}</Text>
      {!isCorrect && <Text variant="muted">Resposta certa: {correctAnswer}</Text>}
    </>
  )
}

export default function ResultItem({ subjectId, difficulty, prompt, givenAnswer, correctAnswer, parts, isCorrect }) {
  const status = isCorrect ? statusStyles.correct : statusStyles.wrong

  return (
    <li className={`flex items-start gap-4 rounded-3xl p-5 ${getSubjectBackground(subjectId, difficulty)}`}>
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${status.background}`}
      >
        <Icon name={status.icon} size={28} />
        <span className="sr-only">{status.label}</span>
      </span>
      <div className="flex flex-col gap-1">
        <Text>{prompt}</Text>
        {parts ? (
          parts.map((part) => (
            <div key={part.label} className="mt-3 flex flex-col gap-1">
              <Text>{part.label}</Text>
              <AnswerDetails {...part} />
            </div>
          ))
        ) : (
          <AnswerDetails givenAnswer={givenAnswer} correctAnswer={correctAnswer} isCorrect={isCorrect} />
        )}
      </div>
    </li>
  )
}
