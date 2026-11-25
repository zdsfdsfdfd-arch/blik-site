export interface BookingValues {
  name: string
  phone: string
  email: string
  destination: string
  date: string
  travellers: string
  comment: string
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[0-9()\s-]{10,20}$/

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {}
  const name = values.name.trim()
  const phone = values.phone.trim()
  const email = values.email.trim()

  if (name.length < 2) errors.name = 'Введите имя — минимум 2 символа.'
  else if (name.length > 60) errors.name = 'Имя слишком длинное.'

  if (!phone) errors.phone = 'Укажите телефон для связи.'
  else if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Введите корректный номер, например +7 900 000-00-00.'

  if (!email) errors.email = 'Укажите email.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Введите корректный email.'

  if (!values.destination) errors.destination = 'Выберите направление.'

  if (!values.date) errors.date = 'Выберите дату поездки.'
  else {
    const chosen = new Date(values.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (Number.isNaN(chosen.getTime())) errors.date = 'Некорректная дата.'
    else if (chosen < today) errors.date = 'Дата не может быть в прошлом.'
  }

  const travellers = Number(values.travellers)
  if (!values.travellers || !Number.isInteger(travellers) || travellers < 1 || travellers > 20)
    errors.travellers = 'Укажите от 1 до 20 путешественников.'

  if (values.comment.length > 600) errors.comment = 'Комментарий — до 600 символов.'

  return errors
}
