import { forwardRef, memo } from 'react'
import clsx from 'clsx'
import type { Character } from '../lib/types'

interface CharacterProps extends Character {
  isCurrent?: boolean
}

const CharacterItem = memo(
  forwardRef<HTMLSpanElement, CharacterProps>(function CharacterItem(
    { value, state, isCurrent },
    ref,
  ) {
    const spanClasses = clsx('relative  transition-colors  duration-300', {
      'text-neutral-600': state === 'EMPTY',
      'text-neutral-300/80': state === 'FILLED',
      'text-error': state === 'ERROR',
      cursor: isCurrent,
    })
    return (
      <span ref={ref} className={spanClasses}>
        {value}
      </span>
    )
  }),
)

export default CharacterItem
