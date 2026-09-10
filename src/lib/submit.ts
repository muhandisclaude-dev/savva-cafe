/**
 * Единственная точка соприкосновения с будущим бэкендом.
 *
 * В демоверсии ничего никуда не уходит: заявка получает номер локально
 * и показывается пользователю с честной пометкой. Когда появится сервер,
 * меняются только тела двух функций ниже — остальной код не трогается.
 */

export type OrderPayload = {
  items: { id: string; qty: number; options: Record<string, string>; unitPrice: number }[];
  total: number;
  mode: 'dine-in' | 'takeaway';
  table?: string;
  note?: string;
};

export type BookingPayload = {
  date: string;
  time: string;
  guests: number;
  area: string;
  name: string;
  phone: string;
};

export type Receipt = { ok: true; reference: string; demo: true };

/** Всегда true, пока бэкенда нет. Интерфейс читает это, чтобы показать пометку. */
export const IS_DEMO = true;

function reference(prefix: string): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${n}`;
}

/** Небольшая задержка, чтобы кнопка успела показать состояние отправки */
function settle<T>(value: T, ms = 550): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function submitOrder(payload: OrderPayload): Promise<Receipt> {
  // TODO(бэкенд): POST /api/orders — тело payload, ответ с номером заказа
  console.info('[demo] заказ не отправлен, бэкенда нет', payload);
  return settle({ ok: true, reference: reference('S'), demo: true });
}

export async function submitBooking(payload: BookingPayload): Promise<Receipt> {
  // TODO(бэкенд): POST /api/bookings — проверка занятости и подтверждение
  console.info('[demo] бронь не отправлена, бэкенда нет', payload);
  return settle({ ok: true, reference: reference('B'), demo: true });
}
