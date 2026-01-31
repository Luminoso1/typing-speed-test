import clsx from 'clsx'
import { useStats, useConfig } from '../store/context'

export default function Stats() {
  const { mode } = useConfig()
  const { wpm, accuracy, time } = useStats()

  const text =
    'font-mono text-2xl leading-none font-bold transition-colors duration-300'

  const accClasses = clsx(text, {
    'text-green-500': accuracy >= 90,
    'text-red-500': accuracy < 90,
  })

  const timeClasses = clsx(text, 'text-yellow-400', {
    'text-red-500!': mode == 'timed' && time < 20,
  })

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
      <div className="flex h-16 w-full flex-row items-center justify-between gap-2 rounded-full border border-neutral-700 px-7 sm:w-40">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          WPM
        </span>
        <span className="font-mono text-2xl leading-none font-bold opacity-70">
          {wpm}
        </span>
      </div>

      <div className="flex h-16 flex-row items-center justify-between gap-2 rounded-full border border-neutral-700 px-7 sm:w-40">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Acc
        </span>
        <span className={accClasses}>{accuracy}%</span>
      </div>

      <div className="col-span-2 sm:col-span-1 flex h-16 flex-row items-center justify-between gap-2 rounded-full border border-neutral-700 px-7 sm:w-40">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Time
        </span>
        <span className={timeClasses}>{formatCounter(time)}</span>
      </div>
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
