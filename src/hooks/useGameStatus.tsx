import { useState, useEffect, useCallback } from 'react'
import type { Status } from '../lib/types'
import { useCountDown } from './useCountDown'
import { DEFAULT_TIME } from '../lib/constants'

export default function useGameStatus() {
  const [status, setStatus] = useState<Status>('IDLE')
  const {
    secondsLeft: time,
    startCountDown,
    stopCountDown,
    resetCountDown,
  } = useCountDown(DEFAULT_TIME)

  const start = useCallback(() => {
    setStatus('TYPING')
    startCountDown()
  }, [startCountDown])

  const finish = useCallback(() => {
    setStatus('FINISHED')
    stopCountDown()
  }, [stopCountDown])

  const reset = useCallback(() => {
    setStatus('IDLE')
    resetCountDown()
  }, [resetCountDown])

  useEffect(() => {
    if (time <= 0) finish()
  }, [time, finish])

  return { status, time, start, finish, reset }
}
