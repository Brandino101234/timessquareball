/**
 * Checks whether the Ball cam streams are live, once per page load.
 *
 * A stream counts as live when its HLS playlist responds and looks like one.
 * The header dot, the homepage live strip and the cam tiles all share this
 * result, so each stream is requested at most once per page.
 */
const cache = new Map<string, Promise<boolean>>();

export function isStreamLive(url: string): Promise<boolean> {
  let result = cache.get(url);
  if (!result) {
    result = fetch(url, { cache: 'no-store' })
      .then((res) => (res.ok ? res.text() : ''))
      .then((body) => body.includes('#EXTM3U'))
      .catch(() => false);
    cache.set(url, result);
  }
  return result;
}

/** True when at least one of the given streams is live. */
export async function anyStreamLive(urls: string[]): Promise<boolean> {
  const results = await Promise.all(urls.map(isStreamLive));
  return results.some(Boolean);
}
