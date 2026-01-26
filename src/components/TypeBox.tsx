import { useEffect, useRef } from 'react'
import type { CharacterState } from '../lib/types.ts'
import CharacterItem from './CharacterItem'

type Props = {
  text: string
  userInput: string
  errors: Set<number>
}

export default function TypeBox({ text, userInput, errors }: Props) {
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
    <div className="type-box mt-4 min-h-[300px] w-full border-none px-2 leading-[1.35] tracking-[.4px] text-white">
      <div
        ref={containerCharsRef}
        className="characters max-h-[162px] overflow-hidden scroll-smooth outline-none"
      >
        {text.split('').map((char, index) => {
          let state: CharacterState = 'EMPTY'
          if (index < userInput.length) {
            state = errors.has(index) ? 'ERROR' : 'FILLED'
          }
          const isCurrent = index === userInput.length
          return (
            <CharacterItem
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
