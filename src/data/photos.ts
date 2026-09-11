/**
 * Фотопул демоверсии. Все снимки — реальные кадры заведения, взятые из
 * публичной ленты @savva_cafe и с карточки Google Карт (не залогинены,
 * доступ подтверждён вручную). Права принадлежат заведению/авторам отзывов;
 * для боевого запуска нужна собственная съёмка — см. ЗАМЕНИТЬ.md.
 */

export type Photo = {
  file: string;
  width: number;
  height: number;
  alt: { ar: string; en: string };
  source: 'instagram' | 'google-maps';
};

export const photos = {
  /** Ночная витрина — светящаяся вывеска, зелёные кресла, терраса. Герой. */
  heroNight: {
    file: 'night-facade-hero.jpg', width: 960, height: 1200, source: 'google-maps',
    alt: { ar: 'واجهة ساڤا مضاءة ليلاً مع طاولات التراس', en: 'SAVVA’s lit facade at night, terrace tables in front' },
  },
  nightFacadeWide: {
    file: 'night-facade-wide.jpg', width: 1350, height: 1800, source: 'google-maps',
    alt: { ar: 'واجهة ساڤا الكاملة ليلاً', en: 'SAVVA’s full night facade' },
  },
  nightTerrace: {
    file: 'night-terrace.jpg', width: 1350, height: 1800, source: 'google-maps',
    alt: { ar: 'التراس ليلاً مع المدفأة والكراسي', en: 'The terrace at night, heater and seating' },
  },
  nightCornerCup: {
    file: 'night-corner-cup.jpg', width: 1012, height: 1800, source: 'google-maps',
    alt: { ar: 'ركن هادئ ليلاً وكوب على الطاولة', en: 'A quiet night corner, a cup on the table' },
  },
  loungeArches: {
    file: 'lounge-arches.jpg', width: 672, height: 640, source: 'google-maps',
    alt: { ar: 'صالة الجلوس بنوافذ مقوّسة ونباتات', en: 'The lounge, arched windows and plants' },
  },
  barCounter: {
    file: 'bar-counter.jpg', width: 1170, height: 655, source: 'google-maps',
    alt: { ar: 'طاولة التحضير في الصباح', en: 'The bar counter in the morning' },
  },
  tableDesserts: {
    file: 'table-desserts.jpg', width: 1350, height: 1800, source: 'google-maps',
    alt: { ar: 'حلى ومشروبات على طاولة رخامية بوسائد تراكوتا', en: 'Desserts and drinks on a marble table, terracotta cushions' },
  },
  shelfProducts: {
    file: 'shelf-products.jpg', width: 1012, height: 1800, source: 'google-maps',
    alt: { ar: 'رف خشبي بمنتجات ونباتات', en: 'A wooden shelf with products and plants' },
  },
  productMadiniCookies: {
    file: 'product-madini-cookies.jpg', width: 1012, height: 1800, source: 'google-maps',
    alt: { ar: 'مديني كوكيز على طبق أبيض', en: 'Madini cookies on a white plate' },
  },
  threeCupsPour: {
    file: 'three-cups-pour.jpg', width: 1012, height: 1800, source: 'google-maps',
    alt: { ar: 'ثلاثة أكواب من مشروبات ساڤا الباردة', en: 'Three of Savva’s cold drinks together' },
  },
  drinksLineup1: {
    file: 'ig-drinks-01.jpg', width: 360, height: 640, source: 'instagram',
    alt: { ar: 'ماتشا بيري وشمام ساڤا جنبًا إلى جنب', en: 'Matcha berry and Savva melon side by side' },
  },
  drinksLineup2: {
    file: 'ig-drinks-02.jpg', width: 477, height: 640, source: 'instagram',
    alt: { ar: 'ثلاثة مشروبات باردة على طاولة خشبية', en: 'Three iced drinks lined up on a wooden table' },
  },
  pourCoffee: {
    file: 'ig-pour-coffee.jpg', width: 360, height: 640, source: 'instagram',
    alt: { ar: 'سكب قهوة مقطّرة في أكواب ساڤا الخضراء', en: 'Filter coffee poured into Savva’s green cups' },
  },
  pourHibiscus: {
    file: 'ig-pour-hibiscus.jpg', width: 480, height: 640, source: 'instagram',
    alt: { ar: 'سكب مشروب الكركديه البارد', en: 'Iced hibiscus being poured' },
  },
  melonSlush: {
    file: 'ig-melon-slush.jpg', width: 477, height: 640, source: 'instagram',
    alt: { ar: 'سلاش شمام ساڤا في يد وسط أوراق خضراء', en: 'A Savva melon slush held against green leaves' },
  },
  icedDark: {
    file: 'ig-iced-dark.jpg', width: 477, height: 640, source: 'instagram',
    alt: { ar: 'مشروب بارد على طاولة خشبية داكنة', en: 'An iced drink on a dark wooden table' },
  },
  sandwichHero: {
    file: 'ig-sandwich-hero.jpg', width: 512, height: 640, source: 'instagram',
    alt: { ar: 'ساندوتش حلوم على خبز السمسم', en: 'A halloumi sandwich on sesame bread' },
  },
  sandwichLaptop: {
    file: 'ig-sandwich-laptop.jpg', width: 478, height: 640, source: 'instagram',
    alt: { ar: 'كوب وساندوتش بجانب حاسوب', en: 'A cup and a sandwich beside a laptop' },
  },
  carDelivery: {
    file: 'ig-car-delivery.jpg', width: 518, height: 640, source: 'instagram',
    alt: { ar: 'تسليم الطلب إلى نافذة سيارة', en: 'An order handed to a car window' },
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Порядок и подпись для секции «Зал» */
export const roomGallery: PhotoKey[] = [
  'heroNight', 'loungeArches', 'barCounter', 'nightTerrace',
  'tableDesserts', 'shelfProducts', 'nightCornerCup', 'nightFacadeWide',
];

/**
 * Фото по позициям меню. Реальных кадров меньше, чем позиций в меню, поэтому
 * несколько похожих напитков делят один снимок — как в их собственной ленте,
 * где один кадр «три холодных напитка» подписан под разными вкусами.
 */
export const menuShots: Partial<Record<string, PhotoKey>> = {
  'savva-matcha': 'drinksLineup1',
  'matcha-berry': 'drinksLineup1',
  'savva-melon': 'melonSlush',
  'ice-tea-savva': 'threeCupsPour',
  'ice-hibiscus': 'pourHibiscus',
  'hibiscus-slush': 'pourHibiscus',
  'coffee-of-day': 'pourCoffee',
  'v60': 'barCounter',
  'espresso': 'pourCoffee',
  'americano': 'pourCoffee',
  'turkish': 'pourCoffee',
  'turkish-milk': 'pourCoffee',
  'iced-americano': 'icedDark',
  'ice-shaken': 'icedDark',
  'alfredo': 'drinksLineup2',
  'iced-latte': 'drinksLineup2',
  'iced-spanish-latte': 'drinksLineup2',
  'iced-matcha-latte': 'drinksLineup2',
  'iced-matcha-spanish': 'drinksLineup2',
  'ice-white-mocha': 'drinksLineup2',
  'ice-chocolate': 'drinksLineup2',
  'madini-cookies': 'productMadiniCookies',
  'turkey-sandwich': 'sandwichLaptop',
  'halloumi-sandwich': 'sandwichHero',
};

/** Обратная совместимость со старым именем */
export const signatureShots = menuShots;
