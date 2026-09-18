import type { ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { LoadingScreen } from './LoadingScreen'
import { Navbar } from './Navbar'

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
        className="label-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-signal focus:px-4 focus:py-3 focus:text-ink"
      >
        Перейти к содержимому
      </a>
      <LoadingScreen />
      <Cursor />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
