import { ArrowUpRight } from 'lucide-react'
import { company, socials } from '../../data/company'
import { footerColumns } from '../../data/navigation'
import { Logo } from './Logo'
import { SmartLink } from './SmartLink'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="paper" className="text-3xl" />
            <p className="mt-5 max-w-sm text-lg text-paper/70">{company.tagline}</p>
            <div className="mt-8 space-y-1.5 text-sm text-paper/60">
              <p>{company.address}</p>
              <p>
                <a href={company.phoneHref} className="link-underline text-paper">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="link-underline text-paper">
                  {company.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 md:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow text-paper/50">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        to={link.to}
                        className="link-underline text-sm text-paper/85 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="eyebrow text-paper/50">Социальные сети</h3>
              <ul className="mt-5 space-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-paper/85 transition-colors hover:text-paper"
                    >
                      <span className="link-underline">{social.label}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between md:mt-24">
          <p>© 2026 PLAN. All rights reserved.</p>
          <p className="font-display tracking-[0.12em] uppercase">Путешествие начинается с PLAN</p>
        </div>
      </div>

      {/* Oversized wordmark — the editorial signature that closes every page. */}
      <div aria-hidden="true" className="container-x select-none">
        <p className="-mb-[0.22em] font-display text-[26vw] font-extrabold leading-none tracking-[-0.07em] text-paper/[0.06] md:text-[22vw]">
          PLAN
        </p>
      </div>
    </footer>
  )
}
