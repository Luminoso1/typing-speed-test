import { useRef } from 'react'
import TypeBox from '../components/TypeBox'
import Stats from '../components/Stats'
import { useConfig, useActions, useTyping } from '../store/context'
import clsx from 'clsx'

export default function TypingView() {
  const { status, text } = useConfig()
  const { start, pause, resume, setInput } = useActions()
  const { input, errors } = useTyping()

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const handleHiddenInputFocus = () => hiddenInputRef.current?.focus()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (status === 'IDLE') start()
    if (status === 'PAUSED') resume()
    const value = event.target.value
    setInput(value)
  }

  return (
    <div className="mt-12 flex-1 md:mt-32">
      {status === 'TYPING' && (
        <div
          onClick={pause}
          className={clsx(
            'fixed inset-0 bg-neutral-900',
            'animate-duration-250',
            {
              'animate-fade-in block': status === 'TYPING',
              'animate-fade-out': status !== 'TYPING',
            },
          )}
        >
          <Header />
        </div>
      )}
      <input
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={true}
        value={input}
        onChange={handleChange}
        ref={hiddenInputRef}
        aria-label="Hidden keyboard input"
        tabIndex={-1}
        className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0"
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleHiddenInputFocus}
        className="focus relative z-20 rounded-md"
      >
        <TypeBox text={text} userInput={input} errors={errors} />
      </div>
    </div>
  )
}

const Header = () => {
  const { status } = useConfig()
  return (
    <div className="relative top-8 z-20 min-h-16 justify-center px-4 md:flex md:px-8">
      {status == 'TYPING' && <Stats />}
    </div>
  )
}
