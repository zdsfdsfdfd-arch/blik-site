import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Search } from 'lucide-react'
import { regions } from '../../data/destinations'
import { getCountries } from '../../data/tours'
import { TRAVEL_TYPES, TRAVEL_TYPE_LABELS } from '../../lib/filters'
import { todayISO } from '../../lib/format'
import { EASE_OUT_EXPO } from '../../lib/motion'

const countries = getCountries()

interface CellProps {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}

function Cell({ id, label, children, className = '' }: CellProps) {
  return (
    <div className={`relative flex flex-col gap-1 px-5 py-4 lg:px-6 lg:py-5 ${className}`}>
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  )
}

const control =
  'w-full appearance-none bg-transparent pr-6 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink outline-none'

function Chevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  )
}

/** Compact hero search: hands its values to the tours catalogue via the query string. */
export function SearchBar() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [people, setPeople] = useState('2')
  const [type, setType] = useState('all')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('destination', destination)
    if (date) params.set('date', date)
    if (people !== '2') params.set('people', people)
    if (type !== 'all') params.set('type', type)
    const query = params.toString()
    navigate(query ? `/tours?${query}` : '/tours')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Быстрый поиск путешествия"
      className="grid overflow-hidden border border-line bg-paper shadow-soft sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_auto] lg:divide-x lg:divide-line"
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.15 }}
    >
      <Cell id="search-destination" label="Куда?" className="border-b border-line sm:border-r lg:border-0">
        <select
          id="search-destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className={control}
        >
          <option value="">Любое направление</option>
          <optgroup label="Регионы">
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Страны">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </optgroup>
        </select>
        <Chevron />
      </Cell>

      <Cell id="search-date" label="Дата" className="border-b border-line lg:border-0">
        <input
          id="search-date"
          type="date"
          min={todayISO()}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className={`${control} pr-0`}
        />
      </Cell>

      <Cell id="search-people" label="Количество путешественников" className="border-b border-line sm:border-b-0 sm:border-r lg:border-0">
        <select
          id="search-people"
          value={people}
          onChange={(event) => setPeople(event.target.value)}
          className={control}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n === 6 ? '6 и больше' : n}
            </option>
          ))}
        </select>
        <Chevron />
      </Cell>

      <Cell id="search-type" label="Тип отдыха">
        <select
          id="search-type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          className={control}
        >
          <option value="all">Любой</option>
          {TRAVEL_TYPES.map((travelType) => (
            <option key={travelType} value={travelType}>
              {TRAVEL_TYPE_LABELS[travelType]}
            </option>
          ))}
        </select>
        <Chevron />
      </Cell>

      <div className="flex items-stretch sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          className="group flex h-14 w-full items-center justify-center gap-3 bg-ocean px-8 font-display text-base font-semibold text-paper transition-colors duration-300 hover:bg-ocean-2 lg:h-full lg:w-auto"
        >
          <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
          Найти
        </button>
      </div>
    </motion.form>
  )
}
