import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages отдаёт этот репозиторий по адресу
  // https://muhandisclaude-dev.github.io/savva-cafe/ — сайт живёт в подпапке,
  // а не в корне домена. base добавляет этот префикс ко всем внутренним
  // ссылкам, которые Astro строит сам; для статики из public/ префикс
  // проведён вручную через src/lib/asset.ts (withBase).
  site: 'https://muhandisclaude-dev.github.io',
  base: '/savva-cafe',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwind()] },
});
