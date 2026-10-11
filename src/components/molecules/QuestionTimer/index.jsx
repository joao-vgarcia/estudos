import ProgressBar from '@/components/atoms/ProgressBar'
import { QUESTION_TIME_STAGES } from '@/constants/questionTimer'

const variantByStage = {
  [QUESTION_TIME_STAGES.NORMAL]: 'timer',
  [QUESTION_TIME_STAGES.URGENT]: 'urgent',
  [QUESTION_TIME_STAGES.CRITICAL]: 'critical',
}

export default function QuestionTimer({ progress, stage }) {
  return <ProgressBar value={progress} label="Tempo para responder" variant={variantByStage[stage]} />
}
