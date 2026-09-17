import { AnimatePresence, motion } from 'motion/react'
import { SearchX } from 'lucide-react'
import type { Tour } from '../../types'
import { Button } from '../ui/Button'
import { TourCard } from './TourCard'

interface TourGridProps {
  tours: Tour[]
  onReset?: () => void
}

export function TourGrid({ tours, onReset }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center border border-dashed border-line px-6 py-20 text-center"
      >
        <SearchX className="h-8 w-8 text-muted" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="text-display-sm mt-5">По этим параметрам ничего не нашлось</h3>
        <p className="mt-3 max-w-md text-ink-2">
          Попробуйте изменить даты, бюджет или тип путешествия — или оставьте заявку, и мы соберём
          маршрут под вас.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {onReset && (
            <Button variant="outline" onClick={onReset}>
              Сбросить фильтры
            </Button>
          )}
          <Button to="/booking" variant="ocean" arrow="right">
            Индивидуальный маршрут
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.ul layout className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
      <AnimatePresence mode="popLayout" initial={false}>
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
