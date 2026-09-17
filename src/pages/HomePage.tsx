import { tours } from '../data/tours'
import { Page } from '../components/layout/Page'
import { About } from '../components/home/About'
import { Benefits } from '../components/home/Benefits'
import { CTA } from '../components/home/CTA'
import { Contacts } from '../components/home/Contacts'
import { Destinations } from '../components/home/Destinations'
import { FAQ } from '../components/home/FAQ'
import { Gallery } from '../components/home/Gallery'
import { Hero } from '../components/home/Hero'
import { Marquee } from '../components/home/Marquee'
import { Reviews } from '../components/home/Reviews'
import { SearchBar } from '../components/home/SearchBar'
import { Stats } from '../components/home/Stats'
import { TravelStories } from '../components/home/TravelStories'
import { TourCatalog } from '../components/tours/TourCatalog'

export function HomePage() {
  return (
    <Page>
      <Hero />
      <div className="container-x relative z-10 -mt-20 sm:-mt-24">
        <SearchBar />
      </div>
      <Marquee />
      <Destinations />
      <About />
      <TourCatalog
        tours={tours}
        limit={8}
        heading={{
          index: '03',
          eyebrow: 'Туры',
          title: (
            <>
              Путешествия, которые <span className="serif-accent text-ocean">выбирают сейчас</span>
            </>
          ),
          subtitle: 'Выберите параметры — список обновится сразу. Или просто листайте.',
        }}
      />
      <Benefits />
      <Stats />
      <TravelStories />
      <Reviews />
      <Gallery />
      <FAQ />
      <Contacts />
      <CTA />
    </Page>
  )
}
