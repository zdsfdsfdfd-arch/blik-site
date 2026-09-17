import { useEffect } from 'react'

const SITE_NAME = 'PLAN'
const DEFAULT_TITLE = 'PLAN — Путешествия по всему миру'
const DEFAULT_DESCRIPTION =
  'PLAN — туристическое агентство, которое помогает организовать путешествия по всему миру.'

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

/** Keeps document title, description and Open Graph tags in sync with the current page. */
export function useSeo(title?: string, description?: string): void {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
    const text = description ?? DEFAULT_DESCRIPTION
    document.title = fullTitle
    setMeta('meta[name="description"]', text)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', text)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', text)
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title, description])
}
