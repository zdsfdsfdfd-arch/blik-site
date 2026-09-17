import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary'

/** A soft ring that trails the pointer and expands over interactive elements. Desktop only. */
export function Cursor() {
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.2 })
  const enabled = finePointer && !reduceMotion

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null
      setHovering(Boolean(target?.closest(INTERACTIVE)))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 rounded-full border border-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ scale: hovering ? 2 : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    />
  )
}
