import { ArrowRight, Check, ChevronDown, Gift, House, Lightbulb, Pause, Play, RotateCcw, Volume2, X } from 'lucide-react'

const icons = {
  'arrow-right': ArrowRight,
  check: Check,
  'chevron-down': ChevronDown,
  gift: Gift,
  house: House,
  lightbulb: Lightbulb,
  pause: Pause,
  play: Play,
  'rotate-ccw': RotateCcw,
  'volume-2': Volume2,
  x: X,
}

export default function Icon({ name, size = 18 }) {
  const IconComponent = icons[name]
  return <IconComponent size={size} aria-hidden="true" />
}
