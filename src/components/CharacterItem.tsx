import { memo } from 'react'
import type { Character } from '../lib/types'
import { calculateClass } from '../lib/helpers'

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

export default CharacterItem
