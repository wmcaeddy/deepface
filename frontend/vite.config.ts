import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['deepface.magi-3.com'],
    proxy: {
      '/verify': 'http://localhost:8080',
      '/health': 'http://localhost:8080',
    },
  },
})
