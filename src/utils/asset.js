// Хелпер для путей к файлам из папки public.
// Локально base = '/', в проде на GitHub Pages base = '/HN_Landing/'
// (см. vite.config.js). Жёстко прописанные строки вида
// src="/images/photo.jpg" НЕ учитывают base автоматически —
// оборачивай такие пути в asset(), чтобы они работали и локально,
// и на GitHub Pages, и после подключения домена (когда base снова
// станет '/').
//
// Использование:
//   import { asset } from '../../utils/asset'
//   <img src={asset('/images/poster.jpg')} />

export function asset(path) {
  const base = import.meta.env.BASE_URL // '/' или '/HN_Landing/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  return `${base}${cleanPath}`
}
