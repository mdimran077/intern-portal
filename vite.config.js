import { defineConfig } from 'vite'
import react from '@vitejs/react-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/intern-portal/', // <-- Apne repository ka naam yahan dalein (dono taraf / zaroori hai)
})