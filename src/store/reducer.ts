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
  | { type: 'RESET' }
  | { type: 'FINISH' }
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

    case 'RESET':
      return {
        ...state,
        status: 'IDLE',
        counter: 0,
        input: '',
        text: getRandomText(state.level),
        errors: new Set(),
      }

    case 'FINISH':
      return { ...state, status: 'FINISHED' }

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
        ...state,
        status: 'IDLE',
        level,
        counter: 0,
        input: '',
        text: getRandomText(level),
        errors: new Set(),
      }
    }

    case 'SET_MODE':
      return { ...state, mode: action.payload }

    case 'SET_DURATION':
      return { ...state, duration: action.payload }

    case 'SET_INPUT': {
      const value = action.payload

      const { text } = state

      const current = value.length - 1
      const isError = text[current] !== value[current]

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
