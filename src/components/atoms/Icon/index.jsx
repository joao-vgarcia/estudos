import { ArrowRight, Check, LogOut, Play, RotateCcw, Volume2, X } from 'lucide-react'

const icones = {
  'arrow-right': ArrowRight,
  check: Check,
  'log-out': LogOut,
  play: Play,
  'rotate-ccw': RotateCcw,
  'volume-2': Volume2,
  x: X,
}

export default function Icon({ name, size = 18 }) {
  const Componente = icones[name]
  return <Componente size={size} aria-hidden="true" />
}
