import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function Button({
  children,
  className,
  'aria-label': ariaLabel,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <div className="group relative w-full sm:w-auto">
      <button
        {...rest}
        disabled={disabled}
        className={clsx(
          'items-cencer flex min-h-10 w-full min-w-10 cursor-pointer justify-center gap-2 rounded-lg bg-neutral-700/30 p-2 px-4 py-3 transition-colors duration-300 hover:bg-neutral-700/50 disabled:cursor-not-allowed disabled:opacity-60 md:px-2 md:py-2',
          className,
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
