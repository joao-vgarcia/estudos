import Button from '@/components/atoms/Button'

export default function ListenButton({ unit = 'palavra', onListen }) {
  return (
    <Button variant="secondary" startIcon="volume-2" onClick={onListen}>
      Ouvir {unit}
    </Button>
  )
}
