import { useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { company, socials } from '../../data/company'
import { mainNav } from '../../data/navigation'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { SmartLink } from './SmartLink'

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
      className="fixed inset-0 z-[60] flex flex-col bg-ocean-2 text-paper"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: EASE_OUT_EXPO } }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Logo tone="paper" onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть меню"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/10"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      <nav aria-label="Мобильная навигация" className="container-x flex flex-1 flex-col justify-center py-8">
        <ul className="space-y-1">
          {mainNav.map((item, index) => (
            <li key={item.to} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 + index * 0.05 }}
              >
                <SmartLink
                  to={item.to}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-paper/10 py-3 font-display text-3xl font-semibold tracking-[-0.03em] xs:text-4xl sm:text-5xl"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className="h-6 w-6 text-sand opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </SmartLink>
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Button to="/tours" variant="inverted" size="lg" arrow="right" className="w-full sm:w-auto">
            Найти тур
          </Button>
        </motion.div>
      </nav>

      <motion.div
        className="container-x flex flex-col gap-4 border-t border-paper/10 py-6 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-col gap-1">
          <a href={company.phoneHref} className="text-paper">
            {company.phone}
          </a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
        <ul className="flex gap-5">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer" className="link-underline text-paper">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
