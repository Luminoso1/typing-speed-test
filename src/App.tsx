import { useEffect, useReducer, useRef, useMemo } from 'react'

import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import CustomSelect from './components/CustomSelect'
import CustomLabels from './components/CustomLabels'
import RestartButton from './components/RestartButton'
import * as Logic from './store/reducer'

import { LEVELS, MODES } from './lib/constants'
import { calcAccuracy, calcWpm } from './lib/helpers'
import type { Level, Mode } from './lib/types'

function App() {
  const [state, dispatch] = useReducer(Logic.reducer, Logic.INITIAL_STATE)

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
    state.mode === 'timed' ? state.duration - state.counter : state.counter

  const changeLevel = (level: Level) =>
    dispatch({ type: 'SET_LEVEL', payload: level })

  const changeMode = (mode: Mode) =>
    dispatch({ type: 'SET_MODE', payload: mode })

  // start  when [status:IDLE]
  const start = () => {
    dispatch({ type: 'START' })
    startedAtRef.current = Date.now()

    if (startedAtRef.current && pausedAtRef.current) {
      console.log('Hello there')
      const pauseDuration = Date.now() - pausedAtRef.current
      startedAtRef.current = startedAtRef.current + pauseDuration

      pausedAtRef.current = null
    }
  }

  const pause = () => {
    dispatch({ type: 'PAUSE' })
    pausedAtRef.current = Date.now()
  }

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

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const handleHiddenInputFocus = () => hiddenInputRef.current?.focus()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    dispatch({ type: 'SET_INPUT', payload: value })
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      {state.status === 'TYPING' && (
        <div onClick={pause} className="absolute inset-0 bg-neutral-900"></div>
      )}

      <Header bestScore={state.bestScore} />

      {state.status === 'FINISHED' && (
        <div className="text-center">
          <h2 className="text-[40px] font-bold">Test Complete!</h2>
          <p className="text-xl text-neutral-400">
            Solid run. Keep pushing to beat your high score.
          </p>
          <ul className="mt-12 mb-14 flex flex-col justify-center gap-x-5 gap-y-2.5 text-left md:flex-row">
            <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-40">
              <h3 className="text-xl text-neutral-400">WPM:</h3>
              <h4 className="text-2xl font-bold">{wpm}</h4>
            </li>

            <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-40">
              <h3 className="text-xl text-neutral-400">Accuracy:</h3>
              <h4 className="text-2xl font-bold">{accuracy}%</h4>
            </li>

            <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-48">
              <h3 className="text-xl text-neutral-400">Characters:</h3>
              <h4 className="text-2xl font-bold">
                <span>{state.text.length}</span>/
                <span className="text-green-500">{corrects}</span>/
                <span className="text-red-500">{state.errors.size}</span>
              </h4>
            </li>
          </ul>

          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="bg-neutral-0 focus cursor-pointer rounded-xl px-4 py-2.5 text-xl font-semibold text-neutral-900"
          >
            Go Again
          </button>
        </div>
      )}

      {state.status !== 'FINISHED' && (
        <>
          <div className="flex flex-col justify-between gap-y-4 border-b border-neutral-700 pb-4 *:leading-none lg:flex-row lg:items-center">
            <Stats
              stats={{
                wpm,
                accuracy,
                time,
              }}
            />

            <div className="desktop flex items-center gap-8 max-[680px]:hidden max-lg:justify-between">
              <CustomLabels
                title="Difficulty"
                name="desktop-levels"
                actual={state.level}
                options={LEVELS}
                onChange={changeLevel}
              />

              <div className="w-[1px] self-stretch bg-neutral-700"></div>

              <CustomLabels
                title="Mode"
                name="desktop-modes"
                actual={state.mode}
                options={MODES}
                onChange={changeMode}
              />
            </div>

            <div className="hidden gap-2 max-[680px]:flex">
              <CustomSelect
                title="Difficulty"
                name="mobile-levels"
                actual={state.level}
                options={LEVELS}
                onChange={changeLevel}
              />
              <CustomSelect
                title="Mode"
                name="mobile-modes"
                actual={state.mode}
                options={MODES}
                onChange={changeMode}
              />
            </div>
          </div>

          <input
            type="text"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            value={state.input}
            onChange={handleChange}
            ref={hiddenInputRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-1 w-1 opacity-0"
          />

          <div
            role="button"
            tabIndex={0}
            onClick={handleHiddenInputFocus}
            className="relative"
          >
            {state.status !== 'TYPING' && (
              <div
                onClick={start}
                className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center backdrop-blur-sm"
              >
                <button className="cursor-pointer rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold transition-all duration-300 hover:bg-blue-600/80">
                  Start Typing Test
                </button>
                <p className="mt-4 text-lg font-semibold opacity-80">
                  Or click the text and start typing
                </p>
              </div>
            )}

            <TypeBox
              text={state.text}
              userInput={state.input}
              errors={state.errors}
            />
          </div>

          <div className="mt-16 mb-8 h-[1px] w-full self-stretch bg-neutral-700"></div>

          <RestartButton restart={() => dispatch({ type: 'RESET' })} />
        </>
      )}
    </div>
  )
}

export default App
