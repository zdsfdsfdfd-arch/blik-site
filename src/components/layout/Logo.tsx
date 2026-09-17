import { Link } from 'react-router-dom'

interface LogoProps {
  tone?: 'ink' | 'paper'
  className?: string
  onClick?: () => void
}

export function Logo({ tone = 'ink', className = '', onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="PLAN — на главную"
      className={`group/logo inline-flex items-baseline gap-1 font-display text-2xl font-extrabold tracking-[-0.06em] transition-colors duration-300 ${
        tone === 'paper' ? 'text-paper' : 'text-ink'
      } ${className}`}
    >
      PLAN
      <span
        aria-hidden="true"
        className={`inline-block h-1.5 w-1.5 translate-y-[-0.1em] rounded-full transition-transform duration-500 ease-out group-hover/logo:scale-150 ${
          tone === 'paper' ? 'bg-sand' : 'bg-ocean'
        }`}
      />
    </Link>
  )
}
