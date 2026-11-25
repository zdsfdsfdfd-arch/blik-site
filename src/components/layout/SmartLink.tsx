import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToId } from '../../lib/scroll'

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  children: ReactNode
}

/**
 * Link that understands `/#section` targets: when the section lives on the
 * current page it scrolls smoothly instead of triggering a route change.
 */
export function SmartLink({ to, children, onClick, ...rest }: SmartLinkProps) {
  const { pathname } = useLocation()
  const [targetPath, hash] = to.split('#')

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (hash && (targetPath === pathname || targetPath === '')) {
      event.preventDefault()
      scrollToId(hash)
    }
  }

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
