/**
 * Press video: B-roll and pre-packaged segments.
 *
 * The files are large (130-470 MB each), so they stay on the company's S3
 * bucket and are linked from here instead of being stored in this site.
 *
 * To add a clip: upload it to S3, then add a line with its title, URL, size in
 * MB, the date it was filmed, and which photo category to show beside it
 * (see src/data/photos.ts). Newest first.
 */
import type { PhotoCategorySlug } from './photos';

export interface Video {
  title: string;
  url: string;
  sizeMB: number;
  /** Date the footage was filmed or released (YYYY-MM-DD). */
  date: string;
  /** Photo category used as the preview image, if any. */
  photo?: PhotoCategorySlug;
}

const S3 = 'https://tsbmediaupload.s3.amazonaws.com/';

/** Format shown in the list, taken from the file extension. */
export const formatOf = (url: string) => (url.split('.').pop() ?? '').toUpperCase();

export const bRoll: Video[] = [
  { title: 'Balloon inflation team prepares 25,000 balloons for revelers on NYE', url: `${S3}TS2026%20Ballon%20Inflation_B-Roll.mov`, sizeMB: 208, date: '2025-12-30', photo: 'hats-and-balloons' },
  { title: 'New Year’s Eve Ball test atop One Times Square', url: `${S3}TS2026_Ball%20Test_HD-B%20Roll.mov`, sizeMB: 131, date: '2025-12-30', photo: 'ball-test' },
  { title: 'Confetti test in Times Square', url: `${S3}TS2026_Confetti%20Test_B-Roll.mov`, sizeMB: 142, date: '2025-12-29', photo: 'confetti-test' },
  { title: 'Good Riddance Day in Times Square closes the curtain on 2025', url: `${S3}TS2026_Good%20Riddance%20Day_B-Roll.mov`, sizeMB: 379, date: '2025-12-28', photo: 'good-riddance-day' },
  { title: '2026 Waterford crystals installed on the Times Square New Year’s Eve Ball', url: `${S3}TS2026_Waterford%20Crystal_B-Roll.mov`, sizeMB: 243, date: '2025-12-27', photo: 'crystal-installation' },
  { title: '“2026” numerals installed atop One Times Square', url: `${S3}TS2026_Numeral%20Installation_B-Roll.mov`, sizeMB: 312, date: '2025-12-26', photo: 'numeral-installation' },
  { title: '“2026” numerals arrive in Times Square', url: `${S3}TS2026%20_Numeral%20Arrival_B-Roll.mov`, sizeMB: 271, date: '2025-12-18', photo: 'numeral-delivery' },
  { title: 'Confetti Wishing Wall opens in Times Square', url: `${S3}TS2026_Wishing%20Wall_B-Roll.mov`, sizeMB: 206, date: '2025-12-01', photo: 'wishing-wall' },
  { title: 'Inaugural New Year’s Eve Constellation Ball raising', url: `${S3}2025-11-24_Ball%20unveiling_B-Roll.mov`, sizeMB: 205, date: '2025-11-24', photo: 'ball-photos' },
];

/** "Midnight Moment" footage from past years. */
export const bRollArchive: Video[] = [
  { title: 'Times Square Midnight Moment, December 31, 2025', url: `${S3}TS2026%20Midnight%20Moment_FINAL.mov`, sizeMB: 448, date: '2025-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2024', url: `${S3}2024%20%E2%80%93%20Times%20Square%20Midnight%20Moment_December%2031%202024.mov`, sizeMB: 343, date: '2024-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2023', url: `${S3}TS2024%20Midnight_December%2031%202023.mov`, sizeMB: 443, date: '2023-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2022', url: `${S3}TS2023_Midnight_December%2031%202022.mov`, sizeMB: 463, date: '2022-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2021', url: `${S3}TS2022_Midnight_December%2031%202021.mov`, sizeMB: 409, date: '2021-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2020', url: `${S3}TS2021%20Midnight%20Moment_Dec%2031%202020.mov`, sizeMB: 366, date: '2020-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2019', url: `${S3}TS2020_Midnight_December%2031%202019.mov`, sizeMB: 269, date: '2019-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2018', url: `${S3}TS2019%20Midnight%20Moment%20B-Roll.mp4`, sizeMB: 294, date: '2018-12-31' },
  { title: 'Times Square Midnight Moment, December 31, 2017', url: `${S3}TS2018_Midnight%20Moment_Dec%2031%202017.mp4`, sizeMB: 282, date: '2017-12-31' },
];

/** Pre-packaged HD video segments, edited and ready to air. */
export const segments: Video[] = [
  { title: '25,000 balloons inflated for New Year’s Eve revelers', url: `${S3}TS2026_Balloon%20Inflation.mov`, sizeMB: 280, date: '2025-12-30', photo: 'hats-and-balloons' },
  { title: 'New Year’s Eve Ball test atop One Times Square', url: `${S3}TS2026_Ball%20Test.mov`, sizeMB: 197, date: '2025-12-30', photo: 'ball-test' },
  { title: 'Confetti air worthiness test in Times Square', url: `${S3}TS2026_Confetti%20Test.mov`, sizeMB: 209, date: '2025-12-29', photo: 'confetti-test' },
  { title: 'Good Riddance Day in Times Square closes the curtain on 2025', url: `${S3}TS2026_Good%20Riddance%20Day.mov`, sizeMB: 347, date: '2025-12-28', photo: 'good-riddance-day' },
  { title: 'New Waterford crystals installed on the New Year’s Eve Ball', url: `${S3}TS2026_Waterford%20Crystal.mov`, sizeMB: 176, date: '2025-12-27', photo: 'crystal-installation' },
  { title: '2-0-2-6 numerals installed atop One Times Square', url: `${S3}TS2026_Numeral%20Installation.mov`, sizeMB: 193, date: '2025-12-26', photo: 'numeral-installation' },
  { title: '2-0-2-6 numerals arrive in Times Square', url: `${S3}TS2026_Numeral%20Arrival.mov`, sizeMB: 225, date: '2025-12-18', photo: 'numeral-delivery' },
  { title: 'Confetti Wishing Wall now open in Times Square', url: `${S3}TS2026_Wishing%20Wall.mov`, sizeMB: 228, date: '2025-12-01', photo: 'wishing-wall' },
  { title: 'Inaugural New Year’s Eve Constellation Ball raising', url: `${S3}TS2026%20Constellation%20Ball.mov`, sizeMB: 187, date: '2025-11-24', photo: 'ball-photos' },
];
