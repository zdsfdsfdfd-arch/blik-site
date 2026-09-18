import { ArrowUpRight } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SplitLines } from '../components/ui/SplitLines'
import { company } from '../data/company'
import { reviews } from '../data/reviews'

export function ReviewsPage() {
  return (
    <Page theme="light" title="Отзывы" description="Отзывы клиентов о студии Видеопродакшн.РФ: рейтинг 5,0 на 2ГИС и 9,7 на сайте студии. Профессиональный подход, соблюдение сроков, адекватные цены." path="/reviews">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono text-signal">06 · Отзывы</p>
            <SplitLines as="h1" lines={['Что говорят', 'клиенты']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <ul className="col-span-12 grid grid-cols-2 gap-px border border-line bg-line lg:col-span-5">
            {company.ratings.map((rating) => (
              <li key={rating.source} className="bg-bg p-5">
                <p className="label-mono text-fg-3">{rating.source}</p>
                <p className="text-display-lg mt-3">{rating.value}</p>
                <p className="mt-1 text-sm text-fg-2">{rating.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-24">
        <ol className="border-t border-line">
          {reviews.map((review, i) => (
            <Reveal key={review.id} as="li" className="grid-12 gap-y-4 border-b border-line py-10 md:py-12">
              <p className="label-mono col-span-12 text-signal md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
              <blockquote className="col-span-12 md:col-span-8">
                <p className="text-display-sm leading-[1.4]">{review.paraphrased ? review.text : `«${review.text}»`}</p>
              </blockquote>
              <footer className="col-span-12 flex flex-col gap-1 md:col-span-3 md:col-start-10">
                <p className="label-mono-lg">{review.author}</p>
                {review.company && <p className="text-sm text-fg-2">{review.company}</p>}
                {review.sourceUrl ? (
                  <a href={review.sourceUrl} target="_blank" rel="noreferrer" className="group mt-1 inline-flex items-center gap-1 text-sm text-fg-3 hover:text-fg">
                    <span className="link-underline">{review.paraphrased ? 'По отзыву: ' : ''}{review.source}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                ) : (
                  <p className="text-sm text-fg-3">{review.source}</p>
                )}
              </footer>
            </Reveal>
          ))}
        </ol>
        <p className="label-mono mt-6 text-fg-3">Отзывы приводятся по публикациям клиентов на 2ГИС, Яндекс Картах и сайте студии.</p>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-6 border border-line p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="text-display-md max-w-xl">Станьте следующей историей в этом списке</p>
          <Button to="/contact" variant="solid" size="lg" arrow="right">
            Обсудить проект
          </Button>
        </div>
      </section>
    </Page>
  )
}
