import { useEffect, useMemo, useRef, useState } from 'react'
import { withBase } from '../../lib/media'
import { TestPattern } from './TestPattern'

interface SmartImageProps {
  /** Ordered candidate URLs; the first that loads wins. */
  sources: string[]
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  fallbackLabel?: string
  /** Called when every candidate failed. */
  onFail?: () => void
}

/**
 * Image that walks a list of candidate URLs on error (local copy → CDN →
 * thumbnail fallbacks) and finally renders a test-pattern placeholder, so a
 * missing asset never shows as a broken image or shifts the layout.
 */
export function SmartImage({ sources: rawSources, alt, className = '', imgClassName = '', sizes, priority = false, fallbackLabel, onFail }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const sources = useMemo(() => rawSources.map(withBase), [rawSources])
  const key = useMemo(() => sources.join('|'), [sources])
  const [state, setState] = useState({ key, index: 0, loaded: false, failed: sources.length === 0 })

  if (state.key !== key) setState({ key, index: 0, loaded: false, failed: sources.length === 0 })

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) {
      setState((prev) => (prev.loaded ? prev : { ...prev, loaded: true }))
    }
  }, [state.index])

  const handleError = () => {
    setState((prev) => {
      if (prev.index < sources.length - 1) return { ...prev, index: prev.index + 1, loaded: false }
      onFail?.()
      return { ...prev, failed: true }
    })
  }

  // YouTube serves a 120x90 grey placeholder instead of a 404 for missing maxres thumbnails.
  const handleLoad = () => {
    const img = ref.current
    if (img && img.naturalWidth <= 120 && state.index < sources.length - 1) {
      handleError()
      return
    }
    setState((prev) => ({ ...prev, loaded: true }))
  }

  const source = sources[state.index]

  return (
    <div className={`relative overflow-hidden bg-bg-2 ${className}`}>
      {!state.loaded && !state.failed && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      {state.failed || !source ? (
        <div className="absolute inset-0">
          <TestPattern label={fallbackLabel ?? alt} />
        </div>
      ) : (
        <img
          key={source}
          ref={ref}
          src={source}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            state.loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
