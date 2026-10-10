import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'

export default function ResultItem({ enunciado, respostaDada, respostaCerta, acertou }) {
  return (
    <li className="flex items-start gap-4 rounded-3xl bg-black/10 p-5">
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${acertou ? 'bg-positivo' : 'bg-negativo'}`}
      >
        <Icon name={acertou ? 'check' : 'x'} size={28} />
        <span className="sr-only">{acertou ? 'Acertou' : 'Errou'}</span>
      </span>
      <div className="flex flex-col gap-1">
        <Text>{enunciado}</Text>
        <Text variant="muted">Sua resposta: {respostaDada}</Text>
        {!acertou && <Text variant="muted">Resposta certa: {respostaCerta}</Text>}
      </div>
    </li>
  )
}
