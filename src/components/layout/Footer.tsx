import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { company, site } from '../../data/company'
import { footerColumns } from '../../data/navigation'
import { services } from '../../data/services'
import { phoneHref } from '../../lib/format'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-bg text-fg">
      {/* Closing call — the last frame of every page. */}
      <div className="container-x border-t border-line">
        <Link
          to="/contact"
          data-cursor="next"
          className="group flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-20"
        >
          <div>
            <p className="label-mono text-fg-3">Следующий кадр</p>
            <p className="text-display-xl mt-4 text-fg transition-colors duration-500 group-hover:text-signal-text">
              Обсудить
              <br />
              ваш проект
            </p>
          </div>
          <span className="inline-flex h-16 w-16 items-center justify-center border border-line transition-[background-color,border-color,color] duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink md:h-24 md:w-24">
            <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9" strokeWidth={1.25} aria-hidden="true" />
          </span>
        </Link>
      </div>

      <div className="container-x border-t border-line pt-12 md:pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-fg-2">{company.tagline}. Работаем с {company.founded} года.</p>
            <div className="mt-8 space-y-2 text-sm">
              {company.phone && (
                <p>
                  <a href={phoneHref(company.phone)} className="link-underline text-fg">
                    {company.phone}
                  </a>
                </p>
              )}
              {company.email && (
                <p>
                  <a href={`mailto:${company.email}`} className="link-underline text-fg">
                    {company.email}
                  </a>
                </p>
              )}
              {company.addresses.map((address) => (
                <p key={address.city} className="text-fg-2">
                  <span className="label-mono mr-2 text-fg-3">{address.city}</span>
                  {address.address}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8">
            <div>
              <h2 className="label-mono text-fg-3">Услуги</h2>
              <ul className="mt-5 space-y-2.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className="link-underline text-sm text-fg-2 transition-colors hover:text-fg">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="label-mono text-fg-3">{column.title}</h2>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="link-underline text-sm text-fg-2 transition-colors hover:text-fg">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {company.socials.length > 0 && (
              <div>
                <h2 className="label-mono text-fg-3">Соцсети</h2>
                <ul className="mt-5 space-y-2.5">
                  {company.socials.map((social) => (
                    <li key={social.network}>
                      <a href={social.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-fg">
                        <span className="link-underline">{social.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line py-5 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="label-mono">
            © {company.founded}–{year} {site.name}
          </p>
          <p className="label-mono">{company.cities.join(' · ')}</p>
          <Link to="/privacy" className="link-underline">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
