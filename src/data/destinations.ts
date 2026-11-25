import type { Region } from '../types'

export const regions: Region[] = [
  {
    id: 'europe',
    name: 'Европа',
    tagline: 'Старые города, побережья и горные дороги',
    cities: ['Paris', 'Rome', 'Barcelona', 'Santorini'],
    photo: 'photo-1523906834658-6e24ef2386f9',
    alt: 'Гондолы на Гранд-канале в Венеции на рассвете',
  },
  {
    id: 'asia',
    name: 'Азия',
    tagline: 'Мегаполисы будущего и тишина храмов',
    cities: ['Tokyo', 'Bali', 'Bangkok', 'Seoul'],
    photo: 'photo-1528164344705-47542687000d',
    alt: 'Красные ворота тории у воды на острове Миядзима, Япония',
  },
  {
    id: 'america',
    name: 'Америка',
    tagline: 'Небоскрёбы, океан и бесконечные дороги',
    cities: ['New York', 'Los Angeles', 'Miami', 'Cancun'],
    photo: 'photo-1501594907352-04cda38ebc29',
    alt: 'Мост Золотые Ворота в Сан-Франциско в тумане',
  },
  {
    id: 'middle-east',
    name: 'Ближний Восток',
    tagline: 'Пустыня, роскошь и новая архитектура',
    cities: ['Dubai', 'Abu Dhabi', 'Doha'],
    photo: 'photo-1512632578888-169bbbc64f33',
    alt: 'Белая мечеть шейха Зайда в Абу-Даби',
  },
  {
    id: 'africa',
    name: 'Африка',
    tagline: 'Сафари, океан и медины',
    cities: ['Cape Town', 'Marrakech', 'Zanzibar'],
    photo: 'photo-1516426122078-c23e76319801',
    alt: 'Слоны в саванне на закате во время сафари',
  },
  {
    id: 'oceania',
    name: 'Океания',
    tagline: 'Другой конец света',
    cities: ['Sydney', 'Queenstown', 'Fiji'],
    photo: 'photo-1523482580672-f109ba8cb9be',
    alt: 'Скалы Двенадцать Апостолов на побережье Австралии',
  },
]

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<
  Region['id'],
  Region
>
