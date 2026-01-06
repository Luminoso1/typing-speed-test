import Header from './components/Header'
import TypeBox from './components/TypeBox'
import Stats from './components/Stats'
import Levels from './components/Levels'
import Modes from './components/Modes'

function App() {
  return (
    <div className="container">
      <Header bestScore={0} />

      <div className="board-header">
        <Stats stats={{ wpm: 0, accuracy: 0, time: 0 }} />
        <div className="config">
          <Levels onChange={() => {}} />
          <Modes onChange={() => {}} />
        </div>
      </div>
      <TypeBox />
    </div>
  )
}

export default App
