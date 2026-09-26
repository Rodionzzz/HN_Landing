import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Название репозитория Rodionzzz/HN_Landing —
  // поэтому base должен совпадать с именем репо.
  // Когда подключишь свой домен и сайт будет открываться
  // с корня — поменяй это значение на '/'.
  base: '/HN_Landing/',
})
