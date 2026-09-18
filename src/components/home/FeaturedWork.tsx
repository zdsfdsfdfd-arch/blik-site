import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { featuredProjects } from '../../data/projects'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ArrowLink } from '../ui/ArrowLink'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCard } from '../work/ProjectCard'

/**
 * Featured projects as a film strip. On wide screens the strip is pinned and
 * scrolls horizontally with the page; on touch and narrow screens it stacks.
 */
export function FeaturedWork() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()
  const horizontal = wide && !reduceMotion
  const items = featuredProjects.slice(0, 5)

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="Работы"
          meta={`${items.length} из ${featuredProjects.length} избранных`}
          title={
            <>
              Каждый проект — <span className="text-fg-3">история,</span> а не карточка в каталоге
            </>
          }
          lead="Презентационные, имиджевые и рекламные ролики для бизнеса: заводы, логистика, банки, IT, рестораны, галереи — более 2500 работ с 2015 года."
          action={<ArrowLink to="/work">Все работы</ArrowLink>}
        />
      </div>
      {horizontal ? <Strip items={items} /> : <Stack items={items} />}
    </section>
  )
}

function Stack({ items }: { items: typeof featuredProjects }) {
  return (
    <div className="container-x mt-12 grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
      {items.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} className={i % 2 === 1 ? 'md:mt-16' : ''} />
      ))}
    </div>
  )
}

function Strip({ items }: { items: typeof featuredProjects }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%'])
  const progressX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative mt-12" style={{ height: `${items.length * 70}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max gap-6 pl-[max(2.5rem,calc((100vw-106rem)/2+3.5rem))]">
          {items.map((project, i) => (
            <div key={project.slug} className={`w-[42vw] shrink-0 ${i % 2 === 1 ? 'mt-20' : ''}`}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
          <div className="flex w-[30vw] shrink-0 items-center">
            <ArrowLink to="/work" className="text-display-md">
              Все проекты
            </ArrowLink>
          </div>
        </motion.div>
        <div className="container-x mt-10 flex items-center gap-4">
          <span className="label-mono text-fg-3">Плёнка</span>
          <div className="relative h-px flex-1 bg-line">
            <motion.span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 bg-signal" style={{ left: progressX }} />
          </div>
          <span className="label-mono text-fg-3">{items.length} кадров</span>
        </div>
      </div>
    </div>
  )
}
