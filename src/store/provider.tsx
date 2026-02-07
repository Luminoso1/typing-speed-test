import { useEffect, useRef, useReducer, useMemo, useCallback } from 'react'
import { reducer, INITIAL_STATE } from './reducer'
import { Config, Stats, Actions, Typing } from './context'
import { calcWpm, calcAccuracy } from '../lib/helpers'
import type { Level, Mode, Duration } from '../lib/types'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const startedAtRef = useRef<number>(null)
  const pausedAtRef = useRef<number>(null)

  const corrects = state.input.length - state.errors.size

  const accuracy = calcAccuracy(corrects, state.input.length)

  const elapsedMs =
    startedAtRef.current && state.status !== 'IDLE'
      ? state.status === 'PAUSED'
        ? pausedAtRef.current! - startedAtRef.current
        : Date.now() - startedAtRef.current
      : 0

  const wpm = useMemo(() => calcWpm(corrects, elapsedMs), [corrects, elapsedMs])

  const time =
    state.mode !== 'passage' ? state.duration - state.counter : state.counter

  const setLevel = useCallback(
    (v: Level) => dispatch({ type: 'SET_LEVEL', payload: v }),
    [],
  )

  const setMode = useCallback(
    (v: Mode) => dispatch({ type: 'SET_MODE', payload: v }),
    [],
  )

  const setDuration = useCallback(
    (v: Duration) => dispatch({ type: 'SET_DURATION', payload: v }),
    [],
  )

  const setInput = useCallback(
    (v: string) => dispatch({ type: 'SET_INPUT', payload: v }),
    [],
  )

  // start  when [status:IDLE]
  const start = useCallback(() => {
    dispatch({ type: 'START' })
    startedAtRef.current = Date.now()
  }, [])

  const resume = useCallback(() => {
    dispatch({ type: 'START' })

    if (startedAtRef.current && pausedAtRef.current) {
      const pauseDuration = Date.now() - pausedAtRef.current
      startedAtRef.current = startedAtRef.current + pauseDuration
    }

    pausedAtRef.current = null
  }, [])

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' })
    pausedAtRef.current = Date.now()
  }, [])

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])

  const next = useCallback(() => dispatch({ type: 'NEXT' }), [])

  // tick -> counter when [status:TYPING]
  useEffect(() => {
    if (state.status !== 'TYPING') return

    const id = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(id)
  }, [state.status])

  // finish -> set best score
  useEffect(() => {
    if (state.status === 'FINISHED') {
      if (wpm > state.bestScore) {
        dispatch({ type: 'SET_BEST_SCORE', payload: wpm })
      }
    }
  }, [state.status, wpm, state.bestScore])

  const {
    status,
    level,
    mode,
    duration,
    text,
    input,
    errors,
    bestScore,
    isNewRecord,
    hasCompletedOnce,
  } = state

  const config = useMemo(
    () => ({ status, level, mode, duration, text }),
    [status, level, mode, duration, text],
  )

  const stats = useMemo(
    () => ({
      wpm,
      accuracy,
      time,
      bestScore,
      isNewRecord,
      hasCompletedOnce,
    }),
    [wpm, accuracy, time, bestScore, isNewRecord, hasCompletedOnce],
  )

  const actions = useMemo(
    () => ({
      start,
      pause,
      resume,
      restart,
      next,
      setLevel,
      setMode,
      setDuration,
      setInput,
    }),
    [
      start,
      pause,
      resume,
      restart,
      next,
      setLevel,
      setMode,
      setDuration,
      setInput,
    ],
  )

  const typing = useMemo(() => ({ input, errors, corrects }), [input, errors])

  return (
    <Config value={config}>
      <Stats value={stats}>
        <Actions value={actions}>
          <Typing value={typing}>{children}</Typing>
        </Actions>
      </Stats>
    </Config>
  )
}
