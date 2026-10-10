import Icon from '@/components/atoms/Icon'

export default function MenuItem({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-xl font-semibold text-white transition-colors focus-visible:outline-4 focus-visible:outline-white ${
        active ? 'bg-white/25 ring-4 ring-white' : 'hover:bg-white/15'
      }`}
    >
      <Icon name={icon} size={28} />
      <span>{label}</span>
    </button>
  )
}
