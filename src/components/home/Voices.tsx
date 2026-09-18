import { company } from '../../data/company'
import { namedReviews } from '../../data/reviews'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { VideoFrame } from '../ui/VideoFrame'

/** Two video testimonials plus rating sources — clients speak for the studio. */
export function Voices() {
  const picks = namedReviews.slice(0, 2)
  return (
    <section data-theme="light" className="section-y bg-bg text-fg">
      <div className="container-x">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <p className="label-mono flex items-center gap-3 text-fg-3">
            <span className="text-signal-text">06</span> Что говорят о нас клиенты
          </p>
          <p className="label-mono text-fg-3">{company.ratings.map((r) => `${r.source} ${r.value}`).join(' · ')}</p>
        </div>
        <div className="grid-12 mt-12 gap-y-12">
          {picks.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.1} className="col-span-12 lg:col-span-5" as="article">
              {review.video && review.poster && <VideoFrame video={review.video} poster={review.poster} title={`Видеоотзыв: ${review.author}`} caption="Видеоотзыв" />}
              <blockquote className="mt-5">
                <p className="text-display-sm leading-[1.4]">«{review.text}»</p>
                <footer className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="label-mono-lg">{review.author}</span>
                  {review.role && <span className="label-mono text-fg-3">{review.role}</span>}
                </footer>
              </blockquote>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-2 lg:col-start-11">
            <ul className="space-y-4">
              {company.ratings.map((rating) => (
                <li key={rating.source} className="border-b border-line pb-3">
                  <p className="text-display-md">{rating.value}</p>
                  <p className="label-mono mt-1 text-fg-3">
                    {rating.source} · {rating.note}
                  </p>
                </li>
              ))}
            </ul>
            <ArrowLink to="/reviews">Все отзывы</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
