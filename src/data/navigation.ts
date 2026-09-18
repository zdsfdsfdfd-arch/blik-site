import type { NavItem } from '../types/index.ts'

/** Primary navigation — compact technical labels with indices. */
export const mainNav: NavItem[] = [
  { index: '01', label: 'Работы', to: '/work' },
  { index: '02', label: 'Услуги', to: '/services' },
  { index: '03', label: 'Тарифы', to: '/pricing' },
  { index: '04', label: 'Студия', to: '/about' },
  { index: '05', label: 'Контакты', to: '/contact' },
]

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Студия',
    links: [
      { label: 'О студии', to: '/about' },
      { label: 'Как мы работаем', to: '/process' },
      { label: 'Отзывы', to: '/reviews' },
      { label: 'Вопросы и ответы', to: '/faq' },
      { label: 'Контакты', to: '/contact' },
    ],
  },
  {
    title: 'Работы',
    links: [
      { label: 'Все проекты', to: '/work' },
      { label: 'Рекламные ролики', to: '/work?type=advertising' },
      { label: 'Презентационные', to: '/work?type=presentation' },
      { label: 'Мероприятия', to: '/work?type=event' },
      { label: 'Графика и анимация', to: '/work?type=graphics' },
      { label: 'YouTube и соцсети', to: '/work?type=social' },
    ],
  },
]

/** Routes whose first screen is light — the navbar starts in its light tone there. */
export const lightRoutes = [/^\/services/, /^\/pricing/, /^\/about/, /^\/contact/, /^\/process/, /^\/faq/, /^\/reviews/, /^\/privacy/]
