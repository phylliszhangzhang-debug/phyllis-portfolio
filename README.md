# Phyllis Zhang / 张艺锦莹 — portfolio

A bilingual editorial portfolio built with React, TypeScript, Vite, and Tailwind CSS. It keeps the ivory, terracotta, sage, serif, and handwritten visual system. Caveat is self-hosted with its SIL Open Font License. No CMS, paid service, remote fonts, runtime API keys, or backend are required.

## Run, test, and preview

Use Node 20.19+, 22.12+, or 24 (verified here with Node 24) and npm:

```sh
npm ci --cache /tmp/phyllis-npm-cache --no-audit --no-fund
npm run dev       # Vite development server, port 5173
npm run build     # TypeScript check and production build into dist/
npm run preview   # Local production preview
npm test          # Desktop and mobile Chromium browser checks
```

On your computer, open the address printed by Vite. In a remote workspace, use a supported preview/port-forwarding interface for port 5173. The onboarding chat does not expose a public preview URL. Tests use `/usr/bin/chromium` when present; otherwise install a browser with `npx playwright install chromium` where network access permits it. No browser download is needed in the prepared cloud machine.

The owner reports an existing Vercel deployment. This branch adds only the legacy CV redirect to Vercel configuration; it does not merge into main or manually deploy to production. Review changes before merging; your Vercel Git integration controls what a merge deploys. For any static host, build with `npm run build` and serve `dist`. Hash routes work without server rewrites. The former film URL remains an alias and is replaced with the canonical `#/work/invisible-macau` URL in browser history.

## Where content lives

| File                     | What to edit                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `src/content.ts`         | Identity, About biography, education, portrait, contact                                           |
| `src/home-content.ts`    | Approved Hero paragraph and two homepage editorial introductions                                  |
| `src/projects.ts`        | All canonical project titles, categories, summaries, roles, metadata, sections, images, and links |
| `src/writing-content.ts` | Writing categories, local essays, external articles, English essay sections/references            |
| `src/notes-content.ts`   | Short Notes and Daily Gratitude entries                                                           |
| `src/types.ts`           | Shared bilingual, image, project, section, and fact types                                         |
| `src/main.tsx`           | Existing reusable components, routes, navigation, and page layouts                                |
| `src/styles.css`         | Existing design system and responsive styles                                                      |

For bilingual fields, English is `en`, Simplified Chinese is `zh`. English appears first except the requested Chinese-first About greeting. Text is rendered as text, not executable HTML. Use `\n\n` or multiline template strings for separate paragraphs in supported long-form fields. Keep approved wording intact. Do not invent missing translations of findings or quotations.

### Projects

Edit one record in `projects.ts` to update its card, detail page, page title, and page description. Add a new record with a unique `slug` and group `research`, `visual`, or `community`. `workCategories` controls Work group order; `selectedProjectSlugs` explicitly preserves the four homepage selections and their order. `cardTitle` can shorten a long official title; `title` always supplies the full detail-page title and metadata. `aliases` preserve old links.

For simple projects, `body` contains bilingual paragraphs. For structured projects, `sections` defines the headings, paragraphs, optional fact lists, and empty states. Set `useGallery: true` for a section that displays the main project `gallery`. For a separate behind-the-scenes album, add image objects to that section’s `photos`. Remove a pending message after its actual replacement material is approved. Behind the Film stays within the film detail page.

### Photos and albums

Add original, publication-approved images to `public/images/`, organised into folders, for example `public/images/invisible-macau/` and `public/images/gratitude/`. Compress large images before uploading. Every image object follows this structure:

```ts
{
  src: '/images/your-folder/your-actual-photo.webp',
  alt: 'An accurate description of this specific photograph',
  caption: { en: 'Your approved caption', zh: '经确认的图注' },
}
```

A project `image` replaces its cover placeholder; `gallery` contains album images. `homePhoto` and `portrait` in `content.ts` use the same shape. An optional caption can use `{ en: '', zh: '' }`. Keep participant identities anonymous and check permission for identifiable people, organiser-supplied photographs, posters, and film imagery. Existing SVG drawings are decorative placeholders, not documentary records.

The standalone CV page and navigation item have been removed. Education remains on About and every project remains on Work. Old `#/cv` bookmarks resolve to `#/about` in the browser. `vercel.json` declares a temporary HTTP redirect from `/cv` to `/#/about`; this takes effect when the existing Vercel integration deploys this branch. The client also handles `/cv` during local Vite previews. No PDF download link is added and no uploaded files are deleted. SOAS remains labelled **MRes Social Anthropology / 社会人类学研究型硕士**; LSE remains **MSc Social Anthropology / 社会人类学理学硕士**. Dates remain omitted until supplied.

## Add a Writing article

1. Open `src/writing-content.ts` in GitHub’s file editor or your local editor.
2. Add an object to `articles`. Choose `category: 'academic'` (Academic Essays), `'everyday'` (Looking Again / 换个角度看看), or `'books-films'` (Books & Films / 书与电影); give its exact bilingual title, intro, and classification. Add `date: 'YYYY-MM-DD'` only if a real date is known.
3. For a WeChat or other external article, set `kind: 'external'` and its actual `url`. It opens the original publication; no local body is generated.
4. For a local essay, set `kind: 'local'`, a unique `slug`, `openingImage` (or `null`), source filename, `sections`, `references`, and `fullTextChecked: false`.
5. Copy the actual English body into `sections`: each item has an optional original `heading` and a `paragraphs` array. Preserve academic wording and in-text citations. Copy the complete reference list into `references`. Full essay Chinese translation is not required.
6. Compare the entire text, headings, citations, and references with the original source. Only then set `fullTextChecked: true`. The body remains unpublished unless this flag, body paragraphs, and references are present. Check image permission separately before setting `openingImage`.
7. Run build/tests, review in a browser, and commit through a branch/PR.

The South Asia essay now displays the complete source-checked English text from the owner-uploaded **`South Asia-AS2.docx`**, its embedded plant-between-bricks image, all original body headings, in-text citations, and nine references. It remains labelled **SOAS Course Essay**, not a journal publication. Only the opening assignment question and blank paragraphs are omitted; academic wording is not corrected or translated. `src/south-asia-essay.ts` holds the source extraction. Run `python3 scripts/extract-south-asia.py --check` to compare it and the opening image with the DOCX. See [source-check notes](docs/south-asia-source-check.md) for unchanged original wording/citation issues.

## Add a Daily Gratitude entry

There is **no in-browser upload or authoring interface**. Use GitHub’s file upload/editor or a local checkout:

1. Add your actual photo under `public/images/gratitude/` with a clear filename.
2. Open `src/notes-content.ts` and add an object to `gratitudeEntries`:

```ts
{
  id: 'a-unique-entry-id',
  date: 'YYYY-MM-DD', // Replace with the actual date, e.g. the day you recorded it.
  // Optional: title: { en: 'Your own title', zh: '你自己的标题' },
  photo: {
    src: '/images/gratitude/your-actual-photo.webp',
    alt: 'An accurate description of your photograph',
    caption: { en: '', zh: '' },
  },
  text: { en: 'Your own short personal text.', zh: '你自己写的简短文字。' },
},
```

This is a schema example only; it is not a diary entry displayed on the site. Replace every placeholder with your own material and use a valid ISO date (`YYYY-MM-DD`). Newest entries sort first automatically without changing components. Dates use the saved diary date, without timezone conversion. One original photograph and short text are required; title and visible caption are optional.

3. Preview and run `npm run build` and `npm test`.
4. Commit the image and data changes on a branch and review the PR before merging.

For other Notes, add your own `title`, optional `date`, and bilingual `text` to `notes` in the same file. The section is **Notes / 边边角角** throughout. General Notes remain intentionally empty. Daily Gratitude now contains the owner-supplied 2026-10-16 and 2026-10-17 entries and photographs; no personal experiences or dates have been invented.

## Source check and materials still needed

The networking report remains unavailable. The South Asia essay was supplied as a DOCX and is integrated. The owner has now supplied the homepage portrait, South Asia recap poster, and compressed Walking album through GitHub; these are integrated. Materials from a different ChatGPT conversation are not automatically available here.

| Material to supply                                                                       | What it unlocks                                                                                                |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Start up Networking-Observational report-Phyllis.pdf`                                   | Exact original observations, analysis, and approved research materials for You Never Know                      |
| Permission-cleared networking photographs                                                | Real field documentation; identifiable people and organiser images need permission                             |
| `South Asia-AS2.docx`                                                                    | Integrated complete English essay, original sections, citations, and reference list                            |
| Original plant-between-bricks essay image and usage permission                           | Integrated directly from the supplied DOCX, without stock substitutes                                          |
| `recap poster-SA Screening night.png`                                                    | Integrated original recap image; the owner-confirmed four-film programme is displayed, without screening dates |
| Original documentary stills, behind-the-scenes photos, and approved personal reflections | Film Stills and Behind the Film; production anecdotes are not invented                                         |
| Additional portrait and photography albums                                               | About portrait and further photographic work                                                                   |
| Confirmed education dates                                                                | Education dates                                                                                                |
| Your actual Notes and Gratitude photos/text                                              | The supplied 2026-10-16 and 2026-10-17 entries are integrated; further entries use only your own content                         |

The V2 brief supplies the official film title, summary, detailed synopsis, runtime, filming period, role, and full creative-team names. Those have been used as supplied. The official Quaker title is preserved in English and Simplified Chinese as supplied in the final refinement brief. The About narrative and explanatory interface text connecting verified facts are editorial drafts for owner review, rather than invented motivations or memories. The original networking report title retains its supplied wording; substantive or grammatical edits require owner approval.

Both external visual-reference URLs were blocked by the environment’s proxy during the initial build. The existing design follows the supplied screenshot and prior approved refinements, not an inspected Framer export. No new stock photographs, research quotations, publications, screening records, or future documentary plans have been added.

## Integrated portrait, South Asia poster, and Walking album

The owner-uploaded homepage photo and South Asia recap poster are now served from `public/images/portrait/` and `public/images/south-asia/`. Their original bytes are preserved. The poster is displayed fully with no cropping on the Work card or detail page. The homepage photo uses responsive CSS cropping; its original file remains unchanged.

The compressed Walking album uploaded to GitHub has been verified as 17 pages. The viewer uses its original embedded full-page JPEGs in source order, without re-encoding, with previous/next navigation, a page counter, and mobile enlargement. Original album page 10 is the Walking card cover. There is no PDF download link or public PDF asset. See [asset provenance and publication-permission review](docs/asset-integration.md) for flagged pages, the intact source PDF, extraction details, and remaining materials. The actual files and every real album page are covered by desktop/mobile browser tests.

A gratitude entry can optionally include `gallery: Photo[]` after its lead `photo`; the gallery follows the diary text. Keep the lead photograph separate so its order remains explicit.


## Walking collection

About → Interests → Walking opens `#/about/walking`. Add actual route records to `src/walking-routes.ts`, with bilingual `title` and `description` and original `photos`. The collection is intentionally empty until the owner supplies routes and photographs.
