import type { Character } from './types'
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

export const getRandomTextCharacters = (dificulty: Dificulty): Character[] => {
  const texts = textData[dificulty]
  const random = Math.floor(Math.random() * texts.length)
  return texts[random].text
    .split('')
    .map((value, index) => ({ index, value, state: 'EMPTY' }))
}
