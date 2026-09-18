import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  lead?: ReactNode
  action?: ReactNode
  /** Right-hand technical note printed on the top rule, e.g. "12 проектов". */
  meta?: string
  size?: 'lg' | 'xl'
  className?: string
}

/**
 * Section opener: a ruled top line carrying index + label + meta, then the
 * heading on the 12-column grid with an optional lead in the last columns.
 */
export function SectionHeader({ index, label, title, lead, action, meta, size = 'lg', className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
        <p className="label-mono flex items-center gap-3 text-fg-3">
          <span className="text-signal-text">{index}</span>
          <span>{label}</span>
        </p>
        {meta && <p className="label-mono text-fg-3">{meta}</p>}
      </div>
      <div className="grid-12 mt-8 items-end gap-y-6 md:mt-12">
        <Reveal className="col-span-12 lg:col-span-8">
          <h2 className={size === 'xl' ? 'text-display-xl' : 'text-display-lg'}>{title}</h2>
        </Reveal>
        {(lead || action) && (
          <Reveal delay={0.1} className="col-span-12 flex flex-col gap-5 lg:col-span-4 lg:pb-1">
            {lead && <p className="prose-body max-w-md">{lead}</p>}
            {action}
          </Reveal>
        )}
      </div>
    </div>
  )
}
