import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'paper' | 'ink' | 'ocean' | 'sand'
  className?: string
}

const tones = {
  paper: 'bg-paper/90 text-ink backdrop-blur',
  ink: 'bg-ink text-paper',
  ocean: 'bg-ocean text-paper',
  sand: 'bg-sand-soft text-ink',
}

export function Badge({ children, tone = 'paper', className = '' }: BadgeProps) {
  return (
    <span className={`eyebrow inline-flex h-7 items-center rounded-full px-3 ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
