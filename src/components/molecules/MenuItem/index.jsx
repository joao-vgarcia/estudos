import Icon from '@/components/atoms/Icon'

export default function MenuItem({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-200'
      }`}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  )
}
