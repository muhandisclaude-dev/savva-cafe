import { itemById, optionGroups, basePrice, type MenuItem } from '../data/menu';
import { slotsFor, todayInMadinah, maxDate } from '../data/booking';
import { isOpenNow } from '../data/venue';
import { t } from '../i18n';
import * as cart from '../lib/cart';
import { submitOrder, submitBooking } from '../lib/submit';

type Lang = 'ar' | 'en';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  [...root.querySelectorAll(sel)] as T[];

const riyal = '<span class="riyal-inline" role="img" aria-label="SAR"></span>';

/* ══ Язык ═══════════════════════════════════════════════════ */

function currentLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

/** Атрибуты нельзя переключить через CSS, поэтому проходим по ним вручную */
function applyLangAttributes(lang: Lang): void {
  for (const el of $$('[data-label-ar]')) {
    const v = el.getAttribute(`data-label-${lang}`);
    if (v) el.setAttribute('aria-label', v);
  }
  for (const el of $$<HTMLInputElement>('[data-ph-ar]')) {
    const v = el.getAttribute(`data-ph-${lang}`);
    if (v) el.placeholder = v;
  }
  for (const el of $$<HTMLImageElement>('img[data-alt-ar]')) {
    const v = el.getAttribute(`data-alt-${lang}`);
    if (v) el.alt = v;
  }
}

function setLang(lang: Lang): void {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  try {
    localStorage.setItem('savva.lang', lang);
  } catch {
    /* приватное окно — язык не запомнится, но переключится */
  }
  applyLangAttributes(lang);
  renderTray();
  renderSlots();
}

function initLang(): void {
  applyLangAttributes(currentLang());
  $('[data-lang-switch]')?.addEventListener('click', () => {
    setLang(currentLang() === 'ar' ? 'en' : 'ar');
  });
}

/* ══ Статус «открыто сейчас» ════════════════════════════════ */

function initStatus(): void {
  const box = $('[data-status]');
  if (!box) return;

  const paint = () => {
    const open = isOpenNow();
    const dot = $('.dot', box);
    dot?.setAttribute('data-open', String(open));

    const word = $('[data-status-word]', box);
    if (word) {
      word.innerHTML =
        `<span data-lang="ar">${open ? t.openNow.ar : t.closedNow.ar}</span>` +
        `<span data-lang="en">${open ? t.openNow.en : t.closedNow.en}</span>`;
    }
    const hours = $('[data-status-hours]', box);
    if (hours) {
      hours.innerHTML =
        `<span data-lang="ar">${open ? t.closesAt.ar : t.opensAt.ar}</span>` +
        `<span data-lang="en">${open ? t.closesAt.en : t.opensAt.en}</span>`;
    }
  };

  paint();
  // Пересчёт раз в минуту: страницу за столиком держат открытой подолгу
  setInterval(paint, 60_000);
}

/* ══ Диалог выбора опций ════════════════════════════════════ */

let pendingItem: MenuItem | null = null;
let pendingOptions: Record<string, string> = {};

function priceWith(item: MenuItem, options: Record<string, string>): number {
  let sum = basePrice(item);
  for (const [g, c] of Object.entries(options)) {
    const choice = optionGroups[g]?.choices.find((x) => x.id === c);
    if (choice) sum += choice.delta;
  }
  return sum;
}

function renderDialog(): void {
  const dlg = $<HTMLDialogElement>('[data-item-dialog]');
  if (!dlg || !pendingItem) return;
  const lang = currentLang();
  const item = pendingItem;

  const nameEl = $('[data-dialog-name]', dlg)!;
  nameEl.textContent = item.name[lang];

  const noteEl = $('[data-dialog-note]', dlg)!;
  if (item.note) {
    noteEl.textContent = item.note[lang];
    noteEl.hidden = false;
  } else {
    noteEl.hidden = true;
  }

  const groupsEl = $('[data-dialog-groups]', dlg)!;
  groupsEl.innerHTML = (item.options ?? [])
    .map((gid) => {
      const g = optionGroups[gid];
      if (!g) return '';
      const choices = g.choices
        .map((c) => {
          const on = pendingOptions[gid] === c.id;
          const delta = c.delta > 0 ? ` <span class="opt-delta tnum">+${c.delta}</span>` : '';
          return `<button type="button" class="opt" role="radio" aria-checked="${on}" data-group="${gid}" data-choice="${c.id}">${c.label[lang]}${delta}</button>`;
        })
        .join('');
      return `<div class="opt-group"><span class="label">${g.label[lang]}</span><div class="opt-row" role="radiogroup" aria-label="${g.label[lang]}">${choices}</div></div>`;
    })
    .join('');

  $('[data-dialog-price]', dlg)!.innerHTML = riyal + priceWith(item, pendingOptions);
}

function openItem(item: MenuItem): void {
  const dlg = $<HTMLDialogElement>('[data-item-dialog]');
  if (!dlg) return;
  pendingItem = item;
  pendingOptions = cart.defaultOptions(item);
  renderDialog();
  dlg.showModal();
}

function initItemDialog(): void {
  const dlg = $<HTMLDialogElement>('[data-item-dialog]');
  if (!dlg) return;

  dlg.addEventListener('click', (e) => {
    const opt = (e.target as HTMLElement).closest<HTMLElement>('.opt');
    if (!opt) return;
    pendingOptions[opt.dataset.group!] = opt.dataset.choice!;
    renderDialog();
  });

  $('[data-dialog-confirm]', dlg)?.addEventListener('click', () => {
    if (pendingItem) cart.add(pendingItem.id, pendingOptions);
    dlg.close();
    flashRail();
  });
}

/* ══ Добавление из строки меню ══════════════════════════════ */

function flashRail(): void {
  const btn = $('[data-cart-open]');
  btn?.animate(
    [{ transform: 'none' }, { transform: 'scale(1.08)' }, { transform: 'none' }],
    { duration: 420, easing: 'cubic-bezier(.33,.02,0,1)' },
  );
}

function initAddButtons(): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-add]');
    if (!btn) return;
    const item = itemById.get(btn.dataset.add!);
    if (!item) return;

    if (btn.dataset.options === 'true') {
      openItem(item);
      return;
    }
    cart.add(item.id, cart.defaultOptions(item));
    btn.classList.add('just-added');
    setTimeout(() => btn.classList.remove('just-added'), 700);
    flashRail();
  });
}

/* ══ Избранное ══════════════════════════════════════════════ */

function initFavourites(): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-fav]');
    if (!btn) return;
    const on = cart.toggleFavourite(btn.dataset.fav!);
    btn.setAttribute('aria-pressed', String(on));
  });

  document.addEventListener('savva:favourites', ((e: CustomEvent<{ ids: string[] }>) => {
    const ids = new Set(e.detail.ids);
    for (const btn of $$('[data-fav]')) {
      btn.setAttribute('aria-pressed', String(ids.has(btn.dataset.fav!)));
    }
  }) as EventListener);
}

/* ══ Корзина ════════════════════════════════════════════════ */

function optionSummary(options: Record<string, string>, lang: Lang): string {
  const parts: string[] = [];
  for (const [gid, cid] of Object.entries(options)) {
    const g = optionGroups[gid];
    const c = g?.choices.find((x) => x.id === cid);
    if (!g || !c || c.quiet) continue;
    parts.push(c.label[lang]);
  }
  return parts.join(' · ');
}

function renderTray(): void {
  const lang = currentLang();
  const lines = cart.all();

  const countEl = $('[data-cart-count]');
  if (countEl) {
    const n = cart.count();
    countEl.textContent = String(n);
    countEl.hidden = n === 0;
  }

  const empty = $('[data-tray-empty]');
  const main = $('[data-tray-main]');
  const done = $('[data-tray-done]');
  if (!empty || !main || !done) return;

  // Экран подтверждения держится, пока пользователь сам не вернётся
  if (!done.hidden) return;

  empty.hidden = lines.length > 0;
  main.hidden = lines.length === 0;

  const list = $('[data-tray-lines]');
  if (list) {
    list.innerHTML = lines
      .map((l) => {
        const item = itemById.get(l.id)!;
        const summary = optionSummary(l.options, lang);
        return `<li class="tline">
          <div class="tline-text">
            <span class="tline-name">${item.name[lang]}</span>
            ${summary ? `<span class="tline-opts">${summary}</span>` : ''}
          </div>
          <div class="tline-qty">
            <button type="button" class="qty" data-qty="-1" data-key="${l.key}" aria-label="${t.orderDecrease[lang]}">−</button>
            <span class="tnum" aria-label="${t.orderQty[lang]}">${l.qty}</span>
            <button type="button" class="qty" data-qty="1" data-key="${l.key}" aria-label="${t.orderIncrease[lang]}">+</button>
          </div>
          <span class="tline-sum tnum">${riyal}${cart.lineTotal(l)}</span>
        </li>`;
      })
      .join('');
  }

  const total = $('[data-tray-total]');
  if (total) total.innerHTML = riyal + cart.total();
}

function initTray(): void {
  const dlg = $<HTMLDialogElement>('[data-cart-dialog]');
  if (!dlg) return;

  $('[data-cart-open]')?.addEventListener('click', () => dlg.showModal());

  dlg.addEventListener('click', (e) => {
    const q = (e.target as HTMLElement).closest<HTMLElement>('[data-qty]');
    if (!q) return;
    const line = cart.all().find((l) => l.key === q.dataset.key);
    if (line) cart.setQty(line.key, line.qty + Number(q.dataset.qty));
  });

  // Номер стола нужен только тем, кто сидит в зале
  const tableField = $('[data-table-field]');
  const tableInput = $<HTMLInputElement>('#order-table');
  const syncMode = () => {
    const mode = ($('input[name="mode"]:checked', dlg) as HTMLInputElement | null)?.value ?? 'dine-in';
    const dineIn = mode === 'dine-in';
    if (tableField) tableField.hidden = !dineIn;
    if (tableInput) tableInput.required = dineIn;
  };
  for (const r of $$('input[name="mode"]', dlg)) r.addEventListener('change', syncMode);
  syncMode();

  const form = $<HTMLFormElement>('[data-order-form]', dlg);
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const submit = $<HTMLButtonElement>('.tray-submit', form)!;
    submit.setAttribute('aria-busy', 'true');

    const data = new FormData(form);
    const receipt = await submitOrder({
      items: cart.all().map((l) => ({
        id: l.id,
        qty: l.qty,
        options: l.options,
        unitPrice: cart.unitPrice(l.id, l.options),
      })),
      total: cart.total(),
      mode: (data.get('mode') as 'dine-in' | 'takeaway') ?? 'dine-in',
      table: (data.get('table') as string) || undefined,
      note: (data.get('note') as string) || undefined,
    });

    submit.removeAttribute('aria-busy');
    $('[data-done-ref]')!.textContent = receipt.reference;
    $('[data-tray-main]')!.hidden = true;
    $('[data-tray-empty]')!.hidden = true;
    $('[data-tray-done]')!.hidden = false;
    cart.clear();
    form.reset();
    syncMode();
  });

  $('[data-tray-back]')?.addEventListener('click', () => {
    $('[data-tray-done]')!.hidden = true;
    renderTray();
    dlg.close();
  });

  document.addEventListener('savva:cart', renderTray);
}

/* ══ Поиск по меню ══════════════════════════════════════════ */

function initSearch(): void {
  const input = $<HTMLInputElement>('#menu-q');
  if (!input) return;
  const emptyMsg = $('[data-empty]');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;

    for (const course of $$('[data-course]')) {
      let visibleInCourse = 0;
      for (const row of $$<HTMLElement>('.row', course)) {
        const hit = !q || (row.dataset.search ?? '').includes(q);
        row.hidden = !hit;
        if (hit) visibleInCourse++;
      }
      course.hidden = visibleInCourse === 0;
      shown += visibleInCourse;
    }

    if (emptyMsg) emptyMsg.hidden = shown > 0;
  });
}

/* ══ Бронь ══════════════════════════════════════════════════ */

let chosenSlot = '';

function renderSlots(): void {
  const box = $('[data-slots]');
  const dateInput = $<HTMLInputElement>('#book-date');
  if (!box || !dateInput) return;

  const area = ($('input[name="area"]:checked') as HTMLInputElement | null)?.value ?? 'indoor';
  const slots = slotsFor(dateInput.value || todayInMadinah(), area);

  box.innerHTML = slots
    .map(
      (s) =>
        `<button type="button" class="slot tnum" role="radio" aria-checked="${s.value === chosenSlot}" ${
          s.busy ? 'disabled' : ''
        } data-slot="${s.value}">${s.label}</button>`,
    )
    .join('');

  const free = slots.some((s) => !s.busy);
  const none = $('[data-noslots]');
  if (none) none.hidden = free;
}

function initBooking(): void {
  const form = $<HTMLFormElement>('[data-booking-form]');
  if (!form) return;

  const dateInput = $<HTMLInputElement>('#book-date')!;
  dateInput.min = todayInMadinah();
  dateInput.max = maxDate();
  dateInput.value = todayInMadinah();

  renderSlots();

  dateInput.addEventListener('change', () => {
    chosenSlot = '';
    renderSlots();
  });
  for (const r of $$('input[name="area"]', form)) {
    r.addEventListener('change', () => {
      chosenSlot = '';
      renderSlots();
    });
  }

  form.addEventListener('click', (e) => {
    const slot = (e.target as HTMLElement).closest<HTMLElement>('[data-slot]');
    if (!slot || (slot as HTMLButtonElement).disabled) return;
    chosenSlot = slot.dataset.slot!;
    renderSlots();
    $('[data-booking-error]')!.hidden = true;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = currentLang();
    const err = $('[data-booking-error]')!;

    if (!form.reportValidity()) return;

    if (!chosenSlot) {
      err.textContent = lang === 'ar' ? 'اختر وقتًا من فضلك' : 'Pick a time first';
      err.hidden = false;
      return;
    }

    const data = new FormData(form);
    const phone = String(data.get('phone') ?? '').replace(/[\s-]/g, '');
    // Саудовский мобильный: 05XXXXXXXX, +9665XXXXXXXX или 9665XXXXXXXX
    if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) {
      err.textContent = lang === 'ar' ? 'رقم الجوال غير صحيح' : 'That mobile number does not look right';
      err.hidden = false;
      return;
    }

    const submit = $<HTMLButtonElement>('.book-submit', form)!;
    submit.setAttribute('aria-busy', 'true');

    const receipt = await submitBooking({
      date: String(data.get('date')),
      time: chosenSlot,
      guests: Number(data.get('guests')),
      area: String(data.get('area')),
      name: String(data.get('name')),
      phone,
    });

    submit.removeAttribute('aria-busy');
    const guests = data.get('guests');
    $('[data-booking-summary]')!.textContent =
      lang === 'ar'
        ? `${data.get('date')} · ${chosenSlot} · ${guests} ضيوف · ${receipt.reference}`
        : `${data.get('date')} · ${chosenSlot} · ${guests} guests · ${receipt.reference}`;
    form.hidden = true;
    $('[data-booking-done]')!.hidden = false;
  });

  $('[data-booking-again]')?.addEventListener('click', () => {
    chosenSlot = '';
    form.reset();
    dateInput.value = todayInMadinah();
    renderSlots();
    form.hidden = false;
    $('[data-booking-done]')!.hidden = true;
    form.scrollIntoView({ block: 'center' });
  });
}

/* ══ Активный пункт в навигации ═════════════════════════════ */

function initRailHighlight(): void {
  const links = $$<HTMLAnchorElement>('[data-rail-link]');
  if (!links.length) return;

  const targets = links
    .map((l) => ({ link: l, el: document.querySelector(l.getAttribute('data-rail-link')!) }))
    .filter((x): x is { link: HTMLAnchorElement; el: Element } => Boolean(x.el));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const { link, el } of targets) {
          link.setAttribute('aria-current', String(el === entry.target));
        }
      }
    },
    { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
  );

  for (const { el } of targets) io.observe(el);
}

/* ══ Запуск ═════════════════════════════════════════════════ */

initLang();
initStatus();
cart.hydrate();
initItemDialog();
initAddButtons();
initFavourites();
initTray();
initSearch();
initBooking();
initRailHighlight();
