import Input from '@/components/atoms/Input'
import { LOCALE } from '@/constants/locale'

export default function TextInput({ onChange, ...inputProps }) {
  return (
    <Input
      lang={LOCALE}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      {...inputProps}
      onChange={(value) => onChange(value.trimStart())}
    />
  )
}
