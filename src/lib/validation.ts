export interface BriefValues {
  name: string
  phone: string
  email: string
  company: string
  format: string
  budget: string
  message: string
  consent: boolean
}

export type BriefErrors = Partial<Record<keyof BriefValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[0-9()\s-]{10,20}$/

export function validateBrief(values: BriefValues): BriefErrors {
  const errors: BriefErrors = {}
  const name = values.name.trim()
  const phone = values.phone.trim()
  const email = values.email.trim()

  if (name.length < 2) errors.name = 'Как к вам обращаться? Минимум 2 символа.'
  else if (name.length > 60) errors.name = 'Имя слишком длинное.'

  if (!phone && !email) {
    errors.phone = 'Оставьте телефон или email — иначе мы не сможем ответить.'
  }
  if (phone && (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 10)) {
    errors.phone = 'Проверьте номер, например +7 900 000-00-00.'
  }
  if (email && !EMAIL_RE.test(email)) errors.email = 'Проверьте адрес почты.'

  if (!values.format) errors.format = 'Выберите, что нужно снять.'
  if (values.message.length > 1200) errors.message = 'Описание — до 1200 символов.'
  if (!values.consent) errors.consent = 'Нужно согласие на обработку данных.'

  return errors
}
