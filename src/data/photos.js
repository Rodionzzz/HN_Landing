import { asset } from '../utils/asset'

// thumb сейчас указывает на тот же файл, что и src — это временно.
// Когда сожмёшь/уменьшишь фото (WebP, ~400–500px по ширине для превью),
// положи их, например, в /images/photos/thumb/ и поменяй thumb-путь —
// грид архива и боковые "пики" карусели сразу станут заметно легче.

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
    id: 14,
    src: asset('/images/photos/14.jpg'),
    thumb: asset('/images/photos/14.jpg'),
    alt: 'Halloween Night vol.1 — момент 14',
    year: 2025,
  },
  {
    id: 15,
    src: asset('/images/photos/15.jpg'),
    thumb: asset('/images/photos/15.jpg'),
    alt: 'Halloween Night vol.1 — момент 15',
    year: 2025,
  },
  {
    id: 16,
    src: asset('/images/photos/16.jpg'),
    thumb: asset('/images/photos/16.jpg'),
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
  // добавляй сколько нужно

  // Когда появятся фото с vol.2 (2026), просто добавляй сюда объекты
  // с year: 2026 — вкладка "2026" в архиве разблокируется сама,
  // как только в массиве появится хотя бы одно фото этого года.
]