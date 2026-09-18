import type { Project, ProjectCategory } from '../types/index'

const PORTFOLIO_SRC = 'https://xn--80adgaeqsyfakm2i.xn--p1ai/vse-videoroliki/1'
const LEGACY_PORTFOLIO_SRC = 'https://videokzn.ru/portfolio'

export const categoryLabels: Record<ProjectCategory, string> = {
  advertising: 'Рекламные ролики',
  image: 'Имиджевые видео',
  presentation: 'Презентационные',
  event: 'Мероприятия',
  social: 'Соцсети и YouTube',
  interview: 'Интервью и подкасты',
  aerial: 'Аэросъёмка',
  graphics: 'Графика и анимация',
  corporate: 'Корпоративное видео',
  education: 'Обучающие видео',
}

/**
 * Case studies reconstructed from the studio's portfolio pages and channel.
 * Only facts published by the studio are used; where a client did not name
 * itself publicly the project is described by its industry.
 */
export const projects: Project[] = [
  {
    slug: 'biek-tau',
    title: 'Логопарк «Биек Тау»',
    client: 'Логистический парк «Биек Тау»',
    category: 'advertising',
    format: 'Рекламный ролик',
    city: 'Казань',
    summary: 'Ролик о крупнейшем логистическом парке Татарстана — закрытом объекте, куда нельзя было попасть заранее для планирования съёмки.',
    sections: [
      {
        heading: 'Клиент',
        body: [
          '«Биек Тау» — крупнейший логистический парк Татарстана: склады класса A, 100 000 м² арендных площадей в двух километрах от Казани на федеральной трассе М7. Через парк идут грузы в Поволжье, на Урал и в Сибирь.',
        ],
      },
      {
        heading: 'Задача',
        body: [
          'Снять рекламный ролик о парке. Сложность — это закрытый объект: попасть на территорию заранее, чтобы спланировать съёмку и сделать раскадровку, было невозможно.',
        ],
      },
      {
        heading: 'Подход',
        body: [
          'Команда организовала съёмку сопровождающих кадров без предварительной подготовки — прямо на площадке, оценивая локации и свет по ходу дня. Опыт работы на промышленных объектах и собственное оборудование позволили не потерять в качестве.',
        ],
      },
      {
        heading: 'Результат',
        body: ['Отсутствие подготовительного этапа не отразилось на качестве материала. Заказчик остался доволен результатом.'],
      },
    ],
    services: ['reklamnye-videoroliki', 'aerosyemka', 'imidzhevye-roliki'],
    poster: { src: '', alt: 'Склады класса A логистического парка «Биек Тау» с высоты' },
    featured: true,
    sourceUrl: PORTFOLIO_SRC,
    seoDescription: 'Рекламный ролик для логистического парка «Биек Тау» под Казанью: съёмка закрытого объекта без предварительной подготовки. Кейс студии Видеопродакшн.РФ.',
  },
  {
    slug: 'stiralnyj-poroshok',
    title: 'Завод стирального порошка',
    client: 'Производитель бытовой химии',
    category: 'image',
    format: 'Видео о производстве',
    summary: 'Ролик для завода по производству стирального порошка: производство, которое нужно показать чисто и технологично.',
    sections: [
      {
        heading: 'Задача',
        body: ['Показать производство стирального порошка — линии, цеха, людей — так, чтобы зрителю было понятно, как устроен продукт и почему ему можно доверять.'],
      },
      {
        heading: 'Подход',
        body: ['Съёмка на действующем производстве: работа в цехах без остановки линий, аккуратная организация кадров вокруг технологического процесса.'],
      },
    ],
    services: ['imidzhevye-roliki', 'korporativnoe-video'],
    poster: { src: '', alt: 'Производственная линия завода стирального порошка' },
    featured: true,
    sourceUrl: LEGACY_PORTFOLIO_SRC,
    seoDescription: 'Видео о производстве для завода стирального порошка: съёмка на действующих линиях. Кейс продакшн-студии Видеопродакшн.РФ.',
  },
  {
    slug: 'agrokompaniya',
    title: 'Агрокомпания и тепло майнинга',
    client: 'Сельскохозяйственная компания',
    category: 'image',
    format: 'Видео о компании',
    summary: 'Видео для агрокомпании, которая выращивает продукцию с помощью тепла от оборудования для майнинга криптовалют.',
    sections: [
      {
        heading: 'Задача',
        body: ['Объяснить необычную технологию — теплицы, которые обогреваются оборудованием для майнинга, — и показать, что за ней стоит реальное производство продуктов.'],
      },
      {
        heading: 'Подход',
        body: ['Сочетание съёмки на объекте с ясной подачей технологии: сначала продукт и люди, затем — инженерная часть, которая делает проект уникальным.'],
      },
    ],
    services: ['imidzhevye-roliki', 'aerosyemka', 'animaciya-i-grafika'],
    poster: { src: '', alt: 'Теплицы агрокомпании, обогреваемые майнинговым оборудованием' },
    featured: true,
    sourceUrl: LEGACY_PORTFOLIO_SRC,
    seoDescription: 'Видео о сельскохозяйственной компании, выращивающей продукцию с помощью тепла от майнингового оборудования. Кейс Видеопродакшн.РФ.',
  },
  {
    slug: 'universitet',
    title: 'Презентация университета',
    client: 'Университет',
    category: 'presentation',
    format: 'Презентационное видео',
    summary: 'Презентационный ролик об университете: студенческая жизнь от медицинской практики до спорта и встреч с однокурсниками.',
    sections: [
      {
        heading: 'Задача',
        body: ['Показать университет глазами студента: учёбу, практику, спорт и общение — всё, ради чего абитуриент выбирает вуз.'],
      },
      {
        heading: 'Подход',
        body: ['Оператор студии провёл съёмку в разных сферах студенческой жизни — от медицинской практики до спортивных занятий и встреч однокурсников, — чтобы собрать из них цельную историю.'],
      },
    ],
    services: ['prezentacionnye-video', 'semka-meropriyatij', 'hr-video'],
    poster: { src: '', alt: 'Студенты университета на практике и на спортивной площадке' },
    featured: true,
    sourceUrl: LEGACY_PORTFOLIO_SRC,
    seoDescription: 'Презентационное видео об университете: студенческая жизнь от медицинской практики до спорта. Кейс студии Видеопродакшн.РФ.',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs.map((slug) => getProjectBySlug(slug)).filter((p): p is Project => Boolean(p))
}

export const featuredProjects = projects.filter((project) => project.featured)

export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}

export const categoriesInUse = (Object.keys(categoryLabels) as ProjectCategory[]).filter((category) =>
  projects.some((project) => project.category === category),
)
