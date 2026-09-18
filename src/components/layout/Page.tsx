import { useEffect, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useScrollToHash } from '../../hooks/useScrollToHash'
import { useSeo, type SeoOptions } from '../../hooks/useSeo'
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO, pageVariants } from '../../lib/motion'

interface PageProps extends SeoOptions {
  children: ReactNode
  theme?: 'dark' | 'light'
  className?: string
}

const THEME_COLOR = { dark: '#0a0a0b', light: '#ebe8e1' }

/**
 * Route wrapper: SEO tags, scroll restoration, section theme and the clap
 * transition — a shutter that closes over the leaving page and lifts off the next.
 */
export function Page({ children, theme = 'dark', className = '', ...seo }: PageProps) {
  const reduceMotion = useReducedMotion()
  useSeo(seo)
  useScrollToHash()

  useEffect(() => {
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
    document.body.style.backgroundColor = THEME_COLOR[theme]
  }, [theme])

  return (
    <motion.main id="main" data-theme={theme} className={`relative bg-bg text-fg ${className}`} variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] bg-chassis"
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top', transition: { duration: 0.5, ease: EASE_OUT_EXPO } }}
          exit={{ scaleY: 1, transformOrigin: 'bottom', transition: { duration: 0.28, ease: EASE_IN_OUT_QUART } }}
        />
      )}
      {children}
    </motion.main>
  )
}
