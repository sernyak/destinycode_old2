import { defineConfig } from 'vite';

export default defineConfig({
  // Оскільки використовуємо власний домен, base має бути '/'
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Оптимізація для GitHub Pages
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // Налаштування для коректної роботи з ассетами
  publicDir: 'public',
});