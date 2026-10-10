import { MATH_OPERATIONS } from '@/constants/math'
import { QUESTIONS_PER_MODULE, QUESTION_TYPES } from '@/constants/quiz'
import { isValidMathQuestion } from '@/utils/mathValidator'
import { randomInt, randomItem } from '@/utils/random'
import { fakeRequest } from './fakeRequest'

const OPTIONS_COUNT = 4
const MAX_OPTION_OFFSET = 5

const OPERATIONS = {
  [MATH_OPERATIONS.ADDITION]: {
    symbol: '+',
    leftRange: [1, 99],
    rightRange: [1, 99],
    calculate: (left, right) => left + right,
  },
  [MATH_OPERATIONS.SUBTRACTION]: {
    symbol: '-',
    leftRange: [1, 100],
    rightRange: [1, 100],
    calculate: (left, right) => left - right,
  },
  [MATH_OPERATIONS.MULTIPLICATION]: {
    symbol: '×',
    leftRange: [2, 12],
    rightRange: [2, 12],
    calculate: (left, right) => left * right,
  },
  [MATH_OPERATIONS.DIVISION]: {
    symbol: '÷',
    leftRange: [2, 100],
    rightRange: [2, 10],
    calculate: (left, right) => left / right,
  },
}

const EASY_OPERATIONS = [MATH_OPERATIONS.ADDITION, MATH_OPERATIONS.SUBTRACTION]
const HARD_OPERATIONS = [MATH_OPERATIONS.MULTIPLICATION, MATH_OPERATIONS.DIVISION]

function generateQuestion(operation) {
  const { symbol, leftRange, rightRange, calculate } = OPERATIONS[operation]
  const left = randomInt(...leftRange)
  const right = randomInt(...rightRange)
  return { operation, prompt: `${left} ${symbol} ${right} = ?`, result: calculate(left, right) }
}

function generateValidQuestion(operations) {
  const operation = randomItem(operations)
  let question
  do {
    question = generateQuestion(operation)
  } while (!isValidMathQuestion(question))
  return question
}

function generateUniqueQuestions(operations) {
  const questionsByPrompt = new Map()
  while (questionsByPrompt.size < QUESTIONS_PER_MODULE) {
    const question = generateValidQuestion(operations)
    questionsByPrompt.set(question.prompt, question)
  }
  return [...questionsByPrompt.values()]
}

function generateOptions(result) {
  const options = new Set([result])
  while (options.size < OPTIONS_COUNT) {
    const option = result + randomInt(-MAX_OPTION_OFFSET, MAX_OPTION_OFFSET)
    if (option > 0) options.add(option)
  }
  return [...options].map(String)
}

export function getEasyQuestions() {
  return fakeRequest(
    generateUniqueQuestions(EASY_OPERATIONS).map(({ prompt, result }, index) => ({
      id: index + 1,
      type: QUESTION_TYPES.NUMBER,
      prompt,
      correctAnswer: String(result),
    })),
  )
}

export function getHardQuestions() {
  return fakeRequest(
    generateUniqueQuestions(HARD_OPERATIONS).map(({ prompt, result }, index) => ({
      id: index + 1,
      prompt,
      options: generateOptions(result),
      correctAnswer: String(result),
    })),
  )
}
