import NumberInput from '@/components/atoms/NumberInput'

export default function NumberAnswer({ answer, onAnswer }) {
  return <NumberInput label="Sua resposta" value={answer} onChange={onAnswer} autoFocus />
}
