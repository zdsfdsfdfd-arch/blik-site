import { motion, useReducedMotion } from 'motion/react'
import type { Service } from '../../types'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Button } from '../ui/Button'
import { SplitLines } from '../ui/SplitLines'

interface ServiceHeroProps {
  service: Service
  position: string
}

/** Light service opener: index and running position on a rule, the name as a spec-sheet headline. */
export function ServiceHero({ service, position }: ServiceHeroProps) {
  const reduceMotion = useReducedMotion()
  return (
    <header className="container-x pt-28 md:pt-36">
      <div className="flex items-center justify-between border-t border-line pt-3">
        <p className="label-mono flex items-center gap-3 text-fg-3">
          <span className="text-signal-text">{service.index}</span> Услуга
        </p>
        <p className="label-mono text-fg-3">{position}</p>
      </div>
      <div className="grid-12 mt-10 items-end gap-y-8 md:mt-14">
        <div className="col-span-12 lg:col-span-8">
          <SplitLines as="h1" lines={service.name.split(' и ').length > 1 ? service.name.split(' и ').map((part, i) => (i === 0 ? `${part} и` : part)) : [service.name]} className="text-display-2xl" delay={0.2} />
        </div>
        <motion.div
          className="col-span-12 lg:col-span-4"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 }}
        >
          <p className="lead">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" variant="solid" arrow="right">
              Получить расчёт
            </Button>
            <Button to="/pricing" variant="outline">
              Тарифы
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
