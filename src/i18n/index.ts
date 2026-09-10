export type Lang = 'ar' | 'en';

/** Каждая строка живёт на обоих языках. Порядок ключей — порядок появления на странице. */
export const t = {
  // Шапка и навигация
  brandCoffee: { ar: 'قهوة', en: 'Coffee' },
  navMenu: { ar: 'القائمة', en: 'Menu' },
  navBrew: { ar: 'التخصصية', en: 'Brew bar' },
  navPlace: { ar: 'المكان', en: 'The place' },
  navBook: { ar: 'حجز طاولة', en: 'Book a table' },
  navVisit: { ar: 'الوصول', en: 'Find us' },
  switchTo: { ar: 'English', en: 'العربية' },
  switchLabel: { ar: 'تغيير اللغة', en: 'Change language' },

  // Первый экран
  openNow: { ar: 'مفتوح الآن', en: 'Open now' },
  closedNow: { ar: 'مغلق الآن', en: 'Closed now' },
  closesAt: { ar: 'يغلق ٢:٠٠ صباحًا', en: 'Closes at 2 am' },
  opensAt: { ar: 'يفتح ٧:٠٠ صباحًا', en: 'Opens at 7 am' },
  heroLead: {
    ar: 'قهوة مختصة في المدينة المنورة',
    en: 'Specialty coffee in Madinah',
  },
  scrollCue: { ar: 'اسحب للأسفل', en: 'Scroll' },

  // Меню
  menuTitle: { ar: 'القائمة', en: 'The menu' },
  searchLabel: { ar: 'ابحث في القائمة', en: 'Search the menu' },
  searchPlaceholder: { ar: 'إسبريسو، ماتشا، كيك…', en: 'Espresso, matcha, cake…' },
  nothingFound: { ar: 'لا توجد نتائج', en: 'Nothing matched' },
  nothingFoundHint: { ar: 'جرّب اسمًا آخر أو امسح البحث', en: 'Try another name, or clear the search' },
  clearSearch: { ar: 'مسح', en: 'Clear' },
  cals: { ar: 'سعرة', en: 'cals' },
  signature: { ar: 'من توقيعنا', en: 'Signature' },
  favourite: { ar: 'المفضلة', en: 'Favourite' },
  add: { ar: 'أضف', en: 'Add' },
  addTo: { ar: 'أضف إلى الطلب', en: 'Add to order' },
  itemOptions: { ar: 'اختر تفاصيل المشروب', en: 'Choose how you take it' },
  close: { ar: 'إغلاق', en: 'Close' },

  // Брю-бар
  brewTitle: { ar: 'بار التقطير', en: 'The brew bar' },
  brewLead: {
    ar: 'نطحن عند الطلب ونقطّر يدويًا على V60. المحصول يتغيّر كل يوم.',
    en: 'Ground to order and hand poured on a V60. The lot changes every day.',
  },
  brewMethod: { ar: 'الطريقة', en: 'Method' },
  brewGrind: { ar: 'الطحن', en: 'Grind' },
  brewRatio: { ar: 'النسبة', en: 'Ratio' },
  brewTime: { ar: 'الزمن', en: 'Time' },

  // Место
  placeTitle: { ar: 'المكان', en: 'The place' },
  placeLead: {
    ar: 'صالة وتراس، ٤٦ مقعدًا، ونبقى مفتوحين حتى الثانية صباحًا.',
    en: 'An indoor room and a terrace, 46 seats, open until two in the morning.',
  },
  photosSoon: { ar: 'الصور قادمة قريبًا', en: 'Photography coming soon' },
  photosSoonBody: {
    ar: 'ستوضع هنا صور الصالة والتراس والليل من حساب المقهى.',
    en: 'The room, the terrace and the late hours will sit here, shot by the café.',
  },

  // Бронь
  bookTitle: { ar: 'حجز طاولة', en: 'Book a table' },
  bookLead: {
    ar: 'اختر الوقت وعدد الضيوف، وسنحفظ لك الطاولة.',
    en: 'Pick a time and a party size and the table is held for you.',
  },
  bookDate: { ar: 'التاريخ', en: 'Date' },
  bookTime: { ar: 'الوقت', en: 'Time' },
  bookGuests: { ar: 'عدد الضيوف', en: 'Guests' },
  bookArea: { ar: 'المكان', en: 'Where' },
  bookName: { ar: 'الاسم', en: 'Name' },
  bookPhone: { ar: 'رقم الجوال', en: 'Mobile' },
  bookSubmit: { ar: 'احجز الطاولة', en: 'Hold the table' },
  bookTaken: { ar: 'محجوز', en: 'Taken' },
  bookNoSlots: { ar: 'لا توجد أوقات متاحة في هذا اليوم', en: 'No times left on this day' },

  // Заказ
  orderTitle: { ar: 'طلبك', en: 'Your order' },
  orderEmpty: { ar: 'لم تضف شيئًا بعد', en: 'Nothing added yet' },
  orderEmptyHint: { ar: 'تصفّح القائمة واختر ما يعجبك', en: 'Browse the menu and pick something' },
  orderTotal: { ar: 'الإجمالي', en: 'Total' },
  orderWhere: { ar: 'أين تجلس؟', en: 'Where are you?' },
  orderDineIn: { ar: 'في الصالة', en: 'At a table' },
  orderTakeaway: { ar: 'طلب خارجي', en: 'Takeaway' },
  orderTable: { ar: 'رقم الطاولة', en: 'Table number' },
  orderNote: { ar: 'ملاحظة للباريستا', en: 'Note for the barista' },
  orderNotePlaceholder: { ar: 'سكر أقل، من فضلك…', en: 'Less sugar, please…' },
  orderSubmit: { ar: 'أرسل الطلب', en: 'Send the order' },
  orderRemove: { ar: 'حذف', en: 'Remove' },
  orderQty: { ar: 'الكمية', en: 'Quantity' },
  orderIncrease: { ar: 'زيادة', en: 'Increase' },
  orderDecrease: { ar: 'إنقاص', en: 'Decrease' },
  orderOpen: { ar: 'عرض الطلب', en: 'View order' },

  // Подтверждение
  doneOrderTitle: { ar: 'تم استلام طلبك', en: 'Order received' },
  doneBookTitle: { ar: 'تم حفظ الحجز', en: 'Table held' },
  doneNumber: { ar: 'رقم الطلب', en: 'Order number' },
  doneBack: { ar: 'العودة إلى القائمة', en: 'Back to the menu' },
  demoNotice: {
    ar: 'هذه نسخة تجريبية للعرض: لم يُرسل الطلب إلى المقهى ولن يُحضَّر.',
    en: 'This is a demo build. Nothing was sent to the café and nothing will be made.',
  },

  // Как добраться
  visitTitle: { ar: 'الوصول', en: 'Find us' },
  visitAddress: { ar: 'العنوان', en: 'Address' },
  visitPhone: { ar: 'الهاتف', en: 'Phone' },
  visitHours: { ar: 'ساعات العمل', en: 'Hours' },
  visitPlusCode: { ar: 'الرمز الإضافي', en: 'Plus code' },
  visitRoute: { ar: 'الاتجاهات', en: 'Directions' },
  visitCall: { ar: 'اتصل بنا', en: 'Call us' },
  visitDaily: { ar: 'يوميًا ٧:٠٠ ص — ٢:٠٠ ص', en: 'Daily 7 am — 2 am' },

  // Подвал
  ratingOn: { ar: 'على خرائط جوجل', en: 'on Google Maps' },
  reviewsWord: { ar: 'تقييم', en: 'reviews' },
  demoFooter: {
    ar: 'نسخة تجريبية للعرض فقط',
    en: 'Demonstration build, not the live site',
  },
} as const;

export type Key = keyof typeof t;

/** Обе строки сразу — шаблон рендерит их рядом и прячет лишнюю через CSS */
export function pair(key: Key) {
  return t[key];
}
