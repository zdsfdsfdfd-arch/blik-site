import type { ProjectCategory } from '../../types'
import { categoryLabels } from '../../data/projects'

interface WorkFiltersProps {
  categories: ProjectCategory[]
  active: ProjectCategory | 'all'
  counts: Record<string, number>
  onChange: (value: ProjectCategory | 'all') => void
}

/** Filter row styled as tabs on a ruler; keyboard accessible radio group. */
export function WorkFilters({ categories, active, counts, onChange }: WorkFiltersProps) {
  const options: { value: ProjectCategory | 'all'; label: string }[] = [{ value: 'all', label: 'Все' }, ...categories.map((c) => ({ value: c, label: categoryLabels[c] }))]
  return (
    <div role="radiogroup" aria-label="Фильтр по формату" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
      {options.map((option) => {
        const selected = option.value === active
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`label-mono-lg inline-flex shrink-0 items-center gap-2 border px-3 py-2 transition-colors duration-300 ${
              selected ? 'border-fg bg-fg text-bg' : 'border-line text-fg-2 hover:border-fg hover:text-fg'
            }`}
          >
            {option.label}
            <span className={selected ? 'text-bg/60' : 'text-fg-3'}>{counts[option.value] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
