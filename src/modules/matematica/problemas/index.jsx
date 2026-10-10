import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import Container from '@/components/templates/Container'
import { useProblemas } from './hook'

export default function MatematicaProblemas() {
  const { facil, dificil } = useProblemas()

  return (
    <>
      <Container>
        <Text as="h2" variant="title">Matemática · Problemas fáceis</Text>
        {facil.carregando ? (
          <Text variant="muted">Carregando...</Text>
        ) : (
          <QuestionCard {...facil.visao} onSelecionar={facil.onSelecionar} onAvancar={facil.onAvancar} />
        )}
      </Container>
      <Container>
        <Text as="h2" variant="title">Matemática · Problemas difíceis</Text>
        {dificil.carregando ? (
          <Text variant="muted">Carregando...</Text>
        ) : (
          <QuestionCard {...dificil.visao} onSelecionar={dificil.onSelecionar} onAvancar={dificil.onAvancar} />
        )}
      </Container>
    </>
  )
}
