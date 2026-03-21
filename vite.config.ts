import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), tailwindcss(),visualizer({ open: true })],

  build: {
    chunkSizeWarningLimit: 1000,   // or 800 — suppresses warning until you get bigger
  },
})



