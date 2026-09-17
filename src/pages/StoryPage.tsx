import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { getStoryBySlug, stories } from '../data/stories'
import { formatDate } from '../lib/format'
import { Page } from '../components/layout/Page'
import { StoryCard } from '../components/stories/StoryCard'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { NotFoundPage } from './NotFoundPage'

export function StoryPage() {
  const { slug = '' } = useParams()
  const story = getStoryBySlug(slug)
  const heroRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '20%'])

  if (!story) return <NotFoundPage />

  const others = stories.filter((item) => item.id !== story.id).slice(0, 2)

  return (
    <Page title={story.title} description={story.excerpt}>
      <article>
        <div ref={heroRef} className="grain relative min-h-[70svh] overflow-hidden bg-ink text-paper">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <SmartImage photo={story.photo} alt={story.alt} className="h-full w-full" sizes="100vw" priority />
          </motion.div>
          <div aria-hidden="true" className="image-overlay absolute inset-0" />
          <div className="container-x relative flex min-h-[70svh] flex-col justify-end pb-14 pt-32">
            <nav aria-label="Хлебные крошки" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/70">
                <li><Link to="/" className="link-underline">Главная</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li><Link to="/stories" className="link-underline">Travel stories</Link></li>
              </ol>
            </nav>
            <Reveal>
              <p className="eyebrow text-sand">{story.category}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-display-lg mt-5 max-w-4xl">{story.title}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-sm text-paper/70">
                <time dateTime={story.date}>{formatDate(story.date)}</time> · {story.readingTime} мин чтения
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7 lg:col-start-3">
            <Reveal>
              <p className="lead font-medium text-ink">{story.excerpt}</p>
            </Reveal>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-2">
              {story.body.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 32)}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display font-semibold">Понравилась история? Спланируем такую же для вас.</p>
                <Button to="/booking" variant="ocean" arrow="right">
                  Оставить заявку
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <section className="border-t border-line py-20 md:py-28" aria-labelledby="more-stories">
          <div className="container-x">
            <Reveal>
              <h2 id="more-stories" className="text-display-md">
                Читать <span className="serif-accent text-ocean">дальше</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {others.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <StoryCard story={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>
    </Page>
  )
}
