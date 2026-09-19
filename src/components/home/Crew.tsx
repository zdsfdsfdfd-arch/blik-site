import { useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { crew, crewWord } from '../../data/crew'
import { site } from '../../data/company'
import { withBase } from '../../lib/base'
import { revealTransition, viewportOnce } from '../../lib/motion'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SplitLines } from '../ui/SplitLines'

interface CrewProps {
  /** Section index shown in the mono label, e.g. "05". */
  index?: string
}

/**
 * Sizes the word so it spans exactly the width of its parent and publishes that
 * size as `--word` for the figures to scale from. Re-runs on resize and once the
 * display font has loaded.
 */
function useFitWord(ref: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current
    const box = el?.parentElement
    if (!el || !box) return

    const fit = () => {
      el.style.fontSize = '100px'
      const natural = el.scrollWidth
      if (!natural) return
      const size = Math.floor((100 * box.clientWidth) / natural)
      el.style.fontSize = `${size}px`
      box.style.setProperty('--word', `${size}px`)
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(box)
    const fonts = document.fonts
    fonts?.ready.then(fit).catch(() => undefined)
    fonts?.addEventListener('loadingdone', fit)
    return () => {
      observer.disconnect()
      fonts?.removeEventListener('loadingdone', fit)
    }
  }, [ref])
}

/**
 * The studio's group portrait, rebuilt: one production-scale word behind eight
 * real cut-outs of the crew with their gear, a running «команда» strip and a
 * name row that doubles as the call sheet. Hovering a person or a name links
 * the two.
 */
export function Crew({ index }: CrewProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  useFitWord(wordRef)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  const strip = [0, 1, 2, 3].flatMap((i) => [
    <span key={`site-${i}`} className="label-mono-lg">{site.name}</span>,
    <span key={`crew-${i}`} className="label-mono-lg text-fg-3">Команда</span>,
  ])

  return (
    <section ref={sectionRef} data-theme="dark" className="section-y overflow-hidden bg-bg text-fg" aria-label="Команда студии">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono text-signal-text">{index ? `${index} · ` : ''}Команда</p>
            <SplitLines as="h2" inView lines={['Своя команда', 'полного цикла']} className="text-display-xl mt-6" />
          </div>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="prose-body max-w-sm">
              Режиссёр, операторы, пилот дрона, художник по свету, звукорежиссёр, гримёр и режиссёр монтажа — в штате студии, а не на субподряде. Съёмку любой сложности собираем из своих людей и своего оборудования.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-14 md:mt-20">
        <div className="relative">
          <motion.div
            ref={wordRef}
            aria-hidden="true"
            className="crew-word absolute left-0 top-0 select-none"
            style={reduceMotion ? undefined : { x: drift }}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ ...revealTransition, duration: 1.2 }}
          >
            {crewWord}
          </motion.div>

          <ul className="crew-figures relative grid grid-cols-4 items-end border-b border-line md:grid-cols-8" aria-label="Съёмочная команда студии">
            {crew.map((member, i) => {
              const lifted = active === member.slug
              const photo = withBase(member.photo)
              return (
                <motion.li
                  key={member.slug}
                  className="relative flex justify-center"
                  style={{ zIndex: 10 - Math.round(Math.abs(i - (crew.length - 1) / 2)) }}
                  initial={reduceMotion ? false : { opacity: 0, y: 72 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...revealTransition, delay: 0.1 + i * 0.07 }}
                  onMouseEnter={() => setActive(member.slug)}
                  onMouseLeave={() => setActive((current) => (current === member.slug ? null : current))}
                >
                  <motion.img
                    src={`${photo}-800.webp`}
                    srcSet={`${photo}-400.webp 400w, ${photo}-800.webp 800w`}
                    sizes="(min-width: 768px) 14vw, 30vw"
                    alt={`${member.name}, ${member.role.toLowerCase()} — ${member.holding}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="block w-auto max-w-none select-none"
                    style={{ height: 'var(--figure)' }}
                    animate={reduceMotion ? undefined : { y: lifted ? -14 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>

      <Marquee items={strip} speed={30} className="border-b border-line py-3 motion-reduce:hidden" />

      <div className="container-x">
        <ol className="grid grid-cols-2 border-l border-line sm:grid-cols-4 xl:grid-cols-8">
          {crew.map((member, i) => {
            const lifted = active === member.slug
            return (
              <li
                key={member.slug}
                className={`min-w-0 border-b border-r border-line px-3 py-4 transition-colors duration-300 md:px-4 ${lifted ? 'bg-bg-2' : ''}`}
                onMouseEnter={() => setActive(member.slug)}
                onMouseLeave={() => setActive((current) => (current === member.slug ? null : current))}
              >
                <p className={`label-mono transition-colors duration-300 ${lifted ? 'text-signal-text' : 'text-fg-3'}`}>{String(i + 1).padStart(2, '0')}</p>
                <p className="text-display-xs mt-3">{member.name}</p>
                <p className="mt-1 text-xs leading-snug text-fg-2 xl:text-sm">{member.role}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
