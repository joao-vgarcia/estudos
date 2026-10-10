import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import ResultItem from '@/components/molecules/ResultItem'

export default function QuizResult({ placar, secoes, onRecomecar, onSair }) {
  return (
    <div className="flex flex-col gap-8">
      <Text variant="subtitle">{placar}</Text>
      {secoes.map((secao) => (
        <section key={secao.titulo} className="flex flex-col gap-4">
          <Text as="h3" variant="subtitle">{secao.titulo} · {secao.placar}</Text>
          <ul className="flex flex-col gap-3">
            {secao.itens.map((item, i) => (
              <ResultItem key={i} {...item} />
            ))}
          </ul>
        </section>
      ))}
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:justify-end">
        <Button variant="negative" onClick={onSair}>
          Sair
          <Icon name="log-out" size={32} />
        </Button>
        <Button variant="primary" onClick={onRecomecar}>
          Recomeçar
          <Icon name="rotate-ccw" size={32} />
        </Button>
      </div>
    </div>
  )
}
