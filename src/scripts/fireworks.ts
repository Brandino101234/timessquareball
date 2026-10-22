/**
 * Fireworks over the footer, set off when the visitor reaches the bottom of
 * the page. Shells rise from the bottom of the canvas and burst into gold,
 * white and rose sparks that fall and fade. Runs for a few seconds each time
 * the footer comes into view; skipped entirely for reduced motion.
 */
const COLORS = ['#e2b04a', '#f0c86e', '#ffffff', '#f27bb0', '#ff8a5b', '#9adcf5'];

interface Shell { x: number; y: number; vy: number; targetY: number; color: string }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number }

export function mountFireworks(canvas: HTMLCanvasElement, trigger: Element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0, height = 0, dpr = 1;
  let shells: Shell[] = [];
  let sparks: Spark[] = [];
  let launchUntil = 0;
  let nextLaunch = 0;
  let frame = 0;
  let running = false;

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = r.width;
    height = r.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  };

  const launch = () => {
    const color = COLORS[(Math.random() * COLORS.length) | 0];
    shells.push({
      x: width * (0.12 + Math.random() * 0.76),
      y: height,
      vy: -(height * 0.018 + Math.random() * height * 0.006),
      targetY: height * (0.15 + Math.random() * 0.3),
      color,
    });
  };

  const burst = (s: Shell) => {
    const count = 90 + ((Math.random() * 50) | 0);
    const speed = Math.min(width, height) * (0.012 + Math.random() * 0.007);
    const second = Math.random() < 0.4 ? COLORS[(Math.random() * COLORS.length) | 0] : s.color;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const v = speed * (0.55 + Math.random() * 0.6);
      const max = 60 + Math.random() * 40;
      sparks.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: max, max, color: i % 3 ? s.color : second, size: 1.6 + Math.random() * 1.8 });
    }
  };

  const tick = (now: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Fade the previous frame to leave short trails
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    if (now < launchUntil && now >= nextLaunch) {
      launch();
      if (Math.random() < 0.6) launch();
      nextLaunch = now + 220 + Math.random() * 360;
    }

    shells = shells.filter((s) => {
      s.y += s.vy;
      s.vy *= 0.985;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
      if (s.y <= s.targetY || s.vy > -1) {
        burst(s);
        return false;
      }
      return true;
    });

    sparks = sparks.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.vy = p.vy * 0.97 + 0.045;
      p.life -= 1;
      const alpha = Math.max(0, p.life / p.max);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.6 + alpha * 0.6), 0, Math.PI * 2);
      ctx.fill();
      return p.life > 0;
    });
    ctx.globalAlpha = 1;

    if (now < launchUntil || shells.length || sparks.length) {
      frame = requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, width, height);
    }
  };

  const start = () => {
    launchUntil = performance.now() + 5500;
    nextLaunch = 0;
    if (!running) {
      running = true;
      resize();
      frame = requestAnimationFrame(tick);
    }
  };

  new ResizeObserver(resize).observe(canvas);
  let shown = false;
  new IntersectionObserver(
    ([entry]) => {
      // Celebrate each time the bottom of the page comes back into view
      if (entry.isIntersecting && !shown) start();
      shown = entry.isIntersecting;
    },
    { threshold: 0.6 },
  ).observe(trigger);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame), (running = false);
  });
}
