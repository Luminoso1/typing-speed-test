import Button from './Button'
import { Keyboard, Trophy, Config } from './Icons'

export default function Header({ bestScore }: { bestScore: number }) {
  return (
    <header className="flex items-center justify-between pt-8 pb-16">
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
        >
          <Config className="size-8" />
        </Button>
      </div>
    </header>
  )
}
