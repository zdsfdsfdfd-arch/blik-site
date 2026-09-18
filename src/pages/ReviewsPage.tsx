import { useState } from 'react'
import { Page } from '../components/layout/Page'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { SplitLines } from '../components/ui/SplitLines'
import { VideoFrame } from '../components/ui/VideoFrame'
import { company } from '../data/company'
import { letters, reviews } from '../data/reviews'
import { posterSources } from '../lib/media'

const PAGE = 12

export function ReviewsPage() {
  const [limit, setLimit] = useState(PAGE)
  const shown = reviews.slice(0, limit)
  return (
    <Page theme="light" title="Отзывы" description={`${reviews.length} видеоотзывов и ${letters.length} благодарственных писем клиентов студии Видеопродакшн.РФ: ICL Services, Волжская судоходная компания, Росдорнии, банк «Русский Стандарт» и другие.`} path="/reviews">
      <section className="container-x pt-28 md:pt-36">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono text-signal-text">06 · Отзывы</p>
            <SplitLines as="h1" lines={['Что говорят', 'о нас клиенты']} className="text-display-2xl mt-5" delay={0.2} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="lead">Посмотрите видеоотзывы наших счастливых клиентов — и благодарственные письма, которые они присылают после проектов.</p>
            <ul className="mt-6 grid grid-cols-3 gap-px border border-line bg-line">
              <li className="bg-bg p-4">
                <p className="text-display-md">{reviews.length}</p>
                <p className="label-mono mt-1 text-fg-3">видеоотзывов</p>
              </li>
              <li className="bg-bg p-4">
                <p className="text-display-md">{letters.length}</p>
                <p className="label-mono mt-1 text-fg-3">писем</p>
              </li>
              {company.ratings.slice(0, 1).map((rating) => (
                <li key={rating.source} className="bg-bg p-4">
                  <p className="text-display-md">{rating.value}</p>
                  <p className="label-mono mt-1 text-fg-3">{rating.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-24" aria-label="Видеоотзывы">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((review, i) => (
            <Reveal key={review.id} as="article" delay={(i % 3) * 0.06}>
              {review.video && review.poster && <VideoFrame video={review.video} poster={review.poster} title={`Видеоотзыв: ${review.author}`} caption={`Отзыв ${String(i + 1).padStart(2, '0')}`} />}
              <blockquote className="mt-4 border-t border-line pt-4">
                <p className="text-[0.9375rem] leading-relaxed text-fg-2">«{review.text}»</p>
                <footer className="mt-3">
                  <p className="label-mono-lg">{review.author}</p>
                  {review.role && <p className="mt-1 text-sm text-fg-3">{review.role}</p>}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        {shown.length < reviews.length && (
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-line pt-8">
            <p className="label-mono text-fg-3">
              Показано {shown.length} из {reviews.length}
            </p>
            <Button variant="outline" size="lg" onClick={() => setLimit((n) => n + PAGE)}>
              Ещё отзывы
            </Button>
          </div>
        )}
      </section>

      <section className="container-x mt-20 md:mt-28" aria-label="Благодарственные письма">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <h2 className="label-mono text-fg-3">
            <span className="text-signal-text">→</span> Благодарственные письма
          </h2>
          <p className="label-mono text-fg-3">{letters.length}</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {letters.map((letter, i) => (
            <Reveal key={letter.from} as="figure" delay={(i % 4) * 0.05}>
              <SmartImage sources={posterSources(letter.image)} alt={letter.image.alt} className="aspect-[1/1.35] border border-line" sizes="(min-width: 1024px) 25vw, 50vw" imgClassName="object-contain object-top bg-white" />
              <figcaption className="mt-3">
                <p className="label-mono-lg">{letter.from}</p>
                <p className="mt-1 text-sm text-fg-2">«{letter.quote}»</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
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
