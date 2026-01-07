type Props = {
  stats: {
    wpm: number
    accuracy: number
    time: number
  }
}

export default function Stats({ stats }: Props) {
  return (
    <div className="stats flex max-lg:justify-between lg:gap-4">
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        WPM: <span>{stats.wpm}</span>
      </h2>
      <div className="w-[1px] bg-neutral-700"></div>
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        Accuracy: <span>{stats.accuracy}%</span>
      </h2>
      <div className="w-[1px] bg-neutral-700"></div>
      <h2 className="gap-x-3 gap-y-0 max-sm:flex-col">
        Timer: <span>{stats.time}</span>
      </h2>
    </div>
  )
}
