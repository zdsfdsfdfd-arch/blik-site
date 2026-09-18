import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { company } from '../../data/company'
import { featuredProjects } from '../../data/projects'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Button } from '../ui/Button'
import { SplitLines } from '../ui/SplitLines'
import { VideoFrame } from '../ui/VideoFrame'

const showreel = featuredProjects[0]

/**
 * Opening frame: oversized statement typography over a viewfinder grid, with the
 * featured project's frame anchored bottom-right so the two overlap on desktop.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-12%'])
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '10%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="dots relative isolate overflow-hidden bg-bg pt-24 md:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-20 bottom-4 border border-line-2 md:inset-x-8 md:top-24" />
      <div aria-hidden="true" className="corners pointer-events-none absolute inset-x-4 top-20 bottom-4 text-fg-3 md:inset-x-8 md:top-24" style={{ '--corner-size': '18px' } as React.CSSProperties} />

      <div className="container-x relative flex min-h-[calc(100svh-6rem)] flex-col justify-between pb-6 pt-8 md:pb-10 md:pt-12">
        <motion.div style={{ opacity: fade }} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <motion.p
            className="label-mono flex items-center gap-3 text-fg-2"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="rec-dot inline-block h-2 w-2 bg-signal" />
            REC · {company.tagline}
          </motion.p>
          <motion.p
            className="label-mono text-fg-3"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {company.cities.join(' · ')} · с {company.founded}
          </motion.p>
        </motion.div>

        <motion.div style={{ y: typeY }} className="relative z-10 mt-10 md:mt-16">
          <SplitLines
            as="h1"
            lines={['Профессиональная', 'видеосъёмка', 'для бизнеса']}
            className="text-display-2xl"
            lineClassName="[&:nth-child(2)]:text-signal"
            delay={0.25}
          />
        </motion.div>

        <div className="grid-12 relative mt-12 items-end gap-y-10 md:mt-16">
          <motion.div
            className="col-span-12 md:col-span-5 lg:col-span-4"
            style={{ opacity: fade }}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.75 }}
          >
            <p className="lead max-w-sm">
              {company.slogan} Продакшн-студия полного цикла: от концепции и сценария до монтажа, графики и озвучки — без сторонних подрядчиков.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="signal" size="lg" arrow="right" magnetic>
                Обсудить проект
              </Button>
              <Button to="/work" variant="outline" size="lg" arrow="up-right">
                Смотреть работы
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6"
            style={{ y: frameY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.55 }}
          >
            <div className="flex items-center justify-between pb-3">
              <p className="label-mono text-fg-3">Showreel · {showreel.title}</p>
              <p className="label-mono text-fg-3">{showreel.format}</p>
            </div>
            <VideoFrame video={showreel.video} poster={showreel.poster} title={showreel.title} priority caption={`A001_C001 · ${showreel.city ?? 'Россия'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
