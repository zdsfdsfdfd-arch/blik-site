import { Page } from '../components/layout/Page'
import { Counter } from '../components/ui/Counter'
import { Button } from '../components/ui/Button'
import { Marquee } from '../components/ui/Marquee'
import { SmartImage } from '../components/ui/SmartImage'
import { Reveal } from '../components/ui/Reveal'
import { Slate } from '../components/ui/Slate'
import { SplitLines } from '../components/ui/SplitLines'
import { clients } from '../data/clients'
import { company, site } from '../data/company'
import { fullCycle } from '../data/process'

const principles = company.strengths

const timeline = [
  { year: '2015', text: 'Команда начинает снимать видео для бизнеса в Казани под именем VIDEOKZN.' },
  { year: '2018', text: 'Постоянные клиенты — сотрудничество, которое в отзывах отмечают как многолетнее и надёжное.' },
  { year: 'Сегодня', text: 'Ребрендинг в Видеопродакшн.РФ: сайт переименован, чтобы его было проще найти и узнать об опыте создания видео для сотен компаний.' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'О студии',
  url: `${site.url}/about`,
  mainEntity: { '@type': 'Organization', name: site.name, foundingDate: String(company.founded), numberOfEmployees: 15, url: site.url },
}

export function AboutPage() {
  return (
    <Page theme="light" title="О студии" description="Видеопродакшн.РФ — видеопроизводство полного цикла с 2015 года: 15 специалистов, собственная съёмочная база, более 2500 работ для 600+ клиентов в 25 городах России." path="/about" jsonLd={jsonLd}>
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">04 · Студия</p>
            <SplitLines as="h1" lines={['Видеопроизводство', 'полного цикла']} className="text-display-xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">
            Продакшн-студия полного цикла работает в сфере видеосъёмок для бизнеса с {company.founded} года — в Москве, Казани, Санкт-Петербурге и по всей России.
          </p>
        </div>
      </section>

      <Marquee
        className="mt-16 border-y border-line py-4 motion-reduce:hidden"
        speed={30}
        items={[...company.cities, ...company.extraCities, 'и ещё 20+ городов'].map((city) => (
          <span key={city} className="label-mono-lg text-fg-2">
            {city}
          </span>
        ))}
      />

      <section className="container-x mt-16 md:mt-24">
        <div className="grid-12 items-center gap-y-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="relative">
              <SmartImage sources={[company.founder.photo]} alt={`${company.founder.name} — ${company.founder.role}`} className="aspect-square" sizes="(min-width: 1024px) 40vw, 100vw" imgClassName="object-contain" priority />
              <div aria-hidden="true" className="corners corners-lg pointer-events-none absolute inset-2 text-fg-3" />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
              <p className="text-display-sm">{company.founder.name}</p>
              <p className="label-mono text-fg-3">{company.founder.role}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="text-display-md leading-[1.25]">{company.statement}</p>
            <p className="prose-body mt-6">
              В студии работают только высококвалифицированные специалисты — сценаристы, операторы, монтажёры и другие мастера своего дела. Это позволяет гарантировать качественный результат на любой задаче: от создания анимированного логотипа до съёмки имиджевых и презентационных видео, мастер-классов, лекций и мероприятий.
            </p>
            <p className="prose-body mt-4">
              Мы берём на себя полный цикл производства — {fullCycle.map((s) => s.toLowerCase()).join(', ')} — и гарантируем каждому заказчику индивидуальный подход.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {company.gear.map((item) => (
                <li key={item} className="label-mono border border-line px-2.5 py-1.5 text-fg-2">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="text-display-md leading-[1.25]">
              С {company.founded} года команда создала тысячи вдохновляющих видео, которые привлекают внимание и укрепляют связь с аудиторией. Наши видео для бизнеса смотрят по всему миру.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="prose-body">Команда: {company.team.map((member) => `${member.name} — ${member.role}`).join('; ')}.</p>
            <p className="prose-body mt-4">Основные города присутствия — Москва и Казань, но съёмки проходят практически по всей России: при необходимости команда лично приезжает в нужный город. Монтаж и 2D/3D-графику делаем удалённо.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <dl className="grid grid-cols-2 border-l border-t border-line md:grid-cols-3">
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
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <p className="label-mono text-fg-3">
            <span className="text-signal-text">→</span> Принципы
          </p>
          <p className="label-mono text-fg-3">{String(principles.length).padStart(2, '0')}</p>
        </div>
        <ol className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} as="li" delay={i * 0.06} className="bg-bg p-6 md:p-8">
              <p className="label-mono text-signal-text">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="text-display-md mt-6">{principle.title}</h2>
              <p className="prose-body mt-3 max-w-md">{principle.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="label-mono text-fg-3">Нам доверяют</p>
            <h2 className="text-display-md mt-4">Клиенты, которых можно назвать</h2>
            <p className="prose-body mt-4 max-w-sm">Крупные бренды и государственные структуры, банки, IT-компании, заводы и галереи. Часть проектов — под NDA, поэтому здесь только те, кто рассказал о работе публично.</p>
          </Reveal>
          <ul className="col-span-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            {clients.map((name) => (
              <li key={name} className="bg-bg p-4 text-sm md:p-5">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className="label-mono text-fg-3">История</p>
            <h2 className="text-display-md mt-4">От VIDEOKZN к Видеопродакшн.РФ</h2>
          </div>
          <ol className="col-span-12 border-t border-line lg:col-span-8">
            {timeline.map((item) => (
              <li key={item.year} className="grid gap-2 border-b border-line py-6 md:grid-cols-[8rem_1fr] md:gap-8">
                <p className="text-display-sm text-signal-text">{item.year}</p>
                <p className="prose-body">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Slate
          columns={4}
          fields={[
            { label: 'Штаб', value: 'Казань, Спартаковская 88Б' },
            { label: 'Рейтинг 2ГИС', value: '5,0 · 52 отзыва' },
            { label: 'Рейтинг на сайте', value: '9,7 · 40 отзывов' },
            { label: 'Работаем', value: company.hours },
          ]}
        />
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="prose-body max-w-md">Посмотрите, как это выглядит в работе, — или сразу расскажите о своей задаче.</p>
          <div className="flex gap-3">
            <Button to="/work" variant="outline" arrow="up-right">
              Работы
            </Button>
            <Button to="/contact" variant="solid" arrow="right">
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>
    </Page>
  )
}
