/**
 * Меню SAVVA · ساڤا
 * Источник: официальный PDF заведения «منيو سافا».
 * Цены в саудовских риалах, калорийность как в оригинале.
 * Английские написания исправлены там, где в оригинале опечатка —
 * поле `originalEn` хранит то, что напечатано в их меню. См. ЗАМЕНИТЬ.md
 */

export type Bilingual = { ar: string; en: string };

export type OptionGroup = {
  id: string;
  label: Bilingual;
  /** Ровно один вариант обязателен к выбору */
  required?: boolean;
  choices: {
    id: string;
    label: Bilingual;
    delta: number;
    /** Значение по умолчанию: в сводке заказа его не показываем, оно ничего не сообщает */
    quiet?: boolean;
  }[];
};

export type MenuItem = {
  id: string;
  name: Bilingual;
  /** Написание из оригинального PDF, если оно отличается от исправленного */
  originalEn?: string;
  /** Цена в риалах. Диапазон — [от, до] */
  price: number | [number, number];
  /** Калорийность по данным заведения */
  cals?: number;
  photo?: string;
  /** Позиции, которыми заведение гордится отдельно */
  signature?: boolean;
  note?: Bilingual;
  options?: string[];
};

export type Section = {
  id: string;
  title: Bilingual;
  items: MenuItem[];
};

/* ── Группы опций ─────────────────────────────────────────── */

export const optionGroups: Record<string, OptionGroup> = {
  size: {
    id: 'size',
    label: { ar: 'الحجم', en: 'Size' },
    required: true,
    choices: [
      { id: 'regular', label: { ar: 'وسط', en: 'Regular' }, delta: 0, quiet: true },
      { id: 'large', label: { ar: 'كبير', en: 'Large' }, delta: 4 },
    ],
  },
  milk: {
    id: 'milk',
    label: { ar: 'الحليب', en: 'Milk' },
    required: true,
    choices: [
      { id: 'whole', label: { ar: 'حليب كامل الدسم', en: 'Whole milk' }, delta: 0, quiet: true },
      { id: 'skimmed', label: { ar: 'حليب خالي الدسم', en: 'Skimmed' }, delta: 0 },
      { id: 'oat', label: { ar: 'حليب الشوفان', en: 'Oat' }, delta: 3 },
      { id: 'almond', label: { ar: 'حليب اللوز', en: 'Almond' }, delta: 3 },
    ],
  },
  shots: {
    id: 'shots',
    label: { ar: 'جرعة إضافية', en: 'Extra shot' },
    choices: [
      { id: 'none', label: { ar: 'بدون', en: 'None' }, delta: 0, quiet: true },
      { id: 'single', label: { ar: 'جرعة', en: 'One shot' }, delta: 4 },
      { id: 'double', label: { ar: 'جرعتان', en: 'Two shots' }, delta: 7 },
    ],
  },
  syrup: {
    id: 'syrup',
    label: { ar: 'النكهة', en: 'Syrup' },
    choices: [
      { id: 'none', label: { ar: 'بدون', en: 'None' }, delta: 0, quiet: true },
      { id: 'vanilla', label: { ar: 'فانيلا', en: 'Vanilla' }, delta: 2 },
      { id: 'caramel', label: { ar: 'كراميل', en: 'Caramel' }, delta: 2 },
      { id: 'hazelnut', label: { ar: 'بندق', en: 'Hazelnut' }, delta: 2 },
    ],
  },
  ice: {
    id: 'ice',
    label: { ar: 'الثلج', en: 'Ice' },
    required: true,
    choices: [
      { id: 'normal', label: { ar: 'عادي', en: 'Normal' }, delta: 0, quiet: true },
      { id: 'light', label: { ar: 'قليل', en: 'Light' }, delta: 0 },
      { id: 'extra', label: { ar: 'كثير', en: 'Extra' }, delta: 0 },
    ],
  },
  temp: {
    id: 'temp',
    label: { ar: 'التقديم', en: 'Serve' },
    required: true,
    choices: [
      { id: 'hot', label: { ar: 'حار', en: 'Hot' }, delta: 0 },
      { id: 'iced', label: { ar: 'بارد', en: 'Iced' }, delta: 0 },
    ],
  },
  warm: {
    id: 'warm',
    label: { ar: 'التسخين', en: 'Warming' },
    choices: [
      { id: 'as-is', label: { ar: 'كما هو', en: 'As it is' }, delta: 0, quiet: true },
      { id: 'warmed', label: { ar: 'مسخّن', en: 'Warmed' }, delta: 0 },
    ],
  },
};

const HOT_MILK = ['size', 'milk', 'shots', 'syrup'];
const HOT_BLACK = ['size', 'shots'];
const COLD_MILK = ['size', 'milk', 'ice', 'syrup'];
const COLD_PLAIN = ['size', 'ice'];

/* ── Разделы ──────────────────────────────────────────────── */

export const sections: Section[] = [
  {
    id: 'hot',
    title: { ar: 'المشروبات الحارة', en: 'Hot drinks' },
    items: [
      { id: 'espresso', name: { ar: 'إسبريسو', en: 'Espresso' }, price: 11, cals: 2, options: HOT_BLACK },
      { id: 'americano', name: { ar: 'أمريكانو', en: 'Americano' }, price: 12, cals: 2, options: HOT_BLACK },
      { id: 'cortado', name: { ar: 'كورتادو', en: 'Cortado' }, price: 14, cals: 50, options: HOT_MILK },
      { id: 'macchiato', name: { ar: 'ميكاتو', en: 'Macchiato' }, price: 13, cals: 13, options: HOT_MILK },
      { id: 'flat-white', name: { ar: 'فلات وايت', en: 'Flat white' }, originalEn: 'FLAT WAIT', price: 15, cals: 50, options: HOT_MILK },
      { id: 'latte', name: { ar: 'لاتيه', en: 'Latte' }, price: 16, cals: 75, options: HOT_MILK },
      { id: 'cappuccino', name: { ar: 'كابتشينو', en: 'Cappuccino' }, price: 16, cals: 60, options: HOT_MILK },
      { id: 'spanish-latte', name: { ar: 'سبانش لاتيه', en: 'Spanish latte' }, price: 18, cals: 178, options: HOT_MILK },
      { id: 'matcha-latte', name: { ar: 'ماتشا لاتيه', en: 'Matcha latte' }, price: 16, cals: 75, options: HOT_MILK },
      { id: 'white-mocha', name: { ar: 'وايت موكا', en: 'White mocha' }, originalEn: 'WAIT MOCAH', price: 16, cals: 230, options: HOT_MILK },
      { id: 'hot-chocolate', name: { ar: 'هوت شوكليت', en: 'Hot chocolate' }, price: 15, cals: 237, options: ['size', 'milk'] },
      { id: 'english-tea', name: { ar: 'شاي انجليزي', en: 'English tea' }, price: 6, cals: 2, options: ['size'] },
      { id: 'turkish', name: { ar: 'تركي سادة', en: 'Turkish coffee' }, price: 11, cals: 50, options: ['size'] },
      { id: 'turkish-milk', name: { ar: 'تركي حليب', en: 'Turkish coffee with milk' }, price: 13, cals: 50, options: ['size', 'milk'] },
    ],
  },
  {
    id: 'brew',
    title: { ar: 'التخصصية', en: 'Brew bar' },
    items: [
      {
        id: 'coffee-of-day',
        name: { ar: 'قهوة اليوم بارد / حار', en: 'Coffee of the day, hot or iced' },
        price: [10, 13],
        signature: true,
        options: ['temp', 'size'],
        note: {
          ar: 'يتغيّر المحصول كل يوم — اسأل الباريستا عن قهوة اليوم',
          en: 'The lot changes every day. Ask the barista what is on today.',
        },
      },
      {
        id: 'v60',
        name: { ar: 'قهوة المقطرة', en: 'V60 pour over' },
        originalEn: 'ICE DRIP',
        price: 18,
        signature: true,
        options: ['temp'],
        note: {
          ar: 'تقطير يدوي على V60، يُحضّر عند الطلب',
          en: 'Hand poured on a V60, brewed to order.',
        },
      },
    ],
  },
  {
    id: 'cold',
    title: { ar: 'المشروبات الباردة', en: 'Cold drinks' },
    items: [
      { id: 'iced-americano', name: { ar: 'ايس أمريكانو', en: 'Iced americano' }, price: 15, cals: 2, options: COLD_PLAIN },
      { id: 'alfredo', name: { ar: 'ألفريدو', en: 'Alfredo' }, price: 14, cals: 100, options: COLD_MILK },
      { id: 'iced-latte', name: { ar: 'ايس لاتيه', en: 'Iced latte' }, price: 17, cals: 100, options: COLD_MILK },
      { id: 'iced-spanish-latte', name: { ar: 'ايس سبانيش لاتيه', en: 'Iced spanish latte' }, price: 19, cals: 230, options: COLD_MILK },
      { id: 'iced-matcha-latte', name: { ar: 'ايس ماتشا لاتيه', en: 'Iced matcha latte' }, price: 17, cals: 130, options: COLD_MILK },
      { id: 'iced-matcha-spanish', name: { ar: 'ايس ماتشا سبانيش لاتيه', en: 'Iced matcha spanish latte' }, price: 19, cals: 230, options: COLD_MILK },
      { id: 'savva-matcha', name: { ar: 'سافا ماتشا', en: 'Savva matcha' }, price: 22, cals: 2, signature: true, options: COLD_MILK },
      { id: 'matcha-berry', name: { ar: 'ماتشا بيري', en: 'Matcha berry' }, price: 24, cals: 230, options: COLD_MILK },
      { id: 'ice-tea-savva', name: { ar: 'ايس تي سافا', en: 'Ice tea Savva' }, price: 17, cals: 189, signature: true, options: COLD_PLAIN },
      { id: 'ice-hibiscus', name: { ar: 'ايس كركديه سافا', en: 'Ice hibiscus Savva' }, price: 17, cals: 180, signature: true, options: COLD_PLAIN },
      { id: 'hibiscus-slush', name: { ar: 'سلاش كركديه سافا', en: 'Hibiscus slush Savva' }, price: 17, cals: 180, signature: true, options: ['size'] },
      { id: 'ice-shaken', name: { ar: 'ايس شيكن', en: 'Ice shaken' }, price: 20, cals: 231, options: COLD_PLAIN },
      { id: 'ice-white-mocha', name: { ar: 'ايس وايت موكا', en: 'Ice white mocha' }, originalEn: 'ICE WAIT MOCHA', price: 19, cals: 230, options: COLD_MILK },
      { id: 'ice-chocolate', name: { ar: 'ايس شوكلت', en: 'Ice chocolate' }, price: 17, cals: 230, options: COLD_MILK },
      { id: 'savva-melon', name: { ar: 'شمام سافا', en: 'Savva melon' }, price: 16, cals: 50, signature: true, options: ['size'] },
    ],
  },
  {
    id: 'desserts',
    title: { ar: 'الحلى', en: 'Desserts' },
    items: [
      { id: 'madini-cookies', name: { ar: 'مديني كوكيز', en: 'Madini cookies' }, price: 12, cals: 170, signature: true, options: ['warm'] },
      { id: 'cinnamon-danish', name: { ar: 'دانيش سينابون', en: 'Cinnamon danish' }, price: 19, cals: 170, options: ['warm'] },
      { id: 'marble-cake', name: { ar: 'ماربل كيك', en: 'Marble cake' }, price: 11, cals: 170, options: ['warm'] },
      { id: 'crunchy-chocolate', name: { ar: 'كرانشي شوكلت', en: 'Crunchy chocolate' }, price: 8, cals: 170 },
      { id: 'blueberry-cheesecake', name: { ar: 'تشيز كيك بلوبيري', en: 'Blueberry cheesecake' }, originalEn: 'BLUEBERRY CHEEESECAKE', price: 27, cals: 170 },
      { id: 'pecan-cake', name: { ar: 'كيكة البيكان', en: 'Pecan cake' }, price: 21, cals: 170, options: ['warm'] },
      { id: 'chocolate-cake', name: { ar: 'كيكة شوكلت', en: 'Chocolate cake' }, price: 18, cals: 170, options: ['warm'] },
    ],
  },
  {
    id: 'breakfast',
    title: { ar: 'الفطور', en: 'Breakfast' },
    items: [
      { id: 'turkey-sandwich', name: { ar: 'ساندوتش تركي', en: 'Turkey sandwich' }, price: 19, cals: 300, options: ['warm'] },
      { id: 'halloumi-sandwich', name: { ar: 'ساندوتش حلوم', en: 'Halloumi sandwich' }, price: 18, cals: 300, options: ['warm'] },
    ],
  },
];

export const allItems: MenuItem[] = sections.flatMap((s) => s.items);

export const itemById = new Map(allItems.map((i) => [i.id, i]));

export function sectionOf(id: string): Section | undefined {
  return sections.find((s) => s.items.some((i) => i.id === id));
}

/** Минимальная цена позиции — для диапазонов берётся нижняя граница */
export function basePrice(item: MenuItem): number {
  return Array.isArray(item.price) ? item.price[0] : item.price;
}
