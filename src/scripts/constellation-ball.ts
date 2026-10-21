/**
 * Draws the Constellation Ball on a <canvas>: a sphere of circular "crystals"
 * in the Ball's three real sizes (1.5", 3", 4") and proportions, lit by
 * slowly drifting color like the Ball's programmable LED pucks.
 *
 * Purely decorative. Pauses when off-screen or in a background tab, and draws a
 * single still frame when the visitor prefers reduced motion.
 */
import { crystals } from '../data/ball-facts';

interface Puck {
  x: number;
  y: number;
  z: number;
  lon: number;
  size: number;
}

const COLORS = {
  crystal: [238, 242, 255],
  prism: [154, 220, 245],
  gold: [226, 176, 74],
  rose: [242, 123, 176],
} as const;

function buildPucks(count: number): Puck[] {
  const total = crystals.reduce((n, c) => n + c.count, 0);
  const largest = Math.max(...crystals.map((c) => c.sizeInches));
  // Deterministic size assignment that keeps the real 1,020 / 2,840 / 1,420 mix.
  const sizes: number[] = [];
  for (const c of crystals) {
    const n = Math.round((c.count / total) * count);
    for (let i = 0; i < n; i++) sizes.push(c.sizeInches / largest);
  }
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pucks: Puck[] = [];
  for (let i = 0; i < sizes.length; i++) {
    const y = 1 - (i / (sizes.length - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pucks.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, lon: theta, size: sizes[(i * 7) % sizes.length] });
  }
  return pucks;
}

function mix(a: readonly number[], b: readonly number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function mountConstellationBall(canvas: HTMLCanvasElement, options: { intensity?: number } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const intensity = options.intensity ?? 1;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pucks: Puck[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let visible = true;
  const start = performance.now();

  const tilt = -0.32; // look slightly up at the Ball, as from the street
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    pucks = buildPucks(width < 420 ? 900 : 1500);
  }

  function draw(time: number) {
    if (!ctx) return;
    const t = (time - start) / 1000;
    const spin = reducedMotion.matches ? 0.6 : t * 0.08;
    const cx = width / 2;
    const cy = height * 0.45;
    const R = Math.min(width, height) * 0.34;
    const unit = R / 20;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // The mast the Ball rides on, like the real one atop One Times Square:
    // its tip shows above the Ball and the pole runs down to the bottom of the
    // canvas, connecting the Ball to the countdown below it.
    const mastTop = cy - R * 1.22;
    const poleWidth = R * 0.2;
    const pole = ctx.createLinearGradient(cx - poleWidth / 2, 0, cx + poleWidth / 2, 0);
    pole.addColorStop(0, '#1d2670');
    pole.addColorStop(0.45, '#5565b8');
    pole.addColorStop(1, '#161d5a');
    ctx.fillStyle = pole;
    ctx.fillRect(cx - poleWidth / 2, cy, poleWidth, height - cy);
    // Thinner tip above the Ball
    ctx.fillRect(cx - poleWidth * 0.2, mastTop, poleWidth * 0.4, cy - mastTop);
    // Soften only the very bottom so the pole meets the countdown gently
    const fade = ctx.createLinearGradient(0, height * 0.9, 0, height);
    fade.addColorStop(0, 'rgba(14, 20, 64, 0)');
    fade.addColorStop(1, 'rgba(14, 20, 64, 0.85)');
    ctx.fillStyle = fade;
    ctx.fillRect(cx - poleWidth, height * 0.9, poleWidth * 2, height * 0.1);

    // Light the Ball throws into the night around it
    const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.2);
    halo.addColorStop(0, `rgba(154, 220, 245, ${0.22 * intensity})`);
    halo.addColorStop(0.5, `rgba(226, 176, 74, ${0.07 * intensity})`);
    halo.addColorStop(1, 'rgba(14, 20, 64, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);

    // Dark body of the Ball
    ctx.fillStyle = '#0a0f31';
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.01, 0, Math.PI * 2);
    ctx.fill();

    const cosS = Math.cos(spin);
    const sinS = Math.sin(spin);
    for (const p of pucks) {
      // rotate around the vertical axis, then tilt
      const x = p.x * cosS - p.z * sinS;
      const z0 = p.x * sinS + p.z * cosS;
      const y = p.y * cosT - z0 * sinT;
      const z = p.y * sinT + z0 * cosT;
      if (z < 0) continue;

      // Drifting bands of color across the Ball's surface
      const band = 0.5 + 0.5 * Math.sin(p.y * 3.2 + spin * 2.4 + Math.sin(p.lon + t * 0.3));
      const warm = 0.5 + 0.5 * Math.sin(p.y * 5 - t * 0.6 + p.x * 2);
      let rgb = mix(COLORS.crystal, COLORS.prism, band);
      if (warm > 0.82) rgb = mix(rgb, COLORS.gold, (warm - 0.82) / 0.18);
      if (band < 0.12) rgb = mix(rgb, COLORS.rose, (0.12 - band) / 0.12 * 0.8);

      const depth = 0.25 + 0.75 * z; // edges darker, center brighter
      const r = p.size * unit * 0.62 * (0.55 + 0.45 * z);
      ctx.fillStyle = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${depth * (0.55 + 0.45 * intensity)})`;
      ctx.beginPath();
      ctx.arc(cx + x * R, cy + y * R, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop(time: number) {
    draw(time);
    if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(loop);
  }

  function restart() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(loop);
  }

  resize();
  draw(performance.now());
  restart();

  new ResizeObserver(() => {
    resize();
    draw(performance.now());
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) restart();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => !document.hidden && restart());
  reducedMotion.addEventListener('change', restart);
}
