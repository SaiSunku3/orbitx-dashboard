import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // This helps Vercel / Rollup with client-only libraries
  build: {
    rollupOptions: {
      external: [
        '@emailjs/browser',
        'zustand',
        'lucide-react',
        'recharts',
        'framer-motion'
      ]
    }
  }
})
