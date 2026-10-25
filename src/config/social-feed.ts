/**
 * Instagram feed on the home page, loaded from Behold (behold.so), which keeps
 * the latest posts up to date automatically.
 *
 * To turn it on: sign in to Behold with the company's Instagram account,
 * create a feed of type "JSON", and paste its URL below. Add the site's domain
 * to the feed's allowed websites in Behold. While `feedUrl` is empty the
 * section shows only the follow links and nothing loads from Behold.
 */
export const socialFeed = {
  feedUrl: '',
  /** Instagram account shown in the heading. */
  handle: 'onetimessquarenyc',
  profileUrl: 'https://www.instagram.com/onetimessquarenyc',
  /** How many posts to show (Behold's free plan returns up to 6). */
  count: 6,
} as const;
