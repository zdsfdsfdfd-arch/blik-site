import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Magnetic } from './Magnetic'

type Variant = 'solid' | 'signal' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Internal route — renders a <Link>. */
  to?: string
  /** External URL — renders an <a>. */
  href?: string
  /** Mono index rendered before the label, e.g. "01". */
  index?: string
  arrow?: 'right' | 'up-right' | 'none'
  magnetic?: boolean
  className?: string
}

const base =
  'group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-sans font-medium tracking-[-0.005em] transition-[color,border-color,opacity] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60 ' +
  'before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100'

const variants: Record<Variant, string> = {
  solid: 'bg-fg text-bg before:bg-signal hover:text-ink focus-visible:text-ink',
  signal: 'bg-signal text-ink before:bg-fg hover:text-bg focus-visible:text-bg',
  outline: 'border border-line text-fg before:bg-fg hover:border-fg hover:text-bg focus-visible:text-bg',
  ghost: 'text-fg before:bg-fg/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.8125rem]',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

const arrowClasses = 'h-4 w-4 shrink-0 transition-transform duration-300 ease-out'

function ArrowIcon({ arrow }: { arrow: ButtonProps['arrow'] }) {
  if (arrow === 'right') return <ArrowRight className={`${arrowClasses} group-hover/btn:translate-x-1`} strokeWidth={1.75} aria-hidden="true" />
  if (arrow === 'up-right')
    return <ArrowUpRight className={`${arrowClasses} group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`} strokeWidth={1.75} aria-hidden="true" />
  return null
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  to,
  href,
  index,
  arrow = 'none',
  magnetic = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {index && <span className="label-mono opacity-60">{index}</span>}
      <span>{children}</span>
      <ArrowIcon arrow={arrow} />
    </>
  )

  let element: ReactNode
  if (to) {
    element = (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  } else if (href) {
    element = (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  } else {
    element = (
      <button type={type} className={classes} {...rest}>
        {content}
      </button>
    )
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element
}
