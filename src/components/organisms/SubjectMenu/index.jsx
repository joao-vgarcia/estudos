import Text from '@/components/atoms/Text'
import MenuItem from '@/components/molecules/MenuItem'

export default function SubjectMenu({ titulo, itens, onSelecionar }) {
  return (
    <nav className="flex flex-col gap-4">
      <Text as="h1" variant="title">{titulo}</Text>
      {itens.map((item) => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={item.ativo}
          onClick={() => onSelecionar(item.id)}
        />
      ))}
    </nav>
  )
}
