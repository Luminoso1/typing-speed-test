export type Character = {
  index: number
  value: string
  state: CharacterState
}

export type CharacterState = 'EMPTY' | 'FILLED' | 'ERROR'

export type Level = 'easy' | 'medium' | 'hard'

export type Mode = 'timed' | 'passage'

export type Option<T extends string> = {
  label: string
  value: T
}

export type LabelsProps<T extends string> = {
  name: string
  actual: T
  options: readonly Option<T>[] | readonly T[]
  onChange: (value: T) => void
  className?: string
}
