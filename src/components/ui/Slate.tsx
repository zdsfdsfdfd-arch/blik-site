interface SlateField {
  label: string
  value: string
}

interface SlateProps {
  fields: SlateField[]
  className?: string
  /** Prints the striped clapper bar across the top. */
  stripe?: boolean
  columns?: 2 | 3 | 4 | 5
}

/**
 * Clapperboard-style fact sheet: mono labels over display values, in a ruled grid.
 * Used for project metadata, service specs and the studio's key numbers.
 */
export function Slate({ fields, className = '', stripe = true, columns = 4 }: SlateProps) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-3 lg:grid-cols-5' }[columns]
  return (
    <dl className={`border border-line ${className}`}>
      {stripe && (
        <div
          aria-hidden="true"
          className="h-3 w-full border-b border-line bg-[repeating-linear-gradient(-45deg,var(--fg)_0_14px,transparent_14px_28px)] opacity-90"
        />
      )}
      <div className={`grid grid-cols-1 ${cols}`}>
        {fields.map((field, i) => (
          <div key={field.label} className={`px-4 py-4 md:px-5 md:py-5 ${i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}>
            <dt className="label-mono text-fg-3">{field.label}</dt>
            <dd className="text-display-xs mt-2 text-fg md:mt-3">{field.value}</dd>
          </div>
        ))}
      </div>
    </dl>
  )
}
