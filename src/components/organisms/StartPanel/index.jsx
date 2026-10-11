import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import LeisureTimeBadge from '@/components/molecules/LeisureTimeBadge'
import LevelCard from '@/components/molecules/LevelCard'

function LeisureAction({ isRunning, isAvailable, onStartLeisure, onPauseLeisure }) {
  if (isRunning) {
    return (
      <Button variant="secondary" endIcon="pause" onClick={onPauseLeisure}>
        Pausar
      </Button>
    )
  }
  if (isAvailable) {
    return (
      <Button variant="primary" endIcon="play" onClick={onStartLeisure}>
        Começar a curtir
      </Button>
    )
  }
  return null
}

export default function StartPanel({ title, leisure, levels, onStart, onStartLeisure, onPauseLeisure }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex w-full flex-col items-center gap-6">
        <LeisureTimeBadge {...leisure} />
        <LeisureAction {...leisure} onStartLeisure={onStartLeisure} onPauseLeisure={onPauseLeisure} />
      </div>
      {!leisure.isRunning && (
        <>
          <div className="flex flex-col gap-3">
            <Text as="h1" variant="title">{title}</Text>
            <Text variant="muted">Escolha um nível para começar</Text>
          </div>
          <ul className="grid w-full gap-5 sm:grid-cols-2">
            {levels.map((level) => (
              <li key={level.index} className="grid sm:last:col-span-2">
                <LevelCard {...level} onClick={() => onStart(level.index)} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
