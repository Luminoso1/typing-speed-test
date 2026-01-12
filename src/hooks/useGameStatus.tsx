import { useState, useCallback } from 'react'
import type { Status } from '../lib/types'

export default function useGameStatus() {
  const [status, setStatus] = useState<Status>('IDLE')

  const startTest = useCallback(() => {
    setStatus('TYPING')
  }, [])

  const finishTest = useCallback(() => {
    setStatus('FINISHED')
  }, [])

  const resetTest = useCallback(() => {
    setStatus('IDLE')
  }, [])

  return { status, startTest, finishTest, resetTest }
}
