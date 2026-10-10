import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import NumberInput from '@/components/atoms/NumberInput'
import Text from '@/components/atoms/Text'
import TextInput from '@/components/atoms/TextInput'
import AlternativeButton from '@/components/molecules/AlternativeButton'

export default function QuestionCard({
  enunciado,
  tipo,
  alternativas,
  resposta,
  fala,
  placar,
  podeAvancar,
  textoBotao,
  onResponder,
  onOuvir,
  onAvancar,
}) {
  const enviar = (evento) => {
    evento.preventDefault()
    onAvancar()
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={enviar}>
      <Text variant="muted">{placar}</Text>
      <Text as="h3" variant="subtitle">{enunciado}</Text>
      {tipo === 'numero' ? (
        <NumberInput key={enunciado} label="Sua resposta" value={resposta} onChange={onResponder} autoFocus />
      ) : tipo === 'ditado' ? (
        <div className="flex flex-col gap-5">
          <Button variant="secondary" onClick={onOuvir}>
            <Icon name="volume-2" size={32} />
            Ouvir palavra
          </Button>
          <TextInput key={fala} label="Escreva a palavra" value={resposta} onChange={onResponder} autoFocus />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {alternativas.map((alternativa) => (
            <AlternativeButton
              key={alternativa.label}
              label={alternativa.label}
              status={alternativa.status}
              onClick={() => onResponder(alternativa.label)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={!podeAvancar}>
          {textoBotao}
          <Icon name="arrow-right" size={32} />
        </Button>
      </div>
    </form>
  )
}
