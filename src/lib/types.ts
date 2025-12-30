export type Character = {
  index: number
  value: string
  state: CharacterState
}

export type CharacterState = 'EMPTY' | 'FILLED' | 'ERROR'
