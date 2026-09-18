import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { revealTransition, viewportOnce } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'p' | 'figure' | 'blockquote'
}

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]

  if (reduceMotion) return <Component className={className}>{children}</Component>

  return (
    <Component className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ ...revealTransition, delay }}>
      {children}
    </Component>
  )
}
