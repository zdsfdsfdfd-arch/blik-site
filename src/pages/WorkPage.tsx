import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Page } from '../components/layout/Page'
import { ProjectCard } from '../components/work/ProjectCard'
import { WorkFilters } from '../components/work/WorkFilters'
import { Button } from '../components/ui/Button'
import { SplitLines } from '../components/ui/SplitLines'
import { categoriesInUse, categoryLabels, projects } from '../data/projects'
import type { ProjectCategory } from '../types/index.ts'

const PAGE = 18
const spans = ['lg:col-span-7', 'lg:col-span-5 lg:mt-24', 'lg:col-span-5', 'lg:col-span-7 lg:mt-16', 'lg:col-span-4', 'lg:col-span-4 lg:mt-12', 'lg:col-span-4']

export function WorkPage() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type') as ProjectCategory | null
  const active: ProjectCategory | 'all' = type && type in categoryLabels ? type : 'all'
  const [limits, setLimits] = useState<Record<string, number>>({})
  const limit = limits[active] ?? PAGE
  const visible = useMemo(() => (active === 'all' ? projects : projects.filter((p) => p.category === active)), [active])
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length }
    for (const project of projects) result[project.category] = (result[project.category] ?? 0) + 1
    return result
  }, [])

  const title = active === 'all' ? 'Работы' : `${categoryLabels[active]} — работы`
  const shown = visible.slice(0, limit)

  return (
    <Page title={title} description="Портфолио студии Видеопродакшн.РФ: более 140 роликов для бизнеса — рекламные, презентационные и имиджевые видео, мероприятия, графика, обзоры для маркетплейсов." path="/work">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">01 · Портфолио</p>
            <SplitLines as="h1" lines={['Работы', 'для бизнеса']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">
            {projects.length} роликов из портфолио студии: заводы и логистика, банки и IT, университеты и рестораны, мероприятия и маркетплейсы. Каждый — с видео.
          </p>
        </div>
        <div className="mt-12 border-t border-line pt-5">
          <WorkFilters categories={categoriesInUse} active={active} counts={counts} onChange={(value) => setParams(value === 'all' ? {} : { type: value }, { replace: true })} />
        </div>
      </section>

      <section className="container-x pb-24 pt-12 md:pt-16" aria-live="polite">
        <div key={active} className="grid-12 gap-y-12 md:gap-y-16">
          {shown.map((project, i) => (
            <div key={project.slug} className={`col-span-12 md:col-span-6 ${spans[i % spans.length]}`}>
              <ProjectCard project={project} index={i} headingLevel="h2" aspect="aspect-video" />
            </div>
          ))}
        </div>
        {visible.length === 0 && <p className="prose-body">В этой категории пока нет опубликованных кейсов.</p>}
        {shown.length < visible.length && (
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-line pt-8">
            <p className="label-mono text-fg-3">
              Показано {shown.length} из {visible.length}
            </p>
            <Button variant="outline" size="lg" onClick={() => setLimits((prev) => ({ ...prev, [active]: limit + PAGE }))}>
              Показать ещё
            </Button>
          </div>
        )}
      </section>
    </Page>
  )
}
