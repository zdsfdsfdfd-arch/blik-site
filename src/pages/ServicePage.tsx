import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { ServiceHero } from '../components/services/ServiceHero'
import { ProjectCard } from '../components/work/ProjectCard'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Slate } from '../components/ui/Slate'
import { getProjectsBySlugs } from '../data/projects'
import { getServiceBySlug, services } from '../data/services'
import { tariffs } from '../data/tariffs'
import { site } from '../data/company'
import { NotFoundPage } from './NotFoundPage'

export function ServicePage() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <NotFoundPage />

  const index = services.findIndex((s) => s.slug === service.slug)
  const next = services[(index + 1) % services.length]
  const related = getProjectsBySlugs(service.relatedProjects)
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
            <p className="label-mono text-fg-3">Что входит</p>
            <ul className="mt-4 border-t border-line">
              {service.includes.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-line py-3 text-sm">
                  <span className="label-mono text-signal">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <p className="label-mono text-fg-3">
            <span className="text-signal">→</span> Как проходит работа
          </p>
          <ArrowLink to="/process" size="sm">
            Весь процесс
          </ArrowLink>
        </div>
        <ol className={`mt-10 grid gap-px border border-line bg-line ${service.steps.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3'}`}>
          {service.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.08} className="bg-bg p-6 md:p-8">
              <p className="label-mono text-signal">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-display-sm mt-6">{step.title}</h3>
              <p className="prose-body mt-3">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="label-mono text-fg-3">Почему это работает</p>
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
                      { label: 'Тариф', value: tariffs.find((t) => t.bestFor.toLowerCase().includes(service.name.split(' ')[0].toLowerCase().slice(0, 5)))?.name ?? 'Стандарт' },
                      { label: 'Расчёт', value: 'По брифу, бесплатно' },
                    ]
              }
            />
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section data-theme="dark" className="mt-24 bg-bg py-16 text-fg md:mt-32 md:py-24">
          <div className="container-x">
            <div className="flex items-center justify-between border-t border-line pt-3">
              <p className="label-mono text-fg-3">
                <span className="text-signal">→</span> Связанные работы
              </p>
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
            <p className="label-mono text-signal">Заявка</p>
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
        <p className="text-display-xl mt-4 flex items-center gap-4 transition-colors duration-500 group-hover:text-signal">
          {next.name}
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" strokeWidth={1} aria-hidden="true" />
        </p>
      </Link>
    </Page>
  )
}
