import type { TeamMember } from '../types'

export const company = {
  name: 'PLAN',
  tagline: 'Путешествие начинается с PLAN.',
  founded: 2012,
  phone: '+7 495 120-48-80',
  phoneHref: 'tel:+74951204880',
  email: 'hello@plan.travel',
  address: 'Москва, Большая Никитская, 12, офис 4',
  hours: 'Пн–Пт 10:00–20:00, Сб 11:00–17:00',
  coordinates: '55.7558° N, 37.6173° E',
}

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com', handle: '@plan.travel' },
  { label: 'Telegram', href: 'https://t.me', handle: '@plantravel' },
  { label: 'YouTube', href: 'https://youtube.com', handle: 'PLAN Travel' },
]

export const team: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Полина Соколова',
    role: 'Основатель и travel-директор',
    photo: 'photo-1494790108377-be9c29b29330',
    alt: 'Портрет Полины Соколовой',
  },
  {
    id: 'tm-2',
    name: 'Артём Ильин',
    role: 'Руководитель направления Азия',
    photo: 'photo-1507003211169-0a1dd7228f2d',
    alt: 'Портрет Артёма Ильина',
  },
  {
    id: 'tm-3',
    name: 'Мария Ковалёва',
    role: 'Эксперт по Европе и city break',
    photo: 'photo-1438761681033-6461ffad8d80',
    alt: 'Портрет Марии Ковалёвой',
  },
  {
    id: 'tm-4',
    name: 'Даниил Орлов',
    role: 'Приключения и экспедиции',
    photo: 'photo-1500648767791-00dcc994a43e',
    alt: 'Портрет Даниила Орлова',
  },
]

export const careers = [
  {
    id: 'c-1',
    title: 'Travel-консультант',
    type: 'Офис · Москва',
    text: 'Подбор и сопровождение путешествий по Европе и Ближнему Востоку. Опыт от двух лет.',
  },
  {
    id: 'c-2',
    title: 'Менеджер по работе с партнёрами',
    type: 'Гибрид',
    text: 'Отели, гиды и локальные операторы в Азии. Английский — свободный, готовность к командировкам.',
  },
  {
    id: 'c-3',
    title: 'Контент-редактор',
    type: 'Удалённо',
    text: 'Travel stories, описания туров и рассылки. Портфолио обязательно.',
  },
]

export const milestones = [
  { year: '2012', text: 'PLAN открывается как небольшое бюро индивидуальных путешествий в Москве.' },
  { year: '2016', text: 'Первые собственные программы в Азии и команда из десяти экспертов.' },
  { year: '2020', text: 'Поддержка 24/7 и полное переоформление путешествий во время пандемии — без потерь для клиентов.' },
  { year: '2024', text: '120 стран, 8 500 путешественников и средняя оценка 4.9 из 5.' },
  { year: '2026', text: 'Новая платформа PLAN: подбор, детали тура и заявка в одном месте.' },
]
