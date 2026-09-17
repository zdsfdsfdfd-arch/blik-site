import { stories } from '../data/stories'
import { Page } from '../components/layout/Page'
import { StoryCard } from '../components/stories/StoryCard'
import { Reveal } from '../components/ui/Reveal'
import { CTA } from '../components/home/CTA'

export function StoriesPage() {
  return (
    <Page
      title="Travel stories"
      description="Истории из путешествий от команды PLAN: гиды по городам, направления и вдохновение."
      className="pt-28 md:pt-40"
    >
      <section className="container-x pb-20 md:pb-28">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="font-display text-ocean">{String(stories.length).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            Travel stories
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-display-lg mt-5">
            Истории <span className="serif-accent text-ocean">из путешествий</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead mt-5 max-w-xl">
            Гиды, заметки и списки мест — то, что мы рассказываем друзьям, когда они спрашивают «куда поехать».
          </p>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {stories.map((story, index) => (
            <Reveal key={story.id} delay={(index % 2) * 0.08}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </Page>
  )
}
