import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo, scrollToId } from '../lib/scroll'

/**
 * Called once per page mount: jumps to the top of a new page, or to the
 * `#section` named in the URL hash after the enter transition has started.
 */
export function useScrollToHash(): void {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollTo(0, { immediate: true })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const timer = window.setTimeout(() => scrollToId(id), 400)
    return () => window.clearTimeout(timer)
  }, [hash])
}
