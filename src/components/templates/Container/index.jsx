import { getSubjectBackground } from '@/constants/subjectColors'

export default function Container({ children, subjectId, difficulty }) {
  return (
    <section
      className={`flex flex-col gap-8 rounded-[2.5rem] p-6 transition-colors duration-500 md:p-10 ${getSubjectBackground(subjectId, difficulty)}`}
    >
      {children}
    </section>
  )
}
