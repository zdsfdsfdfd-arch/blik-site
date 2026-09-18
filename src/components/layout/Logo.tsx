import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  onClick?: () => void
  /** Compact form for the navbar; the footer uses the large lockup. */
  size?: 'sm' | 'lg'
}

/** Typographic wordmark with a blinking REC tally — the studio's signature. */
export function Logo({ className = '', onClick, size = 'sm' }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Видеопродакшн.РФ — на главную"
      className={`group/logo inline-flex items-center gap-2.5 font-display font-semibold uppercase text-fg ${
        size === 'lg' ? 'text-2xl tracking-[-0.02em] sm:text-3xl' : 'text-[0.8125rem] tracking-[0.02em]'
      } ${className}`}
    >
      <span aria-hidden="true" className={`rec-dot inline-block bg-signal ${size === 'lg' ? 'h-3.5 w-3.5' : 'h-2 w-2'}`} />
      <span>
        Видеопродакшн<span className="text-signal transition-colors duration-300 group-hover/logo:text-fg">.рф</span>
      </span>
    </Link>
  )
}
