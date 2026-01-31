import Header from './components/Header'
import Result from './components/Result'
import TypingView from './components/TypingView'

import { useConfig, useStats } from './store/context'

function App() {
  const { status } = useConfig()
  const { bestScore } = useStats()

  const View = status === 'FINISHED' ? Result : TypingView

  return (
    <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
      <Header bestScore={bestScore} />
      <View />
    </div>
  )
}

export default App
