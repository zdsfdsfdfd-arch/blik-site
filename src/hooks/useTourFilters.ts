import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Tour } from '../types'
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterTours,
  parseFilters,
  parseSort,
  serializeFilters,
  sortTours,
  type SortId,
  type TourFilters,
} from '../lib/filters'

interface Options {
  tours: Tour[]
  /** Mirror filter state into the URL query string. */
  syncUrl?: boolean
}

export function useTourFilters({ tours, syncUrl = false }: Options) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<TourFilters>(() =>
    syncUrl ? parseFilters(searchParams) : DEFAULT_FILTERS,
  )
  const [sort, setSort] = useState<SortId>(() => (syncUrl ? parseSort(searchParams) : 'popular'))

  useEffect(() => {
    if (!syncUrl) return
    const next = serializeFilters(filters, sort)
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true })
    }
  }, [filters, sort, syncUrl, searchParams, setSearchParams])

  const results = useMemo(() => sortTours(filterTours(tours, filters), sort), [tours, filters, sort])

  const updateFilter = useCallback(<K extends keyof TourFilters>(key: K, value: TourFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSort('popular')
  }, [])

  return {
    filters,
    sort,
    results,
    activeCount: countActiveFilters(filters),
    updateFilter,
    setSort,
    reset,
  }
}
