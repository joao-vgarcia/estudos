import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import Accordion from '@/components/molecules/Accordion'
import ResultItem from '@/components/molecules/ResultItem'
import Celebration from '@/components/organisms/Celebration'
import { formatCount } from '@/utils/text'

function formatBonusCount(count) {
  return formatCount(count, 'pergunta bônus', 'perguntas bônus')
}

function BonusMessage({ bonusOffer, bonusResult }) {
  if (bonusOffer) {
    return (
      <Text variant="muted">
        Quer ganhar mais tempo? Responda {formatBonusCount(bonusOffer.questionCount)} e ganhe até{' '}
        {`+${bonusOffer.reward}`}. Só dá para tentar uma vez!
      </Text>
    )
  }
  if (bonusResult?.reward) {
    return (
      <Text variant="muted">
        Você acertou {bonusResult.correctCount} de {formatBonusCount(bonusResult.total)} e ganhou +{bonusResult.reward}!
      </Text>
    )
  }
  if (bonusResult) return <Text variant="muted">Não foi dessa vez: você não acertou o bônus.</Text>
  return null
}

function PassedActions({ nextLevelTitle, bonusOffer, bonusResult, onContinue, onBonus, onMenu }) {
  return (
    <div className="flex flex-col gap-5">
      <BonusMessage bonusOffer={bonusOffer} bonusResult={bonusResult} />
      {nextLevelTitle && (
        <Text variant="muted">Quer continuar o desafio? O próximo é o nível {nextLevelTitle}.</Text>
      )}
      <div className="grid auto-cols-fr grid-flow-col gap-5">
        <Button variant="negative" endIcon="house" onClick={onMenu}>
          Voltar ao menu
        </Button>
        {nextLevelTitle && (
          <Button variant="primary" endIcon="arrow-right" onClick={onContinue}>
            Continuar desafio
          </Button>
        )}
      </div>
      {bonusOffer && (
        <Button variant="secondary" endIcon="gift" onClick={onBonus}>
          {bonusOffer.questionCount === 1 ? 'Pergunta bônus' : 'Perguntas bônus'}
        </Button>
      )}
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

function ResultSection({ title, correctCount, total, items }) {
  return (
    <Accordion
      title={
        <Text as="h3" variant="subtitle">
          {title} · {correctCount} de {total}
        </Text>
      }
    >
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <ResultItem key={item.id} {...item} />
        ))}
      </ul>
    </Accordion>
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
  bonusOffer,
  bonusResult,
  nextLevelTitle,
  retryCount,
  onContinue,
  onRetry,
  onBonus,
  onMenu,
}) {
  return (
    <div className="flex flex-col gap-8">
      {hasPassed ? (
        <>
          <Celebration {...celebration} reward={reward} correctCount={correctCount} total={total} />
          <PassedActions
            nextLevelTitle={nextLevelTitle}
            bonusOffer={bonusOffer}
            bonusResult={bonusResult}
            onContinue={onContinue}
            onBonus={onBonus}
            onMenu={onMenu}
          />
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
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <ResultSection key={section.subjectId} {...section} />
        ))}
        {bonusResult && <ResultSection title="Bônus" {...bonusResult} />}
      </div>
    </div>
  )
}
