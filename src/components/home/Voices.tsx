import { company } from '../../data/company'
import { reviews } from '../../data/reviews'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'

/** One large voice from a client plus the rating sources — restrained, no testimonial cards. */
export function Voices() {
  const lead = reviews[0]
  return (
    <section data-theme="light" className="section-y bg-bg text-fg">
      <div className="container-x">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <p className="label-mono flex items-center gap-3 text-fg-3">
            <span className="text-signal">06</span> Отзывы
          </p>
          <p className="label-mono text-fg-3">{company.ratings.map((r) => `${r.source} ${r.value}`).join(' · ')}</p>
        </div>
        <div className="grid-12 mt-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-8">
            <blockquote>
              <p className="text-display-md">«{lead.text}»</p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="label-mono-lg">{lead.author}</span>
                {lead.company && <span className="label-mono text-fg-3">{lead.company}</span>}
                {lead.source && <span className="label-mono text-fg-3">{lead.paraphrased ? 'по отзыву на ' : ''}{lead.source}</span>}
              </footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10">
            <ul className="space-y-4">
              {company.ratings.map((rating) => (
                <li key={rating.source} className="flex items-baseline justify-between border-b border-line pb-3">
                  <span className="text-sm text-fg-2">{rating.source}</span>
                  <span className="text-display-sm">
                    {rating.value} <span className="label-mono text-fg-3">{rating.note}</span>
                  </span>
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
