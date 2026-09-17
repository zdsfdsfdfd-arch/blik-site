/**
 * Verifies that every Unsplash photo referenced in src/data resolves (HTTP 200)
 * and that no photo id is reused. Run with `npm run check:images`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('../src', import.meta.url).pathname
const PHOTO_RE = /photo-\d{13}-[0-9a-f]{12}/g

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full)
  }
  return out
}

const occurrences = new Map()
for (const file of walk(ROOT)) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(PHOTO_RE)) {
    const list = occurrences.get(match[0]) ?? []
    list.push(file.replace(ROOT, 'src'))
    occurrences.set(match[0], list)
  }
}

const ids = [...occurrences.keys()]
console.log(`Найдено уникальных фотографий: ${ids.length}`)

const duplicates = ids.filter((id) => new Set(occurrences.get(id)).size > 1)
if (duplicates.length) {
  console.warn('\nФотографии, использованные в нескольких файлах:')
  for (const id of duplicates) console.warn(`  ${id}: ${[...new Set(occurrences.get(id))].join(', ')}`)
}

let failed = 0
await Promise.all(
  ids.map(async (id) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=64&q=40`
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (!response.ok) {
        failed += 1
        console.error(`  ✗ ${response.status} ${id} (${occurrences.get(id)[0]})`)
      }
    } catch (error) {
      failed += 1
      console.error(`  ✗ ${id}: ${error.message}`)
    }
  }),
)

if (failed) {
  console.error(`\nНедоступных изображений: ${failed}`)
  process.exit(1)
}
console.log('Все изображения доступны ✓')
