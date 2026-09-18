import { Page } from '../components/layout/Page'
import { Clients } from '../components/home/Clients'
import { FeaturedWork } from '../components/home/FeaturedWork'
import { Hero } from '../components/home/Hero'
import { Numbers } from '../components/home/Numbers'
import { ProcessTimeline } from '../components/home/ProcessTimeline'
import { ServicesIndex } from '../components/home/ServicesIndex'
import { TariffsTeaser } from '../components/home/TariffsTeaser'
import { Ticker } from '../components/home/Ticker'
import { Voices } from '../components/home/Voices'
import { company, site } from '../data/company'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  description: site.defaultDescription,
  foundingDate: String(company.founded),
  telephone: company.phone,
  email: company.email,
  address: { '@type': 'PostalAddress', streetAddress: 'ул. Спартаковская, 88Б', addressLocality: 'Казань', postalCode: '420049', addressCountry: 'RU' },
  areaServed: [...company.cities, ...company.extraCities].map((city) => ({ '@type': 'City', name: city })),
  sameAs: company.socials.map((social) => social.href),
}

export function HomePage() {
  return (
    <Page path="/" jsonLd={jsonLd}>
      <Hero />
      <Ticker />
      <FeaturedWork />
      <ServicesIndex />
      <Clients />
      <ProcessTimeline />
      <Numbers />
      <TariffsTeaser />
      <Voices />
    </Page>
  )
}
