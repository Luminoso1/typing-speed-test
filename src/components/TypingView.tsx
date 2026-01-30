import { useRef } from 'react'
import TypeBox from '../components/TypeBox'
import Stats from '../components/Stats'
import Button from '../components/Button'
import { Restart, Next } from '../components/Icons'

import { useConfig, useActions, useTyping } from '../store/context'

export default function TypingView() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

const Header = () => {
  const { status } = useConfig()
  return (
    <div className="relative z-20 flex min-h-16 flex-col justify-end *:leading-none lg:flex-row lg:items-center">
      {status == 'TYPING' && <Stats />}
    </div>
  )
}

const Main = () => {
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
    <>
      {status === 'TYPING' && (
        <div onClick={pause} className="absolute inset-0 bg-neutral-900"></div>
      )}
      <input
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        value={input}
        onChange={handleChange}
        ref={hiddenInputRef}
        aria-label="Hidden keyboard input"
        tabIndex={-1}
        className="pointer-events-none absolute top-0 left-0 h-[1px] w-[1px] opacity-0"
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleHiddenInputFocus}
        className="relative z-20"
      >
        <TypeBox text={text} userInput={input} errors={errors} />
      </div>
    </>
  )
}

const Footer = () => {
  const { status } = useConfig()
  const { restart, next } = useActions()
  return (
    <div className="flex items-center gap-3 sm:justify-center">
      {status === 'TYPING' && (
        <Button aria-label="Restart Test" onClick={restart}>
          <Restart className="size-7" />
          <span className="md:hidden">Restart Test</span>
        </Button>
      )}

      <Button aria-label="Next Test" onClick={next}>
        <Next className="size-7" />
        <span className="md:hidden">Next Text</span>
      </Button>
    </div>
  )
}
