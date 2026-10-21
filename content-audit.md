# Content audit — timessquareball.net

Audited **21 October 2026** with Playwright (headless Chromium) and `curl` link checks.
Source site: WordPress + Elementor ("hello-theme-child-master" theme), designed by HAAS/créa, produced by Live X.
Content owner: **Countdown Entertainment, LLC** ("All content is owned and licensed by Countdown Entertainment, LLC" — site footer).

Legend: ✅ works · ⚠️ outdated / needs a decision · ❌ broken

---

## Site-wide

| Item | Status | Notes |
|---|---|---|
| Theme stylesheet `wp-content/themes/hello-theme-child-master/style.css` | ❌ | 404 on every page |
| `<meta name="description">`, Open Graph, Twitter cards | ❌ | Missing on every page. Only `robots` and a tile icon are set |
| Structured data (JSON-LD) | ❌ | None |
| Image alt text | ❌ | Empty on every image (logo, sponsors, all 93 press photos) |
| Logo `TSBlogo.png` | ⚠️ | 147×88 PNG only — blurry on high-DPI screens. Rebuilt as text + SVG mark; a vector logo from the company would be better |
| Main nav | ✅ | Rendered 3× in the DOM (desktop, sticky, mobile) |
| Social share buttons on content pages (Facebook / Twitter / LinkedIn) | ⚠️ | Load third-party share widgets; dropped in the rebuild |
| Footer copyright | ⚠️ | "Copyright © 2024" — now computed from the build year |
| Footer "Twitter" link | ⚠️ | Platform is now X; URL `twitter.com/timessquareball` still redirects |
| Footer "FAQ'S" link | ⚠️ | Goes off-site to `timessquarenyc.org/events/new-years-eve/index.aspx#.WFXF2oWcH-g` (301 → `/nye/nye-landing`). No FAQ content exists on this site. The rebuild has a drafted FAQ page — **needs company review** |
| Footer credits | ✅ | "Produced by Live X. Designed & developed by HAAS/créa" — kept until the company decides otherwise |

### Social links (footer)
- Facebook — https://www.facebook.com/TimesSquareBall ✅
- YouTube — https://www.youtube.com/user/TimesSquareNYE/ ✅
- Twitter/X — https://twitter.com/timessquareball ✅ (redirects)
- Instagram — https://www.instagram.com/timessquareball/ ✅

---

## Home `/`

- Countdown widget (Essential Addons `eael-countdown`), target hard-coded `Jan 01 2027 0:00:00` in the **visitor's** time zone ⚠️ — a visitor in London sees midnight London time, not midnight in Times Square. Rebuild counts down to midnight **America/New_York** and rolls over to the next year automatically.
- CTA: "GET THE LIVE NYE WEBCAST" → `/nye-webcast/`
- Copy: "Get a behind-the-scenes look at what it takes to put on this dazzling show."
- Hero background slideshow: `ball-A.jpg`, `ball-C.jpg`, `ball-D.jpg`, `ball-E.jpg`, `ball-F.jpg`, `ball-G.jpg`, `Pink1.jpg` (uploads/2019/10) ⚠️ 2019 photos of the previous ("Big") ball
- Decorative strip `ball-drops-2.png`
- Sponsors carousel (each logo rendered twice for looping): Planet Fitness (2025/10), Carnival (2021/12), Kia (2021/10), Waterford (2025/10). Links: planetfitness.com (403 to bots, OK in browsers), carnival.com ✅, kia.com/us/en ✅, waterford.com/en-us ✅
- ❌ Broken image request: `https://placehold.it/1600x900&text=Post+Surprise+Proposal` (placeholder service is dead; leftover from a template)
- Embedded iframe from `install.blivenyc.com` (third-party webcast vendor) loads on the home page too

## NYE History `/nye-history/`

- ~520 words, "From the Times Square Alliance:" — 1904 first celebration, Times Tower, Adolph Ochs, 1907 first ball, Artkraft Strauss, 1914 move
- Images: `history1.jpg`, `history2.jpg` (uploads/2019/10)
- ⚠️ Typos fixed in the rebuild: "occassion" → "occasion", "ofThe Times" → "of The Times"
- ⚠️ Fact check for company review: the page calls the publisher "German Jewish immigrant Alfred Ochs". The New York Times publisher was **Adolph** S. Ochs, born in Cincinnati to German Jewish immigrants. Text kept as-is until the company confirms.
- ❌ "(For more information … please click here.)" — link has no target (historic target `timessquarenyc.org/nye/nye_history.html` returns 404). Rebuild links to Ball History.

## Ball History `/ball-history/`

- ~850 words: 1907 iron & wood ball → 1920 wrought iron → 1955 aluminum → 1981–88 "I Love New York" apple → 1995 upgrade → 2000 crystal → 2007 Centennial LED → 2008–2024 Big Ball → 2025 Constellation Ball; "About Time-Balls" (Greenwich 1833, US Naval Observatory)
- Images: `Alu-Ball.jpg`, `Glitter-Ball.jpg`, `Centanial.jpeg` (sic), `Big.jpeg` (uploads/2019/10), `constellation-ball.jpg` (uploads/2026/01)
- ⚠️ Rendered as a single wall of text; content is a natural timeline → rebuilt as a timeline from `src/content/timeline/`
- ⚠️ "After seven years" (1981–1988 is seven NYEs) — kept

## Ball Facts `/times-square-ball-facts/`

- Intro, Constellation Ball (ninth ball, unveiled Nov 24 2025), crystal themes (Infinite Life / Liberty / Happiness), Infinite Edition, Waterford, 2026 gold numerals, LED puck counts, visitor experiences (Ball Access Experience, Premium Ball Experience)
- Image: `TS2026_Constellation-Ball_17-2048x1365.jpg`
- Download: `uploads/2026/01/TS2026_Ball__Numeral_Fact_Sheet.pdf` ✅ (same file also at `uploads/2025/12/…` — duplicate)
- ⚠️ Hidden/empty link to the **2020** fact sheet `static.timessquareball.net/wp-content/uploads/2019/09/TS2020_Ball_Fact_Sheet_09-27-19.pdf` (still resolves) — dropped
- ⚠️ "Quick facts" repeat numbers already in the prose — rebuilt as one scannable data file `src/data/ball-facts.ts`
- ⚠️ Says visitor experiences "open in 2026" — update after NYE 2027 details are known
- Data consistency check: 1,420 + 2,840 + 1,020 = 5,280 crystals ✅

## Ball Cam 1 `/ball-cam-1/` · Ball Cam 2 `/ball-cam-2/`

- Bare `<video>` elements, no heading, no text
- Cam 1 HLS: `https://cdn3.wowza.com/1/TklSZG5RQTRoaGZr/dGVWVyt0/hls/live/playlist.m3u8` ✅ live (720p)
- Cam 2 HLS: `https://cdn3.wowza.com/1/ZTMzVHJwWHROUHVO/b2pIQTFs/hls/live/playlist.m3u8` ✅ live (720p)
- ❌ No HLS fallback: desktop Chrome/Firefox/Edge can't play `.m3u8` natively, so the page is blank there
- ❌ No loading or offline state
- Rebuild: `LiveCam` component + `src/config/cams.ts` (placeholder URLs — swap in the real ones above or new ones)

## NYE Webcast `/nye-webcast/`

- Only content is an iframe: `https://install.blivenyc.com/speed/landing/campaign/4356/responsive/1/tags/flagship,not-integrated` over background `uploads/2019/12/ballbg2020.jpg`
- ⚠️ Third-party vendor content; no text, no fallback. Rebuild: `src/config/webcast.ts`, empty by default (decision: company supplies this year's provider)

## Press `/press/`

- "High resolution media files and press releases. Check back often for updates." + 4 links ✅

## Hi-Res Photos `/photographs/`

- "Images for press use. Click buttons to sort. Photographs will be posted shortly after each event."
- 93 photos, all NYE 2026 (uploads/2025/12), largest size available 2048×1365:

| Category | Count |
|---|---|
| Ball Photos (Constellation Ball) | 17 |
| Wishing Wall | 14 |
| Numeral Delivery | 13 |
| Crystal Installation | 12 |
| Good Riddance Day | 10 |
| Numeral Installation | 7 |
| Hats and Balloons | 7 |
| Ball Test | 7 |
| Confetti Test | 6 |

- ❌ No download button — thumbnails link to WordPress attachment pages
- ❌ Attachment page slugs don't match the photo (`/2025/12/01/constellation-ball-2-3-10/` is a Wishing Wall photo)
- ❌ No alt text; caption only repeats the category name
- Rebuild: all 93 copied to `public/press/photos/<category>/`, data in `src/data/photos.ts`, gallery with filter + direct download

## B-Roll HD Video `/b-roll/`

Hosted on the company's S3 bucket `tsbmediaupload`. All 18 links ✅ (HTTP 200).

| Title | File | Size |
|---|---|---|
| Balloon Inflation Team Prepare 25,000 Balloons for Revelers on NYE | `TS2026 Ballon Inflation_B-Roll.mov` | 208 MB |
| New Year's Eve Ball Test Atop One Times Square | `TS2026_Ball Test_HD-B Roll.mov` | 131 MB |
| Confetti Test in Times Square | `TS2026_Confetti Test_B-Roll.mov` | 142 MB |
| Good Riddance Day in Times Square Closes the Curtain on 2025 | `TS2026_Good Riddance Day_B-Roll.mov` | 379 MB |
| 2026 Waterford Crystals Installed on Times Square New Year's Eve Ball | `TS2026_Waterford Crystal_B-Roll.mov` | 243 MB |
| "2026" Numerals Installed Atop One Times Square | `TS2026_Numeral Installation_B-Roll.mov` | 312 MB |
| "2026" Numerals Arrive in Times Square | `TS2026 _Numeral Arrival_B-Roll.mov` | 271 MB |
| Confetti Wishing Wall Opens in Times Square | `TS2026_Wishing Wall_B-Roll.mov` | 206 MB |
| Inaugural New Year's Eve Constellation Ball Raising | `2025-11-24_Ball unveiling_B-Roll.mov` | 206 MB |
| Archive: Midnight Moment 2017–2025 (9 files) | `.mp4` / `.mov` | 268–463 MB each |

- ⚠️ Titles include file extensions ("…_HD B-Roll.mov") and underscores; cleaned up
- ⚠️ No file size / format shown before a 200–460 MB download — now shown
- ⚠️ 2017 archive link uses `http://` — upgraded to `https://`
- Videos are **linked, not copied** into the repo (≈5 GB total; too large for git/Vercel)

## Pre-Packaged HD Video Segments `/packaged-video-2/`

9 segments on S3, all ✅: Balloons (280 MB), Ball Test (197 MB), Confetti Test (209 MB), Good Riddance Day (347 MB), Waterford Crystal (176 MB), Numeral Installation (193 MB), Numeral Arrival (225 MB), Wishing Wall (228 MB), Constellation Ball (187 MB). Same issues as B-roll.

## Press Releases `/press-releases/`

"PDF downloads" — 10 PDFs, all ✅. Not in date order; titles inconsistent.

| Date | Title | File |
|---|---|---|
| 2025-11-24 | One Times Square Unveils New Times Square New Year's Eve Ball | `2025/11/One-Times-Square-Unveils-New-Times-Square-New-Years-Eve-Ball.pdf` |
| 2025-12-01 | Confetti Wishing Wall Opens in Times Square | `2025/12/FINAL-NYE-2026-Wishing-Wall-Release-12.pdf` |
| 2025-12-11 | Numerals Arrive in Times Square – December 18, 2025 at 11am | `2025/12/Final-NYE-2026-Numeral-Arrival-Advisory-12_11.pdf` |
| 2025-12-23 | New 2026 Waterford Crystals Installed on Times Square New Year's Eve Ball | `2025/12/FINAL-Crystal-Installation-Advisory-12_23-002.pdf` |
| 2025-12-27 | New Year's Eve Ball Test – by appointment only | `2025/12/FINAL-NYE-2026-Ball-Test-Advisory-12_27.pdf` |
| 2025-12 | Confetti Test in Times Square – December 29 | `2025/12/FINAL-NYE-2026-Confetti-Test-Advisory.pdf` |
| 2025-12 | Good Riddance Day in Times Square – December 28 | `2025/12/FINAL-NYE-2026-Good-Riddance-Day-Advisory.pdf` |
| 2025-12-28 | Official Times Square New Year's Eve Line-Up Announced | `2025/12/TS2026_Event_Schedule_12-28-2025.pdf` |
| 2025-12-28 | Live TV Feed and B-Roll Information for New Year's Eve | `2025/12/TS2026_TSTV_MediaAlert_12.28.25.pdf` |
| 2025-12 | TS2026 Ball and Numeral Fact Sheet | `2025/12/TS2026_Ball__Numeral_Fact_Sheet.pdf` |

Dates marked "2025-12" are taken from the PDF text where available (see each Markdown file's front matter). Rebuild: one Markdown file per release in `src/content/releases/`, PDF copied to `public/press/releases/`.

## Privacy Policy `/privacy-policy/` · Terms `/terms/`

- Both "Effective December 13, 2010" (~13k and ~14k characters)
- ⚠️ **Out of date — needs legal review.** Both describe the "Times Square Ball mobile applications" for Apple/Android and a "Photo Display Service (PDS)" that no longer exist on the site, and name the domain "TimesSquareBall.net". Contact addresses `support@timessquareball.net` / `remove@timessquareball.net`.
- Copied **verbatim** into `src/content/pages/privacy.md` and `terms.md`. We have not edited legal language; the company's counsel should update the domain, contacts, services and effective date.
- The rebuild itself sets no cookies and loads no analytics.

---

## Third-party services found on the old site

| Service | Where | Rebuild |
|---|---|---|
| blivenyc.com iframe (webcast vendor) | Home, NYE Webcast | Not loaded until `webcast.ts` is filled in |
| Wowza CDN (HLS streams) | Ball Cams | Kept — company's own streams, configured in `cams.ts` |
| AWS S3 `tsbmediaupload` | B-roll, packaged video | Kept as download links |
| Facebook/Twitter/LinkedIn share widgets | Content pages | Removed |
| placehold.it | Home | Removed (dead) |
| Google Fonts / WP plugins (Elementor, Essential Addons) | All | Removed; fonts self-hosted |
