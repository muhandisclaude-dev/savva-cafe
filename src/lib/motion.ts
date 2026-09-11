/**
 * Единая система движения сайта.
 *
 * Плавная прокрутка на Lenis, сценарии на GSAP ScrollTrigger. Всё в одном
 * месте, чтобы разные эффекты жили в одной раскадровке, а не спорили друг
 * с другом за requestAnimationFrame.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Плавная прокрутка ───────────────────────────────────────── */

let lenis: Lenis | null = null;

function initLenis(): void {
  if (reduceMotion) return; // уважаем системную настройку — прокрутка остаётся обычной

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── Проявление из темноты ───────────────────────────────────── */
/* Класс .reveal задаёт затемнённое, чуть увеличенное и сдвинутое состояние
   в CSS; здесь только снимается .is-in при входе в кадр. Без JS элементы
   остаются видимыми по умолчанию (см. правило .no-js .reveal в CSS). */

function initReveals(): void {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (reduceMotion) {
    els.forEach((el) => el.classList.add('is-in', 'no-motion'));
    return;
  }
  els.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('is-in'),
    });
  });
}

/* ── Свет листвы: независимый от прокрутки дрейф ─────────────── */

function initDapple(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-dapple]');
  if (reduceMotion) return;
  els.forEach((el, i) => {
    gsap.to(el, {
      xPercent: 6,
      yPercent: 4,
      scale: 1.12,
      duration: 70 + i * 14,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });
}

/* ── Счётчики: считают от нуля при попадании в кадр ──────────── */

function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  els.forEach((el) => {
    const target = Number(el.dataset.counter);
    const decimals = el.dataset.counterDecimals ? Number(el.dataset.counterDecimals) : 0;
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
        });
      },
    });
  });
}

/* ── Горизонтальная лента, едущая вбок при вертикальной прокрутке ── */

function initHorizontalReels(): void {
  if (reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-reel]').forEach((track) => {
    const distance = track.scrollWidth - track.parentElement!.clientWidth;
    if (distance <= 0) return;
    gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: track.parentElement,
        start: 'top 70%',
        end: () => `+=${distance + window.innerHeight * 0.6}`,
        scrub: 0.6,
      },
    });
  });
}

/* ── Фото «проступает из темноты»: яркость и лёгкий наезд по прокрутке ── */

function initPhotoLift(): void {
  if (reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-photo-lift]').forEach((fig) => {
    const img = fig.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.14, filter: 'brightness(0.5) saturate(0.8)' },
      {
        scale: 1,
        filter: 'brightness(1) saturate(1)',
        ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top 95%', end: 'top 35%', scrub: 0.8 },
      },
    );
  });
}

/* ── Запуск ──────────────────────────────────────────────────── */

export function initMotion(): void {
  document.documentElement.classList.remove('no-js');
  initLenis();
  initReveals();
  initDapple();
  initCounters();
  initHorizontalReels();
  initPhotoLift();

  // Переключение языка перекраивает высоту многих блоков — пересчитываем триггеры
  document.addEventListener('savva:lang', () => ScrollTrigger.refresh());

  // Позиции триггеров считаются по текущей раскладке; фото ниже экрана
  // догружаются лениво и сдвигают страницу уже после первого расчёта —
  // каждая такая догрузка обязана пересчитать позиции заново
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export function refreshMotion(): void {
  ScrollTrigger.refresh();
}
