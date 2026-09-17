import { stories } from '../../data/stories'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StoryCard } from '../stories/StoryCard'

export function TravelStories() {
  const [featured, ...rest] = stories

  return (
    <section id="stories" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Travel stories"
          title={
            <>
              Истории <span className="serif-accent text-ocean">из путешествий</span>
            </>
          }
          subtitle="Заметки команды и наших путешественников — про места, которые не описать в каталоге."
          aside={<ArrowLink to="/stories">Все истории</ArrowLink>}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <StoryCard story={featured} variant="featured" />
          </Reveal>
          <div className="lg:col-span-5">
            {rest.map((story, index) => (
              <Reveal key={story.id} delay={0.1 + index * 0.08}>
                <StoryCard story={story} variant="row" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
