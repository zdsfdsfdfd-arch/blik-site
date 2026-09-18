import { services } from '../../data/services'
import { Marquee } from '../ui/Marquee'

/** Service names as a running production log between the hero and the work strip. */
export function Ticker() {
  const items = services.map((service) => (
    <span key={service.slug} className="label-mono-lg flex items-center gap-4 text-fg-2">
      <span className="text-fg-3">{service.index}</span>
      {service.name}
    </span>
  ))
  return <Marquee items={items} speed={55} className="border-y border-line py-4 motion-reduce:hidden" />
}
