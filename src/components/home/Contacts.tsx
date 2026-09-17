import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { company, socials } from '../../data/company'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const rows = [
  { icon: MapPin, label: 'Офис', value: company.address, href: undefined },
  { icon: Phone, label: 'Телефон', value: company.phone, href: company.phoneHref },
  { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
  { icon: Clock, label: 'Часы работы', value: company.hours, href: undefined },
]

export function Contacts() {
  return (
    <section id="contacts" className="section-y scroll-mt-20 border-t border-line bg-paper-2/60">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            index="09"
            eyebrow="Контакты"
            title={
              <>
                Давайте <span className="serif-accent text-ocean">познакомимся</span>
              </>
            }
            subtitle="Приходите в офис, звоните или пишите — расскажем, с чего начать, и предложим первые варианты за день."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/booking" variant="ocean" size="lg" arrow="right" magnetic>
                Оставить заявку
              </Button>
              <Button href="https://t.me" variant="outline" size="lg" arrow="up-right">
                Написать в Telegram
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.12}>
            <dl className="border border-line bg-paper">
              {rows.map((row) => {
                const Icon = row.icon
                return (
                  <div key={row.label} className="grid grid-cols-[2.5rem_1fr] items-start gap-4 border-b border-line p-5 last:border-b-0 sm:grid-cols-[2.5rem_8rem_1fr] sm:p-6">
                    <Icon className="mt-0.5 h-5 w-5 text-ocean" strokeWidth={1.5} aria-hidden="true" />
                    <dt className="eyebrow pt-1 text-muted">{row.label}</dt>
                    <dd className="col-start-2 font-display text-lg font-semibold tracking-[-0.01em] sm:col-start-3">
                      {row.href ? (
                        <a href={row.href} className="link-underline">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                )
              })}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-ink p-5 text-paper sm:p-6">
                <p className="font-mono text-xs tracking-wide text-paper/60">{company.coordinates}</p>
                <ul className="flex gap-5">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline text-sm font-medium text-paper"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
