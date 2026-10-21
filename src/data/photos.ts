/**
 * Hi-res press photos.
 *
 * Photos live in src/assets/press-photos/<category>/ — one folder per category
 * below. To add photos, drop the full-size JPGs into the right folder; the
 * gallery picks them up, makes thumbnails, and offers the original for download.
 *
 * To add a category: create the folder and add an entry to `photoCategories`
 * with the same slug. Categories show in the order listed here (newest first).
 */
import type { ImageMetadata } from 'astro';

export const photoCategories = [
  { slug: 'ball-test', label: 'Ball test', date: '2025-12-30', alt: 'The New Year’s Eve Ball test atop One Times Square' },
  { slug: 'hats-and-balloons', label: 'Hats and balloons', date: '2025-12-30', alt: 'Balloons being inflated for New Year’s Eve revelers' },
  { slug: 'confetti-test', label: 'Confetti test', date: '2025-12-29', alt: 'Confetti released over Times Square during the confetti test' },
  { slug: 'good-riddance-day', label: 'Good Riddance Day', date: '2025-12-28', alt: 'Good Riddance Day on the Broadway Plaza in Times Square' },
  { slug: 'crystal-installation', label: 'Crystal installation', date: '2025-12-27', alt: 'New Waterford crystals being installed on the Constellation Ball' },
  { slug: 'numeral-installation', label: 'Numeral installation', date: '2025-12-26', alt: 'The 2026 numerals being installed atop One Times Square' },
  { slug: 'numeral-delivery', label: 'Numeral delivery', date: '2025-12-18', alt: 'The gold 2026 numerals arriving in Times Square' },
  { slug: 'wishing-wall', label: 'Wishing Wall', date: '2025-12-01', alt: 'Visitors at the Confetti Wishing Wall in Times Square' },
  { slug: 'ball-photos', label: 'The Constellation Ball', date: '2025-11-24', alt: 'The Constellation Ball atop One Times Square' },
] as const;

export type PhotoCategorySlug = (typeof photoCategories)[number]['slug'];

/**
 * Optional alt text for individual photos, keyed by file name. Photos without
 * an entry use their category's description plus the photo number.
 */
export const photoAlt: Record<string, string> = {};

export interface Photo {
  file: string;
  category: PhotoCategorySlug;
  image: ImageMetadata;
  /** URL of the original full-size file, for downloading. */
  original: string;
  alt: string;
}

const images = import.meta.glob<ImageMetadata>('../assets/press-photos/*/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
const originals = import.meta.glob<string>('../assets/press-photos/*/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const photos: Photo[] = Object.entries(images)
  .map(([path, image]) => {
    const [, category, file] = path.match(/press-photos\/([^/]+)\/([^/]+)$/)!;
    const meta = photoCategories.find((c) => c.slug === category);
    if (!meta) throw new Error(`Photo folder "${category}" has no entry in photoCategories (src/data/photos.ts).`);
    const number = Number(file.match(/(\d+)\.\w+$/)?.[1] ?? 0);
    return {
      file,
      category: meta.slug,
      image,
      original: originals[path],
      alt: photoAlt[file] ?? `${meta.alt}${number ? `, photo ${number}` : ''}`,
      number,
    };
  })
  .sort((a, b) => a.number - b.number)
  .map(({ number: _n, ...p }) => p);

export const photosIn = (slug: PhotoCategorySlug) => photos.filter((p) => p.category === slug);
