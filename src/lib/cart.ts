/**
 * Корзина и избранное. Состояние живёт в браузере и переживает перезагрузку.
 * Любое чтение и запись обёрнуты в try/catch: в приватном окне и при
 * заблокированных данных сайта localStorage бросает исключение.
 */

import { itemById, optionGroups, basePrice, type MenuItem } from '../data/menu';

const CART_KEY = 'savva.cart.v1';
const FAV_KEY = 'savva.favourites.v1';

export type Line = {
  /** Уникален по позиции плюс набор опций: латте на овсяном и на обычном — разные строки */
  key: string;
  id: string;
  qty: number;
  options: Record<string, string>;
};

let lines: Line[] = [];
let favourites = new Set<string>();

/* ── Хранилище ────────────────────────────────────────────── */

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* приватное окно или запрет на данные сайта — работаем в памяти */
  }
}

/* ── Цена ─────────────────────────────────────────────────── */

export function keyFor(id: string, options: Record<string, string>): string {
  const parts = Object.keys(options)
    .sort()
    .map((g) => `${g}:${options[g]}`)
    .join('|');
  return parts ? `${id}#${parts}` : id;
}

export function unitPrice(id: string, options: Record<string, string>): number {
  const item = itemById.get(id);
  if (!item) return 0;
  let sum = basePrice(item);
  for (const [groupId, choiceId] of Object.entries(options)) {
    const choice = optionGroups[groupId]?.choices.find((c) => c.id === choiceId);
    if (choice) sum += choice.delta;
  }
  return sum;
}

/** Опции по умолчанию — первый вариант каждой группы позиции */
export function defaultOptions(item: MenuItem): Record<string, string> {
  const out: Record<string, string> = {};
  for (const g of item.options ?? []) {
    const group = optionGroups[g];
    if (group) out[g] = group.choices[0].id;
  }
  return out;
}

export function lineTotal(line: Line): number {
  return unitPrice(line.id, line.options) * line.qty;
}

export function total(): number {
  return lines.reduce((sum, l) => sum + lineTotal(l), 0);
}

export function count(): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function all(): readonly Line[] {
  return lines;
}

/* ── Изменение ────────────────────────────────────────────── */

function commit(): void {
  write(CART_KEY, lines);
  document.dispatchEvent(new CustomEvent('savva:cart', { detail: { count: count(), total: total() } }));
}

export function add(id: string, options: Record<string, string>, qty = 1): void {
  const key = keyFor(id, options);
  const found = lines.find((l) => l.key === key);
  if (found) found.qty += qty;
  else lines.push({ key, id, qty, options });
  commit();
}

export function setQty(key: string, qty: number): void {
  const i = lines.findIndex((l) => l.key === key);
  if (i < 0) return;
  if (qty <= 0) lines.splice(i, 1);
  else lines[i].qty = qty;
  commit();
}

export function remove(key: string): void {
  setQty(key, 0);
}

export function clear(): void {
  lines = [];
  commit();
}

/* ── Избранное ────────────────────────────────────────────── */

export function isFavourite(id: string): boolean {
  return favourites.has(id);
}

export function toggleFavourite(id: string): boolean {
  if (favourites.has(id)) favourites.delete(id);
  else favourites.add(id);
  write(FAV_KEY, [...favourites]);
  document.dispatchEvent(new CustomEvent('savva:favourites', { detail: { ids: [...favourites] } }));
  return favourites.has(id);
}

/* ── Запуск ───────────────────────────────────────────────── */

export function hydrate(): void {
  const stored = read<Line[]>(CART_KEY, []);
  // Позиция могла исчезнуть из меню между визитами — такие строки отбрасываем
  lines = stored.filter((l) => l && typeof l.id === 'string' && itemById.has(l.id) && l.qty > 0);
  favourites = new Set(read<string[]>(FAV_KEY, []).filter((id) => itemById.has(id)));
  commit();
  document.dispatchEvent(new CustomEvent('savva:favourites', { detail: { ids: [...favourites] } }));
}
