import { useEffect, useRef, useMemo } from 'react'
import type { CharacterState } from '../lib/types.ts'
import Char from './Char'

type Props = {
  text: string
  userInput: string
  errors: Set<number>
}

export default function TypeBox({ text, userInput, errors }: Props) {
  const chars = useMemo(() => text.split(''), [text])

  const containerCharsRef = useRef<HTMLDivElement>(null)
  const currentCharRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!currentCharRef.current || !containerCharsRef.current) return

    const container = containerCharsRef.current
    const item = currentCharRef.current

    const itemTop = item.offsetTop

    const containerPadding = 2

    container.scrollTo({
      top: itemTop - containerPadding,
      behavior: 'smooth',
    })
  }, [userInput.length])

  return (
    <div className="w-full border-none tracking-[.4px] text-white">
      <div
        ref={containerCharsRef}
        className="h-[calc(3*2em)] overflow-hidden scroll-smooth font-mono text-[2.2rem] leading-loose outline-none"
      >
        {chars.map((char, index) => {
          let state: CharacterState = 'EMPTY'
          if (index < userInput.length) {
            state = errors.has(index) ? 'ERROR' : 'FILLED'
          }
          const isCurrent = index === userInput.length
          return (
            <Char
              key={`${char}-${index}`}
              index={index}
              value={char}
              state={state}
              isCurrent={isCurrent}
              ref={isCurrent ? currentCharRef : null}
            />
          )
        })}
      </div>
    </div>
  )
}
