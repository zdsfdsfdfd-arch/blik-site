import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/format'
import type { Story } from '../../types'
import { ArrowLink } from '../ui/ArrowLink'
import { Button } from '../ui/Button'
import { SmartImage } from '../ui/SmartImage'

interface StoryCardProps {
  story: Story
  variant?: 'featured' | 'row' | 'grid'
}

function Meta({ story, className = '' }: { story: Story; className?: string }) {
  return (
    <p className={`eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted ${className}`}>
      <span className="text-ocean">{story.category}</span>
      <span className="h-px w-4 bg-line" aria-hidden="true" />
      <time dateTime={story.date}>{formatDate(story.date)}</time>
      <span className="hidden sm:inline">· {story.readingTime} мин</span>
    </p>
  )
}

export function StoryCard({ story, variant = 'grid' }: StoryCardProps) {
  const href = `/stories/${story.slug}`

  if (variant === 'featured') {
    return (
      <article className="group">
        <Link to={href} className="block overflow-hidden">
          <SmartImage
            photo={story.photo}
            alt={story.alt}
            className="aspect-[4/3]"
            imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            sizes="(min-width: 1024px) 58vw, 100vw"
            fallbackLabel={story.category}
          />
        </Link>
        <Meta story={story} className="mt-6" />
        <h3 className="text-display-md mt-4">
          <Link to={href} className="transition-colors duration-300 hover:text-ocean">
            {story.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-ink-2">{story.excerpt}</p>
        <Button to={href} variant="outline" size="sm" arrow="right" className="mt-6">
          Читать историю
        </Button>
      </article>
    )
  }

  if (variant === 'row') {
    return (
      <article className="group grid grid-cols-[6rem_1fr] gap-5 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-6 last:border-b">
        <Link to={href} className="block overflow-hidden">
          <SmartImage
            photo={story.photo}
            alt={story.alt}
            className="aspect-square"
            imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            sizes="8rem"
            fallbackLabel={story.category}
          />
        </Link>
        <div className="flex flex-col">
          <Meta story={story} />
          <h3 className="text-display-sm mt-3">
            <Link to={href} className="transition-colors duration-300 hover:text-ocean">
              {story.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-2">{story.excerpt}</p>
          <ArrowLink to={href} className="mt-auto pt-4">
            Читать
          </ArrowLink>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col">
      <Link to={href} className="block overflow-hidden">
        <SmartImage
          photo={story.photo}
          alt={story.alt}
          className="aspect-[4/3]"
          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 45vw, 100vw"
          fallbackLabel={story.category}
        />
      </Link>
      <Meta story={story} className="mt-5" />
      <h3 className="text-display-sm mt-3">
        <Link to={href} className="transition-colors duration-300 hover:text-ocean">
          {story.title}
        </Link>
      </h3>
      <p className="mt-3 text-ink-2">{story.excerpt}</p>
      <ArrowLink to={href} className="mt-5">
        Читать
      </ArrowLink>
    </article>
  )
}
