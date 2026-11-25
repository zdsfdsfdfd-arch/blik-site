/** Russian plural forms: [1 день, 2 дня, 5 дней]. */
export function plural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return forms[2]
  if (last > 1 && last < 5) return forms[1]
  if (last === 1) return forms[0]
  return forms[2]
}

export function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-US')}`
}

export function formatDays(days: number): string {
  return `${days} ${plural(days, ['день', 'дня', 'дней'])}`
}

export function formatTours(count: number): string {
  return `${count} ${plural(count, ['тур', 'тура', 'туров'])}`
}

export function formatTravellers(count: number): string {
  return `${count} ${plural(count, ['путешественник', 'путешественника', 'путешественников'])}`
}

/** 8500 → "8 500" (regular space so it renders identically in every font). */
export function formatNumber(value: number, decimals = 0): string {
  return value
    .toLocaleString('ru-RU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .replace(/[\u00a0\u202f]/g, ' ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
}

/** Today as YYYY-MM-DD in local time — used for date input minimums. */
export function todayISO(): string {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}
