import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/static/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '^/.*-api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    }
  },
})
