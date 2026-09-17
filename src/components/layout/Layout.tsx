import type { ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { LoadingScreen } from './LoadingScreen'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const finePointer = useFinePointer()
  useSmoothScroll(finePointer)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Перейти к содержимому
      </a>
      <LoadingScreen />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
