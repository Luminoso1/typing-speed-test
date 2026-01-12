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
  const [duration, setDuration] = useState<Duration>(15)
  const [text, setText] = useState(() => getRandomText(level))

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
      <Header bestScore={0} />

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
      <RestartButton restart={handleRestart} />
    </div>
  )
}

export default App
