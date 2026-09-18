import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { faq } from '../data/faq'
import { tariffIntro, tariffPromise, tariffs } from '../data/tariffs'

const allItems = Array.from(new Set(tariffs.flatMap((t) => t.includes)))

export function PricingPage() {
  const pricingFaq = faq.filter((item) => /стоит|сроки|правки|исходники/i.test(item.question))
  return (
    <Page theme="light" title="Тарифы" description="Тарифы «Старт», «Стандарт» и «Комбо» продакшн-студии Видеопродакшн.РФ: прозрачный расчёт «всё включено», где цена зависит от ключевых параметров проекта." path="/pricing">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal">03 · Тарифы</p>
            <SplitLines as="h1" lines={['Прозрачный', 'расчёт']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">{tariffIntro}</p>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-24">
        <div className="grid border-t border-line md:grid-cols-3">
          {tariffs.map((tariff, i) => (
            <Reveal key={tariff.slug} delay={i * 0.08} as="article" className={`border-b border-line py-8 md:border-b-0 md:py-10 ${i > 0 ? 'md:border-l md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}>
              <div id={tariff.slug} className="scroll-mt-28">
                <p className="label-mono text-fg-3">Тариф {String(i + 1).padStart(2, '0')}</p>
                <h2 className="text-display-lg mt-4">{tariff.name}</h2>
                <p className="prose-body mt-4 min-h-[3.2em]">{tariff.tagline}</p>
                <p className="label-mono mt-8 text-signal">{tariff.priceNote}</p>
                <p className="label-mono mt-8 text-fg-3">Для чего</p>
                <p className="mt-2 text-sm text-fg-2">{tariff.bestFor}</p>
                <p className="label-mono mt-8 text-fg-3">Что входит</p>
                <ul className="mt-2 space-y-2">
                  {tariff.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-fg" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <p className="label-mono text-fg-3">Сравнение</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line">
                <th scope="col" className="label-mono py-3 pr-4 text-left font-medium text-fg-3">
                  Этап
                </th>
                {tariffs.map((tariff) => (
                  <th key={tariff.slug} scope="col" className="label-mono py-3 pr-4 text-left font-medium">
                    {tariff.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allItems.map((item) => (
                <tr key={item} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-fg-2">
                    {item}
                  </th>
                  {tariffs.map((tariff) => {
                    const included = tariff.includes.includes(item) || (tariff.slug === 'combo' && !item.startsWith('Всё из'))
                    const extended = tariff.slug === 'start' && item.startsWith('Расширенный')
                    return (
                      <td key={tariff.slug} className="py-3 pr-4">
                        {included ? <span className={`inline-block h-2.5 w-2.5 ${extended ? 'bg-fg-3' : 'bg-signal'}`} aria-label="входит" /> : <span className="text-fg-3">—</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="label-mono mt-4 text-fg-3">■ входит · ■ в расширенном варианте · — не входит. Итоговая стоимость рассчитывается индивидуально.</p>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className="label-mono text-fg-3">Частые вопросы</p>
            <h2 className="text-display-md mt-4">О деньгах и сроках</h2>
          </div>
          <dl className="col-span-12 border-t border-line lg:col-span-8">
            {pricingFaq.map((item) => (
              <div key={item.question} className="grid gap-3 border-b border-line py-6 md:grid-cols-[1fr_2fr] md:gap-8">
                <dt className="text-display-sm">{item.question}</dt>
                <dd className="prose-body">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-6 border border-line p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="label-mono text-signal">Бриф</p>
            <p className="text-display-md mt-3 max-w-2xl">{tariffPromise}</p>
          </div>
          <Button to="/contact" variant="solid" size="lg" arrow="right">
            Заполнить бриф
          </Button>
        </div>
      </section>
    </Page>
  )
}
