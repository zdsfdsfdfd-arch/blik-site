import type { ImageRef } from '../../types'
import { posterSources } from '../../lib/media'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

interface ProjectGalleryProps {
  images: ImageRef[]
}

/** Stills in an editorial rhythm: wide, then two narrow, then wide. */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images.length) return null
  return (
    <div className="container-x mt-16 grid gap-6 md:grid-cols-2">
      {images.map((image, i) => (
        <Reveal key={image.src || i} as="figure" className={i % 3 === 0 ? 'md:col-span-2' : ''}>
          <SmartImage sources={posterSources(image)} alt={image.alt} className={i % 3 === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'} sizes="(min-width: 768px) 50vw, 100vw" />
          <figcaption className="label-mono mt-3 text-fg-3">
            {String(i + 1).padStart(2, '0')} · {image.alt}
          </figcaption>
        </Reveal>
      ))}
    </div>
  )
}
