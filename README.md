# Times Square Ball

The official website of the Times Square New Year’s Eve Ball, owned by **Countdown Entertainment, LLC**. It replaces the WordPress site at timessquareball.net.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), and hosted on [Vercel](https://vercel.com). It is a static site: there is no database, no login and no server code. Every page is built ahead of time from the files in this repository.

- [Before launch](#before-launch)
- [Run the site on your computer](#run-the-site-on-your-computer)
- [Updating content](#updating-content)
- [Deploying](#deploying)
- [Handing over the repository](#handing-over-the-repository)
- [How the code is organized](#how-the-code-is-organized)
- [Design system](#design-system)
- [Third-party services](#third-party-services)

---

## Before launch

These are open items. Each one is explained in more detail further down.

- [ ] **Domain.** Set the real domain in `src/data/site.ts` (`domain`). Links in search results and social previews use it.
- [ ] **Ball cam streams.** Replace the placeholder URLs for all five cams in `src/config/cams.ts`, and the descriptions for cams 3–5. The streams the old site used are listed in a comment at the top of that file.
- [ ] **Opening hours.** One Times Square doesn’t publish its hours, so the live strip says “Hours vary” and links to its ticket page. Fill in `src/config/hours.ts` when the company confirms them.
- [ ] **Sponsor sign-off.** Wegovy, Optum, America250 and Carnival are set up but hidden until the company clears them. To show one, set its `authorized` to `true` in `src/data/sponsors.ts`. Still needed: the Wegovy and America250 logos, and America250’s role.
- [ ] **2027 numerals.** Add the light-puck count for the “7” in `src/data/ball-facts.ts` when it’s published, and replace the 2026 fact sheet.
- [ ] **Webcast.** Add this year’s embed URL to `src/config/webcast.ts` once the provider is confirmed.
- [ ] **Getting to Times Square.** The homepage facts (entry streets, times, prohibited items) are from the 2025 official guidance. Check them each December in `src/data/getting-there.ts`.
- [ ] **Privacy Policy and Terms need a legal review.** The review should also cover the homepage weather (National Weather Service) and map (OpenStreetMap), which visitors’ browsers load from those services. They are copied word for word from the old site (effective December 13, 2010). They still describe retired mobile apps and a “Photo Display Service”, name the old domain, and mention cookies and ads this site doesn’t use.
- [ ] **FAQ is a draft.** It was written from facts already on the site. Please review `src/content/pages/faq.md`.
- [ ] **Fact check on NYE History.** The text calls the Times publisher “Alfred Ochs”. He was Adolph S. Ochs. It is left as originally written until confirmed.
- [ ] **Contact email.** The FAQ, Privacy and Terms use `support@timessquareball.net` and `remove@timessquareball.net`. Confirm these still work, or update them.
- [ ] **Vercel plan.** A company website needs Vercel’s **Pro** plan. The free Hobby plan is for non-commercial use only. See [Deploying](#deploying).

The full audit of the old site, including what was broken or outdated, is in [`content-audit.md`](content-audit.md).

---

## Run the site on your computer

You need [Node.js](https://nodejs.org) version 22.23.4 or newer (`node -v` shows your version).

```bash
npm install
npm run dev
```

Then open http://localhost:4321. Pages reload as you save changes.

| Command           | What it does                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`     | Runs the site locally for editing.                                                            |
| `npm run build`   | Builds the finished site into `dist/`. This also checks every content file (see below).       |
| `npm run preview` | Serves the built `dist/` folder so you can check it exactly as it will go live.               |
| `npm test`        | Checks the countdown math (time zones, the moment of midnight, the day after New Year’s Day). |

If the dev server ever shows a page without its styling after you add a **new** file, stop it (Ctrl+C) and start it again. `npm run build` is always correct.

---

## Updating content

Everything a non-developer would change lives in three places:

- `src/content/`: longer text, written in **Markdown** (`.md` files)
- `src/data/` and `src/config/`: lists and settings, in small `.ts` files with comments explaining every field
- `src/assets/` and `public/`: images and PDFs

You can edit any of these directly on GitHub (open the file, select the pencil icon, then commit). Vercel rebuilds and publishes the site automatically within a minute or two.

**Safety net:** every Markdown file is checked when the site builds. If a required field is missing or misspelled, the build stops with a message naming the file and the field, and the live site stays as it was.

> **Writing tips.** Use curly apostrophes and quotes (’ “ ”) to match the rest of the site. In `.ts` files, text goes inside straight single quotes `'like this'`, so a straight apostrophe inside the text (`'it's'`) would break it. A curly one (`'it’s'`) is fine.

### Markdown in two minutes

Markdown files start with a **front matter** block between `---` lines (fields like the title and date), followed by the text.

```markdown
---
title: Ball history
description: One or two sentences for search results.
---

A paragraph is just text. Leave a blank line between paragraphs.

## A heading

**Bold**, *italic*, and a [link](/ball-facts).

- A bulleted
- list
```

### What to edit for each part of the site

| To change…                                        | Edit                                                  |
| ------------------------------------------------- | ----------------------------------------------------- |
| Sponsors (home page)                              | `src/data/sponsors.ts` and logos in `src/assets/sponsors/` |
| Ball cams (5): stream URLs, titles, still images  | `src/config/cams.ts`                                  |
| Webcast embed, start time, “What you’ll see” list | `src/config/webcast.ts`                               |
| One Times Square experiences and their links      | `src/data/ball-facts.ts` (`visitorExperiences`)       |
| Footer copyright name                             | `src/data/site.ts` (`copyrightHolder`)                |
| Footer “owned and operated by” credit (Jamestown) | `src/data/site.ts` (`buildingOwner`), logo in `src/components/JamestownLogo.astro` |
| Ball facts, crystal counts, numeral puck counts   | `src/data/ball-facts.ts`                              |
| NYE History text and photos                       | `src/content/pages/nye-history.md`                    |
| Ball History intro and “About time-balls”         | `src/content/pages/ball-history.md`                   |
| Ball History timeline entries                     | `src/content/timeline/` (one file per entry)          |
| Press releases                                    | `src/content/releases/` (one file per release)        |
| Press photos                                      | `src/assets/press-photos/` and `src/data/photos.ts`   |
| B-roll and video segments                         | `src/data/videos.ts`                                  |
| FAQ                                               | `src/content/pages/faq.md`                            |
| Privacy Policy, Terms                             | `src/content/pages/privacy.md`, `terms.md`            |
| Social links in the footer                        | `src/data/social.ts`                                  |
| Main menu                                         | `src/data/navigation.ts`                              |
| Homepage hero photos, headline and photo cards    | `src/pages/index.astro` (top of the file)             |
| Homepage FAQ preview                              | The first four questions in `src/content/pages/faq.md` |
| “Getting to Times Square” facts and map           | `src/data/getting-there.ts` (check each December)     |
| Weather in the live strip (on/off, source)        | `src/config/weather.ts`                               |
| One Times Square opening hours in the live strip  | `src/config/hours.ts` (empty until the company confirms them) |
| Apple Maps / Google Maps direction links          | `src/data/getting-there.ts` (`map`)                   |
| Site name, domain, owner, contact email           | `src/data/site.ts`                                    |

The countdown needs no yearly update. It always counts to the next midnight on January 1 in New York time, shows “Happy New Year” for 24 hours, then starts counting to the following year.

### Sponsors

1. Add the logo to `src/assets/sponsors/`, as a PNG or SVG on a white or transparent background. Logos are shown on a light band, and white backgrounds blend in.
2. In `src/data/sponsors.ts`, import the logo at the top and add an entry:

   ```ts
   import newSponsor from '../assets/sponsors/new-sponsor.png';
   // …
   { name: 'New Sponsor', logo: newSponsor, url: 'https://example.com', role: 'Official partner', authorized: true },
   ```

3. Remove last year’s entries and update `sponsorYear` (the heading reads “Welcome to our 2027 sponsors”). The order in the file is the order on the page. `role` is optional.

A sponsor only appears on the site when `authorized` is `true`. Add new sponsors with `authorized: false` and switch it to `true` once the company confirms they can be shown. Hidden sponsors keep their place in the order, so nothing else needs to change when they are cleared.

A sponsor can be listed before its logo arrives: leave out `logo` and its name is shown instead (Wegovy and America250 are set up this way now). The sponsor credited under the Ball cams is chosen by `camSponsor` at the bottom of the file; the credit only shows once that sponsor is authorized. The webcast’s “Optum-ism” line also only appears once Optum is authorized.

### Ball cams

Open `src/config/cams.ts` and replace each `streamUrl` with the HLS address (ending in `.m3u8`) from the streaming provider. Nothing else needs to change. Each cam’s still image (`poster`) is set in the same file.

How the player behaves (`src/components/LiveCam.astro`, `src/scripts/live-cam.ts`):

- **It starts playing as soon as the page opens**, with no click. Browsers only allow this with the sound off, so it starts muted, and the player controls let visitors turn sound on.
- Safari, iPhone, iPad and current Chrome play the stream directly. Other browsers automatically download a small player library (hls.js, part of the site, not an outside service).
- If the stream can’t be reached or stops sending video, the player reconnects quietly a few times. Then it shows “This cam is offline right now”, retries every 30 seconds, and offers a **Try again now** button.
- The home page shows a “Live now” label on a cam only when its stream is actually responding.

To add a third cam, add another entry to the `cams` list. Its page is created automatically at the `slug` you give it. Also add it to `src/data/navigation.ts` if it should appear in the menu.

### Webcast

In `src/config/webcast.ts`:

- `embedUrl`: the player address from this year’s webcast provider. **Leave it empty (`''`) until the provider is confirmed.** While it is empty, the Webcast page shows the start time, a countdown and links to the Ball cams, and loads nothing from outside the site.
- `startsAt`: when coverage starts (shown on the home, cam and webcast pages).
- `highlights`: the “What you’ll see” list.

### Press releases

Add one Markdown file per release to `src/content/releases/`, named `YYYY-MM-DD-short-title.md`. The name becomes the web address (`/press/releases/2025-12-30-ball-test`).

```markdown
---
title: New Year’s Eve Ball Tested Before Official Times Square Celebration
date: 2025-12-30
kind: Media advisory
summary: One sentence shown in the list of releases.
pdf: /press/releases/FINAL-NYE-2026-Ball-Test-Advisory-12_27.pdf
pdfSize: 183 KB
---

The text of the release…
```

- `kind` must be one of: `Press release`, `Media advisory`, `Media alert`, `Schedule`.
- `date` is the release date. For media advisories the existing files use the date of the event, because the PDFs don’t say when they were sent.
- Put the PDF in `public/press/releases/`. `pdf` and `pdfSize` are optional.
- Releases are listed newest first and grouped by year automatically. The three newest also appear on the press hub.
- Press contacts’ names, phone numbers and RSVP emails are deliberately left in the PDFs only, not copied into page text. Decide whether to include them on the page.

### Press photos

Photos live in `src/assets/press-photos/`, one folder per category (for example `ball-test/`).

- **To add photos,** drop the full-size JPGs into the right folder. The site makes the thumbnails and large previews itself, and visitors can download the original file. Numbered file names (`…_01.jpg`, `…_02.jpg`) are shown in number order.
- **To add a category,** create a folder and add an entry with the same `slug` to `photoCategories` in `src/data/photos.ts`. Categories appear in the order listed there.
- **Alt text** (descriptions for screen readers) comes from the category’s `alt` plus the photo number. To describe a single photo better, add it to `photoAlt` in the same file:

  ```ts
  export const photoAlt: Record<string, string> = {
    'TS2026_Ball-test_03.jpg': 'Executives flip the switch to light the Ball',
  };
  ```

The originals are large (up to 6000 pixels, 1–3 MB each). That is fine for Vercel, but keep an eye on the repository size over the years. If it grows past a few hundred MB, consider moving older years’ originals to the S3 bucket, like the videos.

### B-roll and video segments

Video files are too large for the website itself (130–470 MB each), so they stay on the company’s Amazon S3 bucket (`tsbmediaupload`). Upload the file to S3, then add an entry to `bRoll`, `bRollArchive` or `segments` in `src/data/videos.ts`:

```ts
{ title: 'Confetti test in Times Square', url: `${S3}TS2027_Confetti%20Test_B-Roll.mov`, sizeMB: 142, date: '2026-12-29', photo: 'confetti-test' },
```

`photo` picks the preview image from the matching photo category. Spaces in S3 file names must be written as `%20`.

### Ball History timeline

Each entry is a file in `src/content/timeline/`. The page sorts them by `year`:

```markdown
---
year: 2025
title: The Constellation Ball
image: ../../assets/ball-history/constellation-ball.jpg
imageAlt: Describe the photo for people who can’t see it
stats:
  - { label: Diameter, value: 12.5 feet }
  - { label: Weight, value: '12,350 pounds' }
---

The text for this entry.
```

`yearLabel` (for example `2008–2024`), `image` and `stats` are optional. Put values containing commas in quotes, as above.

### FAQ

`src/content/pages/faq.md`: each question is a `## ` heading and everything under it is the answer. The list of questions at the side of the page, and the information given to search engines, are built from the same file.

### Images and PDFs in general

- Images that pages use go in `src/assets/`. The site resizes and compresses them automatically.
- Files offered as-is (PDFs) go in `public/`. A file at `public/press/releases/x.pdf` is available at `/press/releases/x.pdf`.
- `src/assets/legacy/` holds images from the old site that the new design doesn’t use: the 2019 home page slideshow, the old webcast background and the old low-resolution logo. They are kept for reference only.

---

## Deploying

The site is hosted on Vercel and publishes automatically from GitHub.

### First-time setup

1. Create a Vercel account for the company and choose the **Pro** plan. Vercel’s free Hobby plan is restricted to non-commercial personal use, and a company website with sponsors counts as commercial use.
2. In Vercel, select **Add New → Project** and import this GitHub repository. Vercel detects Astro automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
   - No environment variables are needed.
3. Select **Deploy**. Every later push to the `main` branch publishes the site. Every pull request gets its own preview link for review.
4. Add the domain under **Project → Settings → Domains**, and follow Vercel’s instructions for the DNS records. Then update `domain` in `src/data/site.ts`.

### Redirects from the old site

`vercel.json` sends the old timessquareball.net addresses to their new pages. For example, `/nye-webcast` goes to `/webcast`, `/photographs` to `/press/photos`, and old PDF links under `/wp-content/uploads/…` to `/press/releases/…`. They take effect if the old domain is pointed at this Vercel project, so old links and search results keep working.

### Preview on GitHub Pages (temporary)

Until Vercel is set up, every push to `main` also publishes a preview to https://brandino101234.github.io/timessquareball/, using `.github/workflows/pages.yml`. That build:

- puts the site in the `/timessquareball/` subfolder (`SITE_BASE`). Links are written as `/ball-facts` everywhere, and `src/integrations/base-links.ts` adds the folder name when the site is built;
- tells search engines not to index it (`NOINDEX=true`), so the temporary copy doesn’t compete with the real launch.

GitHub Pages ignores `vercel.json`, so old-site redirects only work on Vercel. Once the site is live on Vercel, delete the workflow and turn off Pages under **Settings → Pages**.

### Checking a change before it goes live

```bash
npm run build
npm run preview
```

Open http://localhost:4321. This is exactly what will be published.

---

## Handing over the repository

The repository was built in a personal GitHub account and is meant to move to the company.

1. On GitHub, open the repository’s **Settings → General → Danger Zone → Transfer ownership**, and transfer it to the company’s GitHub organization. GitHub redirects the old address automatically.
2. In Vercel, reconnect the project to the transferred repository: **Project → Settings → Git**. Or import it fresh into the company’s Vercel team (see [Deploying](#deploying)).
3. Move the domain to the company’s Vercel team if it was added elsewhere.
4. Give editors access: GitHub **Write** access for anyone who edits content, and Vercel team access for anyone who manages deployments.

Nothing in the code is tied to a personal account. There are no API keys, passwords or environment variables.

---

## How the code is organized

```
src/
  pages/            One file per page; the file path is the web address
    [cam].astro       Ball Cam pages, one per entry in config/cams.ts
    press/            Press hub, photos, b-roll, segments, releases
  layouts/          BaseLayout.astro: <head>, search and social metadata, header, footer
  components/       Reusable pieces (LiveCam, Countdown, VideoList, SponsorStrip…)
  content/          Markdown content (pages, timeline, releases)
  content.config.ts Rules each Markdown file is checked against
  data/             Lists and settings (sponsors, facts, photos, videos, navigation, site)
  config/           Ball cams and webcast
  scripts/          Browser code: countdown, live cam player, animated Ball, formatting
  styles/global.css Colors, fonts, type scale and long-text styles
  assets/           Images processed by the build
public/             Files served as-is (PDFs, favicon)
tests/              Countdown tests (npm test)
vercel.json         Redirects from the old site's addresses
content-audit.md    Audit of the old site's content
```

### Built in

- **Search and sharing.** Every page has a title, description, canonical address, and a preview image and text for social media. Structured data tells search engines about the organization, the New Year’s Eve event, the FAQ and press releases. A sitemap is generated at `/sitemap-index.xml`.
- **Accessibility (WCAG AA).** Every page was checked with axe at 375px and 1440px wide with no violations. There is a skip link, visible keyboard focus, labelled landmarks and alt text, and animation is turned off for visitors who prefer reduced motion. The countdown is announced to screen readers once a minute, not every second.
- **Performance.** Images are resized and compressed automatically. Fonts are part of the site, and pages ship very little JavaScript.

---

## Design system

The “Constellation” direction: the Ball as a star map. It is quiet, premium and nighttime, and it is drawn from the real 2026 objects: circular Waterford crystals, LED light pucks and numerals painted gold for the first time.

| Token          | Value     | Used for                                         |
| -------------- | --------- | ------------------------------------------------ |
| Night          | `#0e1440` | Page background (deep indigo, never black)       |
| Crystal        | `#eef2ff` | Text                                             |
| Prism          | `#9adcf5` | Links and keyboard focus                         |
| Numeral gold   | `#e2b04a` | Countdown, primary buttons, the current year     |
| Confetti rose  | `#f27bb0` | Celebration only (“Happy New Year”, “Live” dots) |

- **Type:** *Poppins* for body text, page titles, buttons and the countdown. *Bodoni Moda* for section headings (h2) and the logo wordmark. *Hanken Grotesk* for the main menu. All three are part of the site, so no font service is used. They are set as `--font-sans` / `--font-display`, `--font-serif` and `--font-nav` in `src/styles/global.css`.
- **Signature elements:** the animated Constellation Ball on its mast on the home page (its circles use the real three crystal sizes in their real proportions), the gold countdown, the crystals drawn at true scale and the numerals drawn in light pucks on Ball Facts.
- All tokens are defined once in `src/styles/global.css` and used through Tailwind classes such as `bg-night`, `text-gold` and `font-display`.

---

## Third-party services

By design, the site uses **no analytics, no tracking, no cookies and no advertising scripts**, and it loads no fonts or code from other companies’ servers. Please add analytics or any other third-party service only as a deliberate decision. It would also need to be reflected in the Privacy Policy.

The only outside connections are the company’s own content plus two services approved for the homepage (weather and map):

| Service                         | Where                          | Configured in           |
| ------------------------------- | ------------------------------ | ----------------------- |
| Live stream provider (HLS)      | Ball cam pages, header live dot, homepage live strip | `src/config/cams.ts`    |
| National Weather Service (api.weather.gov) | Homepage live strip: current Times Square weather. Free, no key; visitors’ browsers request it | `src/config/weather.ts` |
| OpenStreetMap                   | Homepage “Getting to Times Square” map (embedded, loads only when scrolled into view) | `src/data/getting-there.ts` |
| Webcast provider (when set)     | Webcast page                   | `src/config/webcast.ts` |
| Amazon S3 (`tsbmediaupload`)    | B-roll and segment downloads   | `src/data/videos.ts`    |
| Vercel                          | Hosting                        | `vercel.json`           |
