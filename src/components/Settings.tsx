import clsx from 'clsx'
import Button from './Button'
import { Close } from './Icons'
import { LEVELS, MODES, DURATIONS } from '../lib/constants'

import { useConfig, useActions } from '../store/context'

export default function Settings({ close }: { close: () => void }) {
  const { level, mode, duration } = useConfig()
  const { setLevel, setMode, setDuration } = useActions()

  return (
    <section className="ml-auto h-dvh w-full max-w-xl rounded-b-xl border-neutral-800 bg-neutral-900 shadow-lg sm:h-auto sm:border-r sm:border-b sm:border-l">
      {/* Header */}
      <header className="border-b border-neutral-800 px-4 py-8 md:py-10 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-neutral-0 text-2xl font-semibold">Settings</h2>
          <Button
            aria-label="Close settings"
            className="min-h-auto! min-w-auto! bg-transparent! p-0!"
            onClick={close}
          >
            <Close className="size-8" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="my-10 space-y-14 px-6 md:px-10">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-neutral-0 font-medium">Theme</h3>
            <p className="text-sm text-neutral-400">App appearance</p>
          </div>
          <Labels
            name="duration"
            items={['light', 'dark']}
            current={'dark'}
            onChange={() => {}}
          />
        </div>

        {/* Sound */}
        <div>
          <h3 className="text-neutral-0 font-medium">Sound</h3>
          <p className="text-sm text-neutral-400">Keyboard click effects</p>
        </div>

        {/* Level */}
        <div className="space-y-3">
          <h3 className="text-neutral-0 font-medium">Level</h3>

          <Labels
            name="level"
            items={LEVELS}
            current={level}
            onChange={setLevel}
          />
        </div>

        {/* Mode */}
        <div className="flex items-center justify-between">
          <h3 className="text-neutral-0 font-medium">Mode</h3>

          <Labels name="mode" items={MODES} current={mode} onChange={setMode} />
        </div>

        {/* Duration */}
        {mode === 'timed' && (
          <div className="space-y-3">
            <h3 className="text-neutral-0 font-medium">Duration</h3>

            <Labels
              name="duration"
              items={DURATIONS}
              current={duration}
              onChange={setDuration}
            />
          </div>
        )}
      </div>
    </section>
  )
}

type LabelsProps<T> = {
  name: string
  items: readonly T[]
  current: T
  onChange: (value: T) => void
}

const Labels = function <T>({
  name,
  items,
  current,
  onChange,
}: LabelsProps<T>) {
  return (
    <ul className="flex justify-around gap-2 rounded-full bg-neutral-800 p-4">
      {items.map((value, index) => {
        const id = `${value}-${index}`

        return (
          <li key={id}>
            <label
              htmlFor={id}
              className={clsx(
                'hover:text-neutral-0 cursor-pointer rounded-full px-5 py-3 text-sm text-neutral-400 capitalize transition-all duration-300 hover:bg-neutral-700/60',
                {
                  'bg-blue-600 text-white': current === value,
                },
              )}
            >
              {value}
            </label>

            <input
              type="radio"
              name={name}
              id={id}
              onChange={() => onChange(value)}
              className="hidden"
            />
          </li>
        )
      })}
    </ul>
  )
}
