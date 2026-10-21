// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import baseLinks from './src/integrations/base-links.ts';
import { site } from './src/data/site.ts';

// https://astro.build/config
//
// By default the site is built for the root of its own domain (Vercel).
// The GitHub Pages preview sets SITE_URL and SITE_BASE to build it for a
// subfolder instead; see .github/workflows/pages.yml.
export default defineConfig({
  site: process.env.SITE_URL ?? site.domain,
  base: process.env.SITE_BASE ?? '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // Sitemap addresses without a trailing slash, matching the site's links and vercel.json.
    sitemap({ serialize: (item) => ({ ...item, url: item.url.replace(/(?<=[^/])\/$/, '') }) }),
    baseLinks(),
  ],
});
