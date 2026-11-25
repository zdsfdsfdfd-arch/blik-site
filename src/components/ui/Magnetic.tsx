import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  /** How far the element follows the cursor, in fractions of the offset. */
  strength?: number
  className?: string
}

/** Makes its child gently follow the cursor while hovered — desktop only. */
export function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const active = finePointer && !reduceMotion

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={active ? { x: springX, y: springY } : undefined}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
