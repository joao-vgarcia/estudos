import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import DictationAnswer from '@/components/molecules/DictationAnswer'
import ImageChoiceAnswer from '@/components/molecules/ImageChoiceAnswer'
import ListenButton from '@/components/molecules/ListenButton'
import MultiNumberAnswer from '@/components/molecules/MultiNumberAnswer'
import MultipleChoiceAnswer from '@/components/molecules/MultipleChoiceAnswer'
import NumberAnswer from '@/components/molecules/NumberAnswer'
import QuestionMedia from '@/components/molecules/QuestionMedia'
import TrueFalseAnswer from '@/components/molecules/TrueFalseAnswer'
import { QUESTION_TYPES } from '@/constants/quiz'

const answerFieldByType = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: MultipleChoiceAnswer,
  [QUESTION_TYPES.NUMBER]: NumberAnswer,
  [QUESTION_TYPES.DICTATION]: DictationAnswer,
  [QUESTION_TYPES.IMAGE_CHOICE]: ImageChoiceAnswer,
  [QUESTION_TYPES.TRUE_FALSE]: TrueFalseAnswer,
}

export default function QuestionCard({
  id,
  type,
  prompt,
  hint,
  image,
  word,
  imageGrid,
  options,
  answer,
  parts,
  dictationUnit,
  canListen,
  levelTitle,
  isRetry,
  position,
  total,
  canAdvance,
  isLastQuestion,
  onAnswer,
  onListen,
  onNext,
}) {
  const AnswerField = parts ? MultiNumberAnswer : answerFieldByType[type]

  const handleSubmit = (event) => {
    event.preventDefault()
    onNext()
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Text variant="muted">
        Nível {levelTitle}
        {isRetry && ' · Revisão'} · Questão {position} de {total}
      </Text>
      <div className="flex flex-col gap-2">
        <Text as="h3" variant="subtitle">{prompt}</Text>
        {hint && <Text variant="muted">{hint}</Text>}
      </div>
      <QuestionMedia key={`media-${id}`} image={image} word={word} imageGrid={imageGrid} />
      {canListen && <ListenButton onListen={onListen} />}
      <AnswerField
        key={id}
        options={options}
        answer={answer}
        parts={parts}
        unit={dictationUnit}
        onAnswer={onAnswer}
        onListen={onListen}
      />
      <div className="flex justify-end">
        <Button type="submit" variant="primary" endIcon="arrow-right" disabled={!canAdvance}>
          {isLastQuestion ? 'Ver resultado' : 'Próxima'}
        </Button>
      </div>
    </form>
  )
}
