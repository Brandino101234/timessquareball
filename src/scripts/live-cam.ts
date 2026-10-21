/**
 * Live HLS player for the Ball cams.
 *
 * - Starts playing as soon as the page loads (muted, which is what browsers
 *   allow for autoplay; the native controls let visitors turn sound on).
 * - Safari and iOS play HLS natively; other browsers download the "light"
 *   build of hls.js (no subtitles or DRM, which the cams don't use). The
 *   download starts immediately, and only in browsers that need it.
 * - Shows a loading state until the first frame, and an offline state if the
 *   stream can't be reached or stops sending video. While offline it retries
 *   on its own every 30 seconds, and the visitor can retry right away.
 */
import type Hls from 'hls.js/light';

type State = 'loading' | 'playing' | 'offline';

const LOAD_TIMEOUT_MS = 15_000;
const RETRY_MS = 30_000;
/** Quick reconnect attempts before showing the offline message. */
const MAX_RECOVERIES = 3;

export async function mountLiveCam(root: HTMLElement) {
  const video = root.querySelector('video')!;
  const retryButton = root.querySelector<HTMLButtonElement>('[data-retry]')!;
  const src = root.dataset.src!;
  const nativeHls = video.canPlayType('application/vnd.apple.mpegurl') !== '';
  const HlsPlayer = nativeHls ? null : (await import('hls.js/light')).default;

  let hls: Hls | null = null;
  let loadTimer = 0;
  let retryTimer = 0;
  let stallTimer = 0;
  let recoveries = 0;

  function setState(state: State) {
    root.dataset.state = state;
    // Player controls only make sense once there is video to control.
    video.controls = state === 'playing';
    for (const el of root.querySelectorAll<HTMLElement>('[data-when]')) {
      el.hidden = el.dataset.when !== state;
    }
    document.dispatchEvent(new CustomEvent('livecam:state', { detail: { id: root.id, state } }));
    clearTimeout(retryTimer);
    if (state === 'offline') retryTimer = window.setTimeout(start, RETRY_MS);
  }

  /** Why the player last gave up; visible in dev tools as data-error on the player. */
  function goOffline(reason: string) {
    root.dataset.error = reason;
    clearTimeout(loadTimer);
    clearTimeout(stallTimer);
    teardown();
    setState('offline');
  }

  function teardown() {
    hls?.destroy();
    hls = null;
    // Only reset a video that has a source: resetting an empty one makes some
    // browsers fire a "source not supported" error that would end up here.
    if (video.getAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
  }

  function start() {
    teardown();
    setState('loading');
    clearTimeout(loadTimer);
    loadTimer = window.setTimeout(() => goOffline('timeout'), LOAD_TIMEOUT_MS);

    if (nativeHls) {
      video.src = src;
    } else if (HlsPlayer?.isSupported()) {
      const player = new HlsPlayer({ manifestLoadingMaxRetry: 2, levelLoadingMaxRetry: 4, fragLoadingMaxRetry: 4 });
      hls = player;
      player.on(HlsPlayer.Events.ERROR, (_e, data) => {
        if (!data.fatal) return; // hls.js retries these itself
        // Standard hls.js recovery: try a few times before telling the visitor.
        if (recoveries < MAX_RECOVERIES) {
          recoveries++;
          if (data.type === HlsPlayer.ErrorTypes.MEDIA_ERROR) player.recoverMediaError();
          else window.setTimeout(start, 1000 * recoveries);
          return;
        }
        goOffline(data.details);
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      goOffline('unsupported');
      return;
    }
    video.play().catch(() => {
      // Autoplay was blocked (rare when muted). The native controls let the visitor start it.
    });
  }

  video.addEventListener('playing', () => {
    recoveries = 0;
    delete root.dataset.error;
    clearTimeout(loadTimer);
    clearTimeout(stallTimer);
    setState('playing');
  });
  // Native HLS (Safari/iOS) reports problems as media errors. With hls.js,
  // its own ERROR events above are the source of truth instead.
  video.addEventListener('error', () => {
    // Ignore errors from an empty element (e.g. while switching sources).
    if (!nativeHls || !video.getAttribute('src') || root.dataset.state === 'offline') return;
    if (recoveries < MAX_RECOVERIES) {
      recoveries++;
      window.setTimeout(start, 1000 * recoveries);
      return;
    }
    goOffline(`media-error-${video.error?.code ?? 'unknown'}`);
  });
  // A live stream that stops delivering video for a while is treated as offline.
  video.addEventListener('waiting', () => {
    clearTimeout(stallTimer);
    stallTimer = window.setTimeout(() => goOffline('stalled'), LOAD_TIMEOUT_MS);
  });

  retryButton.addEventListener('click', () => {
    recoveries = 0;
    start();
  });
  start();
}
