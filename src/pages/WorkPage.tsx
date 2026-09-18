import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Page } from '../components/layout/Page'
import { ProjectCard } from '../components/work/ProjectCard'
import { WorkFilters } from '../components/work/WorkFilters'
import { SplitLines } from '../components/ui/SplitLines'
import { categoriesInUse, categoryLabels, projects } from '../data/projects'
import type { ProjectCategory } from '../types'

const spans = ['lg:col-span-7', 'lg:col-span-5 lg:mt-24', 'lg:col-span-5', 'lg:col-span-7 lg:mt-16']

export function WorkPage() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type') as ProjectCategory | null
  const active: ProjectCategory | 'all' = type && type in categoryLabels ? type : 'all'
  const visible = useMemo(() => (active === 'all' ? projects : projects.filter((p) => p.category === active)), [active])
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length }
    for (const project of projects) result[project.category] = (result[project.category] ?? 0) + 1
    return result
  }, [])

  const title = active === 'all' ? 'Работы' : `${categoryLabels[active]} — работы`

  return (
    <Page title={title} description="Портфолио студии Видеопродакшн.РФ: рекламные, имиджевые и презентационные ролики для бизнеса — заводы, логистика, университеты, агрокомпании." path="/work">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal">01 · Портфолио</p>
            <SplitLines as="h1" lines={['Работы', 'для бизнеса']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">
            Более 2500 роликов с 2015 года: видеопрезентации компаний, видео о продукции, имиджевые и продающие ролики. Здесь — кейсы, о которых можно рассказать.
          </p>
        </div>
        <div className="mt-12 border-t border-line pt-5">
          <WorkFilters categories={categoriesInUse} active={active} counts={counts} onChange={(value) => setParams(value === 'all' ? {} : { type: value }, { replace: true })} />
        </div>
      </section>

      <section className="container-x pb-24 pt-12 md:pt-16" aria-live="polite">
        <AnimatePresence mode="popLayout">
          <motion.div key={active} className="grid-12 gap-y-12 md:gap-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {visible.map((project, i) => (
              <div key={project.slug} className={`col-span-12 ${spans[i % spans.length]}`}>
                <ProjectCard project={project} index={i} aspect={i % 4 === 0 || i % 4 === 3 ? 'aspect-[16/9]' : 'aspect-[4/3]'} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {visible.length === 0 && <p className="prose-body">В этой категории пока нет опубликованных кейсов.</p>}
      </section>
    </Page>
  )
}
