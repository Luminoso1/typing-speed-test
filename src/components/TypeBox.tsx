import { useState, useEffect, useRef, useCallback, memo } from 'react'
import type { Character, CharacterState } from '../lib/types'
import { ALLOWED_KEYS } from '../lib/constants'
import { getRandomTextCharacters } from '../lib/helpers'

export default function TypeBox() {
  const { characters, current } = useType(getRandomTextCharacters('easy'))
  return (
    <div className="type-box">
      {characters.map(({ index, value, state }) => {
        return (
          <CharacterItem
            key={index}
            index={index}
            value={value}
            state={state}
            isCurrent={index === current}
          />
        )
      })}
    </div>
  )
}

const calculateClass = (state: CharacterState, isCurrent = false): string => {
  const base = {
    EMPTY: 'text-empty',
    FILLED: 'text-filled',
    ERROR: 'text-error',
  }[state]

  return `${base} ${isCurrent ? 'cursor' : ''}`
}

interface CharacterProps extends Character {
  isCurrent?: boolean
}

const CharacterItem = memo(function CharacterItem({
  value,
  state,
  isCurrent,
}: CharacterProps) {
  return <span className={calculateClass(state, isCurrent)}>{value}</span>
})

const useType = (initialState: Character[]) => {
  const [characters, setCharacters] = useState<Character[]>(initialState)
  const [current, setCurrent] = useState(0)

  const currentRef = useRef(0)

  const handleKeyDown = useCallback(
    (key: string) => {
      const idx = currentRef.current

      if (key === 'Backspace' && idx > 0) {
        const prevIdx = idx - 1
        setCharacters((prev) =>
          prev.map((c) => (c.index === prevIdx ? { ...c, state: 'EMPTY' } : c)),
        )
        setCurrent(prevIdx)
        currentRef.current = prevIdx
        return
      }

      if (ALLOWED_KEYS.includes(key) && idx < characters.length) {
        const expectedValue = characters[idx].value
        const newState = key === expectedValue ? 'FILLED' : 'ERROR'

        setCharacters((prev) =>
          prev.map((c) => (c.index === idx ? { ...c, state: newState } : c)),
        )

        const nextIdx = idx + 1
        setCurrent(nextIdx)
        currentRef.current = nextIdx
      }
    },
    [initialState],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event.key)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKeyDown])

  return { characters, current }
}
