import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 }, // optional

  build: {
    rollupOptions: {
      external: [
        '@emailjs/browser',
        'zustand',          // from previous issues
        'lucide-react',     // from previous issues
        'recharts',
        'framer-motion'   // often helps too
        // add more if future logs complain (e.g. 'framer-motion', 'recharts')
      ]
    }
  }
})

