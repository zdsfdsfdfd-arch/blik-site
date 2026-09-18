import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

const FPS = 25
/** Scroll pixels that make up one frame — tuned so a long page reads as a few minutes of footage. */
const PX_PER_FRAME = 6

export function formatTimecode(frames: number, fps = FPS): string {
  const total = Math.max(0, Math.floor(frames))
  const ff = total % fps
  const seconds = Math.floor(total / fps)
  const ss = seconds % 60
  const mm = Math.floor(seconds / 60) % 60
  const hh = Math.floor(seconds / 3600)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`
}

/** The page as a timeline: scroll position rendered as a SMPTE-style timecode. */
export function useTimecode(): string {
  const { scrollY } = useScroll()
  const [code, setCode] = useState(() => formatTimecode(0))
  useMotionValueEvent(scrollY, 'change', (latest) => setCode(formatTimecode(latest / PX_PER_FRAME)))
  return code
}
