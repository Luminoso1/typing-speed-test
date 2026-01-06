import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import Levels from './components/Levels'
import Modes from './components/Modes'

function App() {
  return (
    <div className="mx-auto max-w-[1200px] px-6">
      <Header bestScore={0} />

      <div className="flex items-center justify-between">
        <Stats stats={{ wpm: 0, accuracy: 0, time: 0 }} />
        <div className="flex items-center gap-8">
          <Levels onChange={() => {}} />
          <Modes onChange={() => {}} />
        </div>
      </div>
      <TypeBox />
    </div>
  )
}

export default App
