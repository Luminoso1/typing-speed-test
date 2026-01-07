import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import Levels from './components/Levels'
import Modes from './components/Modes'

function App() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      <Header bestScore={0} />

      <div className="flex flex-col justify-between gap-y-4 border-b border-neutral-700 pb-4 lg:flex-row lg:items-center">
        <Stats stats={{ wpm: 0, accuracy: 0, time: 0 }} />
        <div className="flex items-center gap-8 max-[680px]:hidden max-lg:justify-between">
          <Levels onChange={() => {}} />
          <div className="w-[1px] self-stretch bg-neutral-700"></div>
          <Modes onChange={() => {}} />
        </div>
        <div className="hidden max-[680px]:flex">
          <select>
            <option value={'easy'}>Easy</option>
            <option value={'medium'}>Medium</option>
            <option value={'hard'}>Hard</option>
          </select>

          <select>
            <option value={'easy'}>Easy</option>
            <option value={'medium'}>Medium</option>
            <option value={'hard'}>Hard</option>
          </select>
        </div>
      </div>
      <TypeBox />
    </div>
  )
}

export default App
