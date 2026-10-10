import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import Container from '@/components/templates/Container'
import { useTabuada } from './hook'

export default function MatematicaTabuada() {
  const { carregando, visao, onSelecionar, onAvancar } = useTabuada()

  return (
    <Container>
      <Text as="h2" variant="title">Matemática · Tabuada</Text>
      {carregando ? (
        <Text variant="muted">Carregando...</Text>
      ) : (
        <QuestionCard {...visao} onSelecionar={onSelecionar} onAvancar={onAvancar} />
      )}
    </Container>
  )
}
