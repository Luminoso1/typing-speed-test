import type { Level } from './types'
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

const textData = data as Data

export const getRandomText = (dificulty: Level): string => {
  const texts = textData[dificulty]
  const random = Math.floor(Math.random() * texts.length)
  return texts[random].text
}

const WPM_CHARS_PER_WORD = 5

export const calcAccuracy = (corrects: number, total: number) => {
  if (total === 0) return 100

  const result = Math.round((corrects / total) * 100)

  return Math.max(0, result)
}

export const calcWpm = (corrects: number, ms: number) => {
  const elapsedMinutes = ms / 60000

  if (elapsedMinutes < 1 / 60) return 0

  const result = Math.round(corrects / WPM_CHARS_PER_WORD / elapsedMinutes)

  return Math.max(0, result)
}
