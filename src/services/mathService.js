import {
  ADDITION_MULTI_STEP_STATEMENTS,
  ADDITION_STATEMENTS,
  COUNTING_ITEMS,
  DIVISION_MULTI_STEP_STATEMENTS,
  DIVISION_STATEMENTS,
  MATH_OPERATIONS,
  MULTIPLICATION_MULTI_STEP_STATEMENTS,
  MULTIPLICATION_STATEMENTS,
  SUBTRACTION_MULTI_STEP_STATEMENTS,
  SUBTRACTION_STATEMENTS,
  TRUE_FALSE_STATEMENTS,
} from '@/constants/math'
import { DIFFICULTIES, QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import {
  buildEvaluationSteps,
  buildSolvingSteps,
  combine,
  createNumber,
  formatCalculation,
  formatEquation,
  getNumbers,
  getOperationNodes,
} from '@/utils/expression'
import { isValidMathQuestion } from '@/utils/mathValidator'
import { randomInt, randomItem, randomItems, shuffle } from '@/utils/random'
import { fakeRequest } from './fakeRequest'
import { getTrueFalseQuestions } from './trueFalseService'

const QUESTIONS_PER_VARIANT = 2
const OPTIONS_COUNT = 4
const MAX_OPTION_OFFSET = 5
const MULTI_STEP_RESULT_RANGE = [1, 100]
const TRUE_FALSE_RESULT_RANGE = [2, 100]
const MAX_CLAIM_OFFSET = 3
const COUNTING_HINT = 'Dica: conte as fileiras e quantos há em cada uma.'
const EQUATION_INSTRUCTION = 'Descubra qual número fica no lugar do ?.'
const TIMES_TABLE_HINT = 'Comece pela conta mais de dentro dos parênteses e troque cada resultado por uma letra.'
const EQUATION_HINT = 'Faça a conta ao contrário para descobrir o ?.'
const EXPRESSION_FACTOR_RANGE = [2, 10]

const COUNTING_VARIANTS = [
  { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, rowsRange: [2, 4], columnsRange: [2, 5] },
  { type: QUESTION_TYPES.NUMBER, difficulty: DIFFICULTIES.MEDIUM, rowsRange: [3, 6], columnsRange: [3, 6] },
]

const OPERATIONS = {
  [MATH_OPERATIONS.ADDITION]: {
    symbol: '+',
    leftRange: [1, 99],
    rightRange: [1, 99],
    calculate: (left, right) => left + right,
    statements: ADDITION_STATEMENTS,
    multiStepStatements: ADDITION_MULTI_STEP_STATEMENTS,
    variants: [
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [10, 60] },
      { type: QUESTION_TYPES.NUMBER, difficulty: DIFFICULTIES.MEDIUM, resultRange: [2, 50] },
    ],
  },
  [MATH_OPERATIONS.SUBTRACTION]: {
    symbol: '-',
    leftRange: [1, 100],
    rightRange: [1, 100],
    calculate: (left, right) => left - right,
    statements: SUBTRACTION_STATEMENTS,
    multiStepStatements: SUBTRACTION_MULTI_STEP_STATEMENTS,
    variants: [
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [10, 60] },
      { type: QUESTION_TYPES.NUMBER, difficulty: DIFFICULTIES.MEDIUM, resultRange: [2, 50] },
    ],
  },
  [MATH_OPERATIONS.MULTIPLICATION]: {
    symbol: '×',
    leftRange: [2, 12],
    rightRange: [2, 12],
    calculate: (left, right) => left * right,
    statements: MULTIPLICATION_STATEMENTS,
    multiStepStatements: MULTIPLICATION_MULTI_STEP_STATEMENTS,
    variants: [
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [2, 50] },
      { type: QUESTION_TYPES.NUMBER, difficulty: DIFFICULTIES.MEDIUM, resultRange: [2, 30] },
    ],
  },
  [MATH_OPERATIONS.DIVISION]: {
    symbol: '÷',
    leftRange: [2, 100],
    rightRange: [2, 10],
    calculate: (left, right) => left / right,
    statements: DIVISION_STATEMENTS,
    multiStepStatements: DIVISION_MULTI_STEP_STATEMENTS,
    variants: [
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [2, 50] },
      { type: QUESTION_TYPES.NUMBER, difficulty: DIFFICULTIES.MEDIUM, resultRange: [2, 30] },
    ],
  },
}

const EXPRESSION_OPERATIONS = {
  [MATH_OPERATIONS.ADDITION]: {
    symbol: '+',
    calculate: (left, right) => left + right,
    operandRange: ({ termMax }) => [1, termMax],
    pickOperand: (value, isFirst, { termMax }) => randomInt(1, termMax),
    findLeft: (result, right) => `${result} − ${right}`,
    findRight: (result, left) => `${result} − ${left}`,
  },
  [MATH_OPERATIONS.SUBTRACTION]: {
    symbol: '−',
    calculate: (left, right) => left - right,
    operandRange: ({ termMax }) => [1, termMax],
    pickOperand: (value, isFirst, { termMax }) => (isFirst ? value : 0) + randomInt(1, termMax),
    findLeft: (result, right) => `${result} + ${right}`,
    findRight: (result, left) => `${left} − ${result}`,
  },
  [MATH_OPERATIONS.MULTIPLICATION]: {
    symbol: '×',
    calculate: (left, right) => left * right,
    operandRange: () => EXPRESSION_FACTOR_RANGE,
    pickOperand: () => randomInt(...EXPRESSION_FACTOR_RANGE),
    findLeft: (result, right) => `${result} ÷ ${right}`,
    findRight: (result, left) => `${result} ÷ ${left}`,
  },
  [MATH_OPERATIONS.DIVISION]: {
    symbol: '÷',
    calculate: (left, right) => left / right,
    operandRange: () => EXPRESSION_FACTOR_RANGE,
    pickOperand: (value, isFirst) => (isFirst ? value : 1) * randomInt(...EXPRESSION_FACTOR_RANGE),
    findLeft: (result, right) => `${result} × ${right}`,
    findRight: (result, left) => `${left} ÷ ${result}`,
  },
}

const ADDITION_AND_SUBTRACTION = [MATH_OPERATIONS.ADDITION, MATH_OPERATIONS.SUBTRACTION]

const EASY_EXPRESSION = {
  type: QUESTION_TYPES.MULTIPLE_CHOICE,
  difficulty: DIFFICULTIES.EASY,
  operations: ADDITION_AND_SUBTRACTION,
  numberCounts: [2],
  minOperationKinds: 1,
  termMax: 20,
  valueMax: 20,
  resultRange: [1, 20],
}

const MEDIUM_EXPRESSION = {
  type: QUESTION_TYPES.NUMBER,
  difficulty: DIFFICULTIES.MEDIUM,
  operations: ADDITION_AND_SUBTRACTION,
  numberCounts: [2],
  minOperationKinds: 1,
  termMax: 40,
  valueMax: 40,
  resultRange: [1, 40],
}

const TIMES_TABLE_VARIANTS = [
  EASY_EXPRESSION,
  MEDIUM_EXPRESSION,
  {
    type: QUESTION_TYPES.NUMBER,
    difficulty: DIFFICULTIES.HARD,
    operations: [...ADDITION_AND_SUBTRACTION, MATH_OPERATIONS.MULTIPLICATION],
    numberCounts: [3],
    minOperationKinds: 2,
    termMax: 60,
    valueMax: 60,
    resultRange: [1, 60],
    hasHint: true,
  },
]

const EQUATION_VARIANTS = [
  EASY_EXPRESSION,
  MEDIUM_EXPRESSION,
  {
    type: QUESTION_TYPES.NUMBER,
    difficulty: DIFFICULTIES.HARD,
    operations: ADDITION_AND_SUBTRACTION,
    numberCounts: [2],
    minOperationKinds: 1,
    termMax: 60,
    valueMax: 60,
    resultRange: [1, 60],
    hasHint: true,
  },
]

function limitRange([min, max], maxResult = max) {
  return [min, Math.min(max, maxResult)]
}

function generateOperands({ leftRange, rightRange, calculate }) {
  const left = randomInt(...leftRange)
  const right = randomInt(...rightRange)
  return { left, right, result: calculate(left, right) }
}

function generateValidOperands(config, resultRange) {
  let operands
  do {
    operands = generateOperands(config)
  } while (!isValidMathQuestion(operands, resultRange))
  return operands
}

function generateUniqueOperands(config, resultRange, usedKeys) {
  let operands
  let key
  do {
    operands = generateValidOperands(config, resultRange)
    key = `${operands.left} ${config.symbol} ${operands.right}`
  } while (usedKeys.has(key))
  usedKeys.add(key)
  return operands
}

function generateOptions(result) {
  const options = new Set([result])
  while (options.size < OPTIONS_COUNT) {
    const option = result + randomInt(-MAX_OPTION_OFFSET, MAX_OPTION_OFFSET)
    if (option > 0) options.add(option)
  }
  return [...options].map(String)
}

function generateMultiStepQuestion(statements, maxResult) {
  const { ranges, solve, statement, questions } = randomItem(statements)
  const resultRange = limitRange(MULTI_STEP_RESULT_RANGE, maxResult)
  let operands
  let results
  do {
    operands = ranges.map((range) => randomInt(...range))
    results = solve(...operands)
  } while (!results.every((result) => isValidMathQuestion({ result }, resultRange)))
  return {
    type: QUESTION_TYPES.NUMBER,
    difficulty: DIFFICULTIES.HARD,
    prompt: [statement(...operands), ...questions].join(' '),
    parts: questions.map((label, index) => ({ label, correctAnswer: String(results[index]) })),
  }
}

function generateOperationQuestions(operation, maxResult) {
  const config = OPERATIONS[operation]
  const variants = config.variants.flatMap((variant) => new Array(QUESTIONS_PER_VARIANT).fill(variant))
  const statements = randomItems(config.statements, variants.length)
  const usedKeys = new Set()
  const questions = variants.map(({ type, difficulty, resultRange }, index) => {
    const { left, right, result } = generateUniqueOperands(config, limitRange(resultRange, maxResult), usedKeys)
    return {
      type,
      difficulty,
      prompt: statements[index](left, right),
      ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: generateOptions(result) }),
      correctAnswer: String(result),
    }
  })
  return [...questions, generateMultiStepQuestion(config.multiStepStatements, maxResult)]
}

export function getMathQuestions({ maxResult } = {}) {
  const questions = Object.values(MATH_OPERATIONS).flatMap((operation) => generateOperationQuestions(operation, maxResult))
  return fakeRequest(shuffle(questions).map((question, index) => ({ id: index + 1, ...question })))
}

function isValidClaim(claimed, result, resultRange) {
  return claimed !== result && isValidMathQuestion({ result: claimed }, resultRange)
}

function generateWrongClaim(result, mistakeResult, resultRange) {
  if (randomInt(0, 1) === 1 && isValidClaim(mistakeResult, result, resultRange)) return mistakeResult
  let claimed
  do {
    claimed = result + randomInt(-MAX_CLAIM_OFFSET, MAX_CLAIM_OFFSET)
  } while (!isValidClaim(claimed, result, resultRange))
  return claimed
}

function generateTrueFalseStatement({ ranges, solve, mistake, statement }, isTrue, resultRange) {
  let operands
  let result
  do {
    operands = ranges.map((range) => randomInt(...range))
    result = solve(...operands)
  } while (!isValidMathQuestion({ result }, resultRange))
  const claimed = isTrue ? result : generateWrongClaim(result, mistake?.(...operands), resultRange)
  return { prompt: statement(...operands, claimed), explanation: `O número certo é ${result}.` }
}

export function getMathTrueFalseQuestions({ maxResult } = {}) {
  const resultRange = limitRange(TRUE_FALSE_RESULT_RANGE, maxResult)
  return getTrueFalseQuestions({
    items: randomItems(TRUE_FALSE_STATEMENTS, QUESTIONS_PER_MODULE),
    buildStatement: (item, isTrue) => generateTrueFalseStatement(item, isTrue, resultRange),
  })
}

function generateCountingQuestion({ symbol, question }, { type, difficulty, rowsRange, columnsRange }, maxResult) {
  let rows
  let columns
  do {
    rows = randomInt(...rowsRange)
    columns = randomInt(...columnsRange)
  } while (rows * columns > maxResult)
  const result = rows * columns
  return {
    type,
    difficulty,
    prompt: question,
    hint: COUNTING_HINT,
    imageGrid: { symbol, rows, columns },
    ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: generateOptions(result) }),
    correctAnswer: String(result),
  }
}

export function getVisualCountingQuestions({ maxResult = Infinity } = {}) {
  const variants = COUNTING_VARIANTS.flatMap((variant) => new Array(QUESTIONS_PER_VARIANT).fill(variant))
  const items = randomItems(COUNTING_ITEMS, variants.length)
  return fakeRequest(
    variants.map((variant, index) => ({ id: index + 1, ...generateCountingQuestion(items[index], variant, maxResult) })),
  )
}

function pickExpressionOperations({ operations, numberCounts, minOperationKinds }) {
  let keys
  do {
    keys = Array.from({ length: randomItem(numberCounts) - 1 }, () => randomItem(operations))
  } while (new Set(keys).size < minOperationKinds)
  return keys.map((key) => EXPRESSION_OPERATIONS[key])
}

function appendOperation(node, operation, variant) {
  const isFirst = randomInt(0, 1) === 1
  const number = createNumber(operation.pickOperand(node.value, isFirst, variant))
  return isFirst ? combine(operation, number, node) : combine(operation, node, number)
}

function buildExpression(operations, variant) {
  const start = createNumber(randomInt(...operations[0].operandRange(variant)))
  return operations.reduce((node, operation) => appendOperation(node, operation, variant), start)
}

function isValidExpression(root, { valueMax, resultRange }) {
  return (
    getNumbers(root).every(({ value }) => value <= valueMax) &&
    getOperationNodes(root).every((node) => isValidMathQuestion({ result: node.value }, [1, valueMax])) &&
    isValidMathQuestion({ result: root.value }, resultRange)
  )
}

function generateExpression(variant) {
  const operations = pickExpressionOperations(variant)
  let root
  do {
    root = buildExpression(operations, variant)
  } while (!isValidExpression(root, variant))
  return root
}

function createExpressionQuestion({ type, difficulty, hasHint }, { answer, solutionHint, ...fields }) {
  return {
    type,
    difficulty,
    ...fields,
    ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: generateOptions(answer) }),
    ...(hasHint && { solutionHint }),
    correctAnswer: String(answer),
  }
}

function buildTimesTableQuestion(root, variant) {
  return createExpressionQuestion(variant, {
    prompt: formatCalculation(root),
    answer: root.value,
    solutionHint: { message: TIMES_TABLE_HINT, steps: buildEvaluationSteps(root) },
  })
}

function buildEquationQuestion(root, variant) {
  const unknown = randomItem(getNumbers(root))
  return createExpressionQuestion(variant, {
    prompt: formatEquation(root, unknown),
    hint: EQUATION_INSTRUCTION,
    answer: unknown.value,
    solutionHint: { message: EQUATION_HINT, steps: buildSolvingSteps(root, unknown) },
  })
}

function getExpressionQuestions(variants, buildQuestion) {
  const usedPrompts = new Set()
  const questions = variants.flatMap((variant) =>
    Array.from({ length: QUESTIONS_PER_VARIANT }, () => {
      let question
      do {
        question = buildQuestion(generateExpression(variant), variant)
      } while (usedPrompts.has(question.prompt))
      usedPrompts.add(question.prompt)
      return question
    }),
  )
  return fakeRequest(questions.map((question, index) => ({ id: index + 1, ...question })))
}

export function getTimesTableQuestions() {
  return getExpressionQuestions(TIMES_TABLE_VARIANTS, buildTimesTableQuestion)
}

export function getEquationQuestions() {
  return getExpressionQuestions(EQUATION_VARIANTS, buildEquationQuestion)
}
