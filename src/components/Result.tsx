import { useMemo } from 'react'
import { Check, Party } from './Icons'
import Button from './Button'
import { useConfig, useStats, useActions, useTyping } from '../store/context'

export default function Results() {
  const { text } = useConfig()
  const { wpm, accuracy, isNewRecord, hasCompletedOnce } = useStats()
  const { next } = useActions()
  const { errors, corrects } = useTyping()

  const finishUI = useMemo(() => {
    if (isNewRecord) {
      return {
        Icon: Party,
        title: 'High Score Smashed!',
        desc: 'You’re getting faster. That was incredible typing.',
      }
    }
    if (!hasCompletedOnce) {
      return {
        Icon: Check,
        title: 'Baseline Established!',
        desc: 'You’ve set the bar. Now the real challenge begins—time to beat it.',
      }
    }

    return {
      Icon: Check,
      title: 'Test Complete!',
      desc: 'Solid run. Keep pushing to beat your high score.',
    }
  }, [isNewRecord, hasCompletedOnce])
  return (
    <div className="text-center">
      <finishUI.Icon className="relative z-30 mx-auto w-12 md:w-16" />
      <h2 className="mt-8 text-[40px] font-bold">{finishUI.title}</h2>
      <p className="text-xl text-neutral-400">{finishUI.desc}</p>
      <ul className="mt-12 mb-14 flex flex-col justify-center gap-x-5 gap-y-2.5 text-left md:flex-row">
        <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-40">
          <h3 className="text-xl text-neutral-400">WPM:</h3>
          <h4 className="text-2xl font-bold">{wpm}</h4>
        </li>

        <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-40">
          <h3 className="text-xl text-neutral-400">Accuracy:</h3>
          <h4 className="text-2xl font-bold">{accuracy}%</h4>
        </li>

        <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-48">
          <h3 className="text-xl text-neutral-400">Characters:</h3>
          <h4 className="text-2xl font-bold">
            <span>{text.length}</span>/
            <span className="text-green-500">{corrects}</span>/
            <span className="text-red-500">{errors.size}</span>
          </h4>
        </li>
      </ul>

      <Button
        onClick={next}
        className="bg-neutral-0! focus mx-auto max-w-40 rounded-xl p-4! text-xl font-semibold text-neutral-900 hover:bg-neutral-300!"
      >
        Go Again
      </Button>
    </div>
  )
}
