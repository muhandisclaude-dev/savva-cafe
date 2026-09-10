/**
 * Галерея. Каждый снимок несёт источник — без него нельзя выпускать в бой.
 * Все кадры ниже — съёмка самого заведения из @savva_cafe, права у него.
 * Файлы в public/photos, формат 640 по высоте, как отдаёт лента без входа.
 * TODO: для боевой версии нужны оригиналы в высоком разрешении.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: { ar: string; en: string };
  source: 'instagram' | 'google-maps' | 'venue';
  /** Крупная плитка в сетке — для самых сильных кадров */
  feature?: boolean;
};

export const photos: Photo[] = [
  {
    src: '/photos/savva-04.jpg',
    width: 478,
    height: 640,
    source: 'instagram',
    feature: true,
    alt: {
      ar: 'كوب ساڤا وساندوتش على صينية بجانب حاسوب، ضوء نهار',
      en: 'A Savva cup and a sandwich on a tray beside a laptop in daylight',
    },
  },
  {
    src: '/photos/savva-03.jpg',
    width: 360,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'سكب قهوة مقطّرة في أكواب ساڤا الخضراء',
      en: 'Filter coffee poured into Savva’s green cups',
    },
  },
  {
    src: '/photos/savva-07.jpg',
    width: 477,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'ثلاثة مشروبات باردة من ساڤا على طاولة خشبية',
      en: 'Three iced Savva drinks lined up on a wooden table',
    },
  },
  {
    src: '/photos/savva-06.jpg',
    width: 512,
    height: 640,
    source: 'instagram',
    feature: true,
    alt: {
      ar: 'ساندوتش حلوم على خبز السمسم فوق ورق ساڤا',
      en: 'A halloumi sandwich on sesame bread over Savva wrap paper',
    },
  },
  {
    src: '/photos/savva-02.jpg',
    width: 480,
    height: 640,
    source: 'instagram',
    feature: true,
    alt: {
      ar: 'سكب مشروب الكركديه البارد في كوب ساڤا',
      en: 'Iced hibiscus poured into a Savva cup',
    },
  },
  {
    src: '/photos/savva-05.jpg',
    width: 518,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'تقديم الطلب من ساڤا إلى نافذة سيارة',
      en: 'A Savva order handed to a car window',
    },
  },
  {
    src: '/photos/savva-10.jpg',
    width: 477,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'سلاش شمام ساڤا في يد وسط أوراق خضراء',
      en: 'A Savva melon slush held up against green leaves',
    },
  },
  {
    src: '/photos/savva-12.jpg',
    width: 477,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'مشروب ساڤا بارد بالثلج على طاولة خشبية داكنة',
      en: 'An iced Savva drink on a dark wooden table',
    },
  },
  {
    src: '/photos/savva-01.jpg',
    width: 360,
    height: 640,
    source: 'instagram',
    alt: {
      ar: 'ماتشا بيري وشمام ساڤا جنبًا إلى جنب أمام واجهة المقهى',
      en: 'Matcha berry and Savva melon side by side in front of the café window',
    },
  },
];
