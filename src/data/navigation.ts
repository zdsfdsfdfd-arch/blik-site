import type { NavItem } from '../types'

export const mainNav: NavItem[] = [
  { label: 'Направления', to: '/#destinations' },
  { label: 'Туры', to: '/tours' },
  { label: 'О нас', to: '/#about' },
  { label: 'Почему PLAN', to: '/#why-plan' },
  { label: 'Отзывы', to: '/#reviews' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Контакты', to: '/#contacts' },
]

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Компания',
    links: [
      { label: 'О PLAN', to: '/about' },
      { label: 'Команда', to: '/about#team' },
      { label: 'Карьера', to: '/about#careers' },
      { label: 'Контакты', to: '/#contacts' },
    ],
  },
  {
    title: 'Путешествия',
    links: [
      { label: 'Направления', to: '/#destinations' },
      { label: 'Туры', to: '/tours' },
      { label: 'Travel stories', to: '/stories' },
    ],
  },
  {
    title: 'Помощь',
    links: [
      { label: 'FAQ', to: '/#faq' },
      { label: 'Условия', to: '/terms' },
      { label: 'Политика конфиденциальности', to: '/privacy' },
    ],
  },
]

/** Routes that open with a full-bleed dark hero — the navbar starts transparent there. */
export const darkHeroRoutes = [/^\/$/, /^\/tours\/[^/]+$/, /^\/stories\/[^/]+$/]
