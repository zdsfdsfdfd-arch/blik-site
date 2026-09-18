import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { fullCycle, processStages } from '../../data/process'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

/** The production pipeline as a timeline with a playhead driven by scroll. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const height = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Как мы работаем"
          meta="Заявка → сдача"
          title={
            <>
              От брифа до мастер-копии — <span className="text-fg-3">пять стадий</span>
            </>
          }
          lead="Быстрая заявка с обратным звонком в течение часа или подробный бриф. Дальше — бесплатная консультация, концепция и точный расчёт стоимости и сроков."
          action={<ArrowLink to="/process">Подробнее о процессе</ArrowLink>}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <p className="label-mono text-fg-3">Полный цикл</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {fullCycle.map((step, i) => (
                  <li key={step} className="label-mono-lg border border-line px-3 py-2 text-fg-2">
                    <span className="mr-2 text-signal-text">{(i + 1).toString().padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <p className="prose-body mt-8 max-w-sm">
                Всё внутри студии: 15 специалистов и собственное оборудование позволяют работать без сторонних подрядчиков и держать контроль над качеством.
              </p>
            </Reveal>
          </div>

          <ol ref={ref} className="relative lg:col-span-8">
            <div aria-hidden="true" className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-line md:left-[2.4rem]">
              <motion.span className="absolute left-0 top-0 w-px bg-signal" style={{ height }} />
            </div>
            {processStages.map((stage) => (
              <li key={stage.index} className="relative grid grid-cols-[2.25rem_1fr] gap-x-6 pb-12 md:grid-cols-[4.8rem_1fr] md:pb-14">
                <div className="relative">
                  <span className="label-mono absolute -left-1 top-1 hidden bg-bg py-1 pr-2 text-fg-3 md:block">{stage.code}</span>
                  <span className="absolute left-[0.9rem] top-1.5 h-2 w-2 bg-bg ring-1 ring-fg md:left-[2.15rem]" />
                </div>
                <Reveal>
                  <p className="label-mono text-signal-text">{stage.index}</p>
                  <h3 className="text-display-md mt-2">{stage.title}</h3>
                  <p className="prose-body mt-3 max-w-lg">{stage.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-fg-2">
                        <span className="h-1 w-1 bg-fg-3" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
