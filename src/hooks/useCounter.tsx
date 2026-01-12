import { useState, useEffect, useCallback } from 'react'
import type { Mode } from '../lib/types'

export default function useCountDown(seconds: number, mode: Mode) {
  const [counter, setCounter] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive === false) return

    const intervalId = setInterval(() => {
      setCounter((prev) => {
        if (mode === 'timed' && seconds - prev === 1) {
          setIsActive(false)
          return seconds
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isActive, counter, seconds, mode])

  const startCounter = useCallback(() => setIsActive(true), [])

  const resetCounter = useCallback(() => {
    setCounter(0)
    setIsActive(false)
  }, [])

  const stopCounter = () => setIsActive(false)

  return { counter, startCounter, resetCounter, stopCounter }
}
