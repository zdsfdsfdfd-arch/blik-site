import type { FormEvent } from 'react'
import { Minus, Plus, RotateCcw, Search } from 'lucide-react'
import { regions } from '../../data/destinations'
import { getCountries } from '../../data/tours'
import {
  BUDGET_OPTIONS,
  DURATION_OPTIONS,
  TRAVEL_TYPES,
  TRAVEL_TYPE_LABELS,
  type TourFilters,
} from '../../lib/filters'
import { todayISO } from '../../lib/format'
import { Chip } from '../ui/Chip'
import { InputField, SelectField } from '../ui/Field'

const countries = getCountries()

interface TourFinderProps {
  filters: TourFilters
  activeCount: number
  onChange: <K extends keyof TourFilters>(key: K, value: TourFilters[K]) => void
  onReset: () => void
  onSubmit: () => void
}

/** Full tour filter panel — every change is applied immediately; the button scrolls to results. */
export function TourFinder({ filters, activeCount, onChange, onReset, onSubmit }: TourFinderProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  const changePeople = (delta: number) =>
    onChange('people', Math.min(12, Math.max(1, filters.people + delta)))

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Фильтр туров"
      className="border border-line bg-paper p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        <SelectField
          id="finder-destination"
          label="Направление"
          value={filters.destination}
          onChange={(event) => onChange('destination', event.target.value)}
        >
          <option value="">Все направления</option>
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
        </SelectField>

        <InputField
          id="finder-date"
          label="Дата поездки"
          type="date"
          min={todayISO()}
          value={filters.date}
          onChange={(event) => onChange('date', event.target.value)}
        />

        <SelectField
          id="finder-duration"
          label="Продолжительность"
          value={filters.duration}
          onChange={(event) => onChange('duration', event.target.value as TourFilters['duration'])}
        >
          {DURATION_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <div className="flex flex-col">
          <span id="finder-people-label" className="eyebrow text-muted">
            Количество людей
          </span>
          <div
            role="group"
            aria-labelledby="finder-people-label"
            className="mt-1 flex items-center justify-between border-b border-line py-1.5"
          >
            <button
              type="button"
              onClick={() => changePeople(-1)}
              disabled={filters.people <= 1}
              aria-label="Меньше путешественников"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:border-ink disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <output aria-live="polite" className="font-display text-base font-semibold">
              {filters.people}
            </output>
            <button
              type="button"
              onClick={() => changePeople(1)}
              disabled={filters.people >= 12}
              aria-label="Больше путешественников"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:border-ink disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <SelectField
          id="finder-budget"
          label="Бюджет на человека"
          value={filters.budget}
          onChange={(event) => onChange('budget', event.target.value as TourFilters['budget'])}
        >
          {BUDGET_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="mt-8">
        <p className="eyebrow text-muted">Тип путешествия</p>
        <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
          <Chip active={filters.type === 'all'} onClick={() => onChange('type', 'all')}>
            Все
          </Chip>
          {TRAVEL_TYPES.map((type) => (
            <Chip key={type} active={filters.type === type} onClick={() => onChange('type', type)}>
              {TRAVEL_TYPE_LABELS[type]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex h-13 items-center justify-center gap-3 bg-ink px-7 font-display text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-ocean"
        >
          <Search className="h-4 w-4" strokeWidth={2} />
          Найти путешествие
        </button>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-muted transition-colors hover:text-ink sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            Сбросить фильтры ({activeCount})
          </button>
        )}
      </div>
    </form>
  )
}
