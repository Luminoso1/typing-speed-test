import { useStats } from '../store/context'

export default function Stats() {
  const { wpm, accuracy, time } = useStats()

  return (
    <div className="stats flex max-lg:justify-between lg:gap-4">
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        WPM: <span>{wpm}</span>
      </h2>
      <div className="w-[1px] bg-neutral-700"></div>
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        Accuracy: <span>{accuracy}%</span>
      </h2>
      <div className="w-[1px] bg-neutral-700"></div>
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        Timer: <span>{formatCounter(time)}</span>
      </h2>
    </div>
  )
}

function formatCounter(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const mm = String(minutes).padStart(1, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${mm}:${ss}`
}
