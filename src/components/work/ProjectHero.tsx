import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../../types'
import { categoryLabels } from '../../data/projects'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Slate } from '../ui/Slate'
import { SplitLines } from '../ui/SplitLines'
import { VideoFrame } from '../ui/VideoFrame'

interface ProjectHeroProps {
  project: Project
}

/** Project opener: title over a full-width media frame and a clapper slate with metadata. */
export function ProjectHero({ project }: ProjectHeroProps) {
  const reduceMotion = useReducedMotion()
  const fields = [
    { label: 'Клиент', value: project.client },
    { label: 'Формат', value: project.format },
    { label: 'Категория', value: categoryLabels[project.category] },
    { label: 'Город', value: project.city ?? 'Россия' },
  ]
  if (project.year) fields.push({ label: 'Год', value: project.year })
  if (project.duration) fields.push({ label: 'Хронометраж', value: project.duration })

  return (
    <header className="container-x pt-28 md:pt-36">
      <motion.p
        className="label-mono flex items-center gap-3 text-fg-3"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-signal-text">Кейс</span> {project.format}
      </motion.p>
      <SplitLines as="h1" lines={project.title.split(' — ')} className="text-display-xl mt-5 max-w-5xl" delay={0.3} />
      <motion.p
        className="lead mt-6 max-w-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.55 }}
      >
        {project.summary}
      </motion.p>

      <motion.div
        className="mt-12 md:mt-16"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.5 }}
      >
        <VideoFrame video={project.video} poster={project.poster} title={project.title} priority caption={`${project.slug.toUpperCase()} · ${project.format}`} aspect="aspect-video" />
        <Slate fields={fields} className="mt-6" columns={fields.length > 4 ? 5 : 4} />
      </motion.div>
    </header>
  )
}
