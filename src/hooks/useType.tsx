import { useState, useEffect, useCallback } from 'react'
import { ALLOWED_KEYS } from '../lib/constants'
import type { Status } from '../lib/types'

const isKeyAllowed = (key: string) => ALLOWED_KEYS.includes(key)

export default function useType(text: string, status: Status) {
  const [userInput, setUserInput] = useState('')
  const current = userInput.length

  const handleKeyDown = useCallback(
    (key: string) => {
      if (!isKeyAllowed(key) || status === 'FINISHED') return

      setUserInput((prev) => {
        if (key === 'Backspace') return prev.slice(0, -1)

        if (prev.length < text.length) {
          const newValue = prev + key
          return newValue
        }

        return prev
      })
    },
    [text.length, status],
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
