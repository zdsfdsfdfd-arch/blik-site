import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary'
const LABELS: Record<string, string> = { play: 'Смотреть', view: 'Открыть', drag: 'Тяни', next: 'Дальше' }

type Mode = 'idle' | 'hover' | 'label'

/**
 * Viewfinder reticle that follows the pointer. Over links it grows, over media
 * flagged with data-cursor it turns into a labelled tag. Desktop only.
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
    document.documentElement.classList.add('custom-cursor')

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
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
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {mode === 'label' ? (
        <motion.span
          key="label"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className="label-mono whitespace-nowrap bg-signal px-3 py-2 text-ink"
        >
          ▶ {label}
        </motion.span>
      ) : (
        <motion.span
          key="ring"
          className="corners relative block text-[#f1eee8] mix-blend-difference"
          style={{ '--corner-size': '7px' } as React.CSSProperties}
          animate={{ width: mode === 'hover' ? 44 : 26, height: mode === 'hover' ? 44 : 26, rotate: mode === 'hover' ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#f1eee8]" />
        </motion.span>
      )}
    </motion.div>
  )
}
