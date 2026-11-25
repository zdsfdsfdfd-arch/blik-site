import { useEffect } from 'react'
import Lenis from 'lenis'
import { registerLenis } from '../lib/scroll'

/**
 * Enables Lenis smooth scrolling on desktop pointers.
 * Touch devices keep native scrolling; reduced-motion users are respected by Lenis itself.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      autoRaf: true,
      respectReducedMotion: true,
    })
    registerLenis(lenis)
    document.documentElement.classList.add('lenis')

    return () => {
      lenis.destroy()
      registerLenis(null)
      document.documentElement.classList.remove('lenis')
    }
  }, [enabled])
}
