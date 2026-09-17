import { motion, useReducedMotion } from 'motion/react'
import { EASE_OUT_EXPO } from '../../lib/motion'

interface SplitLinesProps {
  lines: string[]
  delay?: number
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'p'
}

/** Reveals text line by line with a masked slide-up — the editorial hero treatment. */
export function SplitLines({
  lines,
  delay = 0,
  className = '',
  lineClassName = '',
  as = 'h1',
}: SplitLinesProps) {
  const reduceMotion = useReducedMotion()
  const Tag = as

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduceMotion ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: delay + index * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
