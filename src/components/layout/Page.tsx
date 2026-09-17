import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useScrollToHash } from '../../hooks/useScrollToHash'
import { useSeo } from '../../hooks/useSeo'
import { pageVariants } from '../../lib/motion'

interface PageProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

/** Route wrapper: sets SEO tags, handles scroll restoration and plays the page transition. */
export function Page({ title, description, children, className = '' }: PageProps) {
  useSeo(title, description)
  useScrollToHash()

  return (
    <motion.main
      id="main"
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}
