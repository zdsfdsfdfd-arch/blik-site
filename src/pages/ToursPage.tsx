import { tours } from '../data/tours'
import { Page } from '../components/layout/Page'
import { TourCatalog } from '../components/tours/TourCatalog'
import { CTA } from '../components/home/CTA'

export function ToursPage() {
  return (
    <Page
      title="Все туры"
      description="Каталог путешествий PLAN: пляжный отдых, экскурсии, приключения, семейные и романтические туры по всему миру."
      className="pt-24 md:pt-32"
    >
      <TourCatalog
        tours={tours}
        syncUrl
        id="catalogue"
        heading={{
          index: `${tours.length}`,
          eyebrow: 'Каталог',
          title: (
            <>
              Все <span className="serif-accent text-ocean">путешествия</span>
            </>
          ),
          subtitle: 'Фильтруйте по направлению, датам, бюджету и типу отдыха — или оставьте заявку на индивидуальный маршрут.',
        }}
      />
      <CTA />
    </Page>
  )
}
