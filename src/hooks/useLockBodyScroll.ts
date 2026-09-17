import { useEffect } from 'react'

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    document.body.classList.add('menu-open')
    return () => document.body.classList.remove('menu-open')
  }, [locked])
}
