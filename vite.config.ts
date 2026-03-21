import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: '/',  // already there? good
  plugins: [react(), tailwindcss()],
  build: {
    assetsDir: 'assets',  // default, but explicit
    sourcemap: true  // helps debugging
  }
})
