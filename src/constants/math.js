import { formatCount } from '@/utils/text'

export const MATH_OPERATIONS = {
  ADDITION: 'addition',
  SUBTRACTION: 'subtraction',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
}

export const ADDITION_STATEMENTS = [
  (left, right) => `Pedro tinha ${formatCount(left, 'carrinho', 'carrinhos')} e ganhou mais ${right} de aniversário. Com quantos carrinhos Pedro ficou?`,
  (left, right) => `Na cesta havia ${formatCount(left, 'laranja', 'laranjas')} e a vovó colocou mais ${right}. Quantas laranjas há na cesta agora?`,
  (left, right) => `Carla leu ${formatCount(left, 'página', 'páginas')} pela manhã e mais ${right} à tarde. Quantas páginas Carla leu no total?`,
  (left, right) => `Um time marcou ${formatCount(left, 'gol', 'gols')} no primeiro jogo e ${right} no segundo. Quantos gols o time marcou ao todo?`,
  (left, right) => `Bia tinha ${formatCount(left, 'real', 'reais')} no cofrinho e a mãe deu mais ${right}. Quantos reais Bia tem agora?`,
  (left, right) => `Gabriel tinha ${formatCount(left, 'lápis de cor', 'lápis de cor')} e ganhou mais ${right} da tia. Quantos lápis de cor Gabriel tem agora?`,
  (left, right) => `No aquário havia ${formatCount(left, 'peixe', 'peixes')} e Helena colocou mais ${right}. Quantos peixes há no aquário agora?`,
  (left, right) => `Miguel fez ${formatCount(left, 'desenho', 'desenhos')} na segunda-feira e mais ${right} na terça-feira. Quantos desenhos Miguel fez ao todo?`,
  (left, right) => `Na festa, Laura encheu ${formatCount(left, 'balão', 'balões')} e o pai dela encheu mais ${right}. Quantos balões eles encheram ao todo?`,
  (left, right) => `Davi guardou ${formatCount(left, 'moeda', 'moedas')} no cofrinho em janeiro e mais ${right} em fevereiro. Quantas moedas Davi guardou?`,
  (left, right) => `Alice ganhou ${formatCount(left, 'livro', 'livros')} da avó e mais ${right} do tio. Quantos livros Alice ganhou?`,
  (left, right) => `No sítio havia ${formatCount(left, 'galinha', 'galinhas')} e o fazendeiro comprou mais ${right}. Quantas galinhas há no sítio agora?`,
  (left, right) => `Theo deu ${formatCount(left, 'volta', 'voltas')} na quadra pela manhã e mais ${right} à tarde. Quantas voltas Theo deu ao todo?`,
  (left, right) => `Clara colheu ${formatCount(left, 'morango', 'morangos')} e a irmã dela colheu mais ${right}. Quantos morangos as duas colheram juntas?`,
  (left, right) => `A turma plantou ${formatCount(left, 'flor', 'flores')} no jardim da escola e mais ${right} na praça. Quantas flores a turma plantou?`,
]

export const SUBTRACTION_STATEMENTS = [
  (left, right) => `João tem ${left} balas e come ${right} delas. Quantas balas João ainda tem?`,
  (left, right) => `Maria tinha ${left} figurinhas e deu ${right} delas para a amiga. Com quantas figurinhas Maria ficou?`,
  (left, right) => `Uma árvore tinha ${left} maçãs e Pedro colheu ${right} delas. Quantas maçãs ficaram na árvore?`,
  (left, right) => `Ana tinha ${left} reais e gastou ${right} em um lanche. Quantos reais sobraram?`,
  (left, right) => `Lucas tinha ${left} bolinhas de gude e perdeu ${right} delas no recreio. Quantas bolinhas de gude Lucas ainda tem?`,
  (left, right) => `Havia ${left} pássaros em uma árvore. Um barulho espantou ${right} deles. Quantos pássaros ficaram na árvore?`,
  (left, right) => `Uma padaria fez ${left} pães e vendeu ${right} deles pela manhã. Quantos pães sobraram?`,
  (left, right) => `Gustavo tinha ${left} balões na festa, mas estourou ${right} deles sem querer. Quantos balões sobraram?`,
  (left, right) => `Um livro tem ${left} páginas. Marina já leu ${right} delas. Quantas páginas faltam para Marina terminar o livro?`,
  (left, right) => `Na cozinha havia ${left} ovos e a cozinheira usou ${right} deles para fazer bolos. Quantos ovos sobraram?`,
  (left, right) => `A escola comprou ${left} lápis e já entregou ${right} deles aos alunos. Quantos lápis ainda não foram entregues?`,
  (left, right) => `Lorena encheu um pote com ${left} biscoitos e os amigos comeram ${right} deles no lanche. Quantos biscoitos ficaram no pote?`,
  (left, right) => `Um fazendeiro tinha ${left} ovelhas e vendeu ${right} delas na feira. Quantas ovelhas o fazendeiro ainda tem?`,
  (left, right) => `Caio precisava pintar ${left} desenhos e já pintou ${right} deles. Quantos desenhos Caio ainda precisa pintar?`,
  (left, right) => `Uma floricultura tinha ${left} rosas e vendeu ${right} delas no Dia das Mães. Quantas rosas sobraram na floricultura?`,
]

export const MULTIPLICATION_STATEMENTS = [
  (left, right) => `Tiago comprou ${left} pacotes com ${right} figurinhas cada. Quantas figurinhas Tiago comprou?`,
  (left, right) => `Uma sala tem ${left} fileiras com ${right} cadeiras em cada uma. Quantas cadeiras há na sala?`,
  (left, right) => `Júlia fez ${left} pulseiras e usou ${right} miçangas em cada uma. Quantas miçangas Júlia usou?`,
  (left, right) => `Durante ${left} dias, Rafael leu ${right} páginas por dia. Quantas páginas Rafael leu ao todo?`,
  (left, right) => `No estacionamento há ${left} filas com ${right} carros em cada. Quantos carros há no estacionamento?`,
  (left, right) => `Isabela tem ${left} caixas com ${right} bombons em cada uma. Quantos bombons Isabela tem?`,
  (left, right) => `Em uma árvore há ${left} galhos com ${right} passarinhos em cada um. Quantos passarinhos há na árvore?`,
  (left, right) => `Bernardo plantou ${left} fileiras com ${right} pés de alface em cada uma. Quantos pés de alface Bernardo plantou?`,
  (left, right) => `A professora formou ${left} grupos com ${right} alunos em cada um. Quantos alunos há na turma?`,
  (left, right) => `Valentina tem ${left} vasos com ${right} flores em cada um. Quantas flores Valentina tem?`,
  (left, right) => `Um prédio tem ${left} andares com ${right} janelas em cada andar. Quantas janelas o prédio tem?`,
  (left, right) => `Lara arrumou os livros em ${left} prateleiras, com ${right} livros em cada uma. Quantos livros Lara arrumou?`,
  (left, right) => `Um trem tem ${left} vagões com ${right} passageiros em cada um. Quantos passageiros há no trem?`,
  (left, right) => `Cecília fez ${left} bolos e colocou ${right} morangos em cada um. Quantos morangos Cecília usou?`,
  (left, right) => `Mateus montou ${left} torres com ${right} blocos em cada uma. Quantos blocos Mateus usou?`,
]

export const DIVISION_STATEMENTS = [
  (left, right) => `A professora tem ${left} lápis e vai dividir igualmente entre ${right} alunos. Quantos lápis cada aluno vai receber?`,
  (left, right) => `Vovó fez ${left} biscoitos e quer colocar a mesma quantidade em ${right} potes. Quantos biscoitos vão em cada pote?`,
  (left, right) => `Na aula de educação física, ${left} crianças vão formar ${right} times iguais. Quantas crianças ficam em cada time?`,
  (left, right) => `Sofia tem ${left} figurinhas e vai colar a mesma quantidade em ${right} páginas do álbum. Quantas figurinhas ela vai colar em cada página?`,
  (left, right) => `Um pacote com ${left} balas será dividido igualmente entre ${right} amigos. Quantas balas cada amigo vai ganhar?`,
  (left, right) => `Um fazendeiro recolheu ${left} ovos e vai guardar ${right} em cada caixa. Quantas caixas ele vai usar?`,
  (left, right) => `Beatriz tem ${left} flores e quer fazer ${right} buquês iguais. Quantas flores vão em cada buquê?`,
  (left, right) => `Um grupo de ${left} turistas vai passear em ${right} vans, com o mesmo número de pessoas em cada uma. Quantas pessoas vão em cada van?`,
  (left, right) => `Nicolas tem ${left} carrinhos e quer guardá-los em ${right} caixas, com a mesma quantidade em cada. Quantos carrinhos vão em cada caixa?`,
  (left, right) => `A mãe de Yasmin fez ${left} brigadeiros para a festa e vai colocar ${right} em cada pratinho. Quantos pratinhos ela vai usar?`,
  (left, right) => `Um rolo de fita tem ${left} metros e vai ser cortado em ${right} pedaços do mesmo tamanho. Quantos metros terá cada pedaço?`,
  (left, right) => `O treinador tem ${left} bolas para dividir igualmente entre ${right} turmas. Quantas bolas cada turma vai receber?`,
  (left, right) => `Otávio leu um livro de ${left} páginas em ${right} dias, lendo a mesma quantidade todo dia. Quantas páginas Otávio leu por dia?`,
  (left, right) => `Um pomar tem ${left} árvores plantadas em ${right} fileiras iguais. Quantas árvores há em cada fileira?`,
  (left, right) => `Murilo juntou ${left} reais e quer comprar brinquedos que custam ${right} reais cada. Quantos brinquedos Murilo consegue comprar?`,
]
