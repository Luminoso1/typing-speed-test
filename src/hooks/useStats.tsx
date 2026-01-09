import { useMemo } from 'react'
import { DEFAULT_TIME } from '../lib/constants'

export default function useStats(
  text: string,
  userInput: string,
  time: number,
) {
  const wpm = useMemo(() => {
    const timeElapse = (DEFAULT_TIME - time) / DEFAULT_TIME
    if (timeElapse <= 0 || userInput.length === 0) return 0

    const words = userInput.length / 5
    return Math.round(words / timeElapse)
  }, [userInput, time])

  const errors = useMemo(() => {
    let count = 0
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) count++
    }
    return count
  }, [userInput, text])

  const accuracy = useMemo(() => {
    if (userInput.length === 0) return 100
    const corrects = userInput.length - errors
    return Math.round((corrects / userInput.length) * 100)
  }, [userInput, errors])

  return { wpm, errors, accuracy }
}
