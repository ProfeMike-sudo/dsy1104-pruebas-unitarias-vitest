import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Entorno de navegador simulado: jsdom provee document, window, etc.
    environment: 'jsdom',
    // Permite usar describe/it/expect sin importarlos en cada archivo de prueba
    globals: true,
    // Archivo que se ejecuta antes de cada prueba (matchers de jest-dom)
    setupFiles: ['./vitest.setup.js'],
    // Por defecto busca archivos *.test.jsx / *.test.js / *.spec.*
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    // Configuración del informe de cobertura (npm run test:coverage)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/**/*.test.{js,jsx}',
        'src/**/*.spec.{js,jsx}',
      ],
    },
  },
})
