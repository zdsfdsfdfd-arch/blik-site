import { useRef, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTourFilters } from '../../hooks/useTourFilters'
import { SORT_OPTIONS, serializeFilters, type SortId } from '../../lib/filters'
import { plural } from '../../lib/format'
import { scrollTo } from '../../lib/scroll'
import type { Tour } from '../../types'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TourFinder } from './TourFinder'
import { TourGrid } from './TourGrid'

interface TourCatalogProps {
  tours: Tour[]
  heading: {
    index: string
    eyebrow: string
    title: ReactNode
    subtitle?: string
  }
  /** Keep the URL query string in sync with the filters (used on the catalogue page). */
  syncUrl?: boolean
  /** Show at most this many results and a link to the full catalogue. */
  limit?: number
  id?: string
}

/** Filter panel + results header + grid — shared by the home page and the catalogue page. */
export function TourCatalog({ tours, heading, syncUrl = false, limit, id = 'tours' }: TourCatalogProps) {
  const resultsRef = useRef<HTMLDivElement>(null)
  const { filters, sort, results, activeCount, updateFilter, setSort, reset } = useTourFilters({
    tours,
    syncUrl,
  })

  const visible = limit ? results.slice(0, limit) : results
  const hiddenCount = results.length - visible.length
  const catalogueHref = `/tours${activeCount > 0 ? `?${serializeFilters(filters, sort)}` : ''}`

  return (
    <section id={id} className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x">
        <SectionHeading
          index={heading.index}
          eyebrow={heading.eyebrow}
          title={heading.title}
          subtitle={heading.subtitle}
        />

        <Reveal className="mt-12" delay={0.1}>
          <TourFinder
            filters={filters}
            activeCount={activeCount}
            onChange={updateFilter}
            onReset={reset}
            onSubmit={() => resultsRef.current && scrollTo(resultsRef.current, { offset: -96 })}
          />
        </Reveal>

        <div ref={resultsRef} className="mt-14 scroll-mt-24">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-sm text-muted" aria-live="polite">
              <span className="text-ink">{results.length}</span>{' '}
              {plural(results.length, ['путешествие', 'путешествия', 'путешествий'])}
              {activeCount > 0 && ' по вашим параметрам'}
            </p>
            <div className="relative flex items-center gap-3">
              <label htmlFor={`${id}-sort`} className="eyebrow text-muted">
                Сортировка
              </label>
              <div className="relative">
                <select
                  id={`${id}-sort`}
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortId)}
                  className="h-10 cursor-pointer appearance-none border border-line bg-paper pl-4 pr-9 font-display text-sm font-semibold outline-none transition-colors hover:border-ink focus-visible:border-ocean"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <TourGrid tours={visible} onReset={reset} />

          {hiddenCount > 0 && (
            <div className="mt-14 flex justify-center">
              <Button to={catalogueHref} variant="outline" size="lg" arrow="right">
                Смотреть все {results.length} {plural(results.length, ['тур', 'тура', 'туров'])}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
