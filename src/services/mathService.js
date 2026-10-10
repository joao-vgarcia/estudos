import {
  ADDITION_STATEMENTS,
  DIVISION_STATEMENTS,
  MATH_OPERATIONS,
  MULTIPLICATION_STATEMENTS,
  SUBTRACTION_STATEMENTS,
} from '@/constants/math'
import { QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { isValidMathQuestion } from '@/utils/mathValidator'
import { randomInt, randomItems, shuffle } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

const OPTIONS_COUNT = 4
const MAX_OPTION_OFFSET = 5

const OPERATIONS = {
  [MATH_OPERATIONS.ADDITION]: {
    symbol: '+',
    leftRange: [1, 99],
    rightRange: [1, 99],
    calculate: (left, right) => left + right,
    statements: ADDITION_STATEMENTS,
    type: QUESTION_TYPES.NUMBER,
  },
  [MATH_OPERATIONS.SUBTRACTION]: {
    symbol: '-',
    leftRange: [1, 100],
    rightRange: [1, 100],
    calculate: (left, right) => left - right,
    statements: SUBTRACTION_STATEMENTS,
    type: QUESTION_TYPES.NUMBER,
  },
  [MATH_OPERATIONS.MULTIPLICATION]: {
    symbol: '×',
    leftRange: [2, 12],
    rightRange: [2, 12],
    calculate: (left, right) => left * right,
    statements: MULTIPLICATION_STATEMENTS,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
  },
  [MATH_OPERATIONS.DIVISION]: {
    symbol: '÷',
    leftRange: [2, 100],
    rightRange: [2, 10],
    calculate: (left, right) => left / right,
    statements: DIVISION_STATEMENTS,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
  },
}

function generateOperands({ leftRange, rightRange, calculate }) {
  const left = randomInt(...leftRange)
  const right = randomInt(...rightRange)
  return { left, right, result: calculate(left, right) }
}

function generateValidOperands(config) {
  let operands
  do {
    operands = generateOperands(config)
  } while (!isValidMathQuestion(operands))
  return operands
}

function generateUniqueOperands(config, count) {
  const operandsByKey = new Map()
  while (operandsByKey.size < count) {
    const operands = generateValidOperands(config)
    operandsByKey.set(`${operands.left} ${config.symbol} ${operands.right}`, operands)
  }
  return [...operandsByKey.values()]
}

function generateOperationQuestions(operation) {
  const config = OPERATIONS[operation]
  const statements = randomItems(config.statements, QUESTIONS_PER_MODULE)
  const operandsList = generateUniqueOperands(config, statements.length)
  return statements.map((statement, index) => {
    const { left, right, result } = operandsList[index]
    return { type: config.type, prompt: statement(left, right), result }
  })
}

function generateOptions(result) {
  const options = new Set([result])
  while (options.size < OPTIONS_COUNT) {
    const option = result + randomInt(-MAX_OPTION_OFFSET, MAX_OPTION_OFFSET)
    if (option > 0) options.add(option)
  }
  return [...options].map(String)
}

export function getMathQuestions() {
  const questions = Object.values(MATH_OPERATIONS).flatMap(generateOperationQuestions)
  return fakeRequest(
    shuffle(questions).map(({ type, prompt, result }, index) => ({
      id: index + 1,
      type,
      prompt,
      ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: generateOptions(result) }),
      correctAnswer: String(result),
    })),
  )
}
