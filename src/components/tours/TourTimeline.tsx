import type { ItineraryDay } from '../../types'
import { Reveal } from '../ui/Reveal'

interface TourTimelineProps {
  items: ItineraryDay[]
}

export function TourTimeline({ items }: TourTimelineProps) {
  return (
    <ol className="relative border-l border-line pl-8 sm:pl-12">
      {items.map((item, index) => (
        <Reveal as="li" key={item.day} delay={Math.min(index, 6) * 0.05} className="relative pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:-left-12"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-ocean ring-4 ring-paper" />
          </span>
          <p className="eyebrow text-ocean">Day {String(item.day).padStart(2, '0')}</p>
          <h3 className="text-display-sm mt-2">{item.title}</h3>
          <p className="mt-2 max-w-xl text-ink-2">{item.description}</p>
        </Reveal>
      ))}
    </ol>
  )
}
