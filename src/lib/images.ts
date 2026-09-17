const UNSPLASH_BASE = 'https://images.unsplash.com'
const SRCSET_WIDTHS = [480, 768, 1080, 1440, 1920] as const

/** Builds a CDN URL for an Unsplash photo id at the requested width. */
export function unsplashUrl(photo: string, width = 1440, quality = 80): string {
  return `${UNSPLASH_BASE}/${photo}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Responsive srcset for an Unsplash photo id. */
export function unsplashSrcSet(photo: string, quality = 80): string {
  return SRCSET_WIDTHS.map((w) => `${unsplashUrl(photo, w, quality)} ${w}w`).join(', ')
}
