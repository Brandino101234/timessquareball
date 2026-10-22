/**
 * Scroll animations (styles in src/styles/global.css):
 *  - [data-reveal]         marked data-inview when it scrolls into view
 *  - [data-reveal-stagger] children with data-reveal appear one after another
 *  - [data-count-to]       number counts up from 0 when it comes into view
 *  - [data-parallax]       moves slower than the page as you scroll
 * Visitors who prefer reduced motion see everything in place, without motion.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

for (const group of document.querySelectorAll<HTMLElement>('[data-reveal-stagger]')) {
  const step = Number(group.dataset.revealStagger) || 90;
  group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-delay', `${i * step}ms`));
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.countTo);
  const decimals = Number(el.dataset.countDecimals ?? 0);
  const format = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (reduced || !Number.isFinite(target)) return;
  const start = performance.now();
  const duration = 1600;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(frame);
  };
  el.textContent = format(0);
  requestAnimationFrame(frame);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      el.setAttribute('data-inview', '');
      if (el.dataset.countTo) countUp(el);
      observer.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
);
document.querySelectorAll('[data-reveal], [data-count-to]').forEach((el) => observer.observe(el));
(window as unknown as { __revealReady?: boolean }).__revealReady = true;

// Parallax
const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
if (layers.length && !reduced) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const layer of layers) {
      const box = layer.parentElement!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) continue;
      const speed = Number(layer.dataset.parallax) || 0.15;
      const offset = (box.top + box.height / 2 - vh / 2) * -speed;
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`;
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

root.classList.add('js-reveal');
