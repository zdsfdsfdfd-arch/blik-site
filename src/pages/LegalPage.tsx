import { getLegalDocument } from '../data/legal'
import { formatDate } from '../lib/format'
import { Page } from '../components/layout/Page'
import { Reveal } from '../components/ui/Reveal'
import { NotFoundPage } from './NotFoundPage'

interface LegalPageProps {
  slug: 'terms' | 'privacy'
}

export function LegalPage({ slug }: LegalPageProps) {
  const doc = getLegalDocument(slug)
  if (!doc) return <NotFoundPage />

  return (
    <Page title={doc.title} description={doc.intro} className="pt-28 md:pt-40">
      <article className="container-x pb-24 md:pb-32">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-muted">Обновлено {formatDate(doc.updated)}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-lg mt-5">{doc.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-6">{doc.intro}</p>
          </Reveal>
          <div className="mt-14 space-y-12">
            {doc.sections.map((section) => (
              <Reveal key={section.title}>
                <section>
                  <h2 className="text-display-sm">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-ink-2">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </Page>
  )
}
