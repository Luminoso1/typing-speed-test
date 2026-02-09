import { useEffect, useRef, useCallback } from 'react'
import TypeBox from '../components/TypeBox'
import Stats from '../components/Stats'
import { useConfig, useActions, useTyping } from '../store/context'

export default function TypingView() {
  const { status, text } = useConfig()
  const { start, pause, resume, setInput } = useActions()
  const { input, errors } = useTyping()

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  // Keep hidden input focus
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Element

      if (target.closest('[role="dialog"]')) return

      requestAnimationFrame(() => {
        hiddenInputRef.current?.focus()
      })
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (status === 'IDLE') start()
      if (status === 'PAUSED') resume()
      const value = event.target.value
      setInput(value)
    },
    [status, start, resume, setInput],
  )

  return (
    <div className="mt-16 flex-1 md:mt-28">
      {status === 'TYPING' && (
        <Overlay onClick={pause}>
          <Header />
        </Overlay>
      )}
      <div
        tabIndex={0}
        onFocus={() => hiddenInputRef.current?.focus()}
        className="rounded-lg outline-blue-400/70 focus-within:outline-2 focus-within:outline-offset-8"
      >
        <HiddenInput ref={hiddenInputRef} value={input} onChange={onChange} />
        <TypeBox text={text} userInput={input} errors={errors} />
      </div>
    </div>
  )
}

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  ref: React.Ref<HTMLInputElement>
  value: string
}

const HiddenInput = ({ ref, value, onChange, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      type="text"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      autoFocus
      value={value}
      onChange={onChange}
      ref={ref}
      aria-label="Hidden keyboard input"
      data-hidden={true}
      tabIndex={-1}
      className="pointer-events-none absolute h-px w-px opacity-0"
    />
  )
}

type OverlayProps = React.HTMLAttributes<HTMLDivElement>

const Overlay = ({ onClick, children }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      className="animate-fade-in animate-duration-normal fixed inset-0 bg-neutral-900"
    >
      {children}
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
