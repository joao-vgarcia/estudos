import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import ResultItem from '@/components/molecules/ResultItem'

export default function QuizResult({ correctCount, total, sections, canExit, onRestart, onExit, onRetry }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Text variant="subtitle">Você acertou {correctCount} de {total}.</Text>
        {!canExit && <Text variant="muted">Para sair, acerte mais de 90% em cada matéria.</Text>}
      </div>
      {sections.map((section) => (
        <section key={section.subjectId} className="flex flex-col gap-4">
          <Text as="h3" variant="subtitle">
            {section.title} · {section.correctCount} de {section.total}
          </Text>
          <ul className="flex flex-col gap-3">
            {section.items.map((item) => (
              <ResultItem key={item.id} {...item} />
            ))}
          </ul>
          {section.canRetry && (
            <div className="flex justify-end">
              <Button
                variant={section.hasPassed ? 'secondary' : 'primary'}
                endIcon="rotate-ccw"
                onClick={() => onRetry(section.subjectId)}
              >
                Refazer {section.title}
              </Button>
            </div>
          )}
        </section>
      ))}
      {canExit && (
        <div className="flex flex-col-reverse gap-5 sm:flex-row sm:justify-end">
          <Button variant="negative" endIcon="log-out" onClick={onExit}>
            Sair
          </Button>
          <Button variant="primary" endIcon="rotate-ccw" onClick={onRestart}>
            Recomeçar
          </Button>
        </div>
      )}
    </div>
  )
}
