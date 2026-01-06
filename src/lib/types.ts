export type Character = {
  index: number
  value: string
  state: CharacterState
}

export type CharacterState = 'EMPTY' | 'FILLED' | 'ERROR'

export type Level = 'easy' | 'medium' | 'hard'

export type Mode = 'timed' | 'passage'
