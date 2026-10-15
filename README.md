# Phyllis Zhang — personal portfolio

A bilingual editorial portfolio built with React, TypeScript, Vite, and Tailwind CSS. No backend, CMS, external fonts, analytics, remote images, or runtime API keys are required. Hash-based routes work on ordinary static hosting without rewrite rules.

## Run and preview

Requires Node.js 20.19+ or 22.12+ (verified with Node 24) and npm.

```sh
npm ci --cache /tmp/phyllis-npm-cache
npm run dev
```

Open the development server address printed by Vite in your local browser. In a remote development environment, use its supported port-forwarding interface for port 5173. No public deployment has been made.

```sh
npm run build     # TypeScript check and production build
npm run preview   # serve dist for a final local review
npm test          # desktop and mobile Chromium tests
```

Tests use `/usr/bin/chromium` if available (as in the prepared cloud environment). On your own machine, install a Playwright browser once with `npx playwright install chromium`. Browser-download hosts must be permitted by your network policy; the cloud machine uses its existing Chromium and does not need that download.

## Update text and projects

Most editorial content is in **`src/content.ts`**. Each bilingual field has `en` and `zh` values; Chinese appears directly underneath English. Do not replace missing translations of research findings or quotations with generated copy. The brief supplies the project and biographical facts; Chinese biographical text is a draft translation for Phyllis to review. Chinese project titles visible in the supplied screenshot have been used where legible.

- `identity`: biographical facts and practice introduction.
- `projects`: edit titles, categories, introductions, approved body paragraphs, galleries, and external links. Each `slug` forms its page URL. The Work page automatically lists every project; the homepage selects the first four.
- `articles`: add actual published writing, real dates (`YYYY-MM-DD`), introductions, categories, and original URLs, including WeChat links. These open the original publication; no article is fabricated locally.
- `notes`: add your own bilingual short entries. Empty Writing and Notes collections show intentional empty states.
- `education`, `contact`, `homePhoto`, `portrait`, `cvPdf`: update only with confirmed information.

Navigation, short interface copy, and homepage section labels are in `src/main.tsx`. Layout and colours are in `src/styles.css`; decorative drawings are inline SVGs in `Sketch`. Fonts use visitors’ local serif and Chinese system font families, without remote font downloads.

## Add photos and albums

Place original, publication-approved files in `public/images/` (resize and compress before adding). A file `public/images/walk-01.webp` is referenced as `/images/walk-01.webp`.

Set a project's `image` to replace its illustrated placeholder:

```ts
image: {
  src: '/images/walk-01.webp',
  alt: 'Write a factual description of what this particular photograph shows',
  caption: { en: 'Your approved caption', zh: '你确认的中文图注' },
},
```

Add objects with that same shape to its `gallery` array for a captioned photo album. Use the Photography project for a general album; duplicate a project object with a unique slug to create another album. `portrait` and `homePhoto` use the same image shape; set them to replace the About portrait and homepage placeholders. There is no in-browser uploader: updates are made by adding files and editing content, then rebuilding/deploying.

Preserve participant anonymity. Obtain permission before publishing identifiable research photographs. Illustrations are decorative, not research documentation; no stock or generated documentary photographs are included.

## Add the CV

Place your actual PDF at `public/files/phyllis-zhang-cv.pdf`, then set:

```ts
export const cvPdf: string | null = '/files/phyllis-zhang-cv.pdf';
```

Until then there is no false download button. Education dates, employment, achievements, and contact details are omitted rather than guessed.

## Deploy

Run `npm ci` and `npm run build`, then publish the **`dist`** directory using your chosen static host. Vite uses relative build asset URLs, so project subdirectory hosting works. Hash routes, e.g. `/#/work/photography`, need no server fallback. Host choice, domain registration, and any mainland-China hosting/access requirements remain owner decisions; no external service is necessary to run the site.

## Source references and materials still needed

Both the Framer editor URL and the Mr. Panda reference URL returned network-proxy 403 responses in this environment. Neither live site was inspected. The supplied desktop/mobile screenshot guided the image-led opening, ivory palette, red accents, serif hierarchy, and staggered project layout. This is a reconstruction from that screenshot and the written brief, not a pixel-exact Framer export.

Please supply:

1. Original homepage photograph and portrait; original walking-event photographs, Quaker research images cleared for sharing, documentary poster/stills, and photography albums with factual captions and alt descriptions.
2. Approved homepage/About copy and Chinese translations; any exact Framer copy or exported assets you want retained.
3. Film synopsis, production credits, reflections, and confirmed screening details if you want those published.
4. Approved research summaries and any public dissertation links/files. No findings, interview quotations, or fieldnotes have been invented.
5. Real Writing titles, dates, summaries, and publication/WeChat URLs; any Notes entries you choose to publish.
6. Actual CV PDF, education dates, confirmed additional activities/experience, and public contact details.
7. Title clarification if needed: the screenshot labels the documentary **Invisible Macau**, while the written brief requests **Invisible Little Lotus Island**. The site currently follows the written brief and uses the supplied Chinese film title 《隐形的小莲岛》.

The Anthro Documentary Series intentionally reveals only its title, ongoing status, and a restrained introduction. No subjects, locations, interviewees, schedules, or production plans are disclosed.
