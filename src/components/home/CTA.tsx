import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', reduceMotion ? '-12%' : '12%'])

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-ink text-paper">
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y }}>
        <SmartImage
          photo="photo-1436491865332-7a61a109cc05"
          alt="Крыло самолёта над облаками на закате"
          className="h-full w-full"
          sizes="100vw"
          fallbackKeywords="airplane,sky"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      <div className="container-x relative flex min-h-[70vh] flex-col justify-center py-28 md:min-h-[80vh]">
        <Reveal>
          <p className="eyebrow text-paper/70">Начать планирование</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-xl mt-6 max-w-4xl">
            Следующее путешествие <span className="serif-accent text-sand">начинается здесь.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-lg text-paper/80">
            Расскажите, куда хотите отправиться — PLAN поможет превратить идею в маршрут.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10">
            <Button to="/booking" variant="inverted" size="lg" arrow="right" magnetic>
              Спланировать путешествие
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
