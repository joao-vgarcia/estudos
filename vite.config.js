import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serve o site em https://joao-vgarcia.github.io/estudos/
  base: '/estudos/',
})
