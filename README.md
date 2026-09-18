# Видеопродакшн.РФ — сайт продакшн-студии полного цикла

Многостраничный сайт для студии **Видеопродакшн.РФ** (Казань · Москва · Санкт-Петербург, с 2015 года): работы и кейсы, 15 страниц услуг, тарифы, процесс, студия, отзывы, FAQ, контакты с брифом.

Контент собран из исходного сайта https://xn--80adgaeqsyfakm2i.xn--p1ai/ и публичных профилей студии — см. `CONTENT-INVENTORY.md` (что найдено и с какой уверенностью), `SITE-ARCHITECTURE.md` (карта старого и нового сайта) и `research/` (отчёты поисковых сессий).

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`.

## Команды

| Команда | Описание |
| --- | --- |
| `npm run dev` | Dev-сервер Vite |
| `npm run build` | Проверка типов и production-сборка в `dist/` (плюс `sitemap.xml`) |
| `npm run preview` | Локальный просмотр production-сборки |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов (strict) |
| `npm run media:download` | Скачивает медиа из `public/media/media-manifest.json` в `public/media/…` и обновляет `src/generated/local-media.ts` |
| `npm run media:check` | Сверяет манифест с данными проектов |

## Стек

- **React 19 + TypeScript (strict) + Vite 8**
- **Tailwind CSS 4** — токены и утилиты в `src/styles/index.css`; темы секций через `data-theme="dark|light"`
- **Motion** — reveal, scroll-driven плёнка работ, плейхед процесса, переход «хлопушка» между страницами
- **Lenis** — плавный скролл на десктопе (учитывает `prefers-reduced-motion`)
- **React Router 7** — страницы, ленивые чанки, фильтр работ в URL
- Шрифты self-hosted: Unbounded (display), Onest (текст), JetBrains Mono (технические подписи)

## Структура

```
src/
├── components/
│   ├── layout/   Navbar (таймкод, индексы), MobileMenu, Footer, Cursor (визир), LoadingScreen, Page (SEO + переход)
│   ├── ui/       Button, ArrowLink, SectionHeader, Slate, VideoFrame, SmartImage, TestPattern, Marquee, Reveal, SplitLines, Counter, Field, BriefForm
│   ├── home/     Hero, Ticker, FeaturedWork, ServicesIndex, Clients, ProcessTimeline, Numbers, TariffsTeaser, Voices
│   ├── work/     ProjectCard, ProjectHero, ProjectGallery, WorkFilters
│   └── services/ ServiceHero
├── pages/        Home, Work, Project, Services, Service, Pricing, Process, About, Contact, Reviews, Faq, Privacy, NotFound
├── data/         company, services, projects, tariffs, process, reviews, clients, faq, navigation
├── hooks/        useSeo, useTimecode, useSmoothScroll, useScrollToHash, useMediaQuery, useLockBodyScroll
├── lib/          motion, media, format, scroll, validation
├── generated/    local-media.ts (обновляется скриптом)
└── styles/       index.css (дизайн-токены), fonts.css
public/media/     media-manifest.json, image-urls.txt, video-urls.txt, папки для локальных копий
scripts/          sitemap.ts (плагин Vite), download-media.mjs, check-media.mjs
```

## Данные

Проекты и услуги хранятся структурированно (`src/data/projects.ts`, `src/data/services.ts`): чтобы добавить кейс, достаточно добавить объект с `slug`, `title`, `client`, `category`, `video` (YouTube id) и `poster`. Страницы `/work/[slug]` и `/services/[slug]`, футер, фильтры и `sitemap.xml` собираются из этих данных.

## Медиа

Исходный сайт выгружен скриптом `scripts/fetch-source-site.mjs` через GitHub Actions (`.github/workflows/fetch-source-site.yml`): HTML, тексты, все изображения и идентификаторы видео лежат в ветке `research/source-fetch`. В проект перенесены только используемые файлы (`public/media/images/…`, WebP до 1280px): 142 обложки портфолио, 39 постеров видеоотзывов, 11 благодарственных писем, 9 логотипов клиентов и фото руководителя. Видео хостятся на VK Video студии (и частично на YouTube/Kinescope) и встраиваются по клику. Список всего найденного — `public/media/media-manifest.json`, `image-urls.txt`, `video-urls.txt`. Чтобы обновить выгрузку, запустите workflow «Fetch source site» вручную.

## Форма

`BriefForm` валидирует поля и эмулирует отправку. Подключите реальный endpoint/CRM в `handleSubmit` (`src/components/ui/BriefForm.tsx`).
