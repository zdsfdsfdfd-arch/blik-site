import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { regions } from '../../data/destinations'
import { tours } from '../../data/tours'
import { todayISO } from '../../lib/format'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { validateBooking, type BookingErrors, type BookingValues } from '../../lib/validation'
import { Button } from '../ui/Button'
import { InputField, SelectField, TextareaField } from '../ui/Field'

interface BookingFormProps {
  /** Pre-select a tour by its title (used on tour pages). */
  defaultDestination?: string
  id?: string
}

const CUSTOM_ROUTE = 'Индивидуальный маршрут'

function initialValues(destination: string): BookingValues {
  return { name: '', phone: '', email: '', destination, date: '', travellers: '2', comment: '' }
}

type Status = 'idle' | 'submitting' | 'success'

export function BookingForm({ defaultDestination = '', id = 'booking-form' }: BookingFormProps) {
  const [values, setValues] = useState<BookingValues>(() => initialValues(defaultDestination))
  const [errors, setErrors] = useState<BookingErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof BookingValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const field = (key: keyof BookingValues) => ({
    name: key,
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: event.target.value }
      setValues(next)
      if (touched[key]) setErrors(validateBooking(next))
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [key]: true }))
      setErrors(validateBooking(values))
    },
    error: touched[key] ? errors[key] : undefined,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateBooking(values)
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true, destination: true, date: true, travellers: true, comment: true })

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
      return
    }

    setStatus('submitting')
    // Demo mode: emulate a request round-trip before showing the confirmation.
    window.setTimeout(() => setStatus('success'), 900)
  }

  const resetForm = () => {
    setValues(initialValues(defaultDestination))
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <div id={id} className="relative scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex flex-col items-start border border-line bg-paper p-8 sm:p-12"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ocean text-paper">
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
              >
                <Check className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
              </motion.span>
            </span>
            <h3 className="text-display-md mt-8">Спасибо!</h3>
            <p className="mt-4 max-w-md text-lg text-ink-2">
              Ваша заявка отправлена. Специалист PLAN свяжется с вами в ближайшее время.
            </p>
            <dl className="mt-8 grid w-full gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-muted">Направление</dt>
                <dd className="mt-1 font-medium">{values.destination}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Свяжемся по</dt>
                <dd className="mt-1 font-medium">{values.phone}</dd>
              </div>
            </dl>
            <Button variant="outline" size="sm" onClick={resetForm} className="mt-8">
              Отправить ещё одну заявку
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            aria-label="Заявка на бронирование"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="border border-line bg-paper p-6 sm:p-10"
          >
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <InputField id={`${id}-name`} label="Имя" type="text" autoComplete="given-name" placeholder="Как к вам обращаться" {...field('name')} />
              <InputField id={`${id}-phone`} label="Телефон" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 900 000-00-00" {...field('phone')} />
              <InputField id={`${id}-email`} label="Email" type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
              <SelectField id={`${id}-destination`} label="Направление" {...field('destination')}>
                <option value="">Выберите направление</option>
                {regions.map((region) => (
                  <optgroup key={region.id} label={region.name}>
                    {tours
                      .filter((tour) => tour.region === region.id)
                      .map((tour) => (
                        <option key={tour.id} value={tour.title}>
                          {tour.title} · {tour.country}
                        </option>
                      ))}
                  </optgroup>
                ))}
                <option value={CUSTOM_ROUTE}>{CUSTOM_ROUTE}</option>
              </SelectField>
              <InputField id={`${id}-date`} label="Дата" type="date" min={todayISO()} {...field('date')} />
              <InputField
                id={`${id}-travellers`}
                label="Количество путешественников"
                type="number"
                min={1}
                max={20}
                inputMode="numeric"
                {...field('travellers')}
              />
              <TextareaField
                id={`${id}-comment`}
                label="Комментарий"
                placeholder="Пожелания по отелю, датам, бюджету — всё, что поможет нам подобрать лучший вариант"
                wrapperClassName="sm:col-span-2"
                hint="Необязательно"
                {...field('comment')}
              />
            </div>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="ocean" size="lg" arrow="right" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
              </Button>
              <p className="max-w-xs text-xs text-muted">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" className="link-underline text-ink">
                  политикой конфиденциальности
                </a>
                .
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
