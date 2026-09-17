import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { regions } from '../../data/destinations'
import { countToursByRegion } from '../../data/tours'
import { formatTours } from '../../lib/format'
import type { Region } from '../../types'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

const tourCounts = countToursByRegion()

const layout: Record<Region['id'], { className: string; sizes: string }> = {
  europe: { className: 'md:col-span-2 lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto', sizes: '(min-width: 1024px) 58vw, 100vw' },
  asia: { className: 'lg:col-span-5 aspect-[4/3] lg:aspect-[5/3.2]', sizes: '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw' },
  america: { className: 'lg:col-span-5 aspect-[4/3] lg:aspect-[5/3.2]', sizes: '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw' },
  'middle-east': { className: 'lg:col-span-4 aspect-[4/3] lg:aspect-[4/3.4]', sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' },
  africa: { className: 'lg:col-span-4 aspect-[4/3] lg:aspect-[4/3.4]', sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' },
  oceania: { className: 'md:col-span-2 lg:col-span-4 aspect-[4/3] lg:aspect-[4/3.4]', sizes: '(min-width: 1024px) 33vw, 100vw' },
}

function DestinationCard({ region, index }: { region: Region; index: number }) {
  const count = tourCounts[region.id] ?? 0
  const { className, sizes } = layout[region.id]

  return (
    <Reveal as="li" delay={(index % 3) * 0.08} className={`${className} list-none`}>
      <Link
        to={`/tours?destination=${region.id}`}
        aria-label={`${region.name}: ${formatTours(count)}`}
        className="group relative block h-full w-full overflow-hidden bg-ink"
      >
        <SmartImage
          photo={region.photo}
          alt={region.alt}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          sizes={sizes}
        />
        <div
          aria-hidden="true"
          className="image-overlay absolute inset-0 transition-opacity duration-700 group-hover:opacity-90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-paper md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-paper/70">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="text-display-md mt-2">{region.name}</h3>
            </div>
            <span className="eyebrow translate-y-2 rounded-full border border-paper/40 px-3 py-1.5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              {formatTours(count)}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="max-w-xs text-sm text-paper/75">{region.tagline}</p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-display text-sm font-semibold">
                {region.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
            <span className="flex h-12 w-12 shrink-0 translate-y-3 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export function Destinations() {
  return (
    <section id="destinations" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Направления"
          title={
            <>
              Куда <span className="serif-accent text-ocean">отправимся?</span>
            </>
          }
          subtitle="От коротких поездок до путешествий на другой конец света."
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
          {regions.map((region, index) => (
            <DestinationCard key={region.id} region={region} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
