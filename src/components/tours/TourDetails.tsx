import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BedDouble, Check, ChevronRight, Clock, MapPin, Minus, UtensilsCrossed, Users } from 'lucide-react'
import { regionById } from '../../data/destinations'
import { getRelatedTours } from '../../data/tours'
import { TRAVEL_TYPE_LABELS } from '../../lib/filters'
import { formatDate, formatDays, formatPrice } from '../../lib/format'
import { scrollToId } from '../../lib/scroll'
import type { Tour } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Rating } from '../ui/Rating'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { BookingForm } from './BookingForm'
import { TourGrid } from './TourGrid'
import { TourTimeline } from './TourTimeline'

const sections = [
  { id: 'overview', label: 'Обзор' },
  { id: 'itinerary', label: 'Маршрут' },
  { id: 'included', label: 'Что входит' },
  { id: 'hotel', label: 'Отель' },
  { id: 'tour-reviews', label: 'Отзывы' },
  { id: 'booking', label: 'Бронирование' },
]

function SectionTitle({ index, children }: { index: string; children: string }) {
  return (
    <Reveal>
      <h2 className="text-display-md flex items-baseline gap-4">
        <span className="font-display text-sm font-semibold text-ocean">{index}</span>
        {children}
      </h2>
    </Reveal>
  )
}

interface TourDetailsProps {
  tour: Tour
}

export function TourDetails({ tour }: TourDetailsProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '20%'])
  const region = regionById[tour.region]
  const related = getRelatedTours(tour)

  const facts = [
    { icon: Clock, label: 'Продолжительность', value: formatDays(tour.days) },
    { icon: Users, label: 'Группа', value: tour.groupSize },
    { icon: UtensilsCrossed, label: 'Питание', value: tour.meals },
    { icon: BedDouble, label: 'Отель', value: `${tour.hotel.stars}★ ${tour.hotel.name}` },
  ]

  return (
    <article>
      {/* Hero */}
      <div ref={heroRef} className="grain relative min-h-[80svh] overflow-hidden bg-ink text-paper">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <SmartImage photo={tour.photo} alt={tour.alt} className="h-full w-full" sizes="100vw" priority />
        </motion.div>
        <div aria-hidden="true" className="image-overlay absolute inset-0" />

        <div className="container-x relative flex min-h-[80svh] flex-col justify-end pb-14 pt-32">
          <nav aria-label="Хлебные крошки" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/70">
              <li><Link to="/" className="link-underline">Главная</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li><Link to="/tours" className="link-underline">Туры</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li><Link to={`/tours?destination=${region.id}`} className="link-underline">{region.name}</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="text-paper">{tour.title}</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex flex-wrap gap-2">
                  {tour.types.map((type) => (
                    <Badge key={type}>{TRAVEL_TYPE_LABELS[type]}</Badge>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="text-display-xl mt-6">{tour.title}</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-paper/85">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />{tour.country}, {tour.city}</span>
                  <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />{formatDays(tour.days)}</span>
                  <Rating value={tour.rating} count={tour.reviewsCount} tone="paper" />
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-4 lg:text-right">
              <p className="eyebrow text-paper/60">Стоимость</p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-[-0.03em]">
                <span className="text-lg text-paper/70">от </span>{formatPrice(tour.price)}
              </p>
              <p className="text-xs text-paper/60">за человека при двухместном размещении</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="sticky top-16 z-30 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="container-x no-scrollbar flex gap-6 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToId(section.id, { offset: -140 })}
              className="link-underline shrink-0 py-4 font-display text-sm font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-16 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="min-w-0 space-y-24 lg:col-span-8">
          {/* Overview */}
          <section id="overview" className="scroll-mt-40">
            <SectionTitle index="01">Обзор путешествия</SectionTitle>
            <div className="mt-8 space-y-5">
              {tour.description.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p className="lead">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 border border-line px-4 py-3 font-display text-sm font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-ocean" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
                {tour.gallery.map((photo, index) => (
                  <li key={photo.photo} className={`group overflow-hidden ${index === 0 ? 'col-span-2 md:col-span-1' : ''}`}>
                    <SmartImage
                      photo={photo.photo}
                      alt={photo.alt}
                      className="aspect-[4/3]"
                      imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(min-width: 768px) 25vw, 50vw"
                      fallbackLabel={tour.city}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Itinerary */}
          <section id="itinerary" className="scroll-mt-40">
            <SectionTitle index="02">Маршрут по дням</SectionTitle>
            <div className="mt-10">
              <TourTimeline items={tour.itinerary} />
            </div>
          </section>

          {/* Included / Excluded */}
          <section id="included" className="scroll-mt-40">
            <SectionTitle index="03">Что входит в стоимость</SectionTitle>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Reveal>
                <h3 className="eyebrow text-muted">Включено</h3>
                <ul className="mt-4 space-y-3">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-ocean" strokeWidth={2.25} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08}>
                <h3 className="eyebrow text-muted">Не включено</h3>
                <ul className="mt-4 space-y-3">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-2">
                      <Minus className="mt-1 h-4 w-4 shrink-0 text-muted" strokeWidth={2.25} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* Hotel & meals */}
          <section id="hotel" className="scroll-mt-40">
            <SectionTitle index="04">Отель и питание</SectionTitle>
            <Reveal>
              <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                {facts.map((fact) => {
                  const Icon = fact.icon
                  return (
                    <div key={fact.label} className="bg-paper p-6">
                      <Icon className="h-5 w-5 text-ocean" strokeWidth={1.5} aria-hidden="true" />
                      <p className="eyebrow mt-4 text-muted">{fact.label}</p>
                      <p className="mt-1 font-display text-lg font-semibold tracking-[-0.01em]">{fact.value}</p>
                    </div>
                  )
                })}
              </div>
              <p className="mt-4 text-sm text-muted">Расположение: {tour.hotel.area}</p>
            </Reveal>
          </section>

          {/* Reviews */}
          <section id="tour-reviews" className="scroll-mt-40">
            <SectionTitle index="05">Отзывы путешественников</SectionTitle>
            <Reveal>
              <Rating value={tour.rating} count={tour.reviewsCount} size="md" className="mt-6" />
            </Reveal>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {tour.reviews.map((review, index) => (
                <Reveal as="li" key={`${review.name}-${review.date}`} delay={index * 0.08} className="flex flex-col border border-line p-6">
                  <Rating value={review.rating} showValue={false} />
                  <p className="mt-4 flex-1 text-ink-2">«{review.text}»</p>
                  <p className="mt-6 text-sm">
                    <span className="font-display font-semibold">{review.name}</span>
                    <span className="text-muted"> · {review.city} · {formatDate(review.date)}</span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* Booking */}
          <section id="booking" className="scroll-mt-40">
            <SectionTitle index="06">Забронировать путешествие</SectionTitle>
            <Reveal>
              <p className="mt-6 max-w-xl text-ink-2">
                Оставьте заявку — специалист PLAN уточнит даты, рассчитает точную стоимость и
                подготовит программу под вас.
              </p>
            </Reveal>
            <div className="mt-8">
              <BookingForm defaultDestination={tour.title} id="tour-booking" />
            </div>
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <Reveal delay={0.1}>
              <div className="border border-line bg-paper p-7 shadow-card">
                <p className="eyebrow text-muted">Стоимость</p>
                <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em]">
                  <span className="text-base text-muted">от </span>{formatPrice(tour.price)}
                </p>
                <p className="text-xs text-muted">за человека · {formatDays(tour.days)}</p>
                <dl className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-muted">Направление</dt><dd className="text-right font-medium">{tour.country}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Группа</dt><dd className="text-right font-medium">{tour.groupSize}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Питание</dt><dd className="text-right font-medium">{tour.meals}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Рейтинг</dt><dd className="text-right font-medium">{tour.rating.toFixed(1)} / 5</dd></div>
                </dl>
                <Button variant="ocean" size="lg" arrow="right" className="mt-7 h-auto min-h-14 w-full whitespace-normal py-3 text-center" onClick={() => scrollToId('booking', { offset: -140 })}>
                  Забронировать путешествие
                </Button>
                <p className="mt-4 text-center text-xs text-muted">Без предоплаты до подтверждения программы</p>
              </div>
            </Reveal>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line py-20 md:py-28" aria-labelledby="related-title">
          <div className="container-x">
            <Reveal>
              <h2 id="related-title" className="text-display-md">
                Похожие <span className="serif-accent text-ocean">путешествия</span>
              </h2>
            </Reveal>
            <div className="mt-12">
              <TourGrid tours={related} />
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
