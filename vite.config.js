import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/solid-to-do-list-app/',
  build: {
    target: 'esnext',
  },
});