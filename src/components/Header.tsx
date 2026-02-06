import { useState } from 'react'
import Button from './Button'
import Settings from './Settings'
import { Keyboard, Trophy, Config } from './Icons'
import clsx from 'clsx'

export default function Header({ bestScore }: { bestScore: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Keyboard className="size-7" />
        <div className="max-sm:hidden">
          <h1 className="text-2xl font-bold">TypeDev</h1>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Trophy />
          <p className="text-lg text-neutral-400">
            Best:{' '}
            <span className="text-neutral-0 text-lg">{bestScore} WPM</span>
          </p>
        </div>
        <Button
          aria-label="Show settings"
          className="min-h-auto! min-w-auto! bg-transparent! p-0!"
          onClick={() => setIsOpen(true)}
        >
          <Config className="size-8" />
        </Button>
      </div>

      <div
        className={clsx('absolute inset-0 z-40', {
          'translate-x-full opacity-80': !isOpen,
        })}
      >
        <Settings close={() => setIsOpen(false)} />
      </div>
    </header>
  )
}
