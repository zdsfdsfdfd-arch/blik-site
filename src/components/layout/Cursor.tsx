import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary'
const LABELS: Record<string, string> = { play: 'Смотреть', view: 'Открыть', drag: 'Тяни', next: 'Дальше' }

type Mode = 'idle' | 'hover' | 'label'

/**
 * Viewfinder reticle that follows the pointer. Drawn in white with
 * `mix-blend-mode: difference` on the fixed layer itself, so it inverts against
 * any background (dark chassis or light paper). The native cursor is hidden only
 * while the reticle is on screen and comes back the moment the window loses
 * focus, the tab is hidden or the pointer leaves — so the cursor is never lost.
 * Desktop pointers only; disabled under reduced motion.
 */
export function Cursor() {
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 900, damping: 60, mass: 0.15 })
  const springY = useSpring(y, { stiffness: 900, damping: 60, mass: 0.15 })

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    const show = () => {
      root.classList.add('custom-cursor')
      setVisible(true)
    }
    const hide = () => {
      root.classList.remove('custom-cursor')
      setVisible(false)
    }
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      show()
    }
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null
      const tagged = target?.closest<HTMLElement>('[data-cursor]')
      if (tagged) {
        setLabel(LABELS[tagged.dataset.cursor ?? ''] ?? tagged.dataset.cursor ?? '')
        setMode('label')
        return
      }
      setMode(target?.closest(INTERACTIVE) ? 'hover' : 'idle')
    }
    const onVisibility = () => {
      if (document.hidden) hide()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      hide()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringVisible = visible && mode !== 'label'
  const labelVisible = visible && mode === 'label'

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: ringVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.span
          className="corners relative block text-white"
          style={{ '--corner-size': '7px' } as React.CSSProperties}
          animate={{ width: mode === 'hover' ? 44 : 26, height: mode === 'hover' ? 44 : 26, rotate: mode === 'hover' ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-white" />
        </motion.span>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] flex items-center justify-center"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: labelVisible ? 1 : 0, scale: labelVisible ? 1 : 0.7 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        <span className="label-mono whitespace-nowrap bg-signal px-3 py-2 text-ink">▶ {label}</span>
      </motion.div>
    </>
  )
}
