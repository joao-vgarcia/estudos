import Button from '@/components/atoms/Button'

export default function OptionButton({ label, startIcon, isSelected = false, onClick }) {
  return (
    <Button variant={isSelected ? 'selected' : 'secondary'} startIcon={startIcon} onClick={onClick}>
      {label}
    </Button>
  )
}
