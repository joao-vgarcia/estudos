import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import DictationAnswer from '@/components/molecules/DictationAnswer'
import MultipleChoiceAnswer from '@/components/molecules/MultipleChoiceAnswer'
import NumberAnswer from '@/components/molecules/NumberAnswer'
import { QUESTION_TYPES } from '@/constants/quiz'

const answerFieldByType = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: MultipleChoiceAnswer,
  [QUESTION_TYPES.NUMBER]: NumberAnswer,
  [QUESTION_TYPES.DICTATION]: DictationAnswer,
}

export default function QuestionCard({
  id,
  type,
  prompt,
  hint,
  options,
  answer,
  position,
  total,
  canAdvance,
  isLastQuestion,
  onAnswer,
  onListen,
  onNext,
}) {
  const AnswerField = answerFieldByType[type]

  const handleSubmit = (event) => {
    event.preventDefault()
    onNext()
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Text variant="muted">Questão {position} de {total}</Text>
      <div className="flex flex-col gap-2">
        <Text as="h3" variant="subtitle">{prompt}</Text>
        {hint && <Text variant="muted">{hint}</Text>}
      </div>
      <AnswerField key={id} options={options} answer={answer} onAnswer={onAnswer} onListen={onListen} />
      <div className="flex justify-end">
        <Button type="submit" variant="primary" endIcon="arrow-right" disabled={!canAdvance}>
          {isLastQuestion ? 'Ver resultado' : 'Próxima'}
        </Button>
      </div>
    </form>
  )
}
