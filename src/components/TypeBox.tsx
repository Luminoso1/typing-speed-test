import { useMemo } from 'react'
import Char from './Char'
import type { CharacterState } from '../lib/types'
import useScroll from '../hooks/useScroll'

type Props = {
  text: string
  userInput: string
  errors: Set<number>
}

export default function TypeBox({ text, userInput, errors }: Props) {
  const chars = useMemo(() => text.split(''), [text])
  const { container, element } = useScroll(userInput, 2)

  return (
    <div
      ref={container}
      role="region"
      aria-label="Typing passage"
      className="relative h-[calc(4*2em)] overflow-hidden scroll-smooth font-mono text-[2rem] leading-loose tracking-[.4px] outline-none md:h-[calc(3*2em)]"
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
            ref={isCurrent ? element : null}
          />
        )
      })}
    </div>
  )
}
