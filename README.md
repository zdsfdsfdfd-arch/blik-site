# PLAN — Путешествия по всему миру

Сайт туристического агентства **PLAN**: подбор направлений, каталог туров с фильтрацией и сортировкой, страницы туров с маршрутом по дням, форма заявки с валидацией, travel stories, отзывы, галерея и FAQ.

> Путешествие начинается с PLAN.

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Команды

| Команда                | Описание                                                    |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Dev-сервер Vite с горячей перезагрузкой                     |
| `npm run build`        | Проверка типов и production-сборка в `dist/`                |
| `npm run preview`      | Локальный просмотр production-сборки                        |
| `npm run lint`         | ESLint (TypeScript, React Hooks, React Refresh)             |
| `npm run typecheck`    | Проверка типов без сборки                                   |
| `npm run check:images` | Проверяет доступность всех фотографий и отсутствие повторов |
| `npm run images:download` | Скачивает все фотографии в `public/images` — сайт работает без внешних CDN |

## Стек

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS 4** — дизайн-токены в `src/styles/index.css`
- **Motion (Framer Motion)** — появление элементов, параллакс, переходы страниц, слайдер, аккордеон
- **Lenis** — плавный скролл на десктопе (учитывает `prefers-reduced-motion`)
- **React Router 7** — страницы и синхронизация фильтров с URL
- **Lucide React** — иконки

## Структура

```
src/
├── components/
│   ├── layout/   Navbar, MobileMenu, Footer, Cursor, LoadingScreen, ScrollProgress, Page
│   ├── ui/       Button, SmartImage, Reveal, SectionHeading, Field, Rating, Chip …
│   ├── home/     Hero, SearchBar, Destinations, About, Benefits, Stats, TravelStories,
│   │             Reviews, Gallery, FAQ, Contacts, CTA
│   ├── tours/    TourFinder, TourCard, TourGrid, TourCatalog, TourDetails, TourTimeline, BookingForm
│   └── stories/  StoryCard
├── pages/        Home, Tours, Tour, Stories, Story, About, Booking, Legal, NotFound
├── data/         туры (по регионам), направления, истории, отзывы, FAQ, галерея, компания
├── hooks/        useTourFilters, useCountUp, useSmoothScroll, useScrollToHash, useSeo …
├── lib/          фильтрация и сортировка, валидация, форматирование, изображения, motion-пресеты
├── styles/       глобальные стили и токены Tailwind
└── types/        общие TypeScript-типы
```

## Функционал

- Поиск в hero → каталог с параметрами в URL
- Фильтры: направление, дата (сезон тура), длительность, количество людей, бюджет, тип путешествия
- Сортировка: популярные, рейтинг, цена, длительность
- Страница тура: описание, галерея, timeline по дням, что входит / не входит, отель и питание, отзывы, похожие туры
- Форма заявки с валидацией и success-состоянием
- Адаптив от 360px до 1920px, без горизонтального скролла
- SEO: title / description / Open Graph на каждой странице, семантическая разметка, alt у всех изображений

## Изображения

Компонент `SmartImage` идёт по цепочке источников и переключается на следующий при ошибке загрузки:

1. локальная копия из `public/images` (если выполнен `npm run images:download`);
2. Unsplash CDN с адаптивным `srcset`;
3. подбор фотографии по ключевому слову (Flickr Creative Commons);
4. аккуратная заглушка — вёрстка никогда не ломается.

Для демонстрации без интернета один раз выполните `npm run images:download`: скрипт сохранит все фотографии в двух размерах и обновит манифест `src/generated/local-images.ts`. Папку `public/images` можно закоммитить вместе с манифестом.

## Страница «Видеопродакшн» (`videoproduction/`)

Отдельная статичная страница журнального лендинга видеопродакшна, перенесённая из Claude Design
и переработанная: чёрно-фиолетовая палитра без белых секций, цветные фото и логотипы, новые
типографические эффекты (проявление заголовков «через фокус», контур → заливка на этапах
процесса, барабан слов «За кадром», заливка контура по скроллу в географии).

- Открыть: `videoproduction/index.html` (работает и через `file://`, и в dev-сервере по адресу `/videoproduction/`).
- Свои кадры и логотипы кладутся в `videoproduction/images/` — имена файлов см. в `videoproduction/images/README.md`.
- Зависимостей нет: один HTML-файл, шрифты Golos Text и JetBrains Mono грузятся с Google Fonts.
