import type { Status, Level, Mode, Duration } from '../lib/types'
import { getRandomText } from '../lib/helpers'

export type State = {
  status: Status
  level: Level
  mode: Mode
  duration: Duration
  counter: number
  text: string
  input: string
  errors: Set<number>
  bestScore: number
}

export type Action =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'SET_LEVEL'; payload: Level }
  | { type: 'SET_MODE'; payload: Mode }
  | { type: 'SET_DURATION'; payload: Duration }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_BEST_SCORE'; payload: number }

export const INITIAL_STATE: State = {
  status: 'IDLE',
  level: 'easy',
  mode: 'timed',
  duration: 60,
  counter: 0,
  text: getRandomText('easy'),
  input: '',
  errors: new Set(),
  bestScore: 0,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'TYPING' }

    case 'PAUSE':
      return { ...state, status: 'PAUSED' }

    case 'RESET':
      return {
        ...INITIAL_STATE,
        level: state.level,
        mode: state.mode,
        duration: state.duration,
        text: getRandomText(state.level),
        bestScore: state.bestScore,
      }

    case 'TICK': {
      if (state.status !== 'TYPING') return state

      const nextCounter = state.counter + 1
      const nextState = { ...state, counter: nextCounter }

      if (checkFinished(nextState)) return { ...nextState, status: 'FINISHED' }

      return nextState
    }

    case 'SET_LEVEL': {
      const level = action.payload
      return {
        ...INITIAL_STATE,
        level,
        mode: state.mode,
        duration: state.duration,
        text: getRandomText(level),
        bestScore: state.bestScore,
      }
    }

    case 'SET_MODE': {
      const mode = action.payload
      return {
        ...INITIAL_STATE,
        mode,
        level: state.level,
        duration: state.duration,
        text: state.text,
        bestScore: state.bestScore,
      }
    }

    case 'SET_DURATION': {
      const duration = action.payload
      return {
        ...INITIAL_STATE,
        duration,
        level: state.level,
        mode: state.mode,
        text: state.text,
        bestScore: state.bestScore,
      }
    }
    case 'SET_INPUT': {
      const value = action.payload

      const current = value.length - 1
      const expected = state.text[current]
      const typed = value[current]

      const isError = expected !== typed

      const nextErrors = isError
        ? new Set([...state.errors, current])
        : state.errors

      const nextState = { ...state, input: value, errors: nextErrors }

      if (checkFinished(nextState)) {
        return { ...nextState, status: 'FINISHED' }
      }

      return nextState
    }

    case 'SET_BEST_SCORE':
      return { ...state, bestScore: action.payload }

    default:
      return state
  }
}

function checkFinished(state: State) {
  const isTimeUp = state.mode === 'timed' && state.counter >= state.duration
  const isTextCompleted = state.input.length >= state.text.length
  return isTimeUp || isTextCompleted
}
