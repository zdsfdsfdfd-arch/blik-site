import type { Plugin } from 'vite'
import { projects } from '../src/data/projects.ts'
import { services } from '../src/data/services.ts'
import { site } from '../src/data/company.ts'

const staticRoutes = ['/', '/work', '/services', '/pricing', '/process', '/about', '/contact', '/reviews', '/faq']

/** Emits sitemap.xml with every route of the site into the build output. */
export function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = [
        ...staticRoutes.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8' })),
        ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: '0.7' })),
        ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.7' })),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${site.url}${u.path}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}
