import { useState, useEffect, useCallback } from 'react'
import { ALLOWED_KEYS } from '../lib/constants'

type Status = 'IDLE' | 'TYPING' | 'FINISHED'

export const useType = (text: string) => {
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState<Status>('IDLE')

  const current = userInput.length

  const handleKeyDown = useCallback(
    (key: string) => {
      if (status === 'FINISHED') return

      if (status === 'IDLE' && ALLOWED_KEYS.includes(key)) {
        setStatus('TYPING')
      }

      if (key === 'Backspace') {
        setUserInput((prev) => prev.slice(0, -1))
        return
      }

      if (ALLOWED_KEYS.includes(key) && userInput.length < text.length) {
        setUserInput((prev) => prev + key)
      }
    },
    [status, userInput.length, text.length],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event.key)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleKeyDown])

  return { userInput, current, status }
}
