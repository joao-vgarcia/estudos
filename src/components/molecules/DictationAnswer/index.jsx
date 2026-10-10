import Button from '@/components/atoms/Button'
import TextInput from '@/components/atoms/TextInput'

export default function DictationAnswer({ answer, onAnswer, onListen }) {
  return (
    <div className="flex flex-col gap-5">
      <Button variant="secondary" startIcon="volume-2" onClick={onListen}>
        Ouvir palavra
      </Button>
      <TextInput label="Escreva a palavra" value={answer} onChange={onAnswer} autoFocus />
    </div>
  )
}
