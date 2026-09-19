import type { ImageRef, VideoRef } from '../types'
import { localMedia } from '../generated/local-media'

export { withBase } from './base'

/** Ordered candidate URLs for a poster: local copy first, then remote, then YouTube fallbacks. */
export function posterSources(image: ImageRef, video?: VideoRef): string[] {
  const sources: string[] = []
  if (image.local && localMedia.has(image.local)) sources.push(image.local)
  if (image.src) sources.push(image.src)
  if (video?.platform === 'youtube') {
    for (const name of ['maxresdefault', 'sddefault', 'hqdefault']) {
      const url = `https://i.ytimg.com/vi/${video.id}/${name}.jpg`
      if (!sources.includes(url)) sources.push(url)
    }
  }
  return sources
}

export function youtubeThumb(id: string, quality: 'maxresdefault' | 'hqdefault' = 'maxresdefault'): string {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

/** Privacy-friendly embed URL for a hosted video. */
export function embedUrl(video: VideoRef, autoplay = true): string {
  const auto = autoplay ? 1 : 0
  switch (video.platform) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=${auto}&rel=0&modestbranding=1&playsinline=1&hl=ru`
    case 'rutube':
      return `https://rutube.ru/play/embed/${video.id}?autoplay=${auto}`
    case 'vk': {
      const [oid, id] = video.id.split('_')
      return `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2&autoplay=${auto}`
    }
    case 'kinescope':
      return `https://kinescope.io/embed/${video.id}?autoplay=${auto}`
    case 'vimeo':
      return `https://player.vimeo.com/video/${video.id}?autoplay=${auto}&dnt=1`
    default:
      return video.url
  }
}
