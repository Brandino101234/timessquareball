/**
 * A short theatrical fireworks show when the visitor reaches the bottom of the
 * page. The screen dims like house lights going down, shells rise with
 * sparkling trails and burst as peonies, gold willows, rings, chrysanthemums,
 * crackling crossettes and glitter, each with a flash of light; a rapid finale
 * closes the show and the lights come back up.
 *
 * The show lasts about four seconds and fades out straight away if the
 * visitor scrolls back up. Drawn on a fixed, full-screen canvas that never
 * blocks clicks. Plays again when the visitor returns to the bottom (at most
 * every 20 seconds). Skipped entirely for visitors who prefer reduced motion.
 */
const PALETTES = [
  ['#e2b04a', '#f0c86e', '#fff4d6'], // gold
  ['#ffffff', '#dfe8ff', '#b9d7ff'], // silver
  ['#f27bb0', '#ff9fd0', '#ffffff'], // rose
  ['#ff5a4e', '#ff9b5a', '#ffd27a'], // red-orange
  ['#7fd3ff', '#b3a6ff', '#ffffff'], // blue-violet
  ['#7dffb0', '#e2b04a', '#ffffff'], // green-gold
];

type BurstKind = 'peony' | 'chrysanthemum' | 'willow' | 'ring' | 'crossette' | 'glitter';

interface Shell {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: BurstKind;
  palette: string[];
  fuse: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  width: number;
  gravity: number;
  drag: number;
  trail: number;
  twinkle: boolean;
  splits?: boolean;
}

interface Flash {
  x: number;
  y: number;
  r: number;
  life: number;
  color: string;
}

/** When the house lights come back up, in ms from the start of the show. */
const SHOW_MS = 4200;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]) => list[(Math.random() * list.length) | 0];

export function mountFireworks(canvas: HTMLCanvasElement, trigger: Element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let unit = 1; // scales the show to the screen size
  let shells: Shell[] = [];
  let sparks: Spark[] = [];
  let flashes: Flash[] = [];
  let schedule: { at: number; kind: BurstKind }[] = [];
  let showStart = 0;
  let lastShow = -Infinity;
  let frame = 0;
  let running = false;
  let veil = 0; // 0..1, how dark the "house lights" are
  let fadeOut = 1; // drops to 0 when the visitor scrolls away mid-show
  let stopping = false;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    unit = Math.min(width, height) / 800;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  };

  // The running order: an opening volley, a varied middle, then the finale.
  const buildSchedule = () => {
    const kinds: BurstKind[] = ['peony', 'chrysanthemum', 'willow', 'ring', 'crossette', 'glitter'];
    const list: { at: number; kind: BurstKind }[] = [
      { at: 200, kind: 'chrysanthemum' },
      { at: 450, kind: 'peony' },
    ];
    let t = 750;
    while (t < 1900) {
      list.push({ at: t, kind: pick(kinds) });
      if (Math.random() < 0.4) list.push({ at: t + 100, kind: pick(kinds) });
      t += rand(260, 420);
    }
    // Finale: a fast barrage, closing on a gold willow canopy.
    for (let i = 0; i < 10; i++) list.push({ at: 2000 + i * 90, kind: pick(['peony', 'chrysanthemum', 'glitter', 'ring']) });
    for (let i = 0; i < 3; i++) list.push({ at: 2900 + i * 80, kind: 'willow' });
    return list.sort((a, b) => a.at - b.at);
  };

  const launch = (kind: BurstKind) => {
    const x = width * rand(0.12, 0.88);
    const apex = height * rand(0.18, 0.45);
    // Initial speed needed to reach the apex under gravity
    const g = 0.12 * unit;
    const vy = -Math.sqrt(2 * g * (height - apex));
    shells.push({ x, y: height + 10, vx: rand(-0.6, 0.6) * unit, vy, kind, palette: pick(PALETTES), fuse: 0 });
  };

  const addSpark = (s: Partial<Spark> & Pick<Spark, 'x' | 'y' | 'vx' | 'vy' | 'color'>) => {
    const max = s.max ?? rand(55, 85);
    sparks.push({
      life: max,
      max,
      width: 2 * unit,
      gravity: 0.07 * unit,
      drag: 0.955,
      trail: 3,
      twinkle: false,
      ...s,
    });
  };

  const burst = (sh: Shell) => {
    const [main, accent, light] = sh.palette;
    const speed = rand(10, 13) * unit;
    flashes.push({ x: sh.x, y: sh.y, r: 420 * unit, life: 1, color: light });

    switch (sh.kind) {
      case 'peony': {
        const n = 150;
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2;
          const v = speed * Math.cbrt(Math.random()); // fill the sphere
          addSpark({ x: sh.x, y: sh.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, color: i % 4 ? main : accent, width: 2.6 * unit });
        }
        break;
      }
      case 'chrysanthemum': {
        const n = 180;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + rand(-0.03, 0.03);
          const v = speed * rand(0.85, 1.05);
          addSpark({ x: sh.x, y: sh.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, color: main, trail: 9, width: 1.6 * unit, max: rand(70, 95), twinkle: Math.random() < 0.3 });
        }
        break;
      }
      case 'willow': {
        const n = 120;
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2;
          const v = speed * rand(0.4, 0.9);
          addSpark({
            x: sh.x, y: sh.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1 * unit,
            color: pick(['#e2b04a', '#f0c86e', '#ffd88a']), trail: 14, width: 1.5 * unit,
            gravity: 0.05 * unit, drag: 0.972, max: rand(90, 120), twinkle: true,
          });
        }
        break;
      }
      case 'ring': {
        const n = 70;
        const tilt = rand(0.35, 1);
        const rot = rand(0, Math.PI);
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const x = Math.cos(a) * speed;
          const y = Math.sin(a) * speed * tilt;
          addSpark({ x: sh.x, y: sh.y, vx: x * Math.cos(rot) - y * Math.sin(rot), vy: x * Math.sin(rot) + y * Math.cos(rot), color: i % 2 ? main : light, width: 2.4 * unit, drag: 0.955 });
        }
        for (let i = 0; i < 24; i++) {
          const a = Math.random() * Math.PI * 2;
          addSpark({ x: sh.x, y: sh.y, vx: Math.cos(a) * speed * 0.3, vy: Math.sin(a) * speed * 0.3, color: accent, width: 2 * unit });
        }
        break;
      }
      case 'crossette': {
        const n = 10;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          addSpark({ x: sh.x, y: sh.y, vx: Math.cos(a) * speed * 0.8, vy: Math.sin(a) * speed * 0.8, color: light, width: 3 * unit, trail: 6, max: 34, splits: true });
        }
        break;
      }
      case 'glitter': {
        const n = 130;
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2;
          const v = speed * Math.sqrt(Math.random());
          addSpark({ x: sh.x, y: sh.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, color: pick([main, light, '#ffffff']), width: 1.8 * unit, twinkle: true, max: rand(80, 120), drag: 0.95 });
        }
        break;
      }
    }
  };

  const tick = (now: number) => {
    const t = now - showStart;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // House lights: dim in at the start, back up after the finale
    const target = t < SHOW_MS && !stopping ? 0.62 : 0;
    veil += (target - veil) * 0.05;
    if (stopping) fadeOut = Math.max(0, fadeOut - 0.08);
    if (veil > 0.002) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(0, 0, 0, ${veil * fadeOut})`;
      ctx.fillRect(0, 0, width, height);
    }

    while (schedule.length && schedule[0].at <= t) launch(schedule.shift()!.kind);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    // Flashes of light where shells burst
    flashes = flashes.filter((f) => {
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      g.addColorStop(0, `rgba(255, 240, 210, ${0.35 * f.life * fadeOut})`);
      g.addColorStop(1, 'rgba(255, 240, 210, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
      f.life -= 0.08;
      return f.life > 0;
    });

    // Rising shells with a sparkling tail
    const g = 0.12 * unit;
    shells = shells.filter((sh) => {
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.vy += g;
      sh.fuse++;
      ctx.strokeStyle = `rgba(255, 220, 160, ${0.9 * fadeOut})`;
      ctx.lineWidth = 2.2 * unit;
      ctx.beginPath();
      ctx.moveTo(sh.x - sh.vx * 3, sh.y - sh.vy * 3);
      ctx.lineTo(sh.x, sh.y);
      ctx.stroke();
      if (sh.fuse % 2 === 0) {
        addSpark({ x: sh.x, y: sh.y, vx: rand(-0.4, 0.4) * unit, vy: rand(0.5, 1.5) * unit, color: '#ffcf8a', width: 1.2 * unit, max: 18, trail: 0 });
      }
      if (sh.vy >= -0.5 * unit) {
        burst(sh);
        return false;
      }
      return true;
    });

    // Sparks
    const born: Spark[] = [];
    sparks = sparks.filter((p) => {
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      const fade = Math.max(0, p.life / p.max);
      let alpha = Math.min(1, fade * 1.6);
      if (p.twinkle && Math.random() < 0.35) alpha *= 0.25;
      ctx.globalAlpha = alpha * fadeOut;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.width * (0.5 + fade * 0.5);
      ctx.beginPath();
      ctx.moveTo(p.x - p.vx * p.trail, p.y - p.vy * p.trail);
      ctx.lineTo(p.x + 0.01, p.y + 0.01);
      ctx.stroke();
      if (p.splits && p.life <= 0) {
        // Crossette: each star splits into four with a crackle of light
        for (let k = 0; k < 4; k++) {
          const a = Math.atan2(p.vy, p.vx) + Math.PI / 4 + (k * Math.PI) / 2;
          const v = 5.5 * unit;
          born.push({ x: p.x, y: p.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 50, max: 50, color: pick(['#e2b04a', '#ffffff', '#f27bb0']), width: 2 * unit, gravity: 0.06 * unit, drag: 0.96, trail: 5, twinkle: true });
        }
      }
      return p.life > 0;
    });
    sparks.push(...born);
    ctx.globalAlpha = 1;

    const done = stopping ? fadeOut <= 0 : t >= SHOW_MS && !shells.length && !sparks.length && veil <= 0.01;
    if (!done) {
      frame = requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, width, height);
      canvas.hidden = true;
    }
  };

  // Scrolling back up mid-show: stop launching and fade everything out quickly.
  const stop = () => {
    if (!running || stopping) return;
    stopping = true;
    schedule = [];
  };

  const start = () => {
    const now = performance.now();
    if (running || now - lastShow < 20_000) return;
    lastShow = now;
    resize();
    shells = [];
    sparks = [];
    flashes = [];
    fadeOut = 1;
    stopping = false;
    schedule = buildSchedule();
    showStart = now;
    running = true;
    canvas.hidden = false;
    frame = requestAnimationFrame(tick);
  };

  window.addEventListener('resize', () => running && resize());
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) start();
      else stop();
    },
    { threshold: 0.6 },
  ).observe(trigger);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && running) {
      cancelAnimationFrame(frame);
      running = false;
      canvas.hidden = true;
    }
  });
}
