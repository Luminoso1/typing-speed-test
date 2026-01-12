import { useMemo } from 'react'

export default function useStats(
  text: string,
  userInput: string,
  counter: number,
) {
  const wpm = useMemo(() => {
    const minutesElapsed = counter / 60
    if (minutesElapsed <= 0) return 0

    const words = userInput.length / 5
    return Math.round(words / minutesElapsed)
  }, [userInput, counter])

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
