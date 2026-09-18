import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface FieldShellProps {
  id: string
  label: string
  index?: string
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}

/** Mono label + control + message, styled as a line on a call sheet. */
function FieldShell({ id, label, index, error, hint, children, className = '' }: FieldShellProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="label-mono flex items-center gap-2 text-fg-3">
        {index && <span className="text-signal">{index}</span>}
        {label}
      </label>
      <div className="relative mt-1">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-signal">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-sm text-fg-3">{hint}</p>
      ) : null}
    </div>
  )
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  index?: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

export function InputField({ id, label, index, error, hint, wrapperClassName, className = '', ...rest }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} index={index} error={error} hint={hint} className={wrapperClassName}>
      <input id={id} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-error` : undefined} className={`field ${className}`} {...rest} />
    </FieldShell>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  index?: string
  error?: string
  hint?: string
  wrapperClassName?: string
  children: ReactNode
}

export function SelectField({ id, label, index, error, hint, wrapperClassName, className = '', children, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} index={index} error={error} hint={hint} className={wrapperClassName}>
      <select id={id} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-error` : undefined} className={`field cursor-pointer pr-8 ${className}`} {...rest}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-3" strokeWidth={1.5} aria-hidden="true" />
    </FieldShell>
  )
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  index?: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

export function TextareaField({ id, label, index, error, hint, wrapperClassName, className = '', ...rest }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} index={index} error={error} hint={hint} className={wrapperClassName}>
      <textarea id={id} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-error` : undefined} className={`field min-h-28 resize-y ${className}`} {...rest} />
    </FieldShell>
  )
}
