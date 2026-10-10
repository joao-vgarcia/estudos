import Text from '@/components/atoms/Text'
import QuestionCard from '@/components/organisms/QuestionCard'
import Container from '@/components/templates/Container'
import { useGramatica } from './hook'

export default function PortuguesGramatica() {
  const { carregando, visao, onSelecionar, onAvancar } = useGramatica()

  return (
    <Container>
      <Text as="h2" variant="title">Português · Gramática</Text>
      {carregando ? (
        <Text variant="muted">Carregando...</Text>
      ) : (
        <QuestionCard {...visao} onSelecionar={onSelecionar} onAvancar={onAvancar} />
      )}
    </Container>
  )
}
