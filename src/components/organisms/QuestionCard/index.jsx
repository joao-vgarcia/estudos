import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import AlternativeButton from '@/components/molecules/AlternativeButton'

export default function QuestionCard({
  enunciado,
  alternativas,
  placar,
  podeAvancar,
  textoBotao,
  onSelecionar,
  onAvancar,
}) {
  return (
    <div className="flex flex-col gap-8">
      <Text variant="muted">{placar}</Text>
      <Text as="h3" variant="subtitle">{enunciado}</Text>
      <div className="grid gap-5 sm:grid-cols-2">
        {alternativas.map((alternativa) => (
          <AlternativeButton
            key={alternativa.label}
            label={alternativa.label}
            status={alternativa.status}
            onClick={() => onSelecionar(alternativa.label)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="primary" disabled={!podeAvancar} onClick={onAvancar}>
          {textoBotao}
          <Icon name="arrow-right" size={32} />
        </Button>
      </div>
    </div>
  )
}
