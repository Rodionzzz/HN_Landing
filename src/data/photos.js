import { asset } from '../utils/asset'

// Для архива 2025 thumb и src сейчас совпадают. Для фото 2026 года
// дополнительно генерируются отдельные WebP-превью — см. photos2026 ниже.

// Требование площадки: на сайте не должно быть алкоголя.
// Фото 14 и 15 убраны (бокалы в кадре), 16 — обрезанная копия без бутылок.

// Фото 2026 года. Порядок альбомов важен: сначала Дима, затем Скиф.
const photos2026Albums = [
  { key: 'dima', photographer: 'Димы', count: 252 },
  { key: 'skif', photographer: 'Скифа', count: 196 },
]

const photos2026 = photos2026Albums.flatMap(
  ({ key, photographer, count }) =>
    Array.from({ length: count }, (_, index) => {
      const number = String(index + 1).padStart(3, '0')

      return {
        id: `${key}-${number}`,
        src: asset(`/images/photos/2026/${key}-${number}.webp`),
        thumb: asset(`/images/photos/2026/thumbs/${key}-${number}.webp`),
        alt: `Halloween Night vol.2 — фото ${photographer} ${index + 1}`,
        year: 2026,
      }
    }),
)

export const photos = [
  {
    id: 1,
    src: asset('/images/photos/IMG_1545.png'),
    thumb: asset('/images/photos/IMG_1545.png'),
    alt: 'Halloween Night vol.1 — момент 1',
    year: 2025,
  },
  {
    id: 2,
    src: asset('/images/photos/IMG_1546.png'),
    thumb: asset('/images/photos/IMG_1546.png'),
    alt: 'Halloween Night vol.1 — момент 2',
    year: 2025,
  },
  {
    id: 3,
    src: asset('/images/photos/IMG_1547.png'),
    thumb: asset('/images/photos/IMG_1547.png'),
    alt: 'Halloween Night vol.1 — момент 3',
    year: 2025,
  },
  {
    id: 4,
    src: asset('/images/photos/4.jpg'),
    thumb: asset('/images/photos/4.jpg'),
    alt: 'Halloween Night vol.1 — момент 4',
    year: 2025,
  },
  {
    id: 5,
    src: asset('/images/photos/5.jpg'),
    thumb: asset('/images/photos/5.jpg'),
    alt: 'Halloween Night vol.1 — момент 5',
    year: 2025,
  },
  {
    id: 6,
    src: asset('/images/photos/6.jpg'),
    thumb: asset('/images/photos/6.jpg'),
    alt: 'Halloween Night vol.1 — момент 6',
    year: 2025,
  },
  {
    id: 7,
    src: asset('/images/photos/7.jpg'),
    thumb: asset('/images/photos/7.jpg'),
    alt: 'Halloween Night vol.1 — момент 7',
    year: 2025,
  },
  {
    id: 8,
    src: asset('/images/photos/8.jpg'),
    thumb: asset('/images/photos/8.jpg'),
    alt: 'Halloween Night vol.1 — момент 8',
    year: 2025,
  },
  {
    id: 9,
    src: asset('/images/photos/9.jpg'),
    thumb: asset('/images/photos/9.jpg'),
    alt: 'Halloween Night vol.1 — момент 9',
    year: 2025,
  },
  {
    id: 10,
    src: asset('/images/photos/10.jpg'),
    thumb: asset('/images/photos/10.jpg'),
    alt: 'Halloween Night vol.1 — момент 10',
    year: 2025,
  },
  {
    id: 11,
    src: asset('/images/photos/11.jpg'),
    thumb: asset('/images/photos/11.jpg'),
    alt: 'Halloween Night vol.1 — момент 11',
    year: 2025,
  },
  {
    id: 12,
    src: asset('/images/photos/12.jpg'),
    thumb: asset('/images/photos/12.jpg'),
    alt: 'Halloween Night vol.1 — момент 12',
    year: 2025,
  },
  {
    id: 13,
    src: asset('/images/photos/13.jpg'),
    thumb: asset('/images/photos/13.jpg'),
    alt: 'Halloween Night vol.1 — момент 13',
    year: 2025,
  },
  {
    id: 16,
    src: asset('/images/photos/16-crop.jpg'),
    thumb: asset('/images/photos/16-crop.jpg'),
    alt: 'Halloween Night vol.1 — момент 16',
    year: 2025,
  },
  {
    id: 17,
    src: asset('/images/photos/17.jpg'),
    thumb: asset('/images/photos/17.jpg'),
    alt: 'Halloween Night vol.1 — момент 17',
    year: 2025,
  },
  {
    id: 18,
    src: asset('/images/photos/18.jpg'),
    thumb: asset('/images/photos/18.jpg'),
    alt: 'Halloween Night vol.1 — момент 18',
    year: 2025,
  },
  {
    id: 19,
    src: asset('/images/photos/19.jpg'),
    thumb: asset('/images/photos/19.jpg'),
    alt: 'Halloween Night vol.1 — момент 19',
    year: 2025,
  },
  {
    id: 20,
    src: asset('/images/photos/20.jpg'),
    thumb: asset('/images/photos/20.jpg'),
    alt: 'Halloween Night vol.1 — момент 20',
    year: 2025,
  },
  {
    id: 21,
    src: asset('/images/photos/21.jpg'),
    thumb: asset('/images/photos/21.jpg'),
    alt: 'Halloween Night vol.1 — момент 21',
    year: 2025,
  },
  ...photos2026,
]