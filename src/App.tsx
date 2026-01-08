import { useState } from 'react'
import type { Level, Mode } from './lib/types'
import { LEVELS, MODES } from './lib/constants'
import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import CustomSelect from './components/CustomSelect'
import CustomLabels from './components/CustomLabels.tsx'

function App() {
  const [level, setLevel] = useState<Level>('easy')
  const [mode, setMode] = useState<Mode>('timed')

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      <Header bestScore={0} />

      <div className="flex flex-col justify-between gap-y-4 border-b border-neutral-700 pb-4 lg:flex-row lg:items-center">
        <Stats stats={{ wpm: 0, accuracy: 0, time: 0 }} />

        <div className="desktop flex items-center gap-8 max-[680px]:hidden max-lg:justify-between">
          <CustomLabels
            name="desktop-levels"
            actual={level}
            options={LEVELS}
            onChange={setLevel}
          />

          <div className="w-[1px] self-stretch bg-neutral-700"></div>

          <CustomLabels
            name="desktop-modes"
            actual={mode}
            options={MODES}
            onChange={setMode}
          />
        </div>

        <div className="hidden gap-2 max-[680px]:flex">
          <CustomSelect
            name="mobile-levels"
            actual={level}
            options={LEVELS}
            onChange={setLevel}
          />
          <CustomSelect
            name="mobile-modes"
            actual={mode}
            options={MODES}
            onChange={setMode}
          />
        </div>
      </div>
      <TypeBox />

      <div>LEVEL: {level}</div>
      <div>MODE: {mode}</div>
    </div>
  )
}

export default App
