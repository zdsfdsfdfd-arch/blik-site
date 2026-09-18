# SITE-ARCHITECTURE — Видеопродакшн.РФ

Источник: https://xn--80adgaeqsyfakm2i.xn--p1ai/ (видеопродакшн.рф), сайт на Tilda. Прежний домен студии — videokzn.ru (VIDEOKZN).
Исходный сайт, Tilda CDN и веб-архивы недоступны из среды сборки (egress-прокси возвращает 403), поэтому карта исходного сайта собрана по поисковой выдаче: заголовкам страниц, сниппетам и каталогам. См. `CONTENT-INVENTORY.md`.

## 1. Найденные URL исходного сайта

### Основные страницы

| URL | Title (по выдаче) | Тип |
| --- | --- | --- |
| `/` | Профессиональная видеосъемка для вашего бизнеса \| Видеопродакшн.РФ | главная |
| `/o-kompanii` | ВИДЕОПРОДАКШН.РФ - видеопроизводство полного цикла | о компании |
| `/vse-videoroliki/1` | Портфолио Видеопродакшн.РФ - Примеры видеороликов - Страница 01 | портфолио (пагинация; страницы 02+ поиском не найдены) |

### Страницы услуг (подтверждённые)

| URL | Title |
| --- | --- |
| `/reklamnye_videoroliki` | Профессиональный рекламный ролик под ключ |
| `/prezentacionnye_video` | Презентационное видео для компании: от идеи до монтажа |
| `/videoroliki_dlya_vystavok` | Видеоролик для выставок — эффективно для привлечения клиентов |
| `/aerosyemka` | Профессиональная аэросъемка с дроном — панорамы, реклама, картография |
| `/intervyu` | Профессиональная съемка интервью и подкастов |
| `/video_dlya_marketpleysov` | Эффективные видео для маркетплейсов, Ozon, WB, Яндекс |
| `/hr_video` | HR-видео для бизнеса — привлечение талантов |
| `/dokumentalnye_filmy` | Документальный фильм о компании под ключ — история, ценности, команда |
| `/ubiley` | Создание фильма на юбилей компании от профессионалов |

Пункты меню услуг без найденных отдельных страниц: информационные ролики, монтаж видео, видеообращение руководителя, имиджевые ролики, корпоративные ролики, видеосъёмка недвижимости, предметная фотосъёмка, обучающие видео и видеокурсы, видеосъёмка мероприятий (конференции, форумы, корпоративы, концерты), 2D-анимация, видео для соцсетей, производственные и отчётные видео, бизнес-видеоинструкции, запись вебинаров. В новой структуре из них сделаны страницы: имиджевые ролики, корпоративное видео, съёмка мероприятий, 2D/3D-графика и анимация, видео для соцсетей и YouTube, обучающие видео и курсы.

### Блог (найденные статьи)

- `/ob-etapah-sozdaniya-videorolikov` — Об этапах создания видеороликов
- `/tz-na-videosjemku-sekret-idealnogo-rolika-raskryt` — ТЗ на видеосъемку: Секрет идеального ролика раскрыт!
- `/bitreyt-video-kak-dobitsya-idealnogo-kachestva-vashih-rolikov` — Битрейт видео
- `/zakoldovannyj-krug-beskonechnye-video-petli` — Бесконечные видео-петли
- `/kadry-reshayut-vse-kak-video-dlya-hr-privlekaet-talanty` — Как видео для HR привлекает таланты
- `/kak-rasschitat-nailuchshuyu-prodolzhitelnost-videorolika` — Как рассчитать наилучшую продолжительность видеоролика
- `/kak-animaciya-pomogaet-v-biznese` — Как анимация помогает в бизнесе?
- `/animaciya-ili-semka-chto-vybrat` — Анимация или съемка? Что выбрать?
- `/kak-privlech-investicii-s-pomoshyu-animacionnogo-rolika` — Как привлечь инвестиции с помощью анимационного ролика?
- `/algoritmy-v-dvizhenii-procedurnaya-generaciya-v-video` — Процедурная генерация в видео
- `/dorogo-ili-deshevo-chto-vliyaet-na-stoimost-grafiki` — Дорого или дешево? Что влияет на стоимость графики?
- `/chto-takoe-telesufler-i-kakoy-iz-nih-vybrat-dlya-svoih-celey` — Что такое телесуфлёр
- `/komanda-specialistov-dlya-polnocennoj-videoprodakshn-studii-kto-vam-ponadobitsya` — Команда специалистов для видеопродакшн-студии
- `/kak-sozdat-kanal-na-youtube-s-nulya-polnoe-rukovodstvo-dlya-nachinayushchih` — Как создать канал на YouTube с нуля

### Прежний домен videokzn.ru (тот же сайт до ребрендинга)

`/`, `/msk` (Москва), `/spb` (Санкт-Петербург), `/videosemka`, `/meropriyatiya`, `/portfolio`, `/reklamnyj-rolik-dlya-socialnyh-setej-i-dlya-tv`, `/regular`, статьи блога.

### Внешние ресурсы студии

- YouTube: https://www.youtube.com/@videokzn (также @video_rf, канал UCqOli5K_iqBE7LdPH7WMHCA) — 4 подтверждённых ролика: BMjzx3HrnKU, 5toS7s4O2Q0, ZXcvDnLDfF4, limPmMen0-s
- VK: https://vk.com/videokzn
- 2ГИС: https://2gis.ru/kazan/firm/70000001042632679
- Яндекс Карты: https://yandex.ru/maps/org/videokzn/129741361072/
- Каталоги: marketing-tech.ru, alladvertising.ru, kazan.spravka.city, ru.wadline.com, kazanuslugi.com

## 2. Новая архитектура (многостраничная)

```
/                         Главная — hero c showreel, лента услуг, избранные работы (плёнка),
                          индекс услуг, процесс с плейхедом, цифры студии, тарифы, отзывы
/work/                    Все проекты (19 кейсов), фильтр по формату (?type=…)
/work/[slug]/             Кейс: hero-видео, слейт с метаданными, главы (клиент/задача/подход/результат),
                          галерея, услуги в проекте, похожие работы, следующий проект
/services/                Все услуги (15), индекс на сетке
/services/[slug]/         Страница услуги: интро, описание, что входит, этапы, преимущества,
                          форматы/тариф, связанные работы, бриф, следующая услуга
/pricing/                 Тарифы Старт / Стандарт / Комбо, таблица сравнения, вопросы о деньгах
/process/                 Как мы работаем: 5 стадий, полный цикл, что получает заказчик
/about/                   О студии: позиционирование, цифры, принципы, история VIDEOKZN → Видеопродакшн.РФ
/reviews/                 Отзывы и рейтинги
/faq/                     Вопросы и ответы (FAQPage JSON-LD)
/contact/                 Контакты и бриф
/privacy/                 Политика конфиденциальности (noindex)
*                         404 «Нет сигнала»
```

Соответствие исходным страницам: `/o-kompanii` → `/about`; `/vse-videoroliki/N` → `/work`; `/reklamnye_videoroliki` → `/services/reklamnye-videoroliki`; `/prezentacionnye_video` → `/services/prezentacionnye-video`; `/videoroliki_dlya_vystavok` → `/services/videoroliki-dlya-vystavok`; `/aerosyemka` → `/services/aerosyemka`; `/intervyu` → `/services/intervyu-i-podkasty`; `/video_dlya_marketpleysov` → `/services/video-dlya-marketpleysov`; `/hr_video` → `/services/hr-video`; `/dokumentalnye_filmy` → `/services/dokumentalnye-filmy`; `/ubiley` → `/services/film-na-yubiley`. Блок тарифов с главной вынесен в `/pricing`, блок процесса — в `/process`.

## 3. Навигация

- Основная: 01 Работы · 02 Услуги · 03 Тарифы · 04 Студия · 05 Контакты (+ «Обсудить проект»).
- Мобильное меню: полноэкранное, те же пункты + телефон и почта.
- Футер: услуги (все 15), Студия (О студии, Процесс, Отзывы, FAQ, Контакты), Работы (по форматам), политика.
- Внутренние переходы: кейс → услуги в проекте → связанные работы → следующий проект; услуга → связанные работы → следующая услуга; тарифы ↔ услуги ↔ контакты.

## 4. Темы страниц

Тёмная («шасси»): главная, работы, кейсы, 404. Светлая («бумага»): услуги, тарифы, процесс, студия, отзывы, FAQ, контакты, политика. Навигация меняет тон автоматически.

## 5. SEO

Каждая страница задаёт title, description, canonical, Open Graph, Twitter и (где уместно) JSON-LD через `useSeo`; `sitemap.xml` генерируется при сборке из данных, `robots.txt` ссылается на него.
