import type { Mode } from '../lib/types'

type Props = {
  onChange: (mode: Mode) => void
}

export default function Modes({ onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-neutral-400">Mode:</p>
      <label htmlFor="mode-timed" tabIndex={0} className="focus">
        Timed (60s)
        <input
          type="radio"
          id="mode-timed"
          name="mode"
          value={'timed'}
          hidden
          defaultChecked
          onChange={(e) => onChange(e.target.value as Mode)}
        />
      </label>
      <label htmlFor="mode-passage" tabIndex={0} className="focus">
        Passage
        <input
          type="radio"
          id="mode-passage"
          name="mode"
          value={'passage'}
          hidden
          onChange={(e) => onChange(e.target.value as Mode)}
        />
      </label>
    </div>
  )
}
