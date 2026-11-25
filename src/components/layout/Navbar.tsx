import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu } from 'lucide-react'
import { darkHeroRoutes, mainNav } from '../../data/navigation'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SmartLink } from './SmartLink'

export function Navbar() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  const overHero = darkHeroRoutes.some((pattern) => pattern.test(pathname))
  const dark = overHero && !scrolled
  const tone = dark ? 'paper' : 'ink'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled
            ? 'border-b border-line/80 bg-paper/80 shadow-[0_1px_0_rgba(18,19,23,0.02)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`container-x flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? 'h-16' : 'h-20 md:h-24'
          }`}
        >
          <Logo tone={tone} />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <SmartLink
                    to={item.to}
                    className={`link-underline text-[0.8125rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                      dark ? 'text-paper/85 hover:text-paper' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/tours" size="sm" variant={dark ? 'inverted' : 'primary'}>
              Найти тур
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                dark
                  ? 'border-paper/30 text-paper hover:bg-paper/10'
                  : 'border-line text-ink hover:bg-paper-2'
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}
