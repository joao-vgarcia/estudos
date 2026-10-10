import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import ResultItem from '@/components/molecules/ResultItem'
import Celebration from '@/components/organisms/Celebration'
import { formatCount } from '@/utils/text'

function PassedActions({ nextLevelTitle, onContinue, onRestart, onExit }) {
  return (
    <div className="flex flex-col gap-5">
      {nextLevelTitle && (
        <Text variant="muted">Quer continuar o desafio? O próximo é o nível {nextLevelTitle}.</Text>
      )}
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:justify-end">
        <Button variant="negative" endIcon="log-out" onClick={onExit}>
          Sair
        </Button>
        {nextLevelTitle ? (
          <Button variant="primary" endIcon="arrow-right" onClick={onContinue}>
            Continuar desafio
          </Button>
        ) : (
          <Button variant="primary" endIcon="rotate-ccw" onClick={onRestart}>
            Recomeçar
          </Button>
        )}
      </div>
    </div>
  )
}

function RetryActions({ levelTitle, correctCount, total, retryCount, onRetry }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Text variant="subtitle">Você acertou {correctCount} de {total}.</Text>
        <Text variant="muted">
          Para passar do nível {levelTitle}, acerte pelo menos 90% em cada matéria. Responda de novo só o que faltou!
        </Text>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" endIcon="rotate-ccw" onClick={onRetry}>
          Refazer {formatCount(retryCount, 'pergunta', 'perguntas')}
        </Button>
      </div>
    </div>
  )
}

export default function QuizResult({
  levelTitle,
  correctCount,
  total,
  sections,
  hasPassed,
  reward,
  celebration,
  nextLevelTitle,
  retryCount,
  onContinue,
  onRetry,
  onRestart,
  onExit,
}) {
  return (
    <div className="flex flex-col gap-8">
      {hasPassed ? (
        <>
          <Celebration {...celebration} reward={reward} correctCount={correctCount} total={total} />
          <PassedActions nextLevelTitle={nextLevelTitle} onContinue={onContinue} onRestart={onRestart} onExit={onExit} />
        </>
      ) : (
        <RetryActions
          levelTitle={levelTitle}
          correctCount={correctCount}
          total={total}
          retryCount={retryCount}
          onRetry={onRetry}
        />
      )}
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
        </section>
      ))}
    </div>
  )
}
