type Props = {
  stats: {
    wpm: number
    accuracy: number
    time: number
  }
}

export default function Stats({ stats }: Props) {
  return (
    <div className="stats flex gap-4">
      <h2>
        WPM: <span>{stats.wpm}</span>
      </h2>
      <h2>
        Accuracy: <span>{stats.accuracy}%</span>
      </h2>
      <h2>
        Timer: <span>{stats.time}</span>
      </h2>
    </div>
  )
}
