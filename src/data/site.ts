/**
 * Site-wide settings. Update `domain` when the new domain is live.
 */
export const site = {
  name: 'Times Square Ball',
  /** Full origin of the production site, no trailing slash. Also set in astro.config.mjs. */
  domain: 'https://www.example.com',
  owner: 'Countdown Entertainment, LLC',
  description:
    'The official home of the Times Square New Year’s Eve Ball: live countdown to midnight, Ball cams, the NYE webcast, Ball history and facts, and press materials.',
  /** Time zone the countdown uses. Midnight here is the Ball Drop. */
  timeZone: 'America/New_York',
  contactEmail: 'support@timessquareball.net',
  credits: [
    { name: 'Live X', role: 'Produced by', url: 'https://livex.tv/' },
  ],
} as const;
