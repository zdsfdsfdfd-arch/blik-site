import { useParams } from 'react-router-dom'
import { getTourBySlug } from '../data/tours'
import { Page } from '../components/layout/Page'
import { TourDetails } from '../components/tours/TourDetails'
import { NotFoundPage } from './NotFoundPage'

export function TourPage() {
  const { slug = '' } = useParams()
  const tour = getTourBySlug(slug)

  if (!tour) return <NotFoundPage />

  return (
    <Page title={`${tour.title} — ${tour.country}`} description={tour.summary}>
      <TourDetails tour={tour} />
    </Page>
  )
}
