import type { LucideIcon } from 'lucide-react'

export type RegionId = 'europe' | 'asia' | 'america' | 'middle-east' | 'africa' | 'oceania'

export type TravelType =
  | 'beach'
  | 'excursion'
  | 'adventure'
  | 'family'
  | 'romance'
  | 'luxury'
  | 'city-break'

export interface Region {
  id: RegionId
  name: string
  tagline: string
  cities: string[]
  photo: string
  alt: string
}

export interface Photo {
  photo: string
  alt: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface TourReview {
  name: string
  city: string
  rating: number
  text: string
  date: string
}

export interface Tour {
  id: string
  slug: string
  title: string
  /** English search keyword used when a photo has to be sourced by topic. */
  keyword: string
  country: string
  city: string
  region: RegionId
  days: number
  price: number
  rating: number
  reviewsCount: number
  /** Editorial ranking used by the default sort: 1 = most popular. */
  popularity: number
  types: TravelType[]
  /** Months (1–12) when the tour operates. */
  season: number[]
  groupSize: string
  summary: string
  description: string[]
  highlights: string[]
  photo: string
  alt: string
  gallery: Photo[]
  hotel: {
    name: string
    stars: number
    area: string
  }
  meals: string
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  reviews: TourReview[]
}

export interface Story {
  id: string
  slug: string
  title: string
  keyword: string
  category: string
  date: string
  readingTime: number
  excerpt: string
  photo: string
  alt: string
  body: string[]
}

export interface Review {
  id: string
  name: string
  city: string
  rating: number
  text: string
  tour: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export type GallerySpan = 'square' | 'wide' | 'tall' | 'large'

export interface GalleryItem {
  id: string
  photo: string
  alt: string
  keyword: string
  place: string
  country: string
  span: GallerySpan
}

export interface Benefit {
  id: string
  icon: LucideIcon
  title: string
  text: string
}

export interface Stat {
  id: string
  value: number
  decimals?: number
  suffix?: string
  label: string
}

export interface NavItem {
  label: string
  to: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  alt: string
}

export interface LegalSection {
  title: string
  paragraphs: string[]
}

export interface LegalDocument {
  slug: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}
