import { useState, useCallback } from 'react'
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
import { getRandomText } from './lib/helpers'

function App() {
  const [level, setLevel] = useState<Level>('easy')
  const [mode, setMode] = useState<Mode>('timed')
  const [text, setText] = useState(() => getRandomText(level))

  const { status, time, start, finish, reset } = useGameStatus()
  const { userInput, current, clearInput } = useType(
    text,
    status,
    start,
    finish,
  )
  const { wpm, accuracy } = useStats(text, userInput, time)

  const changeLevel = useCallback(
    (level: Level) => {
      setLevel(level)
      setText(() => getRandomText(level))
      clearInput()
      reset()
    },
    [reset],
  )

  const changeMode = useCallback(
    (mode: Mode) => {
      setMode(mode)
      clearInput()
      reset()
    },
    [reset],
  )

  const handleRestart = useCallback(() => {
    const newText = getRandomText(level)
    setText(newText)
    clearInput()
    reset()
  }, [level, reset])

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      <Header bestScore={0} />

      <div className="flex flex-col justify-between gap-y-4 border-b border-neutral-700 pb-4 *:leading-none lg:flex-row lg:items-center">
        <Stats stats={{ wpm, accuracy, time }} />

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
