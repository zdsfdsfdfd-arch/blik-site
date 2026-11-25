import { ArrowUpRight } from 'lucide-react'
import { careers, company, milestones, team } from '../data/company'
import { Page } from '../components/layout/Page'
import { Benefits } from '../components/home/Benefits'
import { CTA } from '../components/home/CTA'
import { Stats } from '../components/home/Stats'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartImage } from '../components/ui/SmartImage'

export function AboutPage() {
  return (
    <Page
      title="О PLAN"
      description="PLAN — туристическое агентство с 2012 года: команда, история и открытые вакансии."
      className="pt-28 md:pt-40"
    >
      <section className="container-x pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-muted">
                <span className="font-display text-ocean">Est. {company.founded}</span>
                <span className="h-px w-8 bg-line" aria-hidden="true" />О PLAN
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-display-lg mt-5">
                Агентство, которое{' '}
                <span className="serif-accent text-ocean">ездит само</span> — прежде чем отправить вас.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lead mt-6 max-w-2xl">
                PLAN появился в {company.founded} году как бюро индивидуальных путешествий. С тех пор мы
                выросли до команды из двадцати экспертов, но принцип остался прежним: мы советуем только
                то, что видели сами.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.2}>
            <SmartImage
              photo="photo-1522202176988-66273c2fd55f"
              alt="Команда обсуждает маршрут за столом с ноутбуками"
              className="aspect-[4/5] lg:aspect-[4/4.6]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              fallbackKeywords="office,team"
              fallbackLabel="Команда PLAN"
            />
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-px border border-line bg-line md:grid-cols-5">
          {milestones.map((milestone, index) => (
            <Reveal as="li" key={milestone.year} delay={index * 0.06} className="bg-paper p-6">
              <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-ocean">{milestone.year}</p>
              <p className="mt-3 text-sm text-ink-2">{milestone.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="team" className="section-y scroll-mt-20 border-t border-line">
        <div className="container-x">
          <SectionHeading
            index="01"
            eyebrow="Команда"
            title={
              <>
                Люди, которые <span className="serif-accent text-ocean">знают дорогу</span>
              </>
            }
            subtitle="Каждый эксперт PLAN отвечает за свой регион и проводит в нём не меньше месяца в году."
          />
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal as="li" key={member.id} delay={index * 0.08} className="group">
                <SmartImage
                  photo={member.photo}
                  alt={member.alt}
                  className="aspect-[4/5]"
                  imgClassName="grayscale-[35%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  fallbackKeywords="portrait"
                  fallbackLabel={member.name}
                />
                <h3 className="text-display-sm mt-5">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Benefits />
      <Stats />

      <section id="careers" className="section-y scroll-mt-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="02"
              eyebrow="Карьера"
              title={
                <>
                  Станьте частью <span className="serif-accent text-ocean">команды</span>
                </>
              }
              subtitle="Мы ищем людей, которые любят дороги и умеют держать в голове сто деталей одновременно."
            />
          </div>
          <ul className="lg:col-span-7">
            {careers.map((job, index) => (
              <Reveal as="li" key={job.id} delay={index * 0.06}>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent(`Вакансия: ${job.title}`)}`}
                  className="group flex items-start justify-between gap-6 border-t border-line py-7 transition-colors last:border-b hover:text-ocean"
                >
                  <div>
                    <p className="eyebrow text-muted">{job.type}</p>
                    <h3 className="text-display-sm mt-2">{job.title}</h3>
                    <p className="mt-2 max-w-lg text-sm text-ink-2">{job.text}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </Page>
  )
}
