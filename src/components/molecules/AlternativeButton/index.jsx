import Button from '@/components/atoms/Button'

const variantePorStatus = {
  idle: 'secondary',
  correct: 'correct',
  wrong: 'wrong',
  dimmed: 'dimmed',
}

export default function AlternativeButton({ label, status = 'idle', onClick }) {
  return (
    <Button variant={variantePorStatus[status]} onClick={onClick}>
      {label}
    </Button>
  )
}
