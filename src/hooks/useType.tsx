import { useState, useEffect, useCallback, useMemo } from 'react'
import { useCountDown } from './useCountDown'
import { ALLOWED_KEYS } from '../lib/constants'

type Status = 'IDLE' | 'TYPING' | 'FINISHED'
const TIME = 60
const SECONDS_IN_MINUTE = 60

export const useType = (text: string) => {
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState<Status>('IDLE')
  const {
    secondsLeft: time,
    startCountDown,
    resetCountDown,
    stopCountDown,
  } = useCountDown(TIME)

  const current = userInput.length

  const wpm = useMemo(() => {
    const timeElapse = (TIME - time) / SECONDS_IN_MINUTE
    if (timeElapse <= 0 || userInput.length === 0) return 0

    const words = userInput.length / 5
    return Math.round(words / timeElapse)
  }, [time])

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
  }, [userInput.length, errors])

  const handleKeyDown = useCallback(
    (key: string) => {
      if (status === 'FINISHED') return

      if (status === 'IDLE' && ALLOWED_KEYS.includes(key)) {
        setStatus('TYPING')
        startCountDown()
      }

      if (key === 'Backspace') {
        setUserInput((prev) => prev.slice(0, -1))
        return
      }

      if (ALLOWED_KEYS.includes(key) && userInput.length < text.length) {
        setUserInput((prev) => prev + key)
      }
    },
    [status, userInput.length, text.length, startCountDown],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event.key)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (time <= 0 || (userInput.length === text.length && text.length > 0)) {
      setStatus('FINISHED')
      stopCountDown()
    }
  }, [time, userInput.length])

  const restart = () => {
    setStatus('IDLE')
    resetCountDown()
  }

  return { userInput, current, wpm, time, status, restart, errors, accuracy }
}
