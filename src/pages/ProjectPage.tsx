import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { ProjectCard } from '../components/work/ProjectCard'
import { ProjectGallery } from '../components/work/ProjectGallery'
import { ProjectHero } from '../components/work/ProjectHero'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { getProjectBySlug, nextProject, projects } from '../data/projects'
import { services } from '../data/services'
import { site } from '../data/company'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)
  if (!project) return <NotFoundPage />

  const next = nextProject(project.slug)
  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 2)
  const usedServices = services.filter((s) => project.services.includes(s.slug))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': project.video ? 'VideoObject' : 'CreativeWork',
    name: project.title,
    description: project.summary,
    ...(project.video ? { embedUrl: project.video.url, thumbnailUrl: project.poster.src || undefined } : {}),
    producer: { '@type': 'Organization', name: site.name, url: site.url },
  }

  return (
    <Page title={project.title} description={project.seoDescription ?? project.summary} path={`/work/${project.slug}`} type={project.video ? 'video.other' : 'article'} jsonLd={jsonLd}>
      <ProjectHero project={project} />

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-12">
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="label-mono text-fg-3">Услуги в проекте</p>
              <ul className="mt-4 space-y-2">
                {usedServices.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className="link-underline text-sm text-fg-2 hover:text-fg">
                      <span className="label-mono mr-2 text-signal-text">{service.index}</span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {project.sourceUrl && (
                <p className="label-mono mt-8 text-fg-3">
                  Источник:{' '}
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="link-underline text-fg-2">
                    портфолио студии
                  </a>
                </p>
              )}
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            {project.sections.map((section, i) => (
              <Reveal key={section.heading} as="section" className="border-t border-line py-10 first:border-t-0 first:pt-0 md:py-12">
                <div className="grid gap-4 md:grid-cols-[8rem_1fr] md:gap-8">
                  <h2 className="label-mono text-signal-text">
                    {String(i + 1).padStart(2, '0')} · {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph, j) => (
                      <p key={j} className={j === 0 ? 'text-display-sm leading-[1.4]' : 'prose-body'}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.gallery && <ProjectGallery images={project.gallery} />}

      <section data-theme="light" className="mt-24 bg-bg py-16 text-fg md:mt-32 md:py-24">
        <div className="container-x">
          <div className="flex items-center justify-between border-t border-line pt-3">
            <h2 className="label-mono text-fg-3">
              <span className="text-signal-text">→</span> Похожие работы
            </h2>
            <ArrowLink to="/work" size="sm">
              Все работы
            </ArrowLink>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
            {(related.length ? related : projects.filter((p) => p.slug !== project.slug).slice(0, 2)).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="prose-body max-w-md">Хотите похожий ролик? Заполните бриф — вернёмся с концепцией и точным расчётом.</p>
            <Button to="/contact" variant="solid" arrow="right">
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} data-cursor="next" className="group container-x block border-t border-line py-14 md:py-20">
        <p className="label-mono text-fg-3">Следующий проект</p>
        <p className="text-display-xl mt-4 flex flex-wrap items-center gap-4 transition-colors duration-500 group-hover:text-signal-text">
          {next.title}
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" strokeWidth={1} aria-hidden="true" />
        </p>
        <p className="label-mono mt-3 text-fg-3">{next.format}</p>
      </Link>
    </Page>
  )
}
