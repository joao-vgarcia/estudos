import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import QuizResult from '@/components/organisms/QuizResult'
import StartPanel from '@/components/organisms/StartPanel'
import Container from '@/components/templates/Container'
import PageLayout from '@/components/templates/PageLayout'
import { useMain } from './hook'

export default function MainModule() {
  const { etapa, carregando, visao, resultado, onComecar, onResponder, onOuvir, onAvancar, onSair } = useMain()

  if (etapa === 'inicio') {
    return (
      <PageLayout>
        <StartPanel titulo="Estudos" onComecar={onComecar} />
      </PageLayout>
    )
  }

  if (etapa === 'resultado') {
    return (
      <PageLayout>
        <Container>
          <Text as="h2" variant="title">Resultado</Text>
          <QuizResult {...resultado} onRecomecar={onComecar} onSair={onSair} />
        </Container>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Container>
        {carregando ? (
          <Text variant="muted">Carregando...</Text>
        ) : (
          <>
            <Text as="h2" variant="title">{visao.titulo}</Text>
            <QuestionCard {...visao} onResponder={onResponder} onOuvir={onOuvir} onAvancar={onAvancar} />
          </>
        )}
      </Container>
    </PageLayout>
  )
}
