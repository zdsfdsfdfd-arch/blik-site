import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

interface ArrowLinkProps {
  to?: string
  href?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
}

/** Text link with a rising arrow — used for "all projects", "next", captions. */
export function ArrowLink({ to, href, children, className = '', size = 'md' }: ArrowLinkProps) {
  const classes = `group inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-signal-text ${
    size === 'sm' ? 'text-sm' : 'text-[0.9375rem]'
  } ${className}`
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden="true" />
    </>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={classes}>
      {inner}
    </Link>
  )
}
