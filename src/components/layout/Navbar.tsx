import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react'
import { lightRoutes, mainNav } from '../../data/navigation'
import { useTimecode } from '../../hooks/useTimecode'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

function Timecode() {
  const code = useTimecode()
  return (
    <span className="label-mono hidden items-center gap-2 text-fg-3 xl:inline-flex" aria-hidden="true">
      <span className="rec-dot inline-block h-1.5 w-1.5 bg-signal" />
      TC {code}
    </span>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    setHidden(latest > 160 && latest > previous && !menuOpen)
  })

  const light = lightRoutes.some((pattern) => pattern.test(pathname))
  const theme = light ? 'light' : 'dark'

  return (
    <>
      <header
        data-theme={theme}
        className={`fixed inset-x-0 top-0 z-50 text-fg transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>
          <Logo />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group/nav inline-flex items-baseline gap-2 text-[0.8125rem] font-medium transition-colors duration-300 ${
                        isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`label-mono transition-colors ${isActive ? 'text-signal' : 'text-fg-3 group-hover/nav:text-signal'}`}>{item.index}</span>
                        <span className="link-underline">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <Timecode />
            <Button to="/contact" size="sm" variant="outline" className="hidden sm:inline-flex">
              Обсудить проект
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              className="label-mono inline-flex h-10 items-center gap-2.5 border border-line px-3 text-fg transition-colors hover:border-fg lg:hidden"
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
              Меню
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}
