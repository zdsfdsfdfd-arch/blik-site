import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { overallRating, overallReviewsCount, reviews } from '../../data/reviews'
import { formatNumber } from '../../lib/format'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Rating } from '../ui/Rating'
import { Reveal } from '../ui/Reveal'

const AUTOPLAY_MS = 7000
const SWIPE_THRESHOLD = 60

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
}

export function Reviews() {
  const reduceMotion = useReducedMotion()
  const [[index, direction], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const review = reviews[index]

  const go = useCallback((step: number) => {
    setState(([current]) => [(current + step + reviews.length) % reviews.length, step])
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, go])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1)
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
  }

  return (
    <section id="reviews" className="section-y scroll-mt-20 border-t border-line bg-paper-2/60">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="font-display text-ocean">06</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              Отзывы
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 flex items-baseline gap-2 font-display">
              <span className="text-7xl font-semibold tracking-[-0.05em] sm:text-8xl">{overallRating}</span>
              <span className="text-2xl text-muted">/5</span>
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Rating value={overallRating} showValue={false} size="md" className="mt-3" />
            <p className="mt-3 text-sm text-muted">
              Средняя оценка по {formatNumber(overallReviewsCount)} отзывам путешественников PLAN
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-display-md mt-10">
              Что говорят <span className="serif-accent text-ocean">после поездки</span>
            </h2>
          </Reveal>
        </div>

        <div
          className="lg:col-span-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Reveal delay={0.1}>
            <div
              className="relative flex min-h-[22rem] flex-col justify-between border-l border-line pl-6 sm:pl-10 lg:min-h-[26rem]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Отзывы путешественников"
              aria-live="polite"
            >
              <Quote className="h-8 w-8 text-sand" strokeWidth={1.25} aria-hidden="true" />

              <div className="relative flex-1 overflow-hidden py-6">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.figure
                    key={review.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT_EXPO }}
                    drag={reduceMotion ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <blockquote className="serif-accent text-2xl leading-snug text-ink sm:text-3xl lg:text-4xl">
                      «{review.text}»
                    </blockquote>
                    <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean font-display text-sm font-semibold text-paper">
                        {review.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block font-display font-semibold">{review.name}</span>
                        <span className="block text-sm text-muted">
                          {review.city} · {review.tour}
                        </span>
                      </span>
                      <Rating value={review.rating} showValue={false} className="ml-auto" />
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-display text-sm text-muted">
                  <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> /{' '}
                  {String(reviews.length).padStart(2, '0')}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Предыдущий отзыв"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Следующий отзыв"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
