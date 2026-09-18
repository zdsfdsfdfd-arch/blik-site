import { Link } from 'react-router-dom'
import { clientLogos, clients } from '../../data/clients'
import { Marquee } from '../ui/Marquee'

/**
 * «Нам доверяют»: the logo row from the original homepage, then a two-lane
 * ticker with every client named in the portfolio.
 */
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
      <ul className="container-x mt-8 grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-5 lg:grid-cols-9">
        {clientLogos.map((logo) => (
          <li key={logo.name} className="flex aspect-[5/3] items-center justify-center bg-bg p-4 md:p-5">
            <Link to={logo.href ?? '/work'} title={logo.name} className="flex h-full w-full items-center justify-center opacity-80 transition-opacity hover:opacity-100">
              <img src={logo.src} alt={logo.name} loading="lazy" className="max-h-10 w-auto max-w-full object-contain" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-4">
        {lanes.map((lane, i) => (
          <Marquee
            key={i}
            speed={i === 0 ? 90 : 110}
            className={i === 1 ? '[&_.marquee-track]:[animation-direction:reverse]' : ''}
            items={lane.map((name) => (
              <span key={name} className="font-display text-xl font-medium tracking-[-0.02em] text-fg-2 md:text-2xl">
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
