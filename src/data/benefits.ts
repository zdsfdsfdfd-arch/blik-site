import { Globe2, Headset, ShieldCheck, UserRound } from 'lucide-react'
import type { Benefit } from '../types'

export const benefits: Benefit[] = [
  {
    id: 'b-1',
    icon: UserRound,
    title: 'Индивидуальный подход',
    text: 'Маршрут создаётся под конкретного путешественника — его темп, интересы и бюджет.',
  },
  {
    id: 'b-2',
    icon: ShieldCheck,
    title: 'Проверенные партнёры',
    text: 'Отели, гиды и сервисы, которые проходят проверку нашей командой — лично, а не по отзывам.',
  },
  {
    id: 'b-3',
    icon: Headset,
    title: 'Поддержка 24/7',
    text: 'Помощь до, во время и после путешествия. Один номер, на который отвечают всегда.',
  },
  {
    id: 'b-4',
    icon: Globe2,
    title: 'Весь мир',
    text: 'Работаем с направлениями на всех континентах — от европейских столиц до Антарктиды.',
  },
]
