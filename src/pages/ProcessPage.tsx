import { Page } from '../components/layout/Page'
import { Marquee } from '../components/ui/Marquee'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { fullCycle, processStages } from '../data/process'

export function ProcessPage() {
  return (
    <Page theme="light" title="Как мы работаем" description="Процесс производства видео в студии Видеопродакшн.РФ: заявка и бриф, препродакшн, съёмка, постпродакшн, сдача проекта с тремя бесплатными циклами правок." path="/process">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">Процесс</p>
            <SplitLines as="h1" lines={['Как рождается', 'ролик']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">
            Три больших этапа — препродакшн, продакшн и постпродакшн — и две точки контакта: бриф в начале и сдача в конце. Всё это внутри одной студии.
          </p>
        </div>
      </section>

      <Marquee
        className="mt-16 border-y border-line py-4 motion-reduce:hidden"
        speed={30}
        items={fullCycle.map((step, i) => (
          <span key={step} className="label-mono-lg text-fg-2">
            <span className="mr-3 text-signal-text">{String(i + 1).padStart(2, '0')}</span>
            {step}
          </span>
        ))}
      />

      <section className="container-x mt-16 md:mt-24">
        <ol>
          {processStages.map((stage, i) => (
            <Reveal key={stage.index} as="li" className="grid-12 gap-y-6 border-b border-line py-10 md:py-14">
              <div className="col-span-12 md:col-span-2">
                <p className="text-display-lg text-signal-text">{stage.index}</p>
                <p className="label-mono mt-2 text-fg-3">{stage.code}</p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <h2 className="text-display-md">{stage.title}</h2>
                <p className="prose-body mt-4">{stage.summary}</p>
              </div>
              <ul className="col-span-12 space-y-2 md:col-span-4 md:col-start-9">
                {stage.items.map((item, j) => (
                  <li key={item} className="flex items-baseline gap-3 border-b border-line-2 pb-2 text-sm">
                    <span className="label-mono text-fg-3">{i}.{j + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="label-mono text-fg-3">Что вы получаете</p>
            <ul className="mt-5 space-y-3">
              {['Финальную версию ролика в нужных форматах', 'До трёх бесплатных циклов правок', 'Исходные материалы по запросу', 'Правки принимаются на всех этапах, включая сценарий'].map((item) => (
                <li key={item} className="text-display-sm flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 flex flex-col items-start justify-end gap-5 lg:col-span-5 lg:col-start-8">
            <p className="prose-body">Два простых способа начать: быстрая заявка с обратным звонком в течение часа или подробный бриф с индивидуальным расчётом.</p>
            <Button to="/contact" variant="solid" arrow="right">
              Начать проект
            </Button>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
