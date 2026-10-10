import SubjectMenu from '@/components/organisms/SubjectMenu'
import PageLayout from '@/components/templates/PageLayout'
import InglesVocabulario from '@/modules/ingles/vocabulario'
import MatematicaProblemas from '@/modules/matematica/problemas'
import MatematicaTabuada from '@/modules/matematica/tabuada'
import PortuguesGramatica from '@/modules/portugues/gramatica'
import { useMain } from './hook'

// Único lugar que conhece os módulos secundários.
const modulos = {
  'portugues-gramatica': PortuguesGramatica,
  'matematica-tabuada': MatematicaTabuada,
  'matematica-problemas': MatematicaProblemas,
  'ingles-vocabulario': InglesVocabulario,
}

export default function MainModule() {
  const { moduloAtivo, menu, onSelecionarModulo } = useMain()
  const ModuloAtivo = modulos[moduloAtivo]

  return (
    <PageLayout menu={<SubjectMenu titulo="Estudos" itens={menu} onSelecionar={onSelecionarModulo} />}>
      <ModuloAtivo />
    </PageLayout>
  )
}
