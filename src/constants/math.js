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

export const ADDITION_MULTI_STEP_STATEMENTS = [
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (start, monday, tuesday) => [start + monday, monday + tuesday, start + monday + tuesday],
    statement: (start, monday, tuesday) =>
      `Ana tinha ${start} figurinhas. Na segunda-feira ela ganhou mais ${monday} e na terça-feira ganhou mais ${tuesday}.`,
    questions: [
      'Quantas figurinhas Ana tinha depois da segunda-feira?',
      'Quantas figurinhas Ana ganhou nos dois dias?',
      'Com quantas figurinhas Ana ficou?',
    ],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (start, grandpa, aunt) => [grandpa + aunt, start + grandpa + aunt],
    statement: (start, grandpa, aunt) =>
      `Pedro tinha ${start} carrinhos. No aniversário, ele ganhou ${grandpa} do avô e ${aunt} da tia.`,
    questions: ['Quantos carrinhos Pedro ganhou no aniversário?', 'Com quantos carrinhos Pedro ficou?'],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (start, morning, afternoon) => [start + morning, morning + afternoon, start + morning + afternoon],
    statement: (start, morning, afternoon) =>
      `Na cesta havia ${start} laranjas. A vovó colocou mais ${morning} pela manhã e mais ${afternoon} à tarde.`,
    questions: [
      'Quantas laranjas havia na cesta depois da manhã?',
      'Quantas laranjas a vovó colocou ao todo?',
      'Quantas laranjas há na cesta agora?',
    ],
  },
  {
    ranges: [[5, 30], [5, 30], [5, 30]],
    solve: (morning, afternoon, night) => [morning + afternoon, morning + afternoon + night],
    statement: (morning, afternoon, night) =>
      `Carla leu ${morning} páginas pela manhã, ${afternoon} à tarde e ${night} à noite.`,
    questions: ['Quantas páginas Carla leu pela manhã e à tarde?', 'Quantas páginas Carla leu no total?'],
  },
  {
    ranges: [[2, 9], [2, 9], [2, 9]],
    solve: (first, second, third) => [first + second, first + second + third],
    statement: (first, second, third) =>
      `Um time marcou ${first} gols no primeiro jogo, ${second} no segundo e ${third} no terceiro.`,
    questions: ['Quantos gols o time marcou nos dois primeiros jogos?', 'Quantos gols o time marcou ao todo?'],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (saved, mother, father) => [mother + father, saved + mother + father],
    statement: (saved, mother, father) =>
      `Bia tinha ${saved} reais no cofrinho. A mãe deu mais ${mother} e o pai deu mais ${father}.`,
    questions: ['Quantos reais Bia ganhou dos pais?', 'Quantos reais Bia tem agora?'],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (start, gift, bought) => [start + gift, start + gift + bought],
    statement: (start, gift, bought) =>
      `Gabriel tinha ${start} lápis de cor e ganhou mais ${gift} da tia. Depois, comprou mais ${bought}.`,
    questions: ['Quantos lápis de cor Gabriel tinha depois do presente da tia?', 'Quantos lápis de cor Gabriel tem agora?'],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 20]],
    solve: (start, helena, brother) => [helena + brother, start + helena + brother],
    statement: (start, helena, brother) =>
      `No aquário havia ${start} peixes. Helena colocou mais ${helena} e o irmão dela colocou mais ${brother}.`,
    questions: ['Quantos peixes Helena e o irmão colocaram no aquário?', 'Quantos peixes há no aquário agora?'],
  },
  {
    ranges: [[2, 25], [2, 25], [2, 25]],
    solve: (monday, tuesday, wednesday) => [monday + tuesday, tuesday + wednesday, monday + tuesday + wednesday],
    statement: (monday, tuesday, wednesday) =>
      `Miguel fez ${monday} desenhos na segunda-feira, ${tuesday} na terça-feira e ${wednesday} na quarta-feira.`,
    questions: [
      'Quantos desenhos Miguel fez na segunda-feira e na terça-feira?',
      'Quantos desenhos Miguel fez na terça-feira e na quarta-feira?',
      'Quantos desenhos Miguel fez ao todo?',
    ],
  },
  {
    ranges: [[5, 30], [5, 30], [5, 30]],
    solve: (laura, father, mother) => [father + mother, laura + father + mother],
    statement: (laura, father, mother) =>
      `Na festa, Laura encheu ${laura} balões, o pai dela encheu ${father} e a mãe encheu ${mother}.`,
    questions: ['Quantos balões os pais de Laura encheram?', 'Quantos balões os três encheram ao todo?'],
  },
  {
    ranges: [[5, 30], [5, 30], [5, 30]],
    solve: (january, february, march) => [january + february, january + february + march],
    statement: (january, february, march) =>
      `Davi guardou ${january} moedas no cofrinho em janeiro, ${february} em fevereiro e ${march} em março.`,
    questions: ['Quantas moedas Davi guardou em janeiro e fevereiro?', 'Quantas moedas Davi guardou nos três meses?'],
  },
  {
    ranges: [[10, 50], [2, 20], [2, 20]],
    solve: (start, monday, friday) => [monday + friday, start + monday + friday],
    statement: (start, monday, friday) =>
      `No sítio havia ${start} galinhas. O fazendeiro comprou mais ${monday} na segunda-feira e mais ${friday} na sexta-feira.`,
    questions: ['Quantas galinhas o fazendeiro comprou?', 'Quantas galinhas há no sítio agora?'],
  },
  {
    ranges: [[2, 20], [2, 20], [2, 20]],
    solve: (morning, afternoon, night) => [morning + afternoon, afternoon + night, morning + afternoon + night],
    statement: (morning, afternoon, night) =>
      `Theo deu ${morning} voltas na quadra pela manhã, ${afternoon} à tarde e ${night} à noite.`,
    questions: [
      'Quantas voltas Theo deu pela manhã e à tarde?',
      'Quantas voltas Theo deu à tarde e à noite?',
      'Quantas voltas Theo deu ao todo?',
    ],
  },
  {
    ranges: [[5, 30], [5, 30], [5, 30]],
    solve: (clara, sister, mother) => [clara + sister, clara + sister + mother],
    statement: (clara, sister, mother) =>
      `Clara colheu ${clara} morangos, a irmã dela colheu ${sister} e a mãe colheu ${mother}.`,
    questions: ['Quantos morangos Clara e a irmã colheram juntas?', 'Quantos morangos as três colheram juntas?'],
  },
  {
    ranges: [[5, 30], [5, 30], [5, 30]],
    solve: (garden, square, library) => [garden + square, garden + square + library],
    statement: (garden, square, library) =>
      `A turma plantou ${garden} flores no jardim da escola, ${square} na praça e ${library} na frente da biblioteca.`,
    questions: ['Quantas flores a turma plantou no jardim e na praça?', 'Quantas flores a turma plantou ao todo?'],
  },
]

export const SUBTRACTION_MULTI_STEP_STATEMENTS = [
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (total, monday, tuesday) => [monday + tuesday, total - monday - tuesday],
    statement: (total, monday, tuesday) =>
      `João tinha ${total} balas e comeu ${monday} balas na segunda-feira e ${tuesday} balas na terça-feira.`,
    questions: ['Quantas balas João comeu?', 'Quantas balas João ainda tem?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (start, friend, cousin) => [friend + cousin, start - friend - cousin],
    statement: (start, friend, cousin) =>
      `Maria tinha ${start} figurinhas. Ela deu ${friend} para a amiga e ${cousin} para o primo.`,
    questions: ['Quantas figurinhas Maria deu?', 'Com quantas figurinhas Maria ficou?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (start, picked, fallen) => [picked + fallen, start - picked - fallen],
    statement: (start, picked, fallen) =>
      `Uma árvore tinha ${start} maçãs. Pedro colheu ${picked} e o vento derrubou ${fallen}.`,
    questions: ['Quantas maçãs a árvore perdeu?', 'Quantas maçãs ficaram na árvore?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (start, snack, notebook) => [snack + notebook, start - snack - notebook],
    statement: (start, snack, notebook) =>
      `Ana tinha ${start} reais. Ela gastou ${snack} em um lanche e ${notebook} em um caderno.`,
    questions: ['Quantos reais Ana gastou?', 'Quantos reais sobraram?'],
  },
  {
    ranges: [[20, 60], [2, 20], [2, 15]],
    solve: (start, lost, won) => [start - lost, start - lost + won],
    statement: (start, lost, won) =>
      `Lucas tinha ${start} bolinhas de gude. Ele perdeu ${lost} no recreio e depois ganhou ${won} de um amigo.`,
    questions: [
      'Com quantas bolinhas de gude Lucas ficou depois do recreio?',
      'Com quantas bolinhas de gude Lucas ficou no final?',
    ],
  },
  {
    ranges: [[20, 60], [2, 20], [2, 15]],
    solve: (start, scared, arrived) => [start - scared, start - scared + arrived],
    statement: (start, scared, arrived) =>
      `Havia ${start} pássaros em uma árvore. Um barulho espantou ${scared} deles e depois chegaram mais ${arrived}.`,
    questions: ['Quantos pássaros ficaram na árvore depois do barulho?', 'Quantos pássaros há na árvore agora?'],
  },
  {
    ranges: [[30, 90], [5, 30], [5, 30]],
    solve: (baked, morning, afternoon) => [morning + afternoon, baked - morning - afternoon],
    statement: (baked, morning, afternoon) =>
      `Uma padaria fez ${baked} pães. Ela vendeu ${morning} pela manhã e ${afternoon} à tarde.`,
    questions: ['Quantos pães a padaria vendeu?', 'Quantos pães sobraram?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (start, popped, given) => [start - popped, start - popped - given],
    statement: (start, popped, given) =>
      `Gustavo tinha ${start} balões na festa. Ele estourou ${popped} sem querer e deu ${given} para os amigos.`,
    questions: ['Quantos balões Gustavo tinha depois de estourar alguns?', 'Com quantos balões Gustavo ficou no final?'],
  },
  {
    ranges: [[40, 100], [5, 30], [5, 30]],
    solve: (pages, saturday, sunday) => [saturday + sunday, pages - saturday - sunday],
    statement: (pages, saturday, sunday) =>
      `Um livro tem ${pages} páginas. Marina leu ${saturday} páginas no sábado e ${sunday} no domingo.`,
    questions: ['Quantas páginas Marina leu no fim de semana?', 'Quantas páginas faltam para Marina terminar o livro?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (start, cakes, omelets) => [cakes + omelets, start - cakes - omelets],
    statement: (start, cakes, omelets) =>
      `Na cozinha havia ${start} ovos. A cozinheira usou ${cakes} para fazer bolos e ${omelets} para fazer omeletes.`,
    questions: ['Quantos ovos a cozinheira usou?', 'Quantos ovos sobraram?'],
  },
  {
    ranges: [[30, 90], [5, 30], [5, 30]],
    solve: (bought, morning, afternoon) => [morning + afternoon, bought - morning - afternoon],
    statement: (bought, morning, afternoon) =>
      `A escola comprou ${bought} lápis. Ela entregou ${morning} para a turma da manhã e ${afternoon} para a turma da tarde.`,
    questions: ['Quantos lápis a escola entregou?', 'Quantos lápis ainda não foram entregues?'],
  },
  {
    ranges: [[20, 60], [2, 20], [2, 15]],
    solve: (start, eaten, added) => [start - eaten, start - eaten + added],
    statement: (start, eaten, added) =>
      `Lorena encheu um pote com ${start} biscoitos. Os amigos comeram ${eaten} no lanche e depois ela colocou mais ${added} no pote.`,
    questions: ['Quantos biscoitos ficaram no pote depois do lanche?', 'Quantos biscoitos há no pote agora?'],
  },
  {
    ranges: [[20, 60], [2, 20], [2, 15]],
    solve: (start, sold, born) => [start - sold, start - sold + born],
    statement: (start, sold, born) =>
      `Um fazendeiro tinha ${start} ovelhas. Ele vendeu ${sold} na feira e depois nasceram ${born} ovelhinhas.`,
    questions: ['Quantas ovelhas o fazendeiro tinha depois da feira?', 'Quantas ovelhas o fazendeiro tem agora?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 15]],
    solve: (total, monday, tuesday) => [total - monday, monday + tuesday, total - monday - tuesday],
    statement: (total, monday, tuesday) =>
      `Caio precisava pintar ${total} desenhos. Ele pintou ${monday} na segunda-feira e ${tuesday} na terça-feira.`,
    questions: [
      'Quantos desenhos faltavam pintar depois da segunda-feira?',
      'Quantos desenhos Caio pintou nos dois dias?',
      'Quantos desenhos Caio ainda precisa pintar?',
    ],
  },
  {
    ranges: [[30, 90], [5, 25], [5, 25]],
    solve: (start, friday, saturday) => [start - friday, friday + saturday, start - friday - saturday],
    statement: (start, friday, saturday) =>
      `Uma floricultura tinha ${start} rosas. Ela vendeu ${friday} na sexta-feira e ${saturday} no sábado.`,
    questions: [
      'Quantas rosas sobraram depois da sexta-feira?',
      'Quantas rosas a floricultura vendeu nos dois dias?',
      'Quantas rosas sobraram no final?',
    ],
  },
]

export const MULTIPLICATION_MULTI_STEP_STATEMENTS = [
  {
    ranges: [[2, 6], [4, 12], [2, 10]],
    solve: (boxes, eggsPerBox, used) => [boxes * eggsPerBox, boxes * eggsPerBox - used],
    statement: (boxes, eggsPerBox, used) =>
      `Dona Rosa comprou ${boxes} caixas com ${eggsPerBox} ovos em cada uma e usou ${used} ovos para fazer um bolo.`,
    questions: ['Quantos ovos Dona Rosa comprou?', 'Quantos ovos sobraram?'],
  },
  {
    ranges: [[2, 6], [4, 10], [2, 15]],
    solve: (packs, perPack, glued) => [packs * perPack, packs * perPack - glued],
    statement: (packs, perPack, glued) =>
      `Tiago comprou ${packs} pacotes com ${perPack} figurinhas cada e já colou ${glued} no álbum.`,
    questions: ['Quantas figurinhas Tiago comprou?', 'Quantas figurinhas ainda faltam colar?'],
  },
  {
    ranges: [[2, 8], [3, 10], [2, 10]],
    solve: (rows, perRow, empty) => [rows * perRow, rows * perRow - empty],
    statement: (rows, perRow, empty) =>
      `Uma sala tem ${rows} fileiras com ${perRow} cadeiras em cada uma. Na aula de hoje, ${empty} cadeiras ficaram vazias.`,
    questions: ['Quantas cadeiras há na sala?', 'Quantas cadeiras estavam ocupadas?'],
  },
  {
    ranges: [[2, 6], [4, 10], [5, 20]],
    solve: (bracelets, beads, necklace) => [bracelets * beads, bracelets * beads + necklace],
    statement: (bracelets, beads, necklace) =>
      `Júlia fez ${bracelets} pulseiras com ${beads} miçangas em cada uma. Depois, fez um colar com mais ${necklace} miçangas.`,
    questions: ['Quantas miçangas Júlia usou nas pulseiras?', 'Quantas miçangas Júlia usou ao todo?'],
  },
  {
    ranges: [[2, 7], [3, 10], [30, 100]],
    solve: (days, perDay, pages) => [days * perDay, pages - days * perDay],
    statement: (days, perDay, pages) =>
      `Rafael está lendo um livro de ${pages} páginas. Ele leu ${perDay} páginas por dia durante ${days} dias.`,
    questions: ['Quantas páginas Rafael já leu?', 'Quantas páginas faltam para Rafael terminar o livro?'],
  },
  {
    ranges: [[2, 8], [3, 10], [2, 15]],
    solve: (rows, perRow, left) => [rows * perRow, rows * perRow - left],
    statement: (rows, perRow, left) =>
      `No estacionamento havia ${rows} filas com ${perRow} carros em cada. Depois, ${left} carros foram embora.`,
    questions: ['Quantos carros havia no estacionamento?', 'Quantos carros ficaram no estacionamento?'],
  },
  {
    ranges: [[2, 8], [2, 6], [2, 10]],
    solve: (branches, perBranch, arrived) => [branches * perBranch, branches * perBranch + arrived],
    statement: (branches, perBranch, arrived) =>
      `Em uma árvore havia ${branches} galhos com ${perBranch} passarinhos em cada um. Depois, chegaram mais ${arrived} passarinhos.`,
    questions: ['Quantos passarinhos havia na árvore no começo?', 'Quantos passarinhos há na árvore agora?'],
  },
  {
    ranges: [[2, 8], [3, 10], [2, 15]],
    solve: (rows, perRow, harvested) => [rows * perRow, rows * perRow - harvested],
    statement: (rows, perRow, harvested) =>
      `Bernardo plantou ${rows} fileiras com ${perRow} pés de alface em cada uma. Ele já colheu ${harvested} pés.`,
    questions: ['Quantos pés de alface Bernardo plantou?', 'Quantos pés de alface ainda faltam colher?'],
  },
  {
    ranges: [[2, 6], [3, 6], [2, 5]],
    solve: (groups, perGroup, late) => [groups * perGroup, groups * perGroup + late],
    statement: (groups, perGroup, late) =>
      `A professora formou ${groups} grupos com ${perGroup} alunos em cada um. Depois, chegaram mais ${late} alunos atrasados.`,
    questions: ['Quantos alunos havia nos grupos?', 'Quantos alunos há na turma agora?'],
  },
  {
    ranges: [[2, 6], [3, 10], [2, 10]],
    solve: (vases, perVase, picked) => [vases * perVase, vases * perVase - picked],
    statement: (vases, perVase, picked) =>
      `Valentina tinha ${vases} vasos com ${perVase} flores em cada um. Ela colheu ${picked} flores para fazer um buquê.`,
    questions: ['Quantas flores Valentina tinha nos vasos?', 'Quantas flores ficaram nos vasos?'],
  },
  {
    ranges: [[2, 10], [2, 8], [2, 15]],
    solve: (floors, perFloor, open) => [floors * perFloor, floors * perFloor - open],
    statement: (floors, perFloor, open) =>
      `Um prédio tem ${floors} andares com ${perFloor} janelas em cada andar. Hoje, ${open} janelas estão abertas.`,
    questions: ['Quantas janelas o prédio tem?', 'Quantas janelas estão fechadas?'],
  },
  {
    ranges: [[2, 6], [4, 12], [2, 10]],
    solve: (shelves, perShelf, lent) => [shelves * perShelf, shelves * perShelf - lent],
    statement: (shelves, perShelf, lent) =>
      `Lara arrumou os livros em ${shelves} prateleiras, com ${perShelf} livros em cada uma. Depois, emprestou ${lent} livros para a prima.`,
    questions: ['Quantos livros Lara arrumou?', 'Quantos livros ficaram nas prateleiras?'],
  },
  {
    ranges: [[2, 6], [5, 15], [2, 15], [2, 15]],
    solve: (wagons, perWagon, off, on) => [wagons * perWagon, wagons * perWagon - off, wagons * perWagon - off + on],
    statement: (wagons, perWagon, off, on) =>
      `Um trem tem ${wagons} vagões com ${perWagon} passageiros em cada um. Na primeira estação, desceram ${off} passageiros e subiram ${on}.`,
    questions: [
      'Quantos passageiros havia no trem no começo?',
      'Quantos passageiros ficaram no trem depois que alguns desceram?',
      'Quantos passageiros há no trem agora?',
    ],
  },
  {
    ranges: [[2, 6], [3, 8], [20, 80]],
    solve: (cakes, perCake, strawberries) => [cakes * perCake, strawberries - cakes * perCake],
    statement: (cakes, perCake, strawberries) =>
      `Cecília tinha ${strawberries} morangos na geladeira. Ela fez ${cakes} bolos e colocou ${perCake} morangos em cada um.`,
    questions: ['Quantos morangos Cecília usou?', 'Quantos morangos sobraram na geladeira?'],
  },
  {
    ranges: [[2, 5], [3, 8], [2, 5]],
    solve: (towers, blocks, more) => [towers * blocks, towers + more, (towers + more) * blocks],
    statement: (towers, blocks, more) =>
      `Mateus montou ${towers} torres com ${blocks} blocos em cada uma. Depois, montou mais ${more} torres iguais.`,
    questions: [
      'Quantos blocos Mateus usou nas primeiras torres?',
      'Quantas torres Mateus montou ao todo?',
      'Quantos blocos Mateus usou ao todo?',
    ],
  },
]

export const DIVISION_MULTI_STEP_STATEMENTS = [
  {
    ranges: [[5, 40], [5, 40], [2, 10]],
    solve: (saved, gift, price) => [saved + gift, (saved + gift) / price],
    statement: (saved, gift, price) =>
      `Helena tinha ${saved} reais no cofrinho e ganhou mais ${gift} da avó. Ela quer comprar livros que custam ${price} reais cada.`,
    questions: ['Quantos reais Helena tem agora?', 'Quantos livros Helena consegue comprar?'],
  },
  {
    ranges: [[2, 6], [4, 12], [2, 10]],
    solve: (boxes, perBox, students) => [boxes * perBox, (boxes * perBox) / students],
    statement: (boxes, perBox, students) =>
      `A professora tinha ${boxes} caixas com ${perBox} lápis em cada uma e vai dividir todos os lápis igualmente entre ${students} alunos.`,
    questions: ['Quantos lápis a professora tinha?', 'Quantos lápis cada aluno vai receber?'],
  },
  {
    ranges: [[10, 60], [2, 6], [2, 5]],
    solve: (cookies, jars, eaten) => [cookies / jars, cookies / jars - eaten],
    statement: (cookies, jars, eaten) =>
      `Vovó fez ${cookies} biscoitos e colocou a mesma quantidade em ${jars} potes. Depois, o neto comeu ${eaten} biscoitos de um dos potes.`,
    questions: ['Quantos biscoitos foram em cada pote?', 'Quantos biscoitos sobraram no pote do neto?'],
  },
  {
    ranges: [[5, 20], [5, 20], [2, 5]],
    solve: (girls, boys, teams) => [girls + boys, (girls + boys) / teams],
    statement: (girls, boys, teams) =>
      `Na aula de educação física, ${girls} meninas e ${boys} meninos vão formar ${teams} times iguais.`,
    questions: ['Quantas crianças há na aula?', 'Quantas crianças ficam em cada time?'],
  },
  {
    ranges: [[10, 40], [2, 20], [2, 6]],
    solve: (start, gift, pages) => [start + gift, (start + gift) / pages],
    statement: (start, gift, pages) =>
      `Sofia tinha ${start} figurinhas e ganhou mais ${gift}. Ela vai colar a mesma quantidade em ${pages} páginas do álbum.`,
    questions: ['Quantas figurinhas Sofia tem agora?', 'Quantas figurinhas Sofia vai colar em cada página?'],
  },
  {
    ranges: [[10, 60], [2, 6], [2, 5]],
    solve: (candies, friends, eaten) => [candies / friends, candies / friends - eaten],
    statement: (candies, friends, eaten) =>
      `Um pacote com ${candies} balas foi dividido igualmente entre ${friends} amigos, e cada um comeu ${eaten} das suas balas.`,
    questions: ['Quantas balas cada amigo ganhou?', 'Quantas balas cada amigo ainda tem?'],
  },
  {
    ranges: [[10, 40], [10, 40], [6, 12]],
    solve: (morning, afternoon, perBox) => [morning + afternoon, (morning + afternoon) / perBox],
    statement: (morning, afternoon, perBox) =>
      `Um fazendeiro recolheu ${morning} ovos pela manhã e ${afternoon} à tarde. Ele vai guardar ${perBox} ovos em cada caixa.`,
    questions: ['Quantos ovos o fazendeiro recolheu?', 'Quantas caixas o fazendeiro vai usar?'],
  },
  {
    ranges: [[5, 30], [5, 30], [2, 6]],
    solve: (roses, daisies, bouquets) => [roses + daisies, (roses + daisies) / bouquets],
    statement: (roses, daisies, bouquets) =>
      `Beatriz colheu ${roses} rosas e ${daisies} margaridas e quer fazer ${bouquets} buquês iguais.`,
    questions: ['Quantas flores Beatriz colheu?', 'Quantas flores vão em cada buquê?'],
  },
  {
    ranges: [[10, 60], [2, 6], [8, 16]],
    solve: (tourists, vans, seats) => [tourists / vans, seats - tourists / vans, (seats - tourists / vans) * vans],
    statement: (tourists, vans, seats) =>
      `Um grupo de ${tourists} turistas vai passear em ${vans} vans, com o mesmo número de pessoas em cada uma. Cada van tem ${seats} lugares.`,
    questions: [
      'Quantas pessoas vão em cada van?',
      'Quantos lugares ficam vazios em cada van?',
      'Quantos lugares ficam vazios ao todo?',
    ],
  },
  {
    ranges: [[5, 40], [2, 20], [2, 6]],
    solve: (start, gift, boxes) => [start + gift, (start + gift) / boxes],
    statement: (start, gift, boxes) =>
      `Nicolas tinha ${start} carrinhos e ganhou mais ${gift} no Natal. Ele quer guardá-los em ${boxes} caixas, com a mesma quantidade em cada.`,
    questions: ['Quantos carrinhos Nicolas tem agora?', 'Quantos carrinhos vão em cada caixa?'],
  },
  {
    ranges: [[10, 40], [10, 40], [4, 10]],
    solve: (mother, aunt, perPlate) => [mother + aunt, (mother + aunt) / perPlate],
    statement: (mother, aunt, perPlate) =>
      `A mãe de Yasmin fez ${mother} brigadeiros e a tia fez mais ${aunt}. Elas vão colocar ${perPlate} brigadeiros em cada pratinho.`,
    questions: ['Quantos brigadeiros elas fizeram?', 'Quantos pratinhos elas vão usar?'],
  },
  {
    ranges: [[20, 60], [2, 15], [2, 6]],
    solve: (length, used, pieces) => [length - used, (length - used) / pieces],
    statement: (length, used, pieces) =>
      `Um rolo de fita tem ${length} metros. Bruno usou ${used} metros e cortou o resto em ${pieces} pedaços do mesmo tamanho.`,
    questions: ['Quantos metros de fita sobraram?', 'Quantos metros terá cada pedaço?'],
  },
  {
    ranges: [[20, 60], [2, 10], [2, 6]],
    solve: (balls, flat, classes) => [balls - flat, (balls - flat) / classes],
    statement: (balls, flat, classes) =>
      `O treinador tinha ${balls} bolas, mas ${flat} furaram. Ele vai dividir as bolas que sobraram igualmente entre ${classes} turmas.`,
    questions: ['Quantas bolas sobraram?', 'Quantas bolas cada turma vai receber?'],
  },
  {
    ranges: [[20, 100], [2, 10], [2, 10]],
    solve: (pages, days, sisterPerDay) => [pages / days, pages / sisterPerDay],
    statement: (pages, days, sisterPerDay) =>
      `Otávio leu um livro de ${pages} páginas em ${days} dias, lendo a mesma quantidade todo dia. A irmã dele leu o mesmo livro lendo ${sisterPerDay} páginas por dia.`,
    questions: ['Quantas páginas Otávio leu por dia?', 'Em quantos dias a irmã de Otávio leu o livro?'],
  },
  {
    ranges: [[5, 30], [5, 30], [2, 6]],
    solve: (appleTrees, orangeTrees, rows) => [appleTrees + orangeTrees, (appleTrees + orangeTrees) / rows],
    statement: (appleTrees, orangeTrees, rows) =>
      `Um pomar tem ${appleTrees} macieiras e ${orangeTrees} laranjeiras plantadas em ${rows} fileiras iguais.`,
    questions: ['Quantas árvores há no pomar?', 'Quantas árvores há em cada fileira?'],
  },
]

export const TRUE_FALSE_STATEMENTS = [
  {
    ranges: [[3, 10], [2, 5]],
    solve: (sister, difference) => sister + difference,
    mistake: (sister, difference) => sister - difference,
    statement: (sister, difference, claimed) =>
      `Minha irmã tem ${sister} anos. Eu sou ${difference} anos mais velho que ela. Então eu tenho ${claimed} anos.`,
  },
  {
    ranges: [[8, 14], [2, 5]],
    solve: (cousin, difference) => cousin - difference,
    mistake: (cousin, difference) => cousin + difference,
    statement: (cousin, difference, claimed) =>
      `Meu primo tem ${cousin} anos. Meu irmão é ${difference} anos mais novo que ele. Então meu irmão tem ${claimed} anos.`,
  },
  {
    ranges: [[5, 12], [2, 9]],
    solve: (age, years) => age + years,
    statement: (age, years, claimed) =>
      `Hoje Lucas tem ${age} anos. Daqui a ${years} anos, ele terá ${claimed} anos.`,
  },
  {
    ranges: [[8, 12], [2, 6]],
    solve: (age, years) => age - years,
    mistake: (age, years) => age + years,
    statement: (age, years, claimed) => `Hoje Lia tem ${age} anos. Há ${years} anos, ela tinha ${claimed} anos.`,
  },
  {
    ranges: [[3, 18]],
    solve: (price) => 20 - price,
    statement: (price, claimed) =>
      `Comprei um lanche de ${price} reais e paguei com uma nota de 20 reais. Então recebi ${claimed} reais de troco.`,
  },
  {
    ranges: [[3, 12]],
    solve: (hens) => hens * 2,
    mistake: (hens) => hens * 4,
    statement: (hens, claimed) => `No quintal há ${hens} galinhas. Então há ${claimed} patas de galinha no quintal.`,
  },
  {
    ranges: [[2, 9]],
    solve: (dogs) => dogs * 4,
    mistake: (dogs) => dogs * 2,
    statement: (dogs, claimed) => `No parque há ${dogs} cachorros. Então há ${claimed} patas de cachorro no parque.`,
  },
  {
    ranges: [[2, 6]],
    solve: (weeks) => weeks * 7,
    statement: (weeks, claimed) => `Uma semana tem 7 dias. Então ${weeks} semanas têm ${claimed} dias.`,
  },
  {
    ranges: [[2, 5]],
    solve: (dozens) => dozens * 12,
    mistake: (dozens) => dozens * 10,
    statement: (dozens, claimed) => `Uma dúzia tem 12 ovos. Então ${dozens} dúzias têm ${claimed} ovos.`,
  },
  {
    ranges: [[13, 17], [2, 3]],
    solve: (start, duration) => start + duration,
    statement: (start, duration, claimed) =>
      `O filme começou às ${start} horas e durou ${duration} horas. Então terminou às ${claimed} horas.`,
  },
  {
    ranges: [[4, 30]],
    solve: (stickers) => stickers * 2,
    mistake: (stickers) => stickers + 2,
    statement: (stickers, claimed) =>
      `Tenho ${stickers} figurinhas e minha prima tem o dobro. Então ela tem ${claimed} figurinhas.`,
  },
  {
    ranges: [[4, 40]],
    solve: (candies) => candies / 2,
    statement: (candies, claimed) =>
      `Eu tinha ${candies} balas e dei metade para o meu irmão. Então dei ${claimed} balas para ele.`,
  },
  {
    ranges: [[2, 8], [2, 6]],
    solve: (price, amount) => price * amount,
    mistake: (price, amount) => price + amount,
    statement: (price, amount, claimed) =>
      `Cada pastel custa ${price} reais. Então ${amount} pastéis custam ${claimed} reais.`,
  },
  {
    ranges: [[2, 6], [2, 5]],
    solve: (bicycles, tricycles) => bicycles * 2 + tricycles * 3,
    mistake: (bicycles, tricycles) => (bicycles + tricycles) * 2,
    statement: (bicycles, tricycles, claimed) =>
      `Na pracinha há ${bicycles} bicicletas e ${tricycles} triciclos. Então há ${claimed} rodas ao todo.`,
  },
  {
    ranges: [[8, 20], [2, 7]],
    solve: (up, down) => up - down,
    mistake: (up, down) => up + down,
    statement: (up, down, claimed) =>
      `Subi ${up} degraus da escada e depois desci ${down}. Então estou no degrau ${claimed}.`,
  },
  {
    ranges: [[2, 9], [2, 9]],
    solve: (ahead, behind) => ahead + behind + 1,
    mistake: (ahead, behind) => ahead + behind,
    statement: (ahead, behind, claimed) =>
      `Na fila do lanche, há ${ahead} crianças na minha frente e ${behind} atrás de mim. Então a fila tem ${claimed} crianças.`,
  },
  {
    ranges: [[2, 6]],
    solve: (children) => children * 10,
    mistake: (children) => children * 5,
    statement: (children, claimed) =>
      `Cada mão tem 5 dedos. Então ${children} crianças têm ${claimed} dedos nas mãos.`,
  },
  {
    ranges: [[2, 6]],
    solve: (teams) => teams * 5,
    statement: (teams, claimed) =>
      `Um time de futsal tem 5 jogadores em quadra. Então ${teams} times têm ${claimed} jogadores em quadra.`,
  },
]

export const COUNTING_ITEMS = [
  { symbol: '🍪', question: 'Quantos biscoitos há na bandeja?' },
  { symbol: '🍎', question: 'Quantas maçãs há na caixa?' },
  { symbol: '🍓', question: 'Quantos morangos há na cesta?' },
  { symbol: '⭐', question: 'Quantas estrelas há no céu?' },
  { symbol: '🎈', question: 'Quantos balões há na festa?' },
  { symbol: '🐟', question: 'Quantos peixes há no aquário?' },
  { symbol: '🌻', question: 'Quantos girassóis há no jardim?' },
  { symbol: '🚗', question: 'Quantos carros há no estacionamento?' },
  { symbol: '⚽', question: 'Quantas bolas há no armário?' },
  { symbol: '🧁', question: 'Quantos bolinhos há na vitrine?' },
  { symbol: '🐥', question: 'Quantos pintinhos há no galinheiro?' },
  { symbol: '🍩', question: 'Quantas rosquinhas há na caixa?' },
]
