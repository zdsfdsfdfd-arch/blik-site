import { regions } from '../../data/destinations'

const cities = regions.flatMap((region) => region.cities)

/** Slow ticker of destinations that separates the hero from the first section. */
export function Marquee() {
  const items = [...cities, ...cities]
  return (
    <div
      aria-hidden="true"
      className="mt-16 overflow-hidden border-y border-line py-4 text-ink-2 motion-reduce:hidden md:mt-20"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((city, index) => (
          <span key={`${city}-${index}`} className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em]">
            {city}
            <span className="h-1 w-1 rounded-full bg-ocean" />
          </span>
        ))}
      </div>
    </div>
  )
}
