/** Formats a phone for tel: links — digits with a leading plus. */
export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('+') ? digits : `+${digits}`}`
}

/** Two-digit index used across the system: 1 → "01". */
export function index2(n: number): string {
  return n.toString().padStart(2, '0')
}

/** Splits text into words so display headings can be animated word by word. */
export function words(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}
