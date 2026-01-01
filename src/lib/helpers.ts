import type { CharacterState } from './types'
import data from './data.json'

type Text = {
  id: string
  text: string
}

type Data = {
  [key: string]: Text[]
  easy: Text[]
  medium: Text[]
  hard: Text[]
}

type Dificulty = 'easy' | 'medium' | 'hard'

const textData = data as Data

export const getRandomTextCharacters = (dificulty: Dificulty): string => {
  const texts = textData[dificulty]
  const random = Math.floor(Math.random() * texts.length)
  return texts[random].text
}

export const calculateClass = (
  state: CharacterState,
  isCurrent = false,
): string => {
  const base = {
    EMPTY: 'text-empty',
    FILLED: 'text-filled',
    ERROR: 'text-error',
  }[state]

  return `${base} ${isCurrent ? 'cursor' : ''}`
}
