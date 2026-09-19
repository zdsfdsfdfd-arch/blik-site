import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import { projects } from '../src/data/projects.ts'
import { services } from '../src/data/services.ts'

const staticRoutes = ['/', '/work', '/services', '/pricing', '/process', '/about', '/contact', '/reviews', '/faq']

/**
 * Static-hosting extras for the build output:
 * - sitemap.xml and robots.txt with every route, addressed at VITE_SITE_URL;
 * - 404.html as a copy of index.html so static hosts (GitHub Pages) hand deep
 *   links to the client-side router;
 * - .nojekyll so GitHub Pages never runs the output through Jekyll.
 */
export function staticSitePlugin(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'static-site',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    generateBundle() {
      const siteUrl = String(config.env.VITE_SITE_URL ?? '').replace(/\/+$/, '')
      const basePath = config.base.replace(/\/+$/, '')
      const today = new Date().toISOString().slice(0, 10)
      const urls = [
        ...staticRoutes.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8' })),
        ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: '0.7' })),
        ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.7' })),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${siteUrl}${u.path}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: ${basePath}/\nDisallow: ${basePath}/privacy\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
    closeBundle() {
      const outDir = join(config.root, config.build.outDir)
      const index = join(outDir, 'index.html')
      if (!existsSync(index)) return
      copyFileSync(index, join(outDir, '404.html'))
      writeFileSync(join(outDir, '.nojekyll'), '')
    },
  }
}
