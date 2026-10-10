import Input from '@/components/atoms/Input'

function toDigitsOnly(value) {
  return value.replace(/\D/g, '').replace(/^0+(?=\d)/, '')
}

export default function NumberInput({ onChange, ...inputProps }) {
  return <Input inputMode="numeric" {...inputProps} onChange={(value) => onChange(toDigitsOnly(value))} />
}
