import type { Transition, Variants } from 'motion/react'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const revealTransition: Transition = {
  duration: 0.8,
  ease: EASE_OUT_EXPO,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...revealTransition, delay },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

export const viewportOnce = { once: true, margin: '-12% 0px -8% 0px' } as const
