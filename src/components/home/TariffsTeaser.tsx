import { Link } from 'react-router-dom'
import { tariffIntro, tariffs } from '../../data/tariffs'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

/** Three reference tariffs as a rate card — ruled columns, no cards. */
export function TariffsTeaser() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Тарифы"
          meta="Всё включено"
          title={
            <>
              Прозрачный расчёт <span className="text-fg-3">вместо смет с десятками скрытых пунктов</span>
            </>
          }
          lead={tariffIntro}
          action={<ArrowLink to="/pricing">Сравнить тарифы</ArrowLink>}
        />
        <div className="mt-14 grid border-t border-line md:grid-cols-3">
          {tariffs.map((tariff, i) => (
            <Reveal key={tariff.slug} delay={i * 0.08} className={`border-b border-line py-8 md:border-b-0 md:py-10 ${i > 0 ? 'md:border-l md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}>
              <Link to={`/pricing#${tariff.slug}`} className="group block">
                <p className="label-mono text-fg-3">Тариф {(i + 1).toString().padStart(2, '0')}</p>
                <h3 className="text-display-lg mt-4 transition-colors group-hover:text-signal">{tariff.name}</h3>
                <p className="prose-body mt-4 min-h-[3.2em]">{tariff.tagline}</p>
                <p className="label-mono mt-8 text-fg-3">Для чего</p>
                <p className="mt-2 text-sm text-fg-2">{tariff.bestFor}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
