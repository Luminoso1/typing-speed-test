import { useState, useEffect, useRef } from 'react'
import type { LabelsProps } from '../lib/types'

export default function CustomSelect<T extends string>({
  name,
  actual,
  options,
  onChange,
}: LabelsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenClose = () => setIsOpen((prev) => !prev)

  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt as T } : opt,
  )

  const handleSelect = (value: T) => {
    onChange(value)
  }

  useEffect(() => {
    const handleClickOutsite = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutsite)

    return () => document.removeEventListener('mousedown', handleClickOutsite)
  }, [])

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onOpenClose}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-1 border-neutral-500 px-3 py-2 capitalize"
      >
        {normalizedOptions.find((opt) => opt.value === actual)?.label || actual}
        <Arrow isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-12 right-0 left-0 z-10 overflow-hidden rounded-lg bg-neutral-800 py-2 shadow-lg"
        >
          {normalizedOptions.map(({ label, value }) => {
            const key = `mobile-${value}`
            return (
              <li
                key={key}
                role="option"
                aria-selected={actual === value}
                className="flex items-center gap-3 border-b border-neutral-700 px-3"
                onClick={() => handleSelect(value)}
              >
                <input
                  type="radio"
                  value={value}
                  name={name}
                  id={key}
                  defaultChecked={value === actual}
                  className="mobile-radio"
                />
                <label htmlFor={key} className="flex-1 py-2 capitalize">
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const Arrow = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
  >
    <path
      d="M4.74219 5.83594L0.117188 1.24219C-0.0390625 1.11719 -0.0390625 0.867188 0.117188 0.710938L0.742188 0.117188C0.898438 -0.0390625 1.11719 -0.0390625 1.27344 0.117188L5.02344 3.80469L8.74219 0.117188C8.89844 -0.0390625 9.14844 -0.0390625 9.27344 0.117188L9.89844 0.710938C10.0547 0.867188 10.0547 1.11719 9.89844 1.24219L5.27344 5.83594C5.11719 5.99219 4.89844 5.99219 4.74219 5.83594Z"
      fill="white"
    />
  </svg>
)
