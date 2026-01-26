import { forwardRef, memo } from 'react'
import type { Character } from '../lib/types'
import { calculateClass } from '../lib/helpers'

interface CharacterProps extends Character {
  isCurrent?: boolean
}

const CharacterItem = memo(
  forwardRef<HTMLSpanElement, CharacterProps>(function CharacterItem(
    { value, state, isCurrent },
    ref,
  ) {
    return (
      <span ref={ref} className={calculateClass(state, isCurrent)}>
        {value}
      </span>
    )
  }),
)

export default CharacterItem
