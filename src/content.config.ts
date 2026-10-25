/**
 * Content collections. Each collection is a folder of Markdown files in src/content/.
 * The schemas below check every file's front matter when the site builds, so a
 * missing title or a misspelled field stops the build with a clear message
 * instead of publishing a broken page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Long-form pages: NYE History, Ball History intro, Privacy, Terms. */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences for search results and link previews. */
      description: z.string(),
      /** Short paragraph shown large under the page title. */
      intro: z.string().optional(),
      /** Credit line for the text, e.g. "From the Times Square Alliance". */
      source: z.string().optional(),
      /** Effective date of a legal page, shown under its title, e.g. "December 13, 2010". */
      effective: z.string().optional(),
      /** A line from the text to show large beside it (it stays in the text too). */
      pullQuote: z.object({ text: z.string(), cite: z.string() }).optional(),
      images: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

/** One file per milestone on the Ball History timeline, shown in year order. */
const timeline = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/timeline' }),
  schema: ({ image }) =>
    z.object({
      /** Year the milestone starts; used for sorting. */
      year: z.number().int(),
      /** How the year is shown, if different, e.g. "1981-1988". */
      yearLabel: z.string().optional(),
      title: z.string(),
      /** Which of the nine Balls this is (1-9); leave out for events like the 1942 dimout. */
      ball: z.number().int().min(1).optional(),
      /** For Balls without a photo: draw an illustration instead (see BallIllustration.astro). */
      illustration: z.enum(['1907', '1920', '1981', '1995']).optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Key numbers shown beside the text, e.g. { label: "Weight", value: "700 pounds" }. */
      stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    }),
});

/**
 * Press releases, media advisories and schedules. One file per release, named
 * YYYY-MM-DD-short-title.md. The list page sorts them newest first by `date`.
 */
const releases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/releases' }),
  schema: z.object({
    title: z.string(),
    /** Release date, or for media advisories the date of the event. */
    date: z.coerce.date(),
    kind: z.enum(['Press release', 'Media advisory', 'Media alert', 'Schedule']),
    /** One sentence shown in the list. */
    summary: z.string(),
    /** The original PDF in public/press/releases/, if there is one. */
    pdf: z.string().optional(),
    /** Shown next to the download link, e.g. "155 KB". */
    pdfSize: z.string().optional(),
  }),
});

export const collections = { pages, timeline, releases };
