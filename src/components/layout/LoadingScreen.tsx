import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EASE_OUT_EXPO } from '../../lib/motion'

const MIN_DURATION = 1100
const MAX_DURATION = 3500
const LETTERS = ['P', 'L', 'A', 'N']

/** Intro overlay shown once per full page load while fonts and the hero settle. */
export function LoadingScreen() {
  const reduceMotion = useReducedMotion()
  const [done, setDone] = useState(() => Boolean(reduceMotion))

  useEffect(() => {
    if (reduceMotion) return
    const started = performance.now()
    let timer = 0

    const finish = () => {
      const elapsed = performance.now() - started
      timer = window.setTimeout(() => setDone(true), Math.max(0, MIN_DURATION - elapsed))
    }

    // Never hold the page hostage to a slow hero image: leave after MAX_DURATION regardless.
    const cap = window.setTimeout(() => setDone(true), MAX_DURATION)
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(timer)
      window.clearTimeout(cap)
    }
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink text-paper"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE_OUT_EXPO } }}
        >
          <div className="flex flex-col items-center">
            <div className="flex overflow-hidden font-display text-6xl font-extrabold tracking-[-0.06em] sm:text-7xl">
              {LETTERS.map((letter, index) => (
                <motion.span
                  key={letter}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 + index * 0.06 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.div className="mt-6 h-px w-40 overflow-hidden bg-paper/15">
              <motion.div
                className="h-full bg-sand"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: MIN_DURATION / 1000, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
