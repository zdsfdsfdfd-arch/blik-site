import { clients } from '../../data/clients'
import { Marquee } from '../ui/Marquee'

/** Named clients as a two-lane typographic ticker — no logos were published, so the names carry the weight. */
export function Clients() {
  const half = Math.ceil(clients.length / 2)
  const lanes = [clients.slice(0, half), clients.slice(half)]
  return (
    <section className="border-y border-line py-10 md:py-14" aria-label="Клиенты студии">
      <div className="container-x flex items-center justify-between">
        <p className="label-mono text-fg-3">
          <span className="text-signal-text">→</span> Нам доверяют
        </p>
        <p className="label-mono text-fg-3">600+ клиентов · 25 городов</p>
      </div>
      <div className="mt-8 space-y-4">
        {lanes.map((lane, i) => (
          <Marquee
            key={i}
            speed={i === 0 ? 70 : 85}
            className={i === 1 ? '[&_.marquee-track]:[animation-direction:reverse]' : ''}
            items={lane.map((name) => (
              <span key={name} className="font-display text-2xl font-medium tracking-[-0.02em] text-fg-2 md:text-3xl">
                {name}
              </span>
            ))}
          />
        ))}
      </div>
      <ul className="sr-only">
        {clients.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  )
}
