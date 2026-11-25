import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Magnetic } from './Magnetic'

type Variant = 'primary' | 'ocean' | 'outline' | 'inverted' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Internal route — renders a <Link>. */
  to?: string
  /** External URL — renders an <a>. */
  href?: string
  arrow?: 'right' | 'up-right' | 'none'
  magnetic?: boolean
  className?: string
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-display font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform,opacity] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ocean',
  ocean: 'bg-ocean text-paper hover:bg-ocean-2',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  inverted: 'bg-paper text-ink hover:bg-white',
  ghost: 'text-ink hover:text-ocean',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

const arrowClasses = 'h-4 w-4 transition-transform duration-300 ease-out'

function ArrowIcon({ arrow }: { arrow: ButtonProps['arrow'] }) {
  if (arrow === 'right')
    return <ArrowRight className={`${arrowClasses} group-hover/btn:translate-x-1`} strokeWidth={2} />
  if (arrow === 'up-right')
    return (
      <ArrowUpRight
        className={`${arrowClasses} group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`}
        strokeWidth={2}
      />
    )
  return null
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  arrow = 'none',
  magnetic = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
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
