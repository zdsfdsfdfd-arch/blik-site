import type { Tour } from '../../types'
import { europeTours } from './europe'
import { asiaTours } from './asia'
import { americaTours } from './america'
import { middleEastTours } from './middleEast'
import { africaTours } from './africa'
import { oceaniaTours } from './oceania'

export const tours: Tour[] = [
  ...europeTours,
  ...asiaTours,
  ...americaTours,
  ...middleEastTours,
  ...africaTours,
  ...oceaniaTours,
]

/** Slugs of the tours shown on the home page, in display order. */
export const featuredTourSlugs = [
  'santorini-escape',
  'bali-experience',
  'tokyo-discovery',
  'dubai-premium',
  'paris-weekend',
  'maldives-escape',
  'new-york-city',
  'swiss-alps',
]

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug)
}

export function getFeaturedTours(): Tour[] {
  return featuredTourSlugs
    .map((slug) => getTourBySlug(slug))
    .filter((tour): tour is Tour => tour !== undefined)
}

export function getRelatedTours(tour: Tour, limit = 3): Tour[] {
  const score = (candidate: Tour) =>
    (candidate.region === tour.region ? 2 : 0) +
    candidate.types.filter((type) => tour.types.includes(type)).length
  return tours
    .filter((candidate) => candidate.id !== tour.id)
    .sort((a, b) => score(b) - score(a) || b.rating - a.rating)
    .slice(0, limit)
}

export function countToursByRegion(): Record<string, number> {
  return tours.reduce<Record<string, number>>((acc, tour) => {
    acc[tour.region] = (acc[tour.region] ?? 0) + 1
    return acc
  }, {})
}

/** Unique countries, sorted for select inputs. */
export function getCountries(): string[] {
  return [...new Set(tours.map((tour) => tour.country))].sort((a, b) => a.localeCompare(b, 'ru'))
}
