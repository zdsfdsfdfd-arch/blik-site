import { useSearchParams } from 'react-router-dom'
import { company } from '../data/company'
import { Page } from '../components/layout/Page'
import { BookingForm } from '../components/tours/BookingForm'
import { Reveal } from '../components/ui/Reveal'

const steps = [
  { title: 'Заявка', text: 'Вы описываете идею поездки — даже в двух словах.' },
  { title: 'Подбор', text: 'В течение дня специалист PLAN присылает два-три варианта с ценами.' },
  { title: 'Программа', text: 'Уточняем детали, бронируем, готовим документы и остаёмся на связи всю поездку.' },
]

export function BookingPage() {
  const [params] = useSearchParams()
  const destination = params.get('destination') ?? ''

  return (
    <Page
      title="Заявка на путешествие"
      description="Оставьте заявку на подбор путешествия — специалист PLAN свяжется с вами в ближайшее время."
      className="pt-28 md:pt-40"
    >
      <section className="container-x grid gap-14 pb-24 lg:grid-cols-12 lg:gap-12 md:pb-32">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="font-display text-ocean">Заявка</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              Бесплатно и без обязательств
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-lg mt-5">
              Спланируем <span className="serif-accent text-ocean">вместе</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-5">
              Расскажите, куда и когда хотите отправиться. Остальное — наша работа.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ol className="mt-10 space-y-6 border-t border-line pt-8">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="font-display text-sm font-semibold text-ocean">0{index + 1}</span>
                  <div>
                    <h2 className="font-display font-semibold">{step.title}</h2>
                    <p className="mt-1 text-sm text-ink-2">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-muted">
              Или позвоните:{' '}
              <a href={company.phoneHref} className="link-underline font-medium text-ink">
                {company.phone}
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal className="min-w-0 lg:col-span-8" delay={0.15}>
          <BookingForm defaultDestination={destination} />
        </Reveal>
      </section>
    </Page>
  )
}
