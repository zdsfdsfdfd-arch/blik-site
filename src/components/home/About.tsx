import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { company } from '../../data/company'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBack = useTransform(scrollYProgress, [0, 1], [40, reduceMotion ? 40 : -40])
  const yFront = useTransform(scrollYProgress, [0, 1], [80, reduceMotion ? 80 : -60])

  return (
    <section id="about" ref={ref} className="section-y scroll-mt-20 overflow-hidden">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="font-display text-ocean">02</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />О PLAN
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display-md mt-5">
              Мы — небольшая команда, которая делает путешествия{' '}
              <span className="serif-accent text-ocean">под человека</span>, а не под каталог.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-6">
              С {company.founded} года PLAN собирает маршруты вручную: от выходных в Париже до
              экспедиций в Исландию. Мы знаем отели, в которых жили сами, и гидов, с которыми
              ездили.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="eyebrow text-muted">Основано</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tracking-tight">{company.founded}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Офис</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tracking-tight">Москва</dd>
              </div>
            </dl>
            <ArrowLink to="/about" className="mt-8">
              Узнать больше о команде
            </ArrowLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-12 items-start gap-4">
            <motion.div style={{ y: yBack }} className="col-span-8 col-start-5">
              <Reveal>
                <SmartImage
                  photo="photo-1530521954074-e64f6810b32d"
                  alt="Путешественница в шляпе смотрит на море с побережья"
                  className="aspect-[4/5]"
                  sizes="(min-width: 1024px) 40vw, 66vw"
                  fallbackLabel="Побережье"
                />
              </Reveal>
            </motion.div>
            <motion.div style={{ y: yFront }} className="col-span-6 col-start-1 -mt-24 lg:-mt-32">
              <Reveal delay={0.15}>
                <SmartImage
                  photo="photo-1488646953014-85cb44e25828"
                  alt="Карта, фотоаппарат и блокнот — планирование маршрута"
                  className="aspect-square shadow-soft"
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  fallbackLabel="Планирование"
                />
              </Reveal>
            </motion.div>
          </div>
          <p className="mt-6 text-xs text-muted lg:absolute lg:-bottom-8 lg:right-0">
            Каждый маршрут проходит проверку командой лично
          </p>
        </div>
      </div>
    </section>
  )
}
