import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Page } from '../components/layout/Page'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { services } from '../data/services'
import { fullCycle } from '../data/process'
import { staggerContainer, staggerItem, viewportOnce } from '../lib/motion'

export function ServicesPage() {
  return (
    <Page theme="light" title="Услуги" description="Услуги продакшн-студии полного цикла Видеопродакшн.РФ: рекламные, презентационные и имиджевые ролики, видео для выставок и маркетплейсов, аэросъёмка, интервью, HR-видео, документальные фильмы." path="/services">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal">02 · Услуги</p>
            <SplitLines as="h1" lines={['Что мы', 'снимаем']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="lead">Продакшн полного цикла: видеореклама, презентационные, имиджевые и обучающие видео, съёмка мероприятий, аэросъёмка, графика — под ключ.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {fullCycle.map((step) => (
                <li key={step} className="label-mono border border-line px-2.5 py-1.5 text-fg-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x pb-24 pt-16 md:pt-24">
        <motion.ol className="grid border-t border-l border-line md:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {services.map((service) => (
            <motion.li key={service.slug} variants={staggerItem} className="border-b border-r border-line">
              <Link to={`/services/${service.slug}`} data-cursor="view" className="group flex h-full flex-col justify-between gap-10 p-5 transition-colors duration-300 hover:bg-bg-2 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="label-mono text-signal">{service.index}</span>
                  <ArrowUpRight className="h-5 w-5 text-fg-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-display-md">{service.name}</h2>
                  <p className="prose-body mt-3 max-w-md">{service.short}</p>
                  {service.formats && (
                    <p className="label-mono mt-5 text-fg-3">{service.formats.join(' · ')}</p>
                  )}
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ol>
        <Reveal className="mt-10">
          <p className="prose-body max-w-2xl">
            Не нашли свой формат? Студия рассматривает любые запросы — от анимированного логотипа до документального фильма. Оставьте заявку, и мы предложим решение.
          </p>
        </Reveal>
      </section>
    </Page>
  )
}
