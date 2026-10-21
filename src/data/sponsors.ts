import type { ImageMetadata } from 'astro';
import planetFitness from '../assets/sponsors/planet-fitness.png';
import carnival from '../assets/sponsors/carnival.png';
import kia from '../assets/sponsors/kia.png';
import waterford from '../assets/sponsors/waterford.png';

/**
 * Sponsors for the current year, in display order.
 *
 * To update for a new year:
 * 1. Put the logo file in src/assets/sponsors/ (PNG or SVG on a white or transparent background).
 * 2. Import it above.
 * 3. Add, remove or reorder entries below, and update `sponsorYear`.
 *
 * A sponsor without a `logo` is shown as its name until the logo is added.
 */
export interface Sponsor {
  name: string;
  logo?: ImageMetadata;
  url: string;
  /** Optional role shown under the logo, e.g. "Presenting Sponsor". */
  role?: string;
}

export const sponsorYear = 2027;

export const sponsors: Sponsor[] = [
  { name: 'Planet Fitness', logo: planetFitness, url: 'https://www.planetfitness.com/', role: 'Presenting Sponsor' },
  { name: 'Kia', logo: kia, url: 'https://www.kia.com/us/en', role: 'Official Countdown Sponsor' },
  { name: 'Waterford', logo: waterford, url: 'https://www.waterford.com/en-us', role: 'Official Crystal' },
  // Logo still to come: add it to src/assets/sponsors/ and set `logo` here.
  { name: 'Wegovy', url: 'https://www.wegovy.com/', role: 'Official Ball Cams Sponsor' },
  { name: 'Carnival Cruise Line', logo: carnival, url: 'https://www.carnival.com/' },
];

/** The sponsor credited on the Ball cam pages, if any. */
export const camSponsor = sponsors.find((s) => s.name === 'Wegovy');
