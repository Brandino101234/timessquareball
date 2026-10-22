/**
 * Everything on the Ball Facts page, from the 2026 Ball & Numeral Fact Sheet.
 * The home page and the animated Ball also read the numbers from here.
 *
 * To update for a new year: replace the fact sheet PDF in public/press/releases/,
 * update `factSheet` below, then change the numbers and text.
 * Text goes inside quotes; use ’ for apostrophes so the quotes don’t break.
 */

export const intro =
  'Each year, millions of eyes from all over the world are focused on the sparkling Times Square New Year’s Eve Ball. At 11:59 p.m., the Ball begins its descent as millions of voices unite to countdown the final seconds of the year, and celebrate the beginning of a new year.';

export const ball = {
  name: 'Constellation Ball',
  edition: 'ninth',
  firstBallYear: 1907,
  unveiled: '2025-11-24',
  diameterFeet: 12.5,
  weightPounds: 12350,
  crystals: 5280,
  mastHeightFeet: 139,
  factSheet: '/press/releases/TS2026_Ball__Numeral_Fact_Sheet.pdf',
  factSheetSize: '43 KB',
  /** Year the fact sheet above covers (shown on its download button). */
  factSheetYear: 2026,
  summary:
    'The Constellation Ball, the ninth iteration of the Times Square New Year’s Eve Ball since its debut in 1907, was unveiled and made its inaugural ascent up the 139-foot mast atop One Times Square on Monday, November 24, 2025.',
} as const;

/** "About the Constellation Ball" */
export const features = [
  {
    title: 'Biggest Ball yet',
    text: 'Measuring 12.5 feet in diameter and weighing 12,350 pounds, the Constellation Ball features 5,280 Waterford Crystals and state-of-the-art LED light pucks.',
  },
  {
    title: 'Circular crystal design',
    text: 'A major design update replaces the triangular crystals introduced in 1999 with circular shapes. Circles symbolize unity, wholeness, and the nature of time, making them a meaningful centerpiece for a celebration of reflection and renewal. The circular shapes are nearly double the number of crystals from the previous Ball.',
  },
  {
    title: 'Celestial inspiration',
    text: 'Circular crystals evoke celestial bodies, perfectly embodying the Ball’s Constellation theme, which celebrates infinite possibilities and the interconnectedness of humanity, much like stars shining in the night sky.',
  },
  {
    title: 'Modernized technology and features',
    text: 'The Constellation Ball is composed of fully programmable LED light pucks offering vibrant, customizable displays. The Ball also allows for interactive capabilities, including a real-time audio system that generates reactive designs based on music and other sounds.',
  },
] as const;

import type { ImageMetadata } from 'astro';
import ballExperiencePhoto from '../assets/press-photos/crystal-installation/TS2026_Waterford-Crystals_12.jpg';
import viewingDeckPhoto from '../assets/press-photos/crystal-installation/TS2026_Waterford-Crystals_10.jpg';

/**
 * Ticketed experiences at One Times Square, shown with "Buy tickets" buttons on
 * the homepage and the Ball Facts page. Tickets are sold by One Times Square.
 *
 * Names, ticket links and "Learn more" pages are from onetimessquare.com
 * (October 2026). Check them each season: the ticket links can change.
 */
export const visitorExperiences = {
  intro: 'One Times Square offers ticketed experiences that bring you up close to the Ball and the building.',
  // Each experience can have a photo (from src/assets). Without one, its card
  // shows the experience name in large type instead.
  /** One Times Square's page listing every ticket. */
  allTicketsUrl: 'https://onetimessquare.com/buy-tickets',
  items: [
    {
      title: 'New Year’s Eve Ball Experience',
      eyebrow: 'Up close with the Ball',
      text: 'Up-close access to the Ball for photos and the official Ball Show, plus admission to the Skywalk Viewing Deck.',
      url: 'https://onetimessquare.com/nye-ball',
      ticketsUrl: 'https://tickets.onetimessquare.com/ots/go/21155d63-e4fc-407e-bf6a-d5197ee8c856?fac=OTS&locale=en&skin=vipball',
      image: ballExperiencePhoto,
      imageAlt: 'A visitor reaches out to the glowing circular crystals of the Ball',
    },
    {
      title: 'Skywalk Viewing Deck',
      eyebrow: 'Above Times Square',
      text: 'A 360-degree wraparound viewing deck overlooking Times Square.',
      url: 'https://onetimessquare.com/skywalk-viewing-deck',
      ticketsUrl: 'https://tickets.onetimessquare.com/ots/go/6fceff3f-55b8-495e-92b3-e704acca869f/shop/multiple-event-search?fac=OTS&locale=en&skin=viewingdeck',
      image: viewingDeckPhoto,
      imageAlt: 'Guests on the rooftop deck of One Times Square beside the Ball, with Times Square towers behind',
    },
    {
      title: 'One Times Square Candy Experience',
      eyebrow: 'For all ages',
      text: 'A New York City–themed indoor candy adventure through sugar-spun versions of city landmarks, ending at The Candy Shop.',
      url: 'https://onetimessquare.com/candy-experience',
      ticketsUrl: 'https://tickets.onetimessquare.com/ots/go/53193bd5-28b5-447a-a559-07ce1378583f/shop/select?fac=OTS&locale=en&skin=icandy',
    },
  ] as {
    title: string;
    eyebrow: string;
    text: string;
    url: string;
    ticketsUrl: string;
    image?: ImageMetadata;
    imageAlt?: string;
  }[],
};

/** Crystal sizes on the Ball, smallest first. Counts must add up to `ball.crystals`. */
export const crystals = [
  { sizeInches: 1.5, theme: 'Infinite Life', count: 1020 },
  { sizeInches: 3, theme: 'Infinite Liberty', count: 2840 },
  { sizeInches: 4, theme: 'Infinite Happiness', count: 1420 },
] as const;

/** "About the Crystals" */
export const crystalNotes = [
  {
    title: 'Crystal sizes',
    text: 'Approximately 1.5 inches, 3 inches, and 4 inches in diameter. Each size features a unique design that embodies the Ball’s spirit of eternal positivity.',
  },
  {
    title: '2026 themes',
    text: 'Infinite Life (1.5-inch), Infinite Liberty (3-inch), Infinite Happiness (4-inch). The crystal designs are of interwoven curves and circular motifs to reflect the shared ideals at the heart of America’s story.',
  },
  {
    title: 'About the Infinite Edition',
    text: 'The 2026 crystals mark the second iteration of the Infinite Edition, a multi-year design series introduced in 2025 with the themes Infinite Joy, Infinite Light, and Infinite Beginnings. Each year, new designs explore the limitless possibilities of being infinite.',
  },
  {
    title: 'Waterford craftsmanship',
    text: 'As the official crystal of the Times Square New Year’s Eve Ball, Waterford’s timeless artistry and legacy remain central to the nation’s most iconic New Year’s tradition.',
  },
] as const;

export const numerals = {
  year: '2027',
  heightFeet: 7,
  /**
   * LED light pucks in each numeral. Leave `count` out until it is published;
   * the page shows "Count coming soon". (The 2026 "6" had 135.)
   */
  pucks: [
    { digit: '2', count: 145 },
    { digit: '0', count: 164 },
    { digit: '2', count: 145 },
    { digit: '7' },
  ] as { digit: string; count?: number }[],
  notes: [
    {
      title: 'New color',
      text: 'The Numeral cabinets are painted gold for the first time, adding a sparkle of color to add contrast against the NYC landscape. This choice ensures the Numerals, which were previously painted black, remain visible and vibrant when viewed from all around Times Square.',
    },
    {
      title: 'New lighting',
      text: 'Equipped with LED light pucks—the same technology used in The Constellation Ball—providing programmable lighting for a wide range of colors and patterns and dynamic displays that can be choreographed to align with The Ball’s design.',
    },
  ],
} as const;
