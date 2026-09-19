import type { CrewMember } from '../types'

/**
 * The eight people from the «ПРОДАКШН» group portrait on the original homepage —
 * names and roles exactly as the studio published them on its own name tags.
 * Portraits are the studio's own cut-outs (research/source, block rec408151355).
 */
export const crew: CrewMember[] = [
  { slug: 'bulat', name: 'Булат', role: 'Художник по свету', holding: 'со световыми трубками в руках', photo: '/media/images/team/bulat' },
  { slug: 'aleksey', name: 'Алексей', role: 'Пилот квадрокоптера', holding: 'с FPV-дроном и очками пилота', photo: '/media/images/team/aleksey' },
  { slug: 'nikolay', name: 'Николай', role: 'Видеооператор', holding: 'с камерой на стабилизаторе', photo: '/media/images/team/nikolay' },
  { slug: 'semen', name: 'Семён', role: 'Кинооператор', holding: 'с кинокамерой', photo: '/media/images/team/semen' },
  { slug: 'roman', name: 'Роман Лузянин', role: 'Режиссёр', holding: 'с рацией', photo: '/media/images/team/roman' },
  { slug: 'irina', name: 'Ирина', role: 'Режиссёр монтажа', holding: 'с ноутбуком', photo: '/media/images/team/irina' },
  { slug: 'anisa', name: 'Аниса', role: 'Гримёр', holding: 'с кистями и палитрой', photo: '/media/images/team/anisa' },
  { slug: 'iskhak', name: 'Исхак', role: 'Звукорежиссёр', holding: 'с микрофоном-пушкой и в наушниках', photo: '/media/images/team/iskhak' },
]

export const crewWord = 'ПРОДАКШН'
