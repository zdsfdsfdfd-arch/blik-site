import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EASE_OUT_EXPO } from '../../lib/motion'

const MIN_DURATION = 750
const MAX_DURATION = 1800

/** Film-leader style intro: one sweep of the countdown ring, then the shutter lifts. */
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-chassis text-[#f1eee8]"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: EASE_OUT_EXPO } }}
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[#f1eee8]/20" />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: 'conic-gradient(from 0deg, rgba(241,238,232,0.9) 0deg, rgba(241,238,232,0.9) var(--sweep), transparent var(--sweep))', maskImage: 'radial-gradient(circle, transparent 62%, #000 63%)', WebkitMaskImage: 'radial-gradient(circle, transparent 62%, #000 63%)' }}
              initial={{ '--sweep': '0deg' } as never}
              animate={{ '--sweep': '360deg' } as never}
              transition={{ duration: MIN_DURATION / 1000, ease: 'linear' }}
            />
            <span className="absolute inset-x-0 top-1/2 h-px bg-[#f1eee8]/15" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-[#f1eee8]/15" />
            <span className="font-display text-5xl font-medium tracking-[-0.04em]">2</span>
          </div>
          <p className="label-mono absolute bottom-8 left-1/2 -translate-x-1/2 text-[#f1eee8]/50">видеопродакшн.рф · leader</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
