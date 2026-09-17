import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { buildImageSources } from '../../lib/images'

interface SmartImageProps {
  /** Unsplash photo id in the form "photo-<timestamp>-<hash>". */
  photo: string
  alt: string
  /** English keywords used to source a topical photo if the primary CDN fails. */
  fallbackKeywords?: string
  /** Classes for the wrapper — must define the box (aspect ratio or explicit height). */
  className?: string
  /** Extra classes for the <img> element (e.g. hover transforms). */
  imgClassName?: string
  sizes?: string
  /** Eager-load and prioritise: use for above-the-fold imagery only. */
  priority?: boolean
  /** Label rendered inside the placeholder when no source could be loaded. */
  fallbackLabel?: string
}

/**
 * Responsive image with a shimmer skeleton while loading. If a source fails it moves on
 * to the next one (local file → Unsplash → keyword lookup) and finally renders a styled
 * placeholder, so the layout never shifts or shows a broken image.
 */
export function SmartImage({
  photo,
  alt,
  fallbackKeywords,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  fallbackLabel,
}: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const sources = useMemo(() => buildImageSources(photo, fallbackKeywords), [photo, fallbackKeywords])
  const [state, setState] = useState({ photo, index: 0, loaded: false, failed: false })

  // Reset the source chain if the photo prop changes on a reused element.
  if (state.photo !== photo) setState({ photo, index: 0, loaded: false, failed: false })

  // Cached images may finish before React attaches the onLoad handler.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) {
      setState((prev) => (prev.loaded ? prev : { ...prev, loaded: true }))
    }
  }, [])

  const handleError = () => {
    setState((prev) =>
      prev.index < sources.length - 1
        ? { ...prev, index: prev.index + 1, loaded: false }
        : { ...prev, failed: true },
    )
  }

  const source = sources[state.index]

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {!state.loaded && !state.failed && <div aria-hidden="true" className="skeleton absolute inset-0" />}

      {state.failed ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--color-ocean-2),var(--color-ocean)_55%,var(--color-sand))] p-6 text-center text-paper"
        >
          <ImageOff className="h-6 w-6 opacity-80" strokeWidth={1.5} />
          {fallbackLabel && <span className="eyebrow opacity-90">{fallbackLabel}</span>}
        </div>
      ) : (
        <img
          key={source.src}
          ref={ref}
          src={source.src}
          srcSet={source.srcSet}
          sizes={source.srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setState((prev) => ({ ...prev, loaded: true }))}
          onError={handleError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            state.loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
