import type { ImageMetadata } from 'astro';
import planetFitness from '../assets/sponsors/planet-fitness.png';
import carnival from '../assets/sponsors/carnival.png';
import kia from '../assets/sponsors/kia.png';
import waterford from '../assets/sponsors/waterford.png';
import optum from '../assets/sponsors/optum.svg';

/**
 * Sponsors for the current year, in display order.
 *
 * To update for a new year:
 * 1. Put the logo file in src/assets/sponsors/ (PNG or SVG on a white or transparent background).
 * 2. Import it above.
 * 3. Add, remove or reorder entries below, and update `sponsorYear`.
 *
 * A sponsor only appears on the site once `authorized` is true. Leave it false
 * until the company confirms the sponsor may be shown.
 * A sponsor without a `logo` is shown as its name until the logo is added.
 */
export interface Sponsor {
  name: string;
  logo?: ImageMetadata;
  url: string;
  /** Optional role shown under the logo, e.g. "Presenting Sponsor". */
  role?: string;
  /** True once the company has cleared this sponsor to appear on the site. */
  authorized: boolean;
}

export const sponsorYear = 2027;

/** Every sponsor for the year, in the order set by the company. */
export const allSponsors: Sponsor[] = [
  { name: 'Planet Fitness', logo: planetFitness, url: 'https://www.planetfitness.com/', role: 'Presenting Sponsor', authorized: true },
  { name: 'Kia', logo: kia, url: 'https://www.kia.com/us/en', role: 'Official Countdown Sponsor', authorized: true },
  // Logo still to come: add it to src/assets/sponsors/ and set `logo` here.
  { name: 'Wegovy', url: 'https://www.wegovy.com/', role: 'Official Ball Cams Sponsor', authorized: false },
  { name: 'Waterford', logo: waterford, url: 'https://www.waterford.com/en-us', role: 'Official Crystal', authorized: true },
  { name: 'Optum', logo: optum, url: 'https://www.optum.com/', role: 'Official Confetti Sponsor', authorized: false },
  // Logo and role still to come.
  { name: 'America250', url: 'https://america250.org/', authorized: false },
  { name: 'Carnival Cruise Line', logo: carnival, url: 'https://www.carnival.com/', authorized: false },
];

/** Sponsors shown on the site: only those cleared to appear. */
export const sponsors = allSponsors.filter((s) => s.authorized);

/** The sponsor credited on the Ball Cam pages, if it is cleared to appear. */
export const camSponsor = sponsors.find((s) => s.role === 'Official Ball Cams Sponsor');
