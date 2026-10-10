import TextInput from '@/components/atoms/TextInput'
import ListenButton from '@/components/molecules/ListenButton'

export default function DictationAnswer({ answer, unit, onAnswer, onListen }) {
  return (
    <div className="flex flex-col gap-5">
      <ListenButton unit={unit} onListen={onListen} />
      <TextInput label={`Escreva a ${unit}`} value={answer} onChange={onAnswer} autoFocus />
    </div>
  )
}
