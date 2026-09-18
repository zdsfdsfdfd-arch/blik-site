import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Play } from 'lucide-react'
import type { ImageRef, VideoRef } from '../../types'
import { embedUrl, posterSources } from '../../lib/media'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { SmartImage } from './SmartImage'

interface VideoFrameProps {
  video?: VideoRef
  poster: ImageRef
  title: string
  /** Tailwind aspect class, e.g. "aspect-video". */
  aspect?: string
  className?: string
  priority?: boolean
  /** Technical caption printed in the frame's bottom-left corner. */
  caption?: string
  autoplayLocal?: boolean
}

/**
 * Media facade: poster + viewfinder brackets + play control. The heavy player
 * iframe is only created after the visitor presses play, which keeps pages light.
 * Local files render a native <video>; hosted videos embed on demand.
 */
export function VideoFrame({ video, poster, title, aspect = 'aspect-video', className = '', priority, caption, autoplayLocal = true }: VideoFrameProps) {
  const [playing, setPlaying] = useState(false)
  const reduceMotion = useReducedMotion()
  const sources = posterSources(poster, video)
  const canPlay = Boolean(video)

  if (video?.platform === 'local') {
    return (
      <div className={`relative overflow-hidden bg-chassis-2 ${aspect} ${className}`}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.id}
          poster={sources[0]}
          muted
          playsInline
          loop
          autoPlay={autoplayLocal && !reduceMotion}
          controls={!autoplayLocal}
          preload="metadata"
          aria-label={title}
        />
      </div>
    )
  }

  return (
    <div className={`group/frame relative overflow-hidden bg-chassis-2 text-[#f1eee8] ${aspect} ${className}`}>
      <AnimatePresence initial={false}>
        {playing && video ? (
          <motion.iframe
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full"
            src={embedUrl(video)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <motion.div key="poster" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
            <SmartImage
              sources={sources}
              alt={poster.alt}
              className="h-full w-full"
              imgClassName={canPlay ? 'transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.03]' : ''}
              priority={priority}
              fallbackLabel={title}
              sizes="(min-width: 1024px) 70vw, 100vw"
            />
            <div aria-hidden="true" className="corners corners-lg pointer-events-none absolute inset-3 text-[#f1eee8]/80 md:inset-4" />
            {caption && (
              <p className="label-mono pointer-events-none absolute bottom-4 left-4 bg-chassis/70 px-2 py-1 backdrop-blur-sm md:bottom-5 md:left-5">
                {caption}
              </p>
            )}
            {canPlay && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                data-cursor="play"
                aria-label={`Смотреть: ${title}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.span
                  className="flex h-16 w-16 items-center justify-center bg-signal text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-110 md:h-20 md:w-20"
                  initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
                >
                  <Play className="ml-0.5 h-6 w-6 fill-current md:h-7 md:w-7" strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
