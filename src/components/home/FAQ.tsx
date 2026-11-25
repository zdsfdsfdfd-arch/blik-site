import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import { company } from '../../data/company'
import { faq } from '../../data/faq'
import { EASE_OUT_EXPO } from '../../lib/motion'
import type { FaqItem } from '../../types'
import { Reveal } from '../ui/Reveal'

interface AccordionItemProps {
  item: FaqItem
  index: number
  open: boolean
  onToggle: () => void
}

function AccordionItem({ item, index, open, onToggle }: AccordionItemProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `${item.id}-panel`
  const buttonId = `${item.id}-button`

  return (
    <li className="border-t border-line last:border-b">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-5 py-6 text-left transition-colors duration-300 hover:text-ocean md:py-7"
        >
          <span className="hidden font-display text-sm font-semibold text-muted sm:block">
            0{index + 1}
          </span>
          <span className="text-display-sm flex-1">{item.question}</span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out ${
              open ? 'rotate-45 border-ocean bg-ocean text-paper' : 'border-line text-ink group-hover:border-ocean'
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-ink-2 sm:pl-[calc(1.25rem+1.75rem)]">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null)

  return (
    <section id="faq" className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-muted">
                <span className="font-display text-ocean">08</span>
                <span className="h-px w-8 bg-line" aria-hidden="true" />
                FAQ
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-display-md mt-5">
                Вопросы, которые <span className="serif-accent text-ocean">задают чаще всего</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-ink-2">
                Не нашли ответ? Напишите нам на{' '}
                <a href={`mailto:${company.email}`} className="link-underline font-medium text-ink">
                  {company.email}
                </a>{' '}
                — отвечаем в течение часа в рабочее время.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-8" delay={0.1}>
          <ul>
            {faq.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={index}
                open={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
