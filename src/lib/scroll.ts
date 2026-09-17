import type Lenis from 'lenis'

let instance: Lenis | null = null

export function registerLenis(lenis: Lenis | null): void {
  instance = lenis
}

interface ScrollOptions {
  offset?: number
  immediate?: boolean
}

/** Scrolls to an element or position, using Lenis when it is active. */
export function scrollTo(target: string | number | HTMLElement, options: ScrollOptions = {}): void {
  const { offset = 0, immediate = false } = options

  if (instance) {
    instance.scrollTo(target, { offset, immediate, duration: 1.2 })
    return
  }

  const behavior: ScrollBehavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!element) return
  const top = element.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior })
}

export function scrollToId(id: string, options?: ScrollOptions): void {
  const element = document.getElementById(id)
  if (element) scrollTo(element, { offset: -72, ...options })
}
