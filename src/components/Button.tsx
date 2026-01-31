import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  icon?: boolean
}

export default function Button({
  children,
  className,
  'aria-label': ariaLabel,
  disabled,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <div className="group relative">
      <button
        {...rest}
        disabled={disabled}
        className={clsx(
          'focus w-full cursor-pointer rounded-lg p-4 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:p-3',
          className,
          {
            'flex min-h-10 min-w-10 items-center justify-center gap-2 bg-neutral-700/30 transition-transform duration-200 hover:bg-neutral-700/40':
              icon,
          },
        )}
      >
        {children}
      </button>

      {ariaLabel && !disabled && (
        <span
          className={clsx(
            'bg-neutral-700/30 font-semibold tracking-wide whitespace-nowrap',
            'pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2',
            'rounded bg-black px-3 py-2 text-xs text-white opacity-0',
            'transition-opacity duration-200',

            // only devices with hover
            'hidden group-hover:opacity-100',
            '[@media(hover:hover)]:block',
          )}
        >
          {ariaLabel}
        </span>
      )}
    </div>
  )
}
