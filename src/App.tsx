import Header from './components/Header'
import Footer from './components/Footer'
import Result from './components/Result'
import TypingView from './components/TypingView'

import { useConfig, useStats } from './store/context'

function App() {
  const { status } = useConfig()
  const { bestScore } = useStats()

  const View = status === 'FINISHED' ? Result : TypingView

  return (
    <div className="relative mx-auto flex h-dvh max-w-7xl flex-col gap-24 px-4 pt-8 pb-8 md:px-8 md:pt-10 md:pb-32">
      <Header bestScore={bestScore} />

      <View />

      {status !== 'FINISHED' && <Footer />}
    </div>
  )
}

export default App
