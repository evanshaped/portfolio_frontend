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
      '^/static/(admin|rest_framework)': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '^/(.*-api|api-auth)': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    }
  },
})
