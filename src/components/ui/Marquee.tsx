import type { ReactNode } from 'react'

interface MarqueeProps {
  items: ReactNode[]
  /** Seconds per loop. */
  speed?: number
  className?: string
  itemClassName?: string
  separator?: ReactNode
}

/** Infinite ticker. Content is duplicated once; the track animates by -50%. */
export function Marquee({ items, speed = 40, className = '', itemClassName = '', separator }: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center" style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}>
        {doubled.map((item, i) => (
          <span key={i} className={`flex items-center ${itemClassName}`}>
            {item}
            {separator ?? <span className="mx-8 h-1.5 w-1.5 rounded-full bg-signal" />}
          </span>
        ))}
      </div>
    </div>
  )
}
