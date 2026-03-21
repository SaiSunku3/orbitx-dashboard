import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },  // optional, keep if you have it
  build: {
    rollupOptions: {
      external: ['zustand', 'lucide-react']  // Add both to cover previous + current issues
    }
  }
})
