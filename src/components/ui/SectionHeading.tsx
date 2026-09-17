import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  subtitle?: string
  /** Optional element rendered on the right on wide screens (e.g. a link). */
  aside?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Editorial section header: numbered eyebrow, large display title, optional subtitle and aside. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  aside,
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        <Reveal>
          <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-paper/60' : 'text-muted'}`}>
            <span className={`font-display ${dark ? 'text-sand' : 'text-ocean'}`}>{index}</span>
            <span className={`h-px w-8 ${dark ? 'bg-paper/30' : 'bg-line'}`} aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`text-display-lg mt-5 ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className={`lead mt-5 max-w-xl ${dark ? 'text-paper/70' : ''}`}>{subtitle}</p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={0.2} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  )
}
