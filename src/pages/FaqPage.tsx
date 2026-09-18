import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { faq } from '../data/faq'
import { site } from '../data/company'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
}

export function FaqPage() {
  return (
    <Page theme="light" title="Вопросы и ответы" description={`Ответы на частые вопросы о работе студии ${site.name}: сроки, стоимость, правки, исходники, география съёмок, длительность роликов.`} path="/faq" jsonLd={jsonLd}>
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="label-mono text-signal-text">FAQ</p>
            <SplitLines as="h1" lines={['Вопросы', 'и ответы']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <p className="lead col-span-12 lg:col-span-4">Сроки, стоимость, правки и география — то, о чём спрашивают перед первым проектом.</p>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-24">
        <div className="border-t border-line">
          {faq.map((item, i) => (
            <Reveal key={item.question} as="div">
              <details className="group border-b border-line" name="faq">
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 md:gap-8 [&::-webkit-details-marker]:hidden">
                  <span className="label-mono w-8 shrink-0 text-signal-text">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-display-sm flex-1 transition-colors group-hover:text-signal-text">{item.question}</span>
                  <span aria-hidden="true" className="label-mono shrink-0 text-fg-3 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="prose-body max-w-2xl pb-7 pl-12 md:pl-16">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-6 border border-line p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="text-display-md max-w-xl">Не нашли ответ? Спросите напрямую</p>
          <Button to="/contact" variant="solid" size="lg" arrow="right">
            Написать
          </Button>
        </div>
      </section>
    </Page>
  )
}
