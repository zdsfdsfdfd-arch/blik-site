import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ArrowLinkProps {
  to: string
  children: ReactNode
  className?: string
  tone?: 'ink' | 'ocean' | 'paper'
}

const tones = {
  ink: 'text-ink hover:text-ocean',
  ocean: 'text-ocean hover:text-ocean-2',
  paper: 'text-paper hover:text-sand',
}

/** Text link with an underline sweep and an arrow that slides on hover. */
export function ArrowLink({ to, children, className = '', tone = 'ink' }: ArrowLinkProps) {
  return (
    <Link
      to={to}
      className={`group/link inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[-0.01em] transition-colors duration-300 ${tones[tone]} ${className}`}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1"
        strokeWidth={2}
      />
    </Link>
  )
}
