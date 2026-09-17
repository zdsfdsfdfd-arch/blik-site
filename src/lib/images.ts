import { localImages } from '../generated/local-images'

const UNSPLASH_BASE = 'https://images.unsplash.com'
const FLICKR_BASE = 'https://loremflickr.com'
const SRCSET_WIDTHS = [480, 768, 1080, 1440, 1920] as const
const LOCAL_WIDTHS = [800, 1600] as const

export interface ImageSource {
  src: string
  srcSet?: string
}

/** Builds a CDN URL for an Unsplash photo id at the requested width. */
export function unsplashUrl(photo: string, width = 1440, quality = 80): string {
  return `${UNSPLASH_BASE}/${photo}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Responsive srcset for an Unsplash photo id. */
export function unsplashSrcSet(photo: string, quality = 80): string {
  return SRCSET_WIDTHS.map((w) => `${unsplashUrl(photo, w, quality)} ${w}w`).join(', ')
}

/** Stable number derived from a photo id, so keyword fallbacks always pick the same picture. */
export function photoLock(photo: string): number {
  let hash = 0
  for (const char of photo) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return (hash % 9000) + 1
}

/** Topic-based photo from the Flickr Creative Commons pool — used when the primary CDN fails. */
export function keywordUrl(keywords: string, lock: number, width = 1600, height = 1000): string {
  return `${FLICKR_BASE}/${width}/${height}/${encodeURIComponent(keywords)}?lock=${lock}`
}

export function localUrl(photo: string, width: number): string {
  return `/images/${photo}-${width}.${localImages[photo]}`
}

/**
 * Ordered list of places to try for a photo: a locally bundled copy, the Unsplash CDN,
 * then a keyword-based lookup. `SmartImage` walks this list on load errors.
 */
export function buildImageSources(photo: string, fallbackKeywords?: string): ImageSource[] {
  const sources: ImageSource[] = []

  if (localImages[photo]) {
    sources.push({
      src: localUrl(photo, 1600),
      srcSet: LOCAL_WIDTHS.map((w) => `${localUrl(photo, w)} ${w}w`).join(', '),
    })
  }

  sources.push({ src: unsplashUrl(photo), srcSet: unsplashSrcSet(photo) })

  if (fallbackKeywords) {
    sources.push({ src: keywordUrl(fallbackKeywords, photoLock(photo)) })
  }

  return sources
}
