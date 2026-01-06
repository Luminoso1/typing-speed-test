import type { Level } from '../lib/types'

type Props = {
  onChange: (level: Level) => void
}

export default function Levels({ onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-neutral-400">Difficulty:</p>
      <label htmlFor="level-easy" tabIndex={0} className="focus">
        Easy
        <input
          type="radio"
          id="level-easy"
          name="level"
          value={'easy'}
          hidden
          defaultChecked
          onChange={(e) => onChange(e.target.value as Level)}
        />
      </label>
      <label htmlFor="level-medium" tabIndex={0} className="focus">
        Medium
        <input
          type="radio"
          id="level-medium"
          name="level"
          value={'medium'}
          hidden
          onChange={(e) => onChange(e.target.value as Level)}
        />
      </label>
      <label htmlFor="level-hard" tabIndex={0} className="focus">
        Hard
        <input
          type="radio"
          id="level-hard"
          name="level"
          value={'hard'}
          hidden
          onChange={(e) => onChange(e.target.value as Level)}
        />
      </label>
    </div>
  )
}
