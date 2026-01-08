import type { LabelsProps } from '../lib/types'

export default function CustomLabels<T extends string>({
  name,
  actual,
  options,
  onChange,
}: LabelsProps<T>) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt as T } : opt,
  )

  const handleSelect = (value: T) => {
    onChange(value)
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-neutral-400">Difficulty:</p>
      {normalizedOptions.map(({ label, value }) => {
        const id = label + '-' + value
        return (
          <label
            key={id}
            htmlFor={id}
            tabIndex={0}
            className="focus capitalize"
          >
            {label}
            <input
              type="radio"
              id={id}
              name={name}
              value={value}
              checked={actual === value}
              className="sr-only"
              onChange={() => handleSelect(value)}
            />
          </label>
        )
      })}
    </div>
  )
}
