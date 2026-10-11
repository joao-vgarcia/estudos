import Text from '@/components/atoms/Text'
import AlertDialog from '@/components/molecules/AlertDialog'
import QuestionTimer from '@/components/molecules/QuestionTimer'
import QuestionCard from '@/components/organisms/QuestionCard'
import QuizResult from '@/components/organisms/QuizResult'
import StartPanel from '@/components/organisms/StartPanel'
import Container from '@/components/templates/Container'
import PageLayout from '@/components/templates/PageLayout'
import { LEISURE_OVER_ALARM } from '@/constants/leisure'
import { STEPS } from '@/constants/quiz'
import { useMain } from './hook'

export default function MainModule() {
  const {
    step,
    isLoading,
    questionView,
    questionTimer,
    result,
    levelOptions,
    leisure,
    isLeisureOver,
    awayNotice,
    onStart,
    onMenu,
    onStartLeisure,
    onPauseLeisure,
    onDismissLeisureOver,
    onDismissAwayNotice,
    onContinue,
    onRetry,
    onBonus,
    onAnswer,
    onListen,
    onNext,
  } = useMain()

  return (
    <PageLayout>
      {step === STEPS.START && (
        <StartPanel
          title="Estudos"
          leisure={leisure}
          levels={levelOptions}
          onStart={onStart}
          onStartLeisure={onStartLeisure}
          onPauseLeisure={onPauseLeisure}
        />
      )}

      {step === STEPS.QUESTIONS && (
        <div className="flex flex-col gap-4">
          {questionTimer && <QuestionTimer {...questionTimer} />}
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
        </div>
      )}

      {step === STEPS.RESULT && (
        <Container>
          <Text as="h2" variant="title">Nível {result.levelTitle}</Text>
          <QuizResult
            {...result}
            onContinue={onContinue}
            onRetry={onRetry}
            onBonus={onBonus}
            onMenu={onMenu}
          />
        </Container>
      )}

      {isLeisureOver && (
        <AlertDialog
          emoji="⏰"
          title={LEISURE_OVER_ALARM.title}
          messages={[LEISURE_OVER_ALARM.body]}
          actionLabel="Entendi"
          onAction={onDismissLeisureOver}
        />
      )}

      {awayNotice && (
        <AlertDialog
          emoji="👀"
          title="Você saiu do questionário!"
          messages={awayNotice}
          actionLabel="Voltar ao questionário"
          onAction={onDismissAwayNotice}
        />
      )}
    </PageLayout>
  )
}
