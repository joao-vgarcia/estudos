import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import Container from '@/components/templates/Container'
import { useVocabulario } from './hook'

export default function InglesVocabulario() {
  const { carregando, visao, onSelecionar, onAvancar } = useVocabulario()

  return (
    <Container>
      <Text as="h2" variant="title">Inglês · Vocabulário</Text>
      {carregando ? (
        <Text variant="muted">Carregando...</Text>
      ) : (
        <QuestionCard {...visao} onSelecionar={onSelecionar} onAvancar={onAvancar} />
      )}
    </Container>
  )
}
