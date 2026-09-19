/**
 * Deployment base. Vite injects BASE_URL from its `base` option ("/" locally,
 * "/blik-site/" on a GitHub Pages project site); VITE_SITE_URL is the public URL
 * of the site root with that base path included. Both default to the studio's
 * own domain, so a plain `npm run build` produces the same output as before.
 */
const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {}

export const DEFAULT_SITE_URL = 'https://xn--80adgaeqsyfakm2i.xn--p1ai'

/** Base path without the trailing slash: "" at the root, "/blik-site" on a project page. */
export const BASE_PATH = (env.BASE_URL ?? '/').replace(/\/+$/, '')

/** Absolute URL of the site root, no trailing slash. */
export const SITE_URL = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')

/** Prefixes a root-relative public path ("/media/…", "/fonts/…") with the base path. */
export function withBase(path: string): string {
  if (!BASE_PATH || !path.startsWith('/') || path.startsWith('//') || path.startsWith(`${BASE_PATH}/`)) return path
  return `${BASE_PATH}${path}`
}

/** Turns a browser pathname back into a router path ("/blik-site/work" → "/work"). */
export function stripBase(pathname: string): string {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) return pathname.slice(BASE_PATH.length) || '/'
  return pathname
}
