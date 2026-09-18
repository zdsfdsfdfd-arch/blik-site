import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import { posterSources } from '../../lib/media'
import { index2 } from '../../lib/format'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
  aspect?: string
}

/** A frame from the strip: poster with brackets, slate line underneath. Whole card is the link. */
export function ProjectCard({ project, index, className = '', aspect = 'aspect-[16/10]' }: ProjectCardProps) {
  return (
    <Reveal as="article" className={className}>
      <Link to={`/work/${project.slug}`} data-cursor="view" className="group block">
        <div className={`relative overflow-hidden bg-bg-2 ${aspect}`}>
          <SmartImage
            sources={posterSources(project.poster, project.video)}
            alt={project.poster.alt}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            fallbackLabel={project.title}
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div aria-hidden="true" className="corners pointer-events-none absolute inset-3 text-[#f1eee8]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="label-mono absolute left-3 top-3 bg-chassis/75 px-2 py-1 text-[#f1eee8]">
            {index2(index + 1)} · {project.format}
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
          <h3 className="text-display-sm transition-colors duration-300 group-hover:text-signal">{project.title}</h3>
          <p className="label-mono max-w-[45%] text-right text-fg-3">{[project.city, project.year].filter(Boolean).join(' · ') || project.client}</p>
        </div>
        <p className="mt-2 max-w-md text-sm text-fg-2">{project.summary}</p>
      </Link>
    </Reveal>
  )
}
