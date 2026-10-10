import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'

export default function StartPanel({ titulo, onComecar }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <Text as="h1" variant="title">{titulo}</Text>
      <Button variant="primary" onClick={onComecar}>
        Começar
        <Icon name="play" size={32} />
      </Button>
    </div>
  )
}
