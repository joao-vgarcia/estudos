import { QUESTION_TYPES, STEPS } from '@/constants/quiz'
import { normalizeText } from '@/utils/text'

function isCorrectAnswer(givenAnswer, correctAnswer) {
  return normalizeText(givenAnswer) === normalizeText(correctAnswer)
}

function summarizeScore(items) {
  return {
    correctCount: items.filter(({ isCorrect }) => isCorrect).length,
    total: items.length,
  }
}

function buildSection(subject, gradedQuestions) {
  const items = gradedQuestions.filter((item) => item.subject === subject)
  return { title: subject, ...summarizeScore(items), items }
}

export function buildQuestionView({ step, questions, answers, currentIndex }) {
  const question = questions[currentIndex]
  if (step !== STEPS.QUESTIONS || !question) return null

  const answer = answers[currentIndex]
  const subjectQuestions = questions.filter(({ subject }) => subject === question.subject)

  return {
    id: question.id,
    subject: question.subject,
    type: question.type,
    prompt: question.prompt,
    options: question.options,
    answer: answer ?? '',
    speechText: question.type === QUESTION_TYPES.DICTATION ? question.correctAnswer : undefined,
    position: subjectQuestions.indexOf(question) + 1,
    total: subjectQuestions.length,
    canAdvance: answer != null,
    isLastQuestion: currentIndex === questions.length - 1,
  }
}

export function buildResult({ step, questions, answers }) {
  if (step !== STEPS.RESULT) return null

  const gradedQuestions = questions.map((question, index) => ({
    id: question.id,
    subject: question.subject,
    prompt: question.prompt,
    givenAnswer: answers[index],
    correctAnswer: question.correctAnswer,
    isCorrect: isCorrectAnswer(answers[index], question.correctAnswer),
  }))
  const subjects = [...new Set(gradedQuestions.map(({ subject }) => subject))]

  return {
    ...summarizeScore(gradedQuestions),
    sections: subjects.map((subject) => buildSection(subject, gradedQuestions)),
  }
}
