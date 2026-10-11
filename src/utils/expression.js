const UNKNOWN_LABEL = '?'

const PLACEHOLDERS = ['X', 'Y', 'Z']

export function createNumber(value) {
  return { value }
}

export function combine(operation, left, right) {
  return { operation, left, right, value: operation.calculate(left.value, right.value) }
}

export function getNumbers(node) {
  return node.operation ? [...getNumbers(node.left), ...getNumbers(node.right)] : [node]
}

export function getOperationNodes(node) {
  return node.operation ? [...getOperationNodes(node.left), ...getOperationNodes(node.right), node] : []
}

function renderOperand(node, labels) {
  const text = renderExpression(node, labels)
  return node.operation && !labels.has(node) ? `(${text})` : text
}

function renderExpression(node, labels) {
  if (labels.has(node)) return labels.get(node)
  if (!node.operation) return String(node.value)
  return `${renderOperand(node.left, labels)} ${node.operation.symbol} ${renderOperand(node.right, labels)}`
}

function formatStatement(root, labels, rightSide) {
  return `${renderExpression(root, labels)} = ${rightSide}`
}

export function formatCalculation(root) {
  return formatStatement(root, new Map(), UNKNOWN_LABEL)
}

export function formatEquation(root, unknown) {
  return formatStatement(root, new Map([[unknown, UNKNOWN_LABEL]]), root.value)
}

function replaceWithPlaceholders(root, nodes, labels, rightSide) {
  return nodes.map((node, index) => {
    const note = `${PLACEHOLDERS[index]} = ${renderExpression(node, labels)}`
    labels.set(node, PLACEHOLDERS[index])
    return { expression: formatStatement(root, labels, rightSide), note }
  })
}

export function buildEvaluationSteps(root) {
  const labels = new Map()
  return [
    { expression: formatStatement(root, labels, UNKNOWN_LABEL) },
    ...replaceWithPlaceholders(root, getOperationNodes(root).slice(0, -1), labels, UNKNOWN_LABEL),
  ]
}

function solveOperand(node, operand, target, labels) {
  return node.left === operand
    ? node.operation.findLeft(target, renderExpression(node.right, labels))
    : node.operation.findRight(target, renderExpression(node.left, labels))
}

export function buildSolvingSteps(root, unknown) {
  const labels = new Map([[unknown, UNKNOWN_LABEL]])
  const operationNodes = getOperationNodes(root)
  const unknownIndex = operationNodes.findIndex(({ left, right }) => left === unknown || right === unknown)
  const steps = [
    { expression: formatStatement(root, labels, root.value) },
    ...replaceWithPlaceholders(root, operationNodes.slice(0, unknownIndex), labels, root.value),
  ]
  let target = String(root.value)
  for (let index = operationNodes.length - 1; index > unknownIndex; index--) {
    const placeholder = PLACEHOLDERS[steps.length - 1]
    const inner = operationNodes[index - 1]
    const note = `${placeholder} = ${solveOperand(operationNodes[index], inner, target, labels)}`
    steps.push({ expression: `${renderExpression(inner, labels)} = ${placeholder}`, note })
    target = placeholder
  }
  steps.push({ expression: `${UNKNOWN_LABEL} = ${solveOperand(operationNodes[unknownIndex], unknown, target, labels)}` })
  return steps
}
