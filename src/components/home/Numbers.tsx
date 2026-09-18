import { company } from '../../data/company'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { SplitLines } from '../ui/SplitLines'

/** Key figures in a ruled slate, under the studio's positioning statement. */
export function Numbers() {
  return (
    <section data-theme="light" className="section-y bg-bg text-fg">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">04 · Студия</p>
            <SplitLines
              as="h2"
              inView
              lines={['Влюбляем', 'в вашу компанию,', 'повышаем узнаваемость']}
              className="text-display-xl mt-6"
            />
          </div>
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="prose-body max-w-sm">
              Продакшн-студия полного цикла работает в сфере видеосъёмок для бизнеса с {company.founded} года — в Москве, Казани, Санкт-Петербурге и по всей России, гарантируя каждому заказчику индивидуальный подход.
            </p>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-3">
          {company.numbers.map((item, i) => (
            <Reveal key={item.label} as="div" delay={i * 0.05} className="border-b border-r border-line p-5 md:p-6">
              <dt className="label-mono text-fg-3">{item.label}</dt>
              <dd className="text-display-lg mt-8 md:mt-12">
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
              <dd className="mt-2 text-sm text-fg-2">{item.note}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
