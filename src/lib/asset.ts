/**
 * GitHub Pages отдаёт сайт из подпапки (/savva-cafe/), а не с корня домена.
 * Всякий раз, когда путь к статике пишется от корня («/photos/x.jpg»),
 * его нужно провести через эту функцию — иначе на Pages картинки не найдутся.
 * Локально (astro dev) и при сборке без base путь не меняется.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
