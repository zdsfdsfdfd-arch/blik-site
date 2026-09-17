import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Button } from '../ui/Button'
import { SmartImage } from '../ui/SmartImage'
import { SmartLink } from '../layout/SmartLink'
import { SplitLines } from '../ui/SplitLines'

const HERO_PHOTO = 'photo-1476514525535-07fb3b4ae5f1'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden bg-ink text-paper">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="h-full w-full"
          initial={reduceMotion ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE_OUT_EXPO }}
        >
          <SmartImage
            photo={HERO_PHOTO}
            alt="Бирюзовое горное озеро Брайес в Доломитовых Альпах на рассвете"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,14,20,0.86)_0%,rgba(12,14,20,0.35)_45%,rgba(12,14,20,0.25)_100%)]"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-x relative flex min-h-[100svh] flex-col justify-end pb-32 pt-32 sm:pb-36 lg:pb-40"
      >
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <motion.p
              className="eyebrow flex items-center gap-3 text-paper/80"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-display text-base font-extrabold tracking-[-0.05em] text-paper">PLAN</span>
              <span className="h-px w-8 bg-paper/40" aria-hidden="true" />
              Туристическое агентство · Весь мир
            </motion.p>

            <SplitLines
              as="h1"
              lines={['Путешествия,', 'которые хочется', 'запомнить.']}
              className="text-display-xl mt-6 max-w-5xl"
              delay={0.35}
            />

            <motion.p
              className="mt-7 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.75 }}
            >
              Откройте новые места вместе с PLAN. Подбираем путешествия по всему миру под ваш стиль,
              бюджет и мечты.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.9 }}
            >
              <Button to="/tours" variant="inverted" size="lg" arrow="right" magnetic>
                Найти путешествие
              </Button>
              <SmartLink
                to="/#destinations"
                className="link-underline inline-flex h-14 items-center justify-center px-2 font-display text-base font-semibold text-paper/90 transition-colors hover:text-paper"
              >
                Исследовать направления
              </SmartLink>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end lg:gap-8 lg:text-right"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div className="flex items-center gap-4">
              <span className="eyebrow text-paper/60">Scroll</span>
              <span className="relative h-16 w-px overflow-hidden bg-paper/25" aria-hidden="true">
                <motion.span
                  className="absolute inset-x-0 top-0 h-6 bg-sand"
                  animate={reduceMotion ? undefined : { y: ['-100%', '300%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </div>
            <div className="text-xs leading-relaxed text-paper/60">
              <p className="text-paper/85">Lago di Braies, Италия</p>
              <p className="font-mono tracking-wide">46.69° N, 12.08° E</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
