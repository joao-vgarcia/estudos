import {
  ADDITION_MULTI_STEP_STATEMENTS,
  ADDITION_STATEMENTS,
  DIVISION_MULTI_STEP_STATEMENTS,
  DIVISION_STATEMENTS,
  MATH_OPERATIONS,
  MULTIPLICATION_MULTI_STEP_STATEMENTS,
  MULTIPLICATION_STATEMENTS,
  SUBTRACTION_MULTI_STEP_STATEMENTS,
  SUBTRACTION_STATEMENTS,
} from '@/constants/math'
import { DIFFICULTIES, QUESTION_TYPES } from '@/constants/quiz'
import { isValidMathQuestion } from '@/utils/mathValidator'
import { randomInt, randomItem, randomItems, shuffle } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

const QUESTIONS_PER_VARIANT = 2
const OPTIONS_COUNT = 4
const MAX_OPTION_OFFSET = 5
const MULTI_STEP_RESULT_RANGE = [1, 100]

const OPERATIONS = {
  [MATH_OPERATIONS.ADDITION]: {
    symbol: '+',
    leftRange: [1, 99],
    rightRange: [1, 99],
    calculate: (left, right) => left + right,
    statements: ADDITION_STATEMENTS,
    multiStepStatements: ADDITION_MULTI_STEP_STATEMENTS,
    variants: [
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [30, 60] },
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
      { type: QUESTION_TYPES.MULTIPLE_CHOICE, difficulty: DIFFICULTIES.EASY, resultRange: [30, 60] },
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

function generateMultiStepQuestion(statements) {
  const { ranges, solve, statement, questions } = randomItem(statements)
  let operands
  let results
  do {
    operands = ranges.map((range) => randomInt(...range))
    results = solve(...operands)
  } while (!results.every((result) => isValidMathQuestion({ result }, MULTI_STEP_RESULT_RANGE)))
  return {
    type: QUESTION_TYPES.NUMBER,
    difficulty: DIFFICULTIES.HARD,
    prompt: [statement(...operands), ...questions].join(' '),
    parts: questions.map((label, index) => ({ label, correctAnswer: String(results[index]) })),
  }
}

function generateOperationQuestions(operation) {
  const config = OPERATIONS[operation]
  const variants = config.variants.flatMap((variant) => new Array(QUESTIONS_PER_VARIANT).fill(variant))
  const statements = randomItems(config.statements, variants.length)
  const usedKeys = new Set()
  const questions = variants.map(({ type, difficulty, resultRange }, index) => {
    const { left, right, result } = generateUniqueOperands(config, resultRange, usedKeys)
    return {
      type,
      difficulty,
      prompt: statements[index](left, right),
      ...(type === QUESTION_TYPES.MULTIPLE_CHOICE && { options: generateOptions(result) }),
      correctAnswer: String(result),
    }
  })
  return [...questions, generateMultiStepQuestion(config.multiStepStatements)]
}

export function getMathQuestions() {
  const questions = Object.values(MATH_OPERATIONS).flatMap(generateOperationQuestions)
  return fakeRequest(shuffle(questions).map((question, index) => ({ id: index + 1, ...question })))
}
