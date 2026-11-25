import { benefits } from '../../data/benefits'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Benefits() {
  return (
    <section id="why-plan" className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="04"
              eyebrow="Почему PLAN"
              title={
                <>
                  Мы планируем больше, <span className="serif-accent text-ocean">чем поездки.</span>
                </>
              }
              subtitle="Четыре причины, по которым к нам возвращаются — и привозят друзей."
            />
          </div>
        </div>

        <ul className="lg:col-span-7">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal as="li" key={benefit.id} delay={index * 0.06}>
                <div className="group grid grid-cols-[3rem_1fr] items-start gap-5 border-t border-line py-8 transition-colors duration-500 last:border-b sm:grid-cols-[4rem_3.5rem_1fr] sm:gap-8 md:py-10">
                  <span className="font-display text-sm font-semibold text-muted transition-colors duration-500 group-hover:text-ocean">
                    0{index + 1}
                  </span>
                  <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-ocean group-hover:bg-ocean group-hover:text-paper sm:flex">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="flex items-center gap-3 sm:hidden">
                      <Icon className="h-5 w-5 text-ocean" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-display-sm mt-2 sm:mt-0">{benefit.title}</h3>
                    <p className="mt-3 max-w-md text-ink-2">{benefit.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
