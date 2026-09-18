/**
 * Verifies that every poster/video referenced in src/data is listed in the media manifest
 * and reports which local files are present. Run with `npm run media:check`.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const manifest = JSON.parse(readFileSync(join(ROOT, 'public/media/media-manifest.json'), 'utf8'))
const data = readFileSync(join(ROOT, 'src/data/projects.ts'), 'utf8')

const ids = [...data.matchAll(/video\('(?:vk|youtube|kinescope)', '([^']+)'\)/g)].map((m) => m[1])
const listed = new Set(manifest.videos.map((v) => v.videoId).filter(Boolean))
let missing = 0
for (const id of ids) {
  if (!listed.has(id)) {
    missing += 1
    console.error(`  ✗ video ${id} используется в данных, но не описан в манифесте`)
  }
}
let local = 0
for (const image of manifest.images) {
  if (image.localPath && existsSync(join(ROOT, 'public', image.localPath))) local += 1
}
console.log(`Видео в данных: ${ids.length}, в манифесте: ${listed.size}. Локальных изображений: ${local}/${manifest.images.length}.`)
if (missing) process.exit(1)
console.log('Манифест согласован с данными ✓')
