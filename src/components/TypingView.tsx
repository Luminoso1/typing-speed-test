import { useEffect, useRef, useCallback } from 'react'
import TypeBox from '../components/TypeBox'
import Stats from '../components/Stats'
import { useConfig, useActions, useTyping } from '../store/context'

export default function TypingView() {
  const { status, text } = useConfig()
  const { start, pause, resume, setInput } = useActions()
  const { input, errors } = useTyping()

  const hiddenInputRef = useRef<HTMLTextAreaElement>(null)

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

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      if (status === 'IDLE') start()
      if (status === 'PAUSED') resume()
      const value = event.target.value
      setInput(value)
    },
    [status, start, resume, setInput],
  )

  return (
    <main className="mt-16 flex-1 md:mt-28">
      {status === 'TYPING' && (
        <Overlay onClick={pause}>
          <Header />
        </Overlay>
      )}
      <div className="relative rounded-lg outline-blue-400/70 focus-within:outline-2 focus-within:outline-offset-8">
        <HiddenInput
          ref={hiddenInputRef}
          value={input}
          onChange={onChange}
          aria-label="Hidden input passage"
        />
        <TypeBox text={text} userInput={input} errors={errors} />
      </div>
    </main>
  )
}

interface InputProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  ref: React.Ref<HTMLTextAreaElement>
  value: string
}

const HiddenInput = ({ ref, value, onChange, ...rest }: InputProps) => {
  return (
    <textarea
      {...rest}
      ref={ref}
      value={value}
      onChange={onChange}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className="absolute inset-0 opacity-0 outline-0"
    ></textarea>
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
