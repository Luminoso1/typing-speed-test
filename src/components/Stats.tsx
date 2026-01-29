import clsx from 'clsx'
import { useStats, useActions, useConfig } from '../store/context'

export default function Stats() {
  const { mode } = useConfig()
  const { pause } = useActions()
  const { wpm, accuracy, time } = useStats()

  const accClasses = clsx(
    'group relative flex h-32 w-32 flex-col items-center justify-between gap-2 overflow-hidden rounded-full px-7 backdrop-blur-md transition-all duration-300 md:h-16 md:w-44 md:flex-row border bg-[#151a25]',
    {
      'border-green-500/10 hover:border-green-500/20 text-green-500 shadow-glow-sm':
        accuracy >= 90,
      'border-red-500/10 hover:border-red-500/20 text-red-500 shadow-glow-sm':
        accuracy < 90,
    },
  )

  const timeClasses = clsx(
    'group relative flex h-32 w-32 flex-col items-center justify-between gap-2 overflow-hidden rounded-full px-7 backdrop-blur-md transition-all duration-300 md:h-16 md:w-44 md:flex-row border bg-[#151a25]',
    {
      'border-yellow-400/10 hover:border-yellow-500/20 text-yellow-400 shadow-glow':
        time >= 20 || mode === 'passage',
      'border-red-500/10 hover:border-red-500/20 text-red-500 shadow-glow-sm':
        mode === 'timed' && time < 20,
    },
  )
  return (
    <div onClick={pause} className="absolute inset-0 bg-neutral-900">
      <div className="relative top-10 flex items-center justify-center gap-10 px-8">
        <div className="relative flex h-32 w-32 flex-col items-center justify-between gap-2 rounded-full border border-blue-500/30 bg-[#151a25] px-7 md:h-16 md:w-40 md:flex-row">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            WPM
          </span>
          <span className="font-mono text-3xl leading-none font-bold opacity-70">
            {wpm}
          </span>
        </div>

        <div className={accClasses}>
          <div
            className={clsx(
              'absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-70',
              {
                'via-red-500': accuracy < 90,
              },
            )}
          ></div>

          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Acc
          </span>
          <span className="font-mono text-3xl leading-none font-bold">
            {accuracy}%
          </span>
        </div>

        <div className={timeClasses}>
          <div
            className={clsx(
              'absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70',
              {
                'via-red-500!': time < 20,
              },
            )}
          ></div>

          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Time
          </span>
          <span className="font-mono text-3xl leading-none font-bold">
            {formatCounter(time)}
          </span>
        </div>
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
