import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Isko sahi kar lijiye

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/intern-portal/', 
})