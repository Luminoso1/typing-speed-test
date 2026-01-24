import { useState, useEffect, useCallback } from 'react'
import type { Level, Mode } from './lib/types'
import { LEVELS, MODES } from './lib/constants'
import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import CustomSelect from './components/CustomSelect'
import CustomLabels from './components/CustomLabels'
import RestartButton from './components/RestartButton'
import useGameStatus from './hooks/useGameStatus'
import useType from './hooks/useType'
import useStats from './hooks/useStats'
import useCounter from './hooks/useCounter'
import { getRandomText } from './lib/helpers'

type Duration = 15 | 30 | 60 | 90

function App() {
  const [level, setLevel] = useState<Level>('easy')
  const [mode, setMode] = useState<Mode>('timed')
  const [duration, setDuration] = useState<Duration>(60)
  const [text, setText] = useState(() => getRandomText(level))
  const [bestScore, setBestScore] = useState(0)

  const { status, startTest, finishTest, resetTest } = useGameStatus()
  const { counter, startCounter, stopCounter, resetCounter } = useCounter(
    duration,
    mode,
  )
  const { userInput, current, clearInput } = useType(text, status)
  const { wpm, accuracy } = useStats(text, userInput, counter)

  useEffect(() => {
    if (status === 'IDLE' && userInput.length > 0) {
      startTest()
      startCounter()
    }
  }, [status, userInput.length, startTest, startCounter])

  useEffect(() => {
    if (
      (mode === 'timed' && counter === duration) ||
      userInput.length === text.length
    ) {
      finishTest()
      stopCounter()
      if (wpm > bestScore) {
        setBestScore(wpm)
      }
    }
  }, [
    mode,
    counter,
    duration,
    userInput.length,
    text.length,
    finishTest,
    stopCounter,
  ])

  const changeLevel = useCallback(
    (level: Level) => {
      setLevel(level)
      setText(() => getRandomText(level))
      clearInput()
      resetTest()
      resetCounter()
    },
    [clearInput, resetTest, resetCounter],
  )

  const changeMode = useCallback(
    (newMode: Mode) => {
      setMode(newMode)
      clearInput()
      resetTest()
      resetCounter()
    },
    [clearInput, resetTest, resetCounter],
  )

  const handleRestart = useCallback(() => {
    clearInput()
    resetTest()
    resetCounter()
  }, [clearInput, resetTest, resetCounter])

  const time = duration && mode === 'timed' ? duration - counter : counter

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      <Header bestScore={bestScore} />

      {status === 'FINISHED' && (
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

            <li className="rounded-lg border border-neutral-700 px-6 py-4 xl:w-40">
              <h3 className="text-xl text-neutral-400">Characters:</h3>
              <h4 className="text-2xl font-bold">
                <span className="text-green-500">{text.length}</span>/
                <span className="text-red-500">{0}</span>
              </h4>
            </li>
          </ul>

          <button
            onClick={handleRestart}
            className="bg-neutral-0 focus cursor-pointer rounded-xl px-4 py-2.5 text-xl font-semibold text-neutral-900"
          >
            Go Again
          </button>
        </div>
      )}

      {status !== 'FINISHED' && (
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
                actual={level}
                options={LEVELS}
                onChange={changeLevel}
              />

              <div className="w-[1px] self-stretch bg-neutral-700"></div>

              <CustomLabels
                title="Mode"
                name="desktop-modes"
                actual={mode}
                options={MODES}
                onChange={changeMode}
              />
            </div>

            <div className="hidden gap-2 max-[680px]:flex">
              <CustomSelect
                title="Difficulty"
                name="mobile-levels"
                actual={level}
                options={LEVELS}
                onChange={changeLevel}
              />
              <CustomSelect
                title="Mode"
                name="mobile-modes"
                actual={mode}
                options={MODES}
                onChange={changeMode}
              />
            </div>
          </div>

          <TypeBox text={text} userInput={userInput} current={current} />

          <div className="mt-16 mb-8 h-[1px] w-full self-stretch bg-neutral-700"></div>

          <RestartButton restart={handleRestart} />
        </>
      )}
    </div>
  )
}

export default App
