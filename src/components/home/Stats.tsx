import { useRef } from 'react'
import { useInView } from 'motion/react'
import { stats } from '../../data/stats'
import { useCountUp } from '../../hooks/useCountUp'
import { formatNumber } from '../../lib/format'
import type { Stat } from '../../types'
import { Reveal } from '../ui/Reveal'

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const value = useCountUp(stat.value, active)
  return (
    <Reveal as="li" delay={index * 0.08} className="border-t border-paper/15 pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0 first:md:border-l-0 first:md:pl-0">
      <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-paper sm:text-6xl xl:text-7xl">
        {formatNumber(value, stat.decimals ?? 0)}
        <span className="text-sand">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm text-paper/60">{stat.label}</p>
    </Reveal>
  )
}

export function Stats() {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <section className="bg-ink py-20 md:py-28" aria-label="PLAN в цифрах">
      <div className="container-x">
        <ul ref={ref} className="grid gap-8 md:grid-cols-4 md:gap-0">
          {stats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} active={inView} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
