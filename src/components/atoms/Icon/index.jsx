import { ArrowRight, BookOpen, Calculator, Languages, Sigma } from 'lucide-react'

const icones = {
  'arrow-right': ArrowRight,
  book: BookOpen,
  calculator: Calculator,
  languages: Languages,
  sigma: Sigma,
}

export default function Icon({ name, size = 18 }) {
  const Componente = icones[name]
  return <Componente size={size} aria-hidden="true" />
}
