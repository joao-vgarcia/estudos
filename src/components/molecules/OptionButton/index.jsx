import Button from '@/components/atoms/Button'

export default function OptionButton({ label, isSelected = false, onClick }) {
  return (
    <Button variant={isSelected ? 'selected' : 'secondary'} onClick={onClick}>
      {label}
    </Button>
  )
}
