import type { Review } from '../types/index'

/**
 * Client feedback as published on public directories. Texts marked `paraphrased`
 * summarise the published review; verbatim quotes are shown as such.
 */
export const reviews: Review[] = [
  {
    id: 'rakus',
    author: 'RAKUS',
    company: 'Санкт-Петербург',
    text: 'Многолетнее сотрудничество по рекламным роликам. Клиент отмечает профессионализм и первоклассную работу команды и отдельно — Романа: команда знает своё дело, соблюдает сроки и готова подстраиваться под нужный график и локации съёмок по всей России.',
    rating: 5,
    source: '2ГИС',
    sourceUrl: 'https://2gis.ru/kazan/firm/70000001042632679/tab/reviews',
    paraphrased: true,
  },
  {
    id: 'yandex-2018',
    author: 'Постоянный клиент',
    text: 'Сотрудничество с 2018 года: надёжность, качественный результат и оперативность работы.',
    rating: 5,
    source: 'Яндекс Карты',
    sourceUrl: 'https://yandex.ru/maps/org/videokzn/129741361072/reviews/',
    paraphrased: true,
  },
  {
    id: 'site-themes',
    author: 'Клиенты студии',
    text: 'Профессиональный подход от концепции до финального монтажа, гибкость команды, качественный продукт и отличное соотношение цены и качества.',
    rating: 5,
    source: 'Отзывы на сайте студии, рейтинг 9,7',
    sourceUrl: 'https://xn--80adgaeqsyfakm2i.xn--p1ai/',
    paraphrased: true,
  },
  {
    id: '2gis-themes',
    author: 'Клиенты студии',
    text: 'Очень адекватные цены, отличная клиентоориентированность, профессионализм и высокое качество работы.',
    rating: 5,
    source: '2ГИС, 5,0 из 5',
    sourceUrl: 'https://2gis.ru/kazan/firm/70000001042632679/tab/reviews',
    paraphrased: true,
  },
]
