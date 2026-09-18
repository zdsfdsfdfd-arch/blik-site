import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { ServiceHero } from '../components/services/ServiceHero'
import { ProjectCard } from '../components/work/ProjectCard'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Slate } from '../components/ui/Slate'
import { getProjectsBySlugs, projects } from '../data/projects'
import { getServiceBySlug, services } from '../data/services'
import { site } from '../data/company'
import { NotFoundPage } from './NotFoundPage'

export function ServicePage() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <NotFoundPage />

  const index = services.findIndex((s) => s.slug === service.slug)
  const next = services[(index + 1) % services.length]
  const related = service.relatedProjects.length ? getProjectsBySlugs(service.relatedProjects) : projects.filter((p) => p.services.includes(service.slug)).slice(0, 2)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seoDescription,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'RU',
  }

  return (
    <Page theme="light" title={service.seoTitle} description={service.seoDescription} path={`/services/${service.slug}`} jsonLd={jsonLd}>
      <ServiceHero service={service} position={`${service.index} / ${String(services.length).padStart(2, '0')}`} />

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="space-y-5">
              {service.description.map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'text-display-sm leading-[1.45]' : 'prose-body'}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <h2 className="label-mono text-fg-3">Что входит</h2>
            <ul className="mt-4 border-t border-line">
              {service.includes.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-line py-3 text-sm">
                  <span className="label-mono text-signal-text">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {service.packages && service.packages.length > 0 && (
        <section className="container-x mt-20 md:mt-28" aria-label="Стоимость">
          <div className="flex items-center justify-between border-t border-line pt-3">
            <h2 className="label-mono text-fg-3">
              <span className="text-signal-text">→</span> Стоимость
            </h2>
            <ArrowLink to="/pricing" size="sm">
              Все тарифы
            </ArrowLink>
          </div>
          <div className="mt-10 grid border-t border-line md:grid-cols-3">
            {service.packages.map((pack, i) => (
              <Reveal key={pack.name} delay={i * 0.08} className={`border-b border-line py-8 md:border-b-0 md:py-10 ${i > 0 ? 'md:border-l md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}>
                <p className="label-mono text-fg-3">Тариф {String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-display-md mt-3">{pack.name}</h3>
                <p className="text-display-lg mt-4 text-signal-text">{pack.price}</p>
                <ul className="mt-6 space-y-2">
                  {pack.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm text-fg-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-fg" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="label-mono mt-4 text-fg-3">Стоимость ориентировочная: итоговый расчёт по брифу, бесплатно и в течение 24 часов.</p>
        </section>
      )}

      <section className="container-x mt-20 md:mt-28">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <h2 className="label-mono text-fg-3">
            <span className="text-signal-text">→</span> Как проходит работа
          </h2>
          <ArrowLink to="/process" size="sm">
            Весь процесс
          </ArrowLink>
        </div>
        <ol className={`mt-10 grid gap-px border border-line bg-line ${service.steps.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3'}`}>
          {service.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.08} className="bg-bg p-6 md:p-8">
              <p className="label-mono text-signal-text">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-display-sm mt-6">{step.title}</h3>
              <p className="prose-body mt-3">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-5">
            <h2 className="label-mono text-fg-3">Почему это работает</h2>
            <ul className="mt-5 space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="text-display-sm flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-signal" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Slate
              columns={service.formats ? 3 : 2}
              fields={
                service.formats
                  ? service.formats.map((format, i) => ({ label: `Формат ${String(i + 1).padStart(2, '0')}`, value: format }))
                  : [
                      { label: 'Тариф', value: service.tariff ?? 'Подберём по брифу' },
                      { label: 'Расчёт', value: 'По брифу, бесплатно' },
                    ]
              }
            />
          </Reveal>
        </div>
      </section>

      {service.audience && service.audience.length > 0 && (
        <section className="container-x mt-20 md:mt-28">
          <div className="grid-12 gap-y-8">
            <h2 className="label-mono col-span-12 text-fg-3 lg:col-span-3">
              <span className="text-signal-text">→</span> Кому подходит
            </h2>
            <ul className="col-span-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
              {service.audience.map((item) => (
                <li key={item} className="bg-bg p-4 text-sm md:p-5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faq && service.faq.length > 0 && (
        <section className="container-x mt-20 md:mt-28">
          <div className="grid-12 gap-y-8">
            <h2 className="label-mono col-span-12 text-fg-3 lg:col-span-3">
              <span className="text-signal-text">→</span> Вопросы по услуге
            </h2>
            <dl className="col-span-12 border-t border-line lg:col-span-9">
              {service.faq.map((item) => (
                <div key={item.question} className="grid gap-3 border-b border-line py-5 md:grid-cols-[1fr_2fr] md:gap-8">
                  <dt className="text-display-xs">{item.question}</dt>
                  <dd className="text-sm leading-relaxed text-fg-2">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section data-theme="dark" className="mt-24 bg-bg py-16 text-fg md:mt-32 md:py-24">
          <div className="container-x">
            <div className="flex items-center justify-between border-t border-line pt-3">
              <h2 className="label-mono text-fg-3">
                <span className="text-signal-text">→</span> Связанные работы
              </h2>
              <ArrowLink to="/work" size="sm">
                Все работы
              </ArrowLink>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
              {related.slice(0, 2).map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-16 md:py-24">
        <div className="grid-12 items-center gap-y-8 border border-line p-6 md:p-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">Заявка</p>
            <h2 className="text-display-md mt-3">Заполнив бриф, вы получите индивидуальный расчёт коммерческого предложения</h2>
            <p className="prose-body mt-3 max-w-xl">Бесплатная консультация, концепция ролика и точный расчёт стоимости и сроков. Перезвоним в течение часа.</p>
          </div>
          <div className="col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Button to="/contact" variant="signal" arrow="right">
              Заполнить бриф
            </Button>
          </div>
        </div>
      </section>

      <Link to={`/services/${next.slug}`} data-cursor="next" className="group container-x block border-t border-line py-14 md:py-20">
        <p className="label-mono text-fg-3">Следующая услуга · {next.index}</p>
        <p className="text-display-xl mt-4 flex flex-wrap items-center gap-4 transition-colors duration-500 group-hover:text-signal-text">
          {next.name}
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" strokeWidth={1} aria-hidden="true" />
        </p>
      </Link>
    </Page>
  )
}
