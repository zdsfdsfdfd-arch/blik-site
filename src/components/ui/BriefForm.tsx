import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { services } from '../../data/services'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { validateBrief, type BriefErrors, type BriefValues } from '../../lib/validation'
import { Button } from './Button'
import { InputField, SelectField, TextareaField } from './Field'

interface BriefFormProps {
  defaultFormat?: string
  id?: string
}

const BUDGETS = ['До 100 000 ₽', '100–300 тыс. ₽', '300 тыс. – 1 млн ₽', 'Более 1 млн ₽', 'Пока не знаю']

function initialValues(format: string): BriefValues {
  return { name: '', phone: '', email: '', company: '', format, budget: '', message: '', consent: false }
}

type Status = 'idle' | 'submitting' | 'success'

/**
 * The brief: the form the original site promises an individual calculation for.
 * Validates on blur/submit, focuses the first error, and confirms with a slate.
 * Submission is emulated client-side; wire `handleSubmit` to your CRM/endpoint.
 */
export function BriefForm({ defaultFormat = '', id = 'brief' }: BriefFormProps) {
  const [values, setValues] = useState<BriefValues>(() => initialValues(defaultFormat))
  const [errors, setErrors] = useState<BriefErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof BriefValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const field = (key: keyof BriefValues) => ({
    name: key,
    value: String(values[key]),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: event.target.value }
      setValues(next)
      if (touched[key]) setErrors(validateBrief(next))
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [key]: true }))
      setErrors(validateBrief(values))
    },
    error: touched[key] ? errors[key] : undefined,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateBrief(values)
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true, company: true, format: true, budget: true, message: true, consent: true })
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
      return
    }
    setStatus('submitting')
    window.setTimeout(() => setStatus('success'), 900)
  }

  const reset = () => {
    setValues(initialValues(defaultFormat))
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <div id={id} className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div key="success" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="border border-line p-6 md:p-10">
            <span className="flex h-14 w-14 items-center justify-center bg-signal text-ink">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}>
                <Check className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </motion.span>
            </span>
            <h3 className="text-display-md mt-8">Бриф принят</h3>
            <p className="prose-body mt-4 max-w-md">Перезвоним в течение часа в рабочее время, затем — бесплатная консультация, концепция и точный расчёт стоимости и сроков.</p>
            <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="label-mono text-fg-3">Задача</dt>
                <dd className="mt-1">{values.format}</dd>
              </div>
              <div>
                <dt className="label-mono text-fg-3">Свяжемся по</dt>
                <dd className="mt-1">{values.phone || values.email}</dd>
              </div>
            </dl>
            <Button variant="outline" size="sm" onClick={reset} className="mt-8">
              Отправить ещё один бриф
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={handleSubmit} aria-label="Бриф на видео" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="border border-line p-6 md:p-10">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <InputField id={`${id}-name`} index="01" label="Имя" type="text" autoComplete="given-name" placeholder="Как к вам обращаться" {...field('name')} />
              <InputField id={`${id}-company`} index="02" label="Компания" type="text" autoComplete="organization" placeholder="Название или сфера" {...field('company')} />
              <InputField id={`${id}-phone`} index="03" label="Телефон" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 900 000-00-00" {...field('phone')} />
              <InputField id={`${id}-email`} index="04" label="Email" type="email" autoComplete="email" placeholder="you@company.ru" {...field('email')} />
              <SelectField id={`${id}-format`} index="05" label="Что снимаем" {...field('format')}>
                <option value="">Выберите формат</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
                <option value="Другое">Другое / не знаю</option>
              </SelectField>
              <SelectField id={`${id}-budget`} index="06" label="Ориентир по бюджету" {...field('budget')}>
                <option value="">Не выбрано</option>
                {BUDGETS.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </SelectField>
              <TextareaField id={`${id}-message`} index="07" label="Задача" placeholder="Что нужно снять, для кого и к какому сроку" wrapperClassName="sm:col-span-2" {...field('message')} />
            </div>
            <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <label className="flex max-w-md items-start gap-3 text-sm text-fg-2">
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={(event) => {
                    const next = { ...values, consent: event.target.checked }
                    setValues(next)
                    if (touched.consent) setErrors(validateBrief(next))
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, consent: true }))}
                  aria-invalid={touched.consent && errors.consent ? 'true' : undefined}
                  className="mt-1 h-4 w-4 shrink-0 appearance-none border border-line bg-transparent checked:border-signal checked:bg-signal"
                />
                <span>
                  Согласен с{' '}
                  <a href="/privacy" className="link-underline text-fg">
                    политикой обработки персональных данных
                  </a>
                  {touched.consent && errors.consent && (
                    <span role="alert" className="mt-1 block text-signal-text">
                      {errors.consent}
                    </span>
                  )}
                </span>
              </label>
              <Button type="submit" variant="signal" size="lg" arrow="right" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Отправляем…' : 'Отправить бриф'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
