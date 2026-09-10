/**
 * Демонстрационная занятость столов.
 *
 * Настоящих броней нет. Чтобы форма вела себя правдоподобно, занятые слоты
 * считаются детерминированно от даты: при перезагрузке страницы картина не
 * меняется, а вечер занят плотнее, чем утро, как в жизни.
 * TODO(бэкенд): заменить на реальную занятость из системы бронирования.
 */

export const SLOT_STEP_MIN = 30;

/** Бронь принимается с 08:00 до 01:00 — заведение закрывается в 02:00 */
const FIRST_SLOT = 8 * 60;
const LAST_SLOT = 25 * 60;

export type Slot = { value: string; label: string; busy: boolean };

function hhmm(minutes: number): string {
  const m = minutes % (24 * 60);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** Небольшой стабильный хеш строки — одна и та же дата всегда даёт ту же занятость */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function slotsFor(dateISO: string, area: string): Slot[] {
  const out: Slot[] = [];
  for (let m = FIRST_SLOT; m <= LAST_SLOT; m += SLOT_STEP_MIN) {
    const label = hhmm(m);
    // Вечер и ночь загружены сильнее: с 20:00 занятость примерно вдвое выше
    const evening = m >= 20 * 60;
    const threshold = evening ? 0.45 : 0.22;
    out.push({
      value: label,
      label,
      busy: hash(`${dateISO}|${area}|${label}`) < threshold,
    });
  }
  return out;
}

/** Сегодняшняя дата по времени Медины в формате YYYY-MM-DD */
export function todayInMadinah(now = new Date()): string {
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const local = new Date(utc + 180 * 60_000);
  return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, '0')}-${String(local.getDate()).padStart(2, '0')}`;
}

/** Бронь открыта на две недели вперёд */
export function maxDate(now = new Date()): string {
  const d = new Date(now.getTime() + 14 * 86_400_000);
  return todayInMadinah(d);
}
