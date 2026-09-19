import { SITE_URL } from '../lib/base.ts'
import type { Address, SocialLink, TeamMember } from '../types/index.ts'

/** Site-level metadata used by the SEO hook and the static index.html. */
export const site = {
  name: 'Видеопродакшн.РФ',
  shortName: 'Видеопродакшн.РФ',
  /** Public URL of the site root: the punycode form of видеопродакшн.рф, or VITE_SITE_URL when deployed elsewhere. */
  url: SITE_URL,
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
  headline: 'Cоздаем видеоролики, которые работают на рост вашей компании',
  statement: 'Решаем вашу бизнес-задачу, а не создаем новую',
  founded: 2015,
  phone: '+7 (905) 377-12-78',
  whatsapp: 'https://wa.me/79053771278',
  email: 'mail@видеопродакшн.рф',
  legacyEmail: 'post@videokzn.ru',
  hours: 'Пн–Вс 09:00–20:00',
  cities: ['Казань', 'Москва', 'Санкт-Петербург'],
  extraCities: ['Екатеринбург', 'Нижний Новгород'],
  addresses: [
    { city: 'Казань', address: 'ул. Спартаковская, 88Б, 420049', note: 'м. Аметьево', mapUrl: 'https://yandex.ru/maps/org/videoprodakshn_rf/129741361072/' },
  ] as Address[],
  socials: [
    { network: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@videokzn' },
    { network: 'vk', label: 'ВКонтакте', href: 'https://vk.com/videokzn' },
  ] as SocialLink[],
  /** Where clients leave public reviews. */
  listings: [
    { label: '2ГИС', href: 'https://2gis.ru/kazan/firm/70000001042632679' },
    { label: 'Яндекс Карты', href: 'https://yandex.ru/maps/org/videokzn/129741361072/' },
  ],
  /** Founder as named on the homepage; colleagues thanked by name in reviews and letters. */
  founder: { name: 'Роман Лузянин', role: 'Руководитель Видеопродакшн.РФ', photo: '/media/images/team/roman-luzyanin.png' },
  team: [
    { name: 'Роман Лузянин', role: 'руководитель, режиссёр и оператор' },
    { name: 'Ирина Журавлева', role: 'фото- и видеосъёмка, контент для соцсетей' },
    { name: 'Алина', role: 'менеджер проектов' },
  ] as TeamMember[],
  /** «Наши сильные стороны» — as published on the studio's FAQ page. */
  strengths: [
    { title: 'Мы исполнители, а не посредники', body: 'Наш доход формируется из реально выполненной работы, а не из наценок на услуги субподрядчиков. Такой подход позволяет снижать цену по сравнению со многими конкурентами, не снижая качество. Каждый член команды — непосредственный специалист в сфере визуального и аудиоконтента.' },
    { title: 'Собственное оборудование', body: 'Собственный парк съёмочного оборудования позволяет организовать съёмку где угодно и когда угодно, не привязываясь к арендным компаниям и их условиям. Работая со своей аппаратурой, мы знаем все особенности её использования.' },
    { title: 'Можем всё', body: 'С 2015 года мы столкнулись со всеми возможными задачами: видеосъёмка всех типов и для любых площадок, создание графики, 3D-моделирование, фотография, графический дизайн, аудиоряд и многое другое.' },
    { title: 'Каждый клиент — особенный', body: 'Творчество — это бесконечное количество решений, и мы всегда стараемся придумать что-то новое, не пытаясь скопировать чей-то кейс. Обращаясь к нам, вы получите 100 % индивидуальный подход к поставленной задаче.' },
    { title: 'Надёжность и скорость работы', body: 'Когда каждый занимается своим делом, соблюдать сроки — легко и приятно. Поэтому мы их не нарушаем, а ещё вносим любые корректировки в работу при необходимости без повышения цены.' },
  ],
  /** Tools and gear named on the FAQ page. */
  gear: ['Съёмка в 4K', 'Собственные звукозаписывающие устройства, свет, стабилизаторы, штативы', 'Пакет Adobe, DaVinci, Cinema 4D'],
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
    { source: 'Рейтинг на сайте', value: '9,7', note: '40 отзывов', href: 'https://xn--80adgaeqsyfakm2i.xn--p1ai/' },
  ],
}
