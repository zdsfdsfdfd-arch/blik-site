import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { unsplashSrcSet, unsplashUrl } from '../../lib/images'

interface SmartImageProps {
  /** Unsplash photo id in the form "photo-<timestamp>-<hash>". */
  photo: string
  alt: string
  /** Classes for the wrapper — must define the box (aspect ratio or explicit height). */
  className?: string
  /** Extra classes for the <img> element (e.g. hover transforms). */
  imgClassName?: string
  sizes?: string
  /** Eager-load and prioritise: use for above-the-fold imagery only. */
  priority?: boolean
  /** Label rendered inside the fallback box when the image cannot be loaded. */
  fallbackLabel?: string
}

/**
 * Responsive image with a shimmer skeleton while loading and a styled
 * fallback if the network request fails, so the layout never shifts or breaks.
 */
export function SmartImage({
  photo,
  alt,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  fallbackLabel,
}: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Cached images may finish before React attaches the onLoad handler.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) setStatus('loaded')
  }, [])

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {status === 'loading' && <div aria-hidden="true" className="skeleton absolute inset-0" />}

      {status === 'error' ? (
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
          ref={ref}
          src={unsplashUrl(photo)}
          srcSet={unsplashSrcSet(photo)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
