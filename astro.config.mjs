import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://savva.cafe',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwind()] },
});
