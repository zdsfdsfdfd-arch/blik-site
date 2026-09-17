import { motion, useScroll, useSpring } from 'motion/react'

/** Thin ocean-blue progress bar pinned to the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-ocean"
      style={{ scaleX }}
    />
  )
}
