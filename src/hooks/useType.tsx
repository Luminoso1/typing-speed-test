import { useState, useEffect, useCallback } from 'react'
import { ALLOWED_KEYS } from '../lib/constants'
import type { Status } from '../lib/types'

export default function useType(
  text: string,
  status: Status,
  onStart: () => void,
  onFinish: () => void,
) {
  const [userInput, setUserInput] = useState('')

  const current = userInput.length

  const handleKeyDown = useCallback(
    (key: string) => {
      if (status === 'FINISHED') return

      setUserInput((prev) => {
        if (status === 'IDLE' && ALLOWED_KEYS.includes(key)) {
          onStart()
        }

        if (key === 'Backspace') return prev.slice(0, -1)

        if (ALLOWED_KEYS.includes(key) && prev.length < text.length) {
          const newValue = prev + key
          if (newValue.length === text.length) {
            onFinish()
          }
          return newValue
        }
        return prev
      })
    },
    [status, text.length, onStart, onFinish],
  )

  const clearInput = () => {
    setUserInput('')
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event.key)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKeyDown])

  return { userInput, current, clearInput }
}
