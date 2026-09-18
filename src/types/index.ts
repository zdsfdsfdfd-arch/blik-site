/** Shared content types for ВИДЕОПРОДАКШН.РФ. Data lives in src/data and is fully typed here. */

export type ProjectCategory =
  | 'advertising'
  | 'presentation'
  | 'image'
  | 'film'
  | 'event'
  | 'social'
  | 'graphics'
  | 'review'
  | 'music'
  | 'education'
  | 'corporate'
  | 'marketplace'

export interface VideoRef {
  /** Platform that hosts the video. Local files live under /media/videos. */
  platform: 'youtube' | 'rutube' | 'vk' | 'vimeo' | 'kinescope' | 'local'
  /** Platform video id: YouTube 11-char id, VK «-ownerId_videoId», Kinescope id, or a local path. */
  id: string
  /** Canonical watch URL. */
  url: string
  title?: string
}

export interface ImageRef {
  /** Remote source (Tilda CDN, YouTube thumbnail...). */
  src: string
  /** Local copy under /media/images when downloaded. */
  local?: string
  alt: string
  width?: number
  height?: number
}

export interface ProjectSection {
  heading: string
  body: string[]
}

export interface Project {
  slug: string
  title: string
  client: string
  category: ProjectCategory
  /** Short human label for the category, e.g. «Рекламный ролик». */
  format: string
  year?: string
  city?: string
  duration?: string
  summary: string
  /** Case-study narrative. Each section becomes a chapter. */
  sections: ProjectSection[]
  services: string[]
  video?: VideoRef
  poster: ImageRef
  gallery?: ImageRef[]
  featured?: boolean
  /** Source page or listing where the project was found. */
  sourceUrl?: string
  seoDescription?: string
  /** A quote from the client about this project, when one was published. */
  quote?: { text: string; author: string; role?: string }
}

export interface ServicePackage {
  name: string
  price: string
  details: string[]
}

export interface ServiceStep {
  title: string
  body: string
}

export interface Service {
  slug: string
  index: string
  name: string
  short: string
  intro: string
  description: string[]
  includes: string[]
  steps: ServiceStep[]
  benefits: string[]
  formats?: string[]
  /** Reference tariff the studio names for this format, when it does. */
  tariff?: string
  /** Price tiers published on the original service page («от 150 000 ₽»). */
  packages?: ServicePackage[]
  /** Who the format is for, as listed on the original page. */
  audience?: string[]
  /** Questions and answers published on the original service page. */
  faq?: FaqItem[]
  relatedProjects: string[]
  seoTitle: string
  seoDescription: string
  /** Original page on the source site, if it existed. */
  sourceUrl?: string
}

export interface Tariff {
  slug: string
  name: string
  tagline: string
  price?: string
  priceNote?: string
  includes: string[]
  bestFor: string
  timeline?: string
}

export interface Review {
  id: string
  author: string
  role?: string
  company?: string
  text: string
  rating?: number
  source?: string
  sourceUrl?: string
  /** True when the text is a summary of a published review rather than a verbatim quote. */
  paraphrased?: boolean
  /** Video testimonial, when the client recorded one. */
  video?: VideoRef
  poster?: ImageRef
}

export interface ThankYouLetter {
  from: string
  quote: string
  image: ImageRef
}

export interface FaqItem {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  to: string
  index?: string
}

export interface TeamMember {
  name: string
  role: string
}

export interface Address {
  city: string
  address: string
  note?: string
  mapUrl?: string
}

export interface SocialLink {
  network: string
  label: string
  href: string
}
