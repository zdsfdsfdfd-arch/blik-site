import { gallery } from '../../data/gallery'
import type { GallerySpan } from '../../types'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

const spanClasses: Record<GallerySpan, string> = {
  square: '',
  wide: 'col-span-2',
  tall: 'row-span-2',
  large: 'col-span-2 row-span-2',
}

const spanSizes: Record<GallerySpan, string> = {
  square: '(min-width: 768px) 25vw, 50vw',
  wide: '(min-width: 768px) 50vw, 100vw',
  tall: '(min-width: 768px) 25vw, 50vw',
  large: '(min-width: 768px) 50vw, 100vw',
}

export function Gallery() {
  return (
    <section id="gallery" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Instagram · @plan.travel"
          title={
            <>
              Моменты, <span className="serif-accent text-ocean">которые остаются</span>
            </>
          }
          subtitle="Фотографии из поездок нашей команды и путешественников PLAN."
          aside={
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="link-underline font-display text-sm font-semibold"
            >
              Подписаться
            </a>
          }
        />

        <ul className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:auto-rows-[13rem] lg:auto-rows-[15.5rem] xl:auto-rows-[17rem]">
          {gallery.map((item, index) => (
            <Reveal as="li" key={item.id} delay={(index % 4) * 0.06} className={`group relative overflow-hidden ${spanClasses[item.span]}`}>
              <SmartImage
                photo={item.photo}
                alt={item.alt}
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                sizes={spanSizes[item.span]}
                fallbackLabel={item.place}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-paper opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display font-semibold">{item.place}</p>
                <p className="text-xs text-paper/75">{item.country}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
