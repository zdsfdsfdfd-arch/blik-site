import type { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

/** Toggle pill used for travel-type filters. */
export function Chip({ active = false, className = '', children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-300 ${
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-line bg-transparent text-ink-2 hover:border-ink hover:text-ink'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
