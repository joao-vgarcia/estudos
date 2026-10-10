import Button from '@/components/atoms/Button'

const variantePorStatus = {
  idle: 'secondary',
  selected: 'selected',
}

export default function AlternativeButton({ label, status = 'idle', onClick }) {
  return (
    <Button variant={variantePorStatus[status]} onClick={onClick}>
      {label}
    </Button>
  )
}
