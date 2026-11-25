import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  /** Show the numeric value next to the stars. */
  showValue?: boolean
  count?: number
  size?: 'sm' | 'md'
  tone?: 'ink' | 'paper'
  className?: string
}

export function Rating({
  value,
  showValue = true,
  count,
  size = 'sm',
  tone = 'ink',
  className = '',
}: RatingProps) {
  const rounded = Math.round(value)
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const text = tone === 'paper' ? 'text-paper' : 'text-ink'
  const muted = tone === 'paper' ? 'text-paper/60' : 'text-muted'

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Рейтинг ${value.toFixed(1)} из 5`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${iconSize} ${i < rounded ? 'fill-sand text-sand' : 'fill-transparent text-line'}`}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {showValue && (
        <span className={`text-sm font-medium ${text}`}>
          {value.toFixed(1)}
          {count !== undefined && <span className={`ml-1 font-normal ${muted}`}>({count})</span>}
        </span>
      )}
    </div>
  )
}
