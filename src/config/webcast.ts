/**
 * NYE webcast.
 *
 * Leave `embedUrl` empty until this year's webcast provider is confirmed.
 * While it is empty, no third-party code loads: the Webcast page shows when
 * the webcast starts, a countdown, and links to the Ball cams.
 *
 * Once it is set, the provider's player appears at the top of the Webcast page
 * as soon as the page opens.
 */
import { sponsors } from '../data/sponsors';

const optumShown = sponsors.some((s) => s.name === 'Optum');

export const webcast = {
  embedUrl: '',
  /** Accessible title for the embedded player. */
  title: 'Times Square New Year’s Eve live webcast',
  /** Width / height of the provider's player. */
  aspectRatio: '16 / 9',
  /** When coverage starts on December 31. Shown on the home, cam and webcast pages. */
  startsAt: '6:00 p.m. ET',
  /** What the webcast covers, in the order it happens. */
  highlights: [
    { time: '6:00 p.m.', text: 'The lighting and raising of the Ball atop One Times Square' },
    {
      time: 'Every hour',
      // Names Optum only once Optum is cleared to appear (src/data/sponsors.ts).
      text: optumShown
        ? 'Countdowns to the top of the hour, with confetti and “Optum-ism” messages read on stage'
        : 'Countdowns to the top of the hour, with confetti and messages read on stage',
    },
    { time: 'All evening', text: 'Live musical performances from the stages in Times Square' },
    { time: '11:59 p.m.', text: 'The Ball descends 90 feet in sixty seconds during the final countdown' },
    { time: 'Midnight', text: 'The Ball Drop, and 3,000 pounds of confetti over Times Square' },
  ],
};
