import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Локально (npm run dev / npm run preview) base остаётся '/' —
  // всё работает как раньше, картинки не пропадают.
  // При сборке (npm run build, в том числе в GitHub Actions)
  // base становится '/HN_Landing/' — так нужно для GitHub Pages,
  // пока не подключён свой домен. Когда есть домен —
  // поменяй '/HN_Landing/' на '/'.
  base: '/',
})
