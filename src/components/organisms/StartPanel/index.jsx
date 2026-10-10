import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'

export default function StartPanel({ title, onStart }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <Text as="h1" variant="title">{title}</Text>
      <Button variant="primary" endIcon="play" onClick={onStart}>
        Começar
      </Button>
    </div>
  )
}
