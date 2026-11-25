import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'

/** Animates a number from 0 to `target` once `active` becomes true. */
export function useCountUp(target: number, active: boolean, duration = 1.8): number {
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || reduceMotion) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    })
    return () => controls.stop()
  }, [active, target, duration, reduceMotion])

  return reduceMotion ? target : value
}
