import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { services } from '../../data/services'
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion'
import { ArrowLink } from '../ui/ArrowLink'
import { SectionHeader } from '../ui/SectionHeader'

/** Services as a call sheet: ruled rows, mono indices, the short line revealed on hover. */
export function ServicesIndex() {
  return (
    <section data-theme="light" className="section-y bg-bg text-fg">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Услуги"
          meta={`${services.length} форматов`}
          title={
            <>
              Полный цикл. <span className="text-fg-3">Без подрядчиков.</span>
            </>
          }
          lead="Концепция, сценарий, локации, съёмка, монтаж, графика и озвучка — 15 специалистов в штате и собственная съёмочная база на 5 млн рублей."
          action={<ArrowLink to="/services">Все услуги</ArrowLink>}
        />

        <motion.ol className="mt-14 border-t border-line" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {services.slice(0, 8).map((service) => (
            <motion.li key={service.slug} variants={staggerItem} className="border-b border-line">
              <Link
                to={`/services/${service.slug}`}
                data-cursor="view"
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-5 transition-colors duration-300 hover:bg-bg-2 md:grid-cols-[4rem_1fr_1fr_3rem] md:gap-x-8 md:py-6"
              >
                <span className="label-mono text-signal">{service.index}</span>
                <span className="text-display-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">{service.name}</span>
                <span className="col-span-3 mt-2 max-w-md text-[0.9375rem] text-fg-2 md:col-span-1 md:mt-0">{service.short}</span>
                <ArrowUpRight
                  className="hidden h-6 w-6 justify-self-end text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal md:block"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </Link>
            </motion.li>
          ))}
        </motion.ol>
        <p className="label-mono mt-6 text-fg-3">
          + ещё {services.length - 8}: {services.slice(8).map((s) => s.name.toLowerCase()).join(', ')}
        </p>
      </div>
    </section>
  )
}
