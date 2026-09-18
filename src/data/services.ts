import type { Service } from '../types/index.ts'
import { projects } from './projects'
import { servicesBatch1 } from './services/batch1'
import { servicesBatch2 } from './services/batch2'
import { servicesBatch3 } from './services/batch3'

/**
 * All 26 services of Видеопродакшн.РФ, one per service page of the original
 * site, with the prices and process the studio published there.
 * Related projects are resolved from the portfolio by the services each
 * project is tagged with.
 */
export const services: Service[] = [...servicesBatch1, ...servicesBatch2, ...servicesBatch3].map((service) => ({
  ...service,
  relatedProjects: service.relatedProjects.length
    ? service.relatedProjects
    : projects
        .filter((project) => project.services.includes(service.slug))
        .slice(0, 3)
        .map((project) => project.slug),
}))

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

/** The formats the studio names as its main products. */
export const primaryServices = services.filter((service) =>
  ['reklamnye-videoroliki', 'prezentacionnye-video', 'imidzhevye-roliki', 'korporativnoe-video', 'semka-meropriyatij', 'video-dlya-marketpleysov', 'aerosyemka', '2d-animaciya'].includes(service.slug),
)
