import type { RegionId, Tour, TravelType } from '../types'
import { regions } from '../data/destinations'

export type DurationId = 'any' | 'short' | 'medium' | 'long'
export type BudgetId = 'any' | '1000' | '1500' | '2000' | '2000+'
export type SortId = 'popular' | 'price-asc' | 'price-desc' | 'duration' | 'rating'

export interface TourFilters {
  /** Empty string, region id or country name. */
  destination: string
  /** YYYY-MM-DD or empty. */
  date: string
  duration: DurationId
  people: number
  budget: BudgetId
  type: TravelType | 'all'
}

export const DEFAULT_FILTERS: TourFilters = {
  destination: '',
  date: '',
  duration: 'any',
  people: 2,
  budget: 'any',
  type: 'all',
}

export const TRAVEL_TYPE_LABELS: Record<TravelType, string> = {
  beach: 'Пляжный отдых',
  excursion: 'Экскурсии',
  adventure: 'Приключения',
  family: 'Семейный отдых',
  romance: 'Романтика',
  luxury: 'Luxury',
  'city-break': 'City break',
}

export const TRAVEL_TYPES = Object.keys(TRAVEL_TYPE_LABELS) as TravelType[]

export const DURATION_OPTIONS: { id: DurationId; label: string }[] = [
  { id: 'any', label: 'Любая' },
  { id: 'short', label: 'До 5 дней' },
  { id: 'medium', label: '6–8 дней' },
  { id: 'long', label: '9 дней и больше' },
]

export const BUDGET_OPTIONS: { id: BudgetId; label: string }[] = [
  { id: 'any', label: 'Любой' },
  { id: '1000', label: 'До $1 000' },
  { id: '1500', label: 'До $1 500' },
  { id: '2000', label: 'До $2 000' },
  { id: '2000+', label: 'От $2 000' },
]

export const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: 'popular', label: 'Популярные' },
  { id: 'rating', label: 'По рейтингу' },
  { id: 'price-asc', label: 'Сначала дешевле' },
  { id: 'price-desc', label: 'Сначала дороже' },
  { id: 'duration', label: 'По длительности' },
]

const REGION_IDS = new Set<string>(regions.map((r) => r.id))

function matchesDestination(tour: Tour, destination: string): boolean {
  if (!destination) return true
  if (REGION_IDS.has(destination)) return tour.region === (destination as RegionId)
  const needle = destination.toLowerCase()
  return (
    tour.country.toLowerCase() === needle ||
    tour.city.toLowerCase() === needle ||
    tour.title.toLowerCase().includes(needle)
  )
}

function matchesDuration(tour: Tour, duration: DurationId): boolean {
  switch (duration) {
    case 'short':
      return tour.days <= 5
    case 'medium':
      return tour.days >= 6 && tour.days <= 8
    case 'long':
      return tour.days >= 9
    default:
      return true
  }
}

function matchesBudget(tour: Tour, budget: BudgetId): boolean {
  switch (budget) {
    case '1000':
      return tour.price <= 1000
    case '1500':
      return tour.price <= 1500
    case '2000':
      return tour.price <= 2000
    case '2000+':
      return tour.price >= 2000
    default:
      return true
  }
}

function matchesDate(tour: Tour, date: string): boolean {
  if (!date) return true
  const month = Number(date.slice(5, 7))
  if (!month) return true
  return tour.season.includes(month)
}

export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  return tours.filter(
    (tour) =>
      matchesDestination(tour, filters.destination) &&
      matchesDate(tour, filters.date) &&
      matchesDuration(tour, filters.duration) &&
      matchesBudget(tour, filters.budget) &&
      (filters.type === 'all' || tour.types.includes(filters.type)),
  )
}

export function sortTours(tours: Tour[], sort: SortId): Tour[] {
  const list = [...tours]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'duration':
      return list.sort((a, b) => a.days - b.days)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
    default:
      return list.sort((a, b) => a.popularity - b.popularity)
  }
}

export function countActiveFilters(filters: TourFilters): number {
  let count = 0
  if (filters.destination) count += 1
  if (filters.date) count += 1
  if (filters.duration !== 'any') count += 1
  if (filters.budget !== 'any') count += 1
  if (filters.type !== 'all') count += 1
  return count
}

const DURATION_IDS = new Set<string>(DURATION_OPTIONS.map((o) => o.id))
const BUDGET_IDS = new Set<string>(BUDGET_OPTIONS.map((o) => o.id))
const SORT_IDS = new Set<string>(SORT_OPTIONS.map((o) => o.id))
const TYPE_IDS = new Set<string>(TRAVEL_TYPES)

export function parseFilters(params: URLSearchParams): TourFilters {
  const duration = params.get('duration') ?? ''
  const budget = params.get('budget') ?? ''
  const type = params.get('type') ?? ''
  const people = Number(params.get('people'))
  return {
    destination: params.get('destination') ?? '',
    date: params.get('date') ?? '',
    duration: DURATION_IDS.has(duration) ? (duration as DurationId) : 'any',
    people: people >= 1 && people <= 12 ? people : DEFAULT_FILTERS.people,
    budget: BUDGET_IDS.has(budget) ? (budget as BudgetId) : 'any',
    type: TYPE_IDS.has(type) ? (type as TravelType) : 'all',
  }
}

export function parseSort(params: URLSearchParams): SortId {
  const sort = params.get('sort') ?? ''
  return SORT_IDS.has(sort) ? (sort as SortId) : 'popular'
}

export function serializeFilters(filters: TourFilters, sort: SortId): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.destination) params.set('destination', filters.destination)
  if (filters.date) params.set('date', filters.date)
  if (filters.duration !== 'any') params.set('duration', filters.duration)
  if (filters.people !== DEFAULT_FILTERS.people) params.set('people', String(filters.people))
  if (filters.budget !== 'any') params.set('budget', filters.budget)
  if (filters.type !== 'all') params.set('type', filters.type)
  if (sort !== 'popular') params.set('sort', sort)
  return params
}
