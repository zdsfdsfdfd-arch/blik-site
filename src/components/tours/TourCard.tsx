import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Clock } from 'lucide-react'
import { TRAVEL_TYPE_LABELS } from '../../lib/filters'
import { formatDays, formatPrice } from '../../lib/format'
import { EASE_OUT_EXPO } from '../../lib/motion'
import type { Tour } from '../../types'
import { Badge } from '../ui/Badge'
import { Rating } from '../ui/Rating'
import { SmartImage } from '../ui/SmartImage'

interface TourCardProps {
  tour: Tour
  index?: number
}

export function TourCard({ tour, index = 0 }: TourCardProps) {
  const reduceMotion = useReducedMotion()
  const href = `/tours/${tour.slug}`

  return (
    <motion.li
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: Math.min(index, 8) * 0.05 }}
      className="list-none"
    >
      <article className="group flex h-full flex-col">
        <Link to={href} className="relative block overflow-hidden" aria-label={`${tour.title}, ${tour.country}`}>
          <SmartImage
            photo={tour.photo}
            alt={tour.alt}
            className="aspect-[4/5]"
            imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            fallbackLabel={tour.city}
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <Badge>{TRAVEL_TYPE_LABELS[tour.types[0]]}</Badge>
            <Badge tone="ink" className="gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              {formatDays(tour.days)}
            </Badge>
          </div>
        </Link>

        <div className="flex flex-1 flex-col pt-5">
          <p className="eyebrow text-muted">
            {tour.country} · {tour.city}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="text-display-sm">
              <Link to={href} className="transition-colors duration-300 hover:text-ocean">
                {tour.title}
              </Link>
            </h3>
            <Rating value={tour.rating} count={tour.reviewsCount} className="mt-1 shrink-0" />
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-2">{tour.summary}</p>

          <div className="mt-auto flex items-end justify-between border-t border-line pt-5 mt-6">
            <p>
              <span className="text-xs text-muted">от </span>
              <span className="font-display text-xl font-semibold tracking-[-0.02em]">{formatPrice(tour.price)}</span>
              <span className="block text-xs text-muted">за человека</span>
            </p>
            <Link
              to={href}
              className="group/more inline-flex h-10 items-center gap-2 border border-ink/20 px-4 font-display text-sm font-semibold transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Подробнее
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/more:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </article>
    </motion.li>
  )
}
