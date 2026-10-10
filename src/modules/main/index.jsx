import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import QuizResult from '@/components/organisms/QuizResult'
import StartPanel from '@/components/organisms/StartPanel'
import Container from '@/components/templates/Container'
import PageLayout from '@/components/templates/PageLayout'
import { STEPS } from '@/constants/quiz'
import { useMain } from './hook'

export default function MainModule() {
  const {
    step,
    isLoading,
    questionView,
    result,
    onStart,
    onContinue,
    onRetry,
    onBonus,
    onAnswer,
    onListen,
    onNext,
    onExit,
  } = useMain()

  return (
    <PageLayout>
      {step === STEPS.START && <StartPanel title="Estudos" onStart={onStart} />}

      {step === STEPS.QUESTIONS && (
        <Container subjectId={questionView?.subjectId} difficulty={questionView?.difficulty}>
          {isLoading ? (
            <Text variant="muted">Carregando...</Text>
          ) : (
            <>
              <Text as="h2" variant="title">{questionView.subject}</Text>
              <QuestionCard {...questionView} onAnswer={onAnswer} onListen={onListen} onNext={onNext} />
            </>
          )}
        </Container>
      )}

      {step === STEPS.RESULT && (
        <Container>
          <Text as="h2" variant="title">Nível {result.levelTitle}</Text>
          <QuizResult
            {...result}
            onContinue={onContinue}
            onRetry={onRetry}
            onBonus={onBonus}
            onRestart={onStart}
            onExit={onExit}
          />
        </Container>
      )}
    </PageLayout>
  )
}
