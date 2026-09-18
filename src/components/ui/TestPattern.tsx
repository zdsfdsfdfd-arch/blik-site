interface TestPatternProps {
  label?: string
  className?: string
}

/**
 * "No signal" placeholder for media that has not loaded: monochrome bars with
 * one signal-coloured stripe — a nod to the colour-bar test card, in our palette.
 */
export function TestPattern({ label = 'NO SIGNAL', className = '' }: TestPatternProps) {
  const bars = ['#2a2a2e', '#3a3a3f', '#4b4b51', '#5d5d64', '#ff4d1c', '#8a8a90', '#a9a9ae', '#1b1b1e']
  return (
    <div role="img" aria-label={label} className={`relative flex h-full w-full overflow-hidden bg-chassis-2 ${className}`}>
      {bars.map((color, i) => (
        <span key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
      ))}
      <span className="label-mono absolute bottom-3 left-3 bg-chassis/85 px-2 py-1 text-[#f1eee8]">{label}</span>
    </div>
  )
}
