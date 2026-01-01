import { useState, useEffect } from 'react'

export const useCountDown = (seconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive === false) return

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [secondsLeft, isActive])

  const startCountDown = () => setIsActive(true)

  const resetCountDown = () => {
    setSecondsLeft(seconds)
    setIsActive(false)
  }

  const stopCountDown = () => setIsActive(false)

  return { secondsLeft, startCountDown, resetCountDown, stopCountDown }
}
