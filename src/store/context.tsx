import { createContext, useContext } from 'react'
import type { Level, Mode, Duration, Status } from '../lib/types'

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
  isNewRecord: boolean
  hasCompletedOnce: boolean
}

type Config = {
  status: Status
  level: Level
  mode: Mode
  duration: Duration
  text: string
}

type Stats = {
  wpm: number
  accuracy: number
  time: number
  bestScore: number
  isNewRecord: boolean
  hasCompletedOnce: boolean
}

type ActionsType = {
  start: () => void
  pause: () => void
  resume: () => void
  restart: () => void
  next: () => void
  setLevel: (v: Level) => void
  setMode: (v: Mode) => void
  setDuration: (v: Duration) => void
  setInput: (v: string) => void
}

type Typing = {
  input: string
  corrects: number
  errors: Set<number>
}

function createContextAndHook<T>() {
  const context = createContext<T | null>(null)

  function useContextHook() {
    const value = useContext(context)
    if (!value)
      throw new Error('Context value must be wrapped within a Provider')
    return value
  }

  return [context, useContextHook] as const
}

export const [Config, useConfig] = createContextAndHook<Config>()
export const [Stats, useStats] = createContextAndHook<Stats>()
export const [Actions, useActions] = createContextAndHook<ActionsType>()
export const [Typing, useTyping] = createContextAndHook<Typing>()
