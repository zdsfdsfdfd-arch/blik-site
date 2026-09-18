import type { Address, SocialLink, TeamMember } from '../types/index'

/** Site-level metadata used by the SEO hook and the static index.html. */
export const site = {
  name: 'Видеопродакшн.РФ',
  shortName: 'Видеопродакшн.РФ',
  /** Canonical origin — the punycode form of видеопродакшн.рф. */
  url: 'https://xn--80adgaeqsyfakm2i.xn--p1ai',
  domain: 'видеопродакшн.рф',
  defaultTitle: 'Профессиональная видеосъемка для вашего бизнеса | Видеопродакшн.РФ',
  defaultDescription:
    'Профессиональная видеосъёмка под ключ: рекламные, имиджевые и презентационные ролики, съёмка мероприятий, аэросъёмка, 2D/3D-графика. Продакшн-студия полного цикла — Казань, Москва, Санкт-Петербург и вся Россия, с 2015 года.',
  ogImage: '/media/images/general/og-cover.jpg',
}

export const company = {
  name: 'Видеопродакшн.РФ',
  formerName: 'VIDEOKZN',
  formerDomain: 'videokzn.ru',
  tagline: 'Продакшн-студия полного цикла',
  slogan: 'Влюбляем в вашу компанию, повышаем узнаваемость!',
  founded: 2015,
  phone: '+7 (905) 377-12-78',
  email: 'mail@видеопродакшн.рф',
  legacyEmail: 'post@videokzn.ru',
  hours: 'Пн–Вс 09:00–20:00',
  cities: ['Казань', 'Москва', 'Санкт-Петербург'],
  extraCities: ['Екатеринбург', 'Нижний Новгород'],
  addresses: [
    { city: 'Казань', address: 'ул. Спартаковская, 88Б, 420049', note: 'м. Аметьево', mapUrl: 'https://yandex.ru/maps/org/videoprodakshn_rf/129741361072/' },
  ] as Address[],
  socials: [
    { network: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@video_rf' },
  ] as SocialLink[],
  team: [] as TeamMember[],
  /** Key numbers as published on the current site and directory profiles. */
  numbers: [
    { value: 2500, suffix: '+', label: 'работ', note: 'видеопроектов с 2015 года' },
    { value: 600, suffix: '+', label: 'клиентов', note: 'счастливых заказчиков' },
    { value: 45000, suffix: '+', label: 'часов', note: 'опыта съёмок и монтажа' },
    { value: 25, suffix: '', label: 'городов', note: 'от Санкт-Петербурга до Екатеринбурга' },
    { value: 15, suffix: '', label: 'специалистов', note: 'в штате студии' },
    { value: 5, suffix: ' млн ₽', label: 'оборудования', note: 'собственная съёмочная база' },
  ],
  ratings: [
    { source: '2ГИС', value: '5,0', note: '52 отзыва', href: 'https://2gis.ru/kazan/firm/70000001042632679/tab/reviews' },
    { source: 'Рейтинг на сайте', value: '9,7', note: '40 отзывов', href: '' },
  ],
}
