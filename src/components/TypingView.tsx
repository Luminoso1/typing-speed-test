import { useRef } from 'react'
import TypeBox from '../components/TypeBox'
import Settings from '../components/Settings'
import RestartButton from '../components/RestartButton'
import Stats from '../components/Stats'

import { useConfig, useActions, useTyping } from '../store/context'

export default function TypingView() {
  const { reset } = useActions()

  return (
    <>
      <Header />
      <Main />
      <RestartButton restart={reset} />
    </>
  )
}

const Header = () => {
  const { status } = useConfig()
  return (
    <div className="flex flex-col justify-end gap-y-4 border-b border-neutral-700 pb-4 *:leading-none lg:flex-row lg:items-center">
      {status === 'TYPING' && <Stats />}
      <Settings />
    </div>
  )
}

const Main = () => {
  const { status, text } = useConfig()
  const { start, resume, setInput } = useActions()
  const { input, errors } = useTyping()

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const handleHiddenInputFocus = () => hiddenInputRef.current?.focus()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setInput(value)
  }

  const handleStart = () => {
    if (status === 'PAUSED') resume()
    if (status === 'IDLE') start()
  }
  return (
    <>
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
        {status !== 'TYPING' && <ModalStart start={handleStart} />}

        <TypeBox text={text} userInput={input} errors={errors} />
      </div>
    </>
  )
}

const ModalStart = ({ start }: { start: () => void }) => {
  return (
    <div
      onClick={start}
      className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center backdrop-blur-sm"
    >
      <button className="cursor-pointer rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold transition-all duration-300 hover:bg-blue-600/80">
        Start Typing Test
      </button>
      <p className="mt-4 text-lg font-semibold opacity-80">
        Or click the text and start typing
      </p>
    </div>
  )
}
