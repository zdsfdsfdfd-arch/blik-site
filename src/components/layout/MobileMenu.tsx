import { useEffect } from 'react'
import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { company } from '../../data/company'
import { mainNav } from '../../data/navigation'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { phoneHref } from '../../lib/format'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Logo } from './Logo'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  useLockBodyScroll(true)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Меню"
      data-theme="dark"
      className="dots fixed inset-0 z-[60] flex flex-col bg-bg text-fg"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: EASE_OUT_EXPO } }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
    >
      <div className="container-x flex h-16 items-center justify-between border-b border-line md:h-20">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть меню"
          className="label-mono inline-flex h-10 items-center gap-2 border border-line px-3 transition-colors hover:border-fg"
        >
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Закрыть
        </button>
      </div>

      <nav aria-label="Мобильная навигация" className="container-x flex flex-1 flex-col justify-center py-8">
        <ul>
          {mainNav.map((item, index) => (
            <li key={item.to} className="overflow-hidden border-b border-line">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 + index * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-baseline gap-4 py-4 font-display text-3xl font-medium tracking-[-0.03em] xs:text-4xl sm:text-5xl ${
                      isActive ? 'text-signal' : 'text-fg'
                    }`
                  }
                >
                  <span className="label-mono w-8 shrink-0 text-fg-3">{item.index}</span>
                  <span>{item.label}</span>
                  <ArrowUpRight className="ml-auto h-6 w-6 self-center text-signal opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={1.5} aria-hidden="true" />
                </NavLink>
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <Button to="/contact" variant="signal" size="lg" arrow="right" className="w-full sm:w-auto" onClick={onClose}>
            Обсудить проект
          </Button>
        </motion.div>
      </nav>

      <motion.div
        className="container-x flex flex-col gap-3 border-t border-line py-5 text-sm text-fg-2 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <div className="flex flex-col gap-1">
          {company.phone && (
            <a href={phoneHref(company.phone)} className="text-fg">
              {company.phone}
            </a>
          )}
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
        </div>
        <p className="label-mono text-fg-3">{company.cities.join(' · ')}</p>
      </motion.div>
    </motion.div>
  )
}
