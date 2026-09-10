/**
 * Факты о заведении.
 * Источники: карточка Google Карт (سافا savva), профиль @savva_cafe,
 * официальный PDF-меню. Всё, что требует подтверждения, помечено TODO.
 */

export const venue = {
  name: { ar: 'ساڤا', en: 'SAVVA' },
  tagline: {
    ar: 'يوم في ساڤا هو ما تحتاجه',
    en: 'A day in savva is what you need to be savva',
  },
  kind: { ar: 'قهوة مختصة', en: 'Specialty coffee' },

  address: {
    ar: 'زبيرة الرومية، بئر عثمان، المدينة المنورة ٤٢٣٣١',
    en: 'Zubairah Al Roumiah, Bir Uthman, Madinah 42331',
  },
  city: { ar: 'المدينة المنورة', en: 'Madinah' },
  plusCode: 'FHVJ+3W',
  phone: '+966564370303',
  phoneDisplay: '+966 56 437 0303',

  maps: 'https://maps.app.goo.gl/KLpbbtp5SRyDRMia8',
  instagram: 'https://www.instagram.com/savva_cafe/',
  tiktok: 'https://www.tiktok.com/@savva_cafe',

  rating: 4.7,
  reviews: 728,

  /**
   * Часы работы. Время закрытия 02:00 подтверждено карточкой Google.
   * TODO: заведение подтверждает время открытия и режим в Рамадан.
   */
  hours: {
    opens: '07:00',
    closes: '02:00',
    /** Закрытие после полуночи — важно для расчёта «открыто сейчас» */
    crossesMidnight: true,
  },

  /** Часовой пояс Саудовской Аравии, без перехода на летнее время */
  utcOffsetMinutes: 180,

  seats: 46,
  areas: [
    { id: 'indoor', label: { ar: 'الصالة', en: 'Indoor' } },
    { id: 'terrace', label: { ar: 'التراس', en: 'Terrace' } },
  ],
} as const;

/** Минуты от полуночи по времени Медины */
export function minutesNowInMadinah(now = new Date()): number {
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const local = new Date(utc + venue.utcOffsetMinutes * 60_000);
  return local.getHours() * 60 + local.getMinutes();
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export const opensAt = toMinutes(venue.hours.opens);
export const closesAt = toMinutes(venue.hours.closes);

/** Открыто ли заведение прямо сейчас по времени Медины */
export function isOpenNow(now = new Date()): boolean {
  const t = minutesNowInMadinah(now);
  return venue.hours.crossesMidnight ? t >= opensAt || t < closesAt : t >= opensAt && t < closesAt;
}
