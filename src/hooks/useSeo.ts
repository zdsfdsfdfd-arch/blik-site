import { useEffect } from 'react'
import { site } from '../data/company'
import { stripBase } from '../lib/base'

export interface SeoOptions {
  title?: string
  description?: string
  /** Absolute or site-relative path; defaults to the current pathname. */
  path?: string
  image?: string
  type?: 'website' | 'article' | 'video.other'
  /** Optional JSON-LD structured data injected as a script tag. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

/**
 * Keeps <title>, description, canonical, Open Graph, Twitter and JSON-LD in sync with the page.
 * Runs on the client; the static index.html carries the home defaults for crawlers.
 */
export function useSeo({ title, description, path, image, type = 'website', jsonLd, noindex }: SeoOptions = {}): void {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.shortName}` : site.defaultTitle
    const text = description ?? site.defaultDescription
    const pathname = path ?? stripBase(window.location.pathname)
    const url = pathname.startsWith('http') ? pathname : `${site.url}${pathname}`
    const ogImage = image ?? `${site.url}${site.ogImage}`

    document.title = fullTitle
    upsertMeta('name', 'description', text)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:locale', 'ru_RU')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', text)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', text)
    upsertMeta('name', 'twitter:image', ogImage)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    const scriptId = 'page-jsonld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = scriptId
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = site.defaultTitle
    }
  }, [title, description, path, image, type, jsonLd, noindex])
}
