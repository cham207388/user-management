import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "./",
  // commend the build stage to create docker image from Dockerfile
  // build: {
  //   outDir: "../backend/src/main/resources/static", // ✅ Ensures frontend is served by backend in production
  //   emptyOutDir: true,
  // },
});
