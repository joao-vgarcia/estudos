import TextInput from '@/components/atoms/TextInput'

export default function TextAnswer({ answer, onAnswer }) {
  return <TextInput label="Escreva a resposta" value={answer} onChange={onAnswer} autoFocus />
}
