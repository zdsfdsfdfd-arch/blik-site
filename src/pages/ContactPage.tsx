import { ArrowUpRight } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { BriefForm } from '../components/ui/BriefForm'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { company, site } from '../data/company'
import { phoneHref } from '../lib/format'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Контакты',
  url: `${site.url}/contact`,
  mainEntity: { '@type': 'Organization', name: site.name, telephone: company.phone, email: company.email },
}

export function ContactPage() {
  return (
    <Page theme="light" title="Контакты" description={`Связаться со студией Видеопродакшн.РФ: ${company.phone}, ${company.email}. Казань, ул. Спартаковская, 88Б. Работаем в Москве, Санкт-Петербурге и по всей России.`} path="/contact" jsonLd={jsonLd}>
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono text-signal">05 · Контакты</p>
            <SplitLines as="h1" lines={['Начнём', 'с брифа']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="lead">Быстрая заявка — перезвоним в течение часа. Подробный бриф — вернёмся с концепцией и точным расчётом стоимости и сроков.</p>
          </div>
        </div>
      </section>

      <section className="container-x mt-14 md:mt-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal>
                <p className="label-mono text-fg-3">Телефон</p>
                <a href={phoneHref(company.phone)} className="text-display-md mt-2 block transition-colors hover:text-signal">
                  {company.phone}
                </a>
                <p className="label-mono mt-2 text-fg-3">{company.hours}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="label-mono text-fg-3">Почта</p>
                <a href={`mailto:${company.email}`} className="text-display-sm mt-2 block break-all transition-colors hover:text-signal">
                  {company.email}
                </a>
              </Reveal>
              {company.addresses.map((address) => (
                <Reveal key={address.city} delay={0.1}>
                  <p className="label-mono text-fg-3">Студия · {address.city}</p>
                  <p className="text-display-sm mt-2">{address.address}</p>
                  {address.note && <p className="mt-1 text-sm text-fg-2">{address.note}</p>}
                  {address.mapUrl && (
                    <a href={address.mapUrl} target="_blank" rel="noreferrer" className="group mt-3 inline-flex items-center gap-1 text-sm text-fg-2 hover:text-fg">
                      <span className="link-underline">На карте</span>
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <p className="label-mono text-fg-3">География</p>
                <p className="mt-2 text-sm text-fg-2">
                  {company.cities.join(', ')} — и вся Россия. Съёмки более чем в 25 городах, включая {company.extraCities.join(' и ')}.
                </p>
              </Reveal>
              {company.socials.length > 0 && (
                <Reveal delay={0.2}>
                  <p className="label-mono text-fg-3">Соцсети</p>
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {company.socials.map((social) => (
                      <li key={social.network}>
                        <a href={social.href} target="_blank" rel="noreferrer" className="link-underline text-sm text-fg">
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <BriefForm />
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {[
            { label: 'Шаг 01', title: 'Заявка', body: 'Контакт для быстрого звонка или подробный бриф.' },
            { label: 'Шаг 02', title: 'Консультация', body: 'Бесплатно: концепция ролика, точный расчёт стоимости и сроков.' },
            { label: 'Шаг 03', title: 'Производство', body: 'Препродакшн, съёмка, постпродакшн и сдача с тремя циклами правок.' },
          ].map((step) => (
            <div key={step.label} className="bg-bg p-6 md:p-8">
              <p className="label-mono text-signal">{step.label}</p>
              <h2 className="text-display-sm mt-5">{step.title}</h2>
              <p className="prose-body mt-2">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}
