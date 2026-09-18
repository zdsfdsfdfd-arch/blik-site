import { Link } from 'react-router-dom'
import type { Project } from '../../types/index.ts'
import { posterSources } from '../../lib/media'
import { index2 } from '../../lib/format'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
  aspect?: string
  /** Heading level to keep document outline valid in the hosting section. */
  headingLevel?: 'h2' | 'h3'
}

/** A frame from the strip: poster with brackets, slate line underneath. Whole card is the link. */
export function ProjectCard({ project, index, className = '', aspect = 'aspect-video', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  const meta = [project.client, project.city, project.year].filter(Boolean).join(' · ')
  return (
    <Reveal as="article" className={className}>
      <Link to={`/work/${project.slug}`} data-cursor="play" className="group block">
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
          {project.video && (
            <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-signal text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current"><path d="M8 5v14l11-7z" /></svg>
            </span>
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
          <Heading className="text-display-sm transition-colors duration-300 group-hover:text-signal-text">{project.title}</Heading>
          {meta && <p className="label-mono max-w-[40%] text-right text-fg-3">{meta}</p>}
        </div>
        {project.summary && <p className="mt-2 max-w-md text-sm text-fg-2">{project.summary}</p>}
      </Link>
    </Reveal>
  )
}
