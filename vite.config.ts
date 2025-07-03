import {defineConfig} from 'vitest/config'; 
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default ({ mode = "development" }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
  base: "/",
    server: {
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5000,
      open: true,
    },
  plugins: [react()],
  test:{
    environment: "jsdom",
    globals: true,
    setupFiles: ['./setupTest.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/setup.ts',
        'src/main.tsx',
        'src/vite.config.ts',
        'src/*.config.{ts,tsx}',
        'src/**.d.ts',  
        'src/types/**/*.{ts,tsx}',
        
      ]
    },
  }
})
}
