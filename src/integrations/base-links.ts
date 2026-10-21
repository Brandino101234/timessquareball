/**
 * Lets the site run from a subfolder (e.g. the GitHub Pages preview at
 * /timessquareball/) without anyone writing that folder into links.
 *
 * Pages, data files and Markdown link to "/ball-facts", "/press/..." and so on.
 * When the site is built with a base path (SITE_BASE), this rewrites those
 * root-relative links in the finished HTML to "/timessquareball/ball-facts".
 * Astro already prefixes its own files (/_astro/...), so those are left alone.
 *
 * With the default base "/" (Vercel, real domain) this does nothing.
 */
import type { AstroIntegration } from 'astro';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ATTRS = ['href', 'src', 'poster', 'data-large', 'data-original', 'action'];

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

export function prefixRootLinks(html: string, base: string): string {
  const prefix = base.replace(/\/$/, '');
  const pattern = new RegExp(`\\b(${ATTRS.join('|')})="(/(?!/)[^"]*)"`, 'g');
  return html.replace(pattern, (match, attr: string, url: string) =>
    url === prefix || url.startsWith(`${prefix}/`) ? match : `${attr}="${prefix}${url}"`,
  );
}

export default function baseLinks(): AstroIntegration {
  let base = '/';
  return {
    name: 'base-links',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base;
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (base === '/' || base === '') return;
        let count = 0;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const updated = prefixRootLinks(html, base);
          if (updated !== html) {
            await writeFile(file, updated);
            count++;
          }
        }
        logger.info(`Prefixed root-relative links with ${base} in ${count} pages`);
      },
    },
  };
}
