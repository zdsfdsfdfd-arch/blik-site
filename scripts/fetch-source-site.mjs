/**
 * Crawls the original site and its legacy mirror, stores HTML + extracted text,
 * collects every image/video URL (HTML, inline styles, Tilda data attributes,
 * project CSS) and downloads the images. Designed to run on a GitHub Actions
 * runner with open internet access:  node scripts/fetch-source-site.mjs
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const OUT = join(ROOT, 'research/source')
const MEDIA = join(ROOT, 'public/media/source')
const ORIGINS = ['https://xn--80adgaeqsyfakm2i.xn--p1ai', 'https://videokzn.ru']
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const MAX_PAGES = 400
const MAX_IMAGE_BYTES = 25 * 1024 * 1024

const SEEDS = [
  '/', '/o-kompanii', '/vse-videoroliki/1', '/vse-videoroliki/2', '/vse-videoroliki/3', '/vse-videoroliki/4', '/vse-videoroliki/5',
  '/reklamnye_videoroliki', '/prezentacionnye_video', '/videoroliki_dlya_vystavok', '/aerosyemka', '/intervyu',
  '/video_dlya_marketpleysov', '/hr_video', '/dokumentalnye_filmy', '/ubiley', '/sitemap.xml', '/robots.txt',
]

mkdirSync(join(OUT, 'html'), { recursive: true })
mkdirSync(join(OUT, 'text'), { recursive: true })
mkdirSync(join(OUT, 'css'), { recursive: true })
mkdirSync(MEDIA, { recursive: true })

const pages = []
const cssFiles = new Map()
const imageUrls = new Map() // url -> {pages:Set, alt:Set, kind}
const videoRefs = new Map() // key -> {platform,id,url,pages:Set}
const links = new Set()
const log = (...a) => console.log(...a)

async function get(url, type = 'text') {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: '*/*', 'accept-language': 'ru,en;q=0.8' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return type === 'text' ? { body: await res.text(), res } : { body: Buffer.from(await res.arrayBuffer()), res }
}

function slugOf(url) {
  const u = new URL(url)
  const path = u.pathname.replace(/\/+$/, '') || '/index'
  return `${u.hostname.replace(/^www\./, '')}${path}`.replace(/[^a-z0-9а-яё._-]+/gi, '_').slice(0, 150)
}

function decode(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function textOf(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|h[1-6]|li|tr|section|article|header|footer)>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim()
}

function abs(base, href) {
  try {
    return new URL(href, base).href
  } catch {
    return null
  }
}

function sameSite(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '')
    return ORIGINS.some((o) => new URL(o).hostname === h)
  } catch {
    return false
  }
}

const IMG_EXT = /\.(jpe?g|png|webp|gif|svg|avif|bmp|ico)(\?|$)/i
const VID_EXT = /\.(mp4|webm|mov|m3u8|ogv)(\?|$)/i

function addImage(url, page, alt = '', kind = 'img') {
  if (!url || url.startsWith('data:')) return
  const entry = imageUrls.get(url) ?? { pages: new Set(), alt: new Set(), kind }
  entry.pages.add(page)
  if (alt) entry.alt.add(alt)
  imageUrls.set(url, entry)
}

function addVideo(platform, id, url, page) {
  const key = `${platform}:${id}`
  const entry = videoRefs.get(key) ?? { platform, id, url, pages: new Set() }
  entry.pages.add(page)
  videoRefs.set(key, entry)
}

function harvestMedia(html, page, base) {
  // Any absolute URL that looks like an image/video (covers srcset, data-*, JSON blobs, inline styles).
  for (const m of html.matchAll(/https?:\/\/[^\s"'<>()\\]+/g)) {
    const url = decode(m[0]).replace(/[,;]$/, '')
    if (IMG_EXT.test(url) || /tildacdn\.(com|info|net)/.test(url) && !/\.(css|js|woff2?|ttf|html)(\?|$)/i.test(url)) addImage(url, page, '', 'url')
    if (VID_EXT.test(url)) addVideo('file', url, url, page)
  }
  // Relative image sources and Tilda lazy attributes.
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0]
    const alt = decode((tag.match(/\balt="([^"]*)"/i) ?? [])[1] ?? '')
    for (const attr of ['src', 'data-original', 'data-src', 'data-lazy', 'data-srcset', 'srcset']) {
      const v = (tag.match(new RegExp(`\\b${attr}="([^"]*)"`, 'i')) ?? [])[1]
      if (!v) continue
      for (const part of v.split(',')) {
        const u = abs(base, decode(part.trim().split(/\s+/)[0]))
        if (u) addImage(u, page, alt, 'img')
      }
    }
  }
  for (const m of html.matchAll(/(?:data-(?:bg|original|bgimg|img|image|cover|content-cover-bg|content-bg-url|lazy-bg|thumbnail|poster))="([^"]+)"/gi)) {
    const u = abs(base, decode(m[1]))
    if (u && !VID_EXT.test(u)) addImage(u, page, '', 'data')
  }
  for (const m of html.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) {
    const u = abs(base, decode(m[2]))
    if (u && (IMG_EXT.test(u) || /tildacdn/.test(u))) addImage(u, page, '', 'css')
  }
  // Videos: YouTube / Vimeo / Rutube / VK / Kinescope / Tilda attributes.
  for (const m of html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?(?:[^"'&]*&)?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/g)) addVideo('youtube', m[1], `https://www.youtube.com/watch?v=${m[1]}`, page)
  for (const m of html.matchAll(/data-content-video-url-youtube(?:-[a-z]+)?="([^"]+)"/gi)) {
    const id = (decode(m[1]).match(/([A-Za-z0-9_-]{11})(?:[&?]|$)/) ?? [])[1]
    if (id) addVideo('youtube', id, `https://www.youtube.com/watch?v=${id}`, page)
  }
  for (const m of html.matchAll(/data-(?:video-?url|videourl|video|content-video-url(?:-mp4)?|content-video-url-vimeo|src-video)="([^"]+)"/gi)) {
    const v = decode(m[1])
    const yt = v.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
    if (yt) addVideo('youtube', yt[1], `https://www.youtube.com/watch?v=${yt[1]}`, page)
    else if (/vimeo\.com/.test(v)) addVideo('vimeo', (v.match(/(\d{6,})/) ?? [])[1] ?? v, v, page)
    else if (VID_EXT.test(v)) addVideo('file', abs(base, v) ?? v, abs(base, v) ?? v, page)
    else if (/rutube|vk\.com|kinescope/.test(v)) addVideo('other', v, v, page)
  }
  for (const m of html.matchAll(/vimeo\.com\/(?:video\/)?(\d{6,})/g)) addVideo('vimeo', m[1], `https://vimeo.com/${m[1]}`, page)
  for (const m of html.matchAll(/rutube\.ru\/(?:play\/embed\/|video\/(?:private\/)?)([a-f0-9]{32})/g)) addVideo('rutube', m[1], `https://rutube.ru/video/${m[1]}/`, page)
  for (const m of html.matchAll(/vk\.com\/video_ext\.php\?[^"'\s]+/g)) addVideo('vk', decode(m[0]), decode(m[0]), page)
  for (const m of html.matchAll(/vk\.com\/video(-?\d+_\d+)/g)) addVideo('vk', m[1], `https://vk.com/video${m[1]}`, page)
  for (const m of html.matchAll(/kinescope\.io\/(?:embed\/)?([A-Za-z0-9]+)/g)) addVideo('kinescope', m[1], `https://kinescope.io/${m[1]}`, page)
  for (const m of html.matchAll(/<iframe[^>]+src="([^"]+)"/gi)) {
    const u = abs(base, decode(m[1]))
    if (u && !/youtube|vimeo|rutube|vk\.com|kinescope/.test(u)) addVideo('iframe', u, u, page)
  }
  for (const m of html.matchAll(/<(?:video|source)[^>]+src="([^"]+)"/gi)) {
    const u = abs(base, decode(m[1]))
    if (u) addVideo('file', u, u, page)
  }
  // Tilda project CSS/JS (may hold background images).
  for (const m of html.matchAll(/<link[^>]+href="([^"]+\.css[^"]*)"/gi)) {
    const u = abs(base, decode(m[1]))
    if (u && /tildacdn|tilda/.test(u)) cssFiles.set(u, page)
  }
}

async function crawl() {
  const queue = []
  for (const origin of ORIGINS) for (const seed of SEEDS) queue.push(origin + seed)
  const seen = new Set()
  while (queue.length && pages.length < MAX_PAGES) {
    const url = queue.shift()
    const norm = url.replace(/#.*$/, '').replace(/\/$/, '') || url
    if (seen.has(norm)) continue
    seen.add(norm)
    let body, res
    try {
      ;({ body, res } = await get(url))
    } catch (error) {
      pages.push({ url, ok: false, error: String(error.message) })
      log('  ✗', url, error.message)
      continue
    }
    const type = res.headers.get('content-type') ?? ''
    const slug = slugOf(res.url || url)
    if (/xml|text\/plain/.test(type) && !/html/.test(type)) {
      writeFileSync(join(OUT, 'html', `${slug}.txt`), body)
      for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) if (sameSite(m[1])) queue.push(m[1].trim())
      pages.push({ url: res.url || url, ok: true, type })
      continue
    }
    if (!/html/.test(type)) {
      pages.push({ url: res.url || url, ok: true, type })
      continue
    }
    writeFileSync(join(OUT, 'html', `${slug}.html`), body)
    const title = decode((body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1] ?? '').trim()
    const description = decode((body.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) ?? body.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i) ?? [])[1] ?? '')
    const ogImage = decode((body.match(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i) ?? [])[1] ?? '')
    const headings = [...body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: textOf(m[2]) })).filter((h) => h.text)
    const text = textOf(body)
    writeFileSync(join(OUT, 'text', `${slug}.txt`), `${title}\n${'='.repeat(80)}\n${text}\n`)
    harvestMedia(body, res.url || url, res.url || url)
    if (ogImage) addImage(abs(res.url || url, ogImage), res.url || url, 'og:image', 'og')
    let internal = 0
    for (const m of body.matchAll(/href="([^"#]+)"/gi)) {
      const u = abs(res.url || url, decode(m[1]))
      if (!u || !sameSite(u) || /^mailto:|^tel:/.test(u) || /\.(jpe?g|png|webp|gif|svg|pdf|zip|mp4)(\?|$)/i.test(u)) continue
      links.add(u)
      internal += 1
      queue.push(u)
    }
    pages.push({ url: res.url || url, ok: true, type: 'html', title, description, ogImage, headings, internalLinks: internal, textLength: text.length })
    log(`  ✓ [${pages.length}] ${res.url || url} — ${title}`)
  }
}

async function fetchCss() {
  for (const [url, page] of cssFiles) {
    try {
      const { body } = await get(url)
      writeFileSync(join(OUT, 'css', `${createHash('md5').update(url).digest('hex').slice(0, 10)}-${url.split('/').pop().split('?')[0]}`), body)
      for (const m of body.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) {
        const u = abs(url, m[2])
        if (u && (IMG_EXT.test(u) || /tildacdn/.test(u)) && !/\.(woff2?|ttf|eot)/i.test(u)) addImage(u, page, '', 'stylesheet')
      }
    } catch (error) {
      log('  css ✗', url, error.message)
    }
  }
}

/** thb/optim thumbnails → static originals when the Tilda id + filename are recoverable. */
function originalOf(url) {
  const m = url.match(/tildacdn\.(?:com|info|net)\/(tild[0-9a-f-]+)\/(?:.*?\/)?([^/?]+\.[a-z0-9]{2,5})(?:\?|$)/i)
  if (m && /thb\.|optim\.|-\/resize|-\/format/.test(url)) return `https://static.tildacdn.com/${m[1]}/${m[2]}`
  return null
}

async function downloadImages() {
  const list = [...imageUrls.entries()]
  const results = []
  let n = 0
  for (const [url, meta] of list) {
    n += 1
    const original = originalOf(url)
    const candidates = original ? [original, url] : [url]
    let saved = null
    for (const candidate of candidates) {
      try {
        const { body, res } = await get(candidate, 'buffer')
        const type = res.headers.get('content-type') ?? ''
        if (!/^image\//.test(type) || body.length > MAX_IMAGE_BYTES) throw new Error(`skip ${type} ${body.length}`)
        const ext = extname(new URL(candidate).pathname) || `.${type.split('/')[1].split('+')[0]}`
        const id = (candidate.match(/(tild[0-9a-f-]+)/) ?? [])[1] ?? createHash('md5').update(candidate).digest('hex').slice(0, 12)
        const name = `${id}-${(new URL(candidate).pathname.split('/').pop() || 'file').replace(/[^a-z0-9._-]+/gi, '_')}`.slice(0, 120)
        const file = name.toLowerCase().endsWith(ext.toLowerCase()) ? name : `${name}${ext}`
        const target = join(MEDIA, file)
        if (!existsSync(target)) writeFileSync(target, body)
        saved = { file: `/media/source/${file}`, from: candidate, bytes: body.length, type }
        break
      } catch (error) {
        log(`  img ↻ ${candidate}: ${error.message}`)
      }
    }
    results.push({ url, original, downloaded: Boolean(saved), local: saved?.file ?? null, fetchedFrom: saved?.from ?? null, bytes: saved?.bytes ?? null, kind: meta.kind, alt: [...meta.alt], pages: [...meta.pages] })
    if (saved) log(`  img ✓ [${n}/${list.length}] ${saved.file}`)
  }
  return results
}

async function enrichVideos() {
  const out = []
  for (const v of videoRefs.values()) {
    const item = { platform: v.platform, id: v.id, url: v.url, pages: [...v.pages], title: null, author: null, thumbnail: null }
    try {
      if (v.platform === 'youtube') {
        const { body } = await get(`https://www.youtube.com/oembed?url=${encodeURIComponent(v.url)}&format=json`)
        const j = JSON.parse(body)
        item.title = j.title
        item.author = j.author_name
        item.thumbnail = j.thumbnail_url
        for (const q of ['maxresdefault', 'sddefault', 'hqdefault']) {
          try {
            const { body: img } = await get(`https://i.ytimg.com/vi/${v.id}/${q}.jpg`, 'buffer')
            if (img.length > 3000) {
              const file = `yt-${v.id}-${q}.jpg`
              writeFileSync(join(MEDIA, file), img)
              item.poster = `/media/source/${file}`
              break
            }
          } catch {
            /* try next quality */
          }
        }
      } else if (v.platform === 'vimeo') {
        const { body } = await get(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(v.url)}`)
        const j = JSON.parse(body)
        item.title = j.title
        item.author = j.author_name
        item.thumbnail = j.thumbnail_url
      }
    } catch (error) {
      item.error = String(error.message)
    }
    out.push(item)
  }
  return out
}

log('Crawling…')
await crawl()
log(`Pages: ${pages.length}. CSS files: ${cssFiles.size}. Fetching CSS…`)
await fetchCss()
log(`Image URLs: ${imageUrls.size}. Video refs: ${videoRefs.size}. Downloading images…`)
const images = await downloadImages()
log('Resolving videos…')
const videos = await enrichVideos()
writeFileSync(join(OUT, 'inventory.json'), JSON.stringify({ generatedAt: new Date().toISOString(), origins: ORIGINS, pages, links: [...links].sort(), images, videos, css: [...cssFiles.keys()] }, null, 2))
writeFileSync(join(OUT, 'image-urls.txt'), images.map((i) => i.url).join('\n') + '\n')
writeFileSync(join(OUT, 'video-urls.txt'), videos.map((v) => v.url).join('\n') + '\n')
log(`Done. pages=${pages.length} images=${images.length} (downloaded ${images.filter((i) => i.downloaded).length}) videos=${videos.length}`)
