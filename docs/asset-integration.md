# Original asset integration and publication review

## Files now integrated

The owner uploaded these files to the existing PR branch in commit `1c1abed`:

- `phyllis portfolio homepage photo.JPG` → moved unchanged to `public/images/portrait/phyllis-zhang.JPG`.
- `recap poster-SA Screening night.png` → moved unchanged to `public/images/south-asia/recap-poster.png`.
- `walking_with_anthropologists_album_17pages_compressed.pdf` → retained at the checkout root, outside public assets and the production build.

The homepage uses the supplied portrait. CSS sets a face-centred display crop for desktop and mobile; the original image file is unchanged. At the owner's subsequent request, About now reuses this same photograph beside the introduction with a portrait-oriented CSS crop; no duplicate image file is created.

The South Asia Work card uses the actual poster with `object-fit: contain`. On the detail page it uses its natural aspect ratio, a responsive width, and automatic height; no parts are cropped. The poster is shown intact, including the group photos, film imagery, typography, and original printed dates. No individual screening dates or other event information have been inferred from it. The four-film programme remains exactly as confirmed by the owner.

## Original Walking album

The previously inaccessible oversized chat PDF is superseded for this implementation by the compressed PDF uploaded to GitHub. Its actual page count is **17**. Every PDF page was checked with PyMuPDF: exactly one full-page image fills the page bounds, with no separate text or additional objects. `pdfimages -j` extracted the existing embedded JPEGs without re-encoding them. The complete original artwork, captions, borders, and compositions are preserved at the supplied source resolution of **1386 × 1071** pixels.

Pages are stored in `public/images/walking-album/page-01.jpg` through `page-17.jpg`. The manifest in `src/walking-album.ts` explicitly preserves their source order. Original album page 10 serves as the Walking homepage/Work cover without cropping. No standalone photograph has been fabricated or cut out of the page design.

The viewer supplies previous/next controls, a page counter, mobile scrolling, enlarged viewing, load-error handling, and per-page publication-review flags. It loads one original page at a time. No PDF download button, link, embed, or public PDF asset is provided. The root source PDF remains preserved in Git, but is not copied into `dist`.

## Publication-permission review requested by the owner

The source images have been inspected for identifiable people; permissions are **not assumed**. The following page numbers are flagged in the viewer:

| Pages | Visible material to review                                                     |
| ----- | ------------------------------------------------------------------------------ |
| 2–3   | Printed photographic portraits incorporated into handmade event posters        |
| 4–5   | Temple group photograph and restaurant group photograph                        |
| 7–9   | Outdoor group, walking, listening, and street photographs                      |
| 10–12 | Group and canal/boat photographs, including the page used as the Walking cover |
| 13–16 | Parliament group and discussion photographs                                    |

Pages 1, 6, and 17 show title artwork, food photographs, and closing artwork respectively and have no identifiable-person flag. The **South Asia recap poster** also contains identifiable group photographs and film imagery; please review the relevant publication permissions for the complete poster. The homepage portrait includes other passengers in the background. Original faces and artwork have not been altered.

These flags identify material for the owner's review; they do not establish consent. No merge or production deployment has been performed. The PR preview is the review surface.

## Reproducing and checking album extraction

From the repository root, with Poppler available:

```sh
pdfimages -j walking_with_anthropologists_album_17pages_compressed.pdf /tmp/walking-page
```

The source outputs `walking-page-000.jpg` through `walking-page-016.jpg`, corresponding to the site's pages 01–17. They can be compared byte-for-byte with the committed page files. Keep the full-page images unchanged and preserve the page order. The browser tests now check all real page URLs/dimensions and image loading, in addition to isolated control tests with clearly labelled fixtures.

## Remaining materials

Separate South Asia event-photo files have not been supplied; the real group photographs already contained in the recap poster remain visible as part of that complete original poster. Upload standalone originals only if additional gallery images are wanted. Original dissertation/essay PDFs, film stills, and other previously missing materials are unaffected by this image-integration update.

## Additional owner-directed image assignments

The subsequent upload commit `dd7292c` supplies Dumpling Night's original programme, the Anthro Documentary image, and the Quaker research collage. These are moved unchanged to `public/images/dumpling-night/programme.png`, `public/images/anthro-documentary/cover.png`, and `public/images/quaker-research/cover.png`. Each is displayed without cropping. The Quaker image is the canonical homepage/Work/detail cover, while the series image appears on its existing Work card and detail page. No additional series production details are disclosed. Dumpling Night has a dedicated Community & Cultural Projects record and detail route; its role, event date, and unprovided experiences are not invented.


## October 17 diary and NIO illustration

The owner-uploaded assets were read from main commit `2a97156` without merging main into the PR branch. `ChatGPT Image Oct 20, 2026, 01_40_33 PM.png` is copied unchanged to `public/images/nio/gpt-generated.png` and explicitly credited as GPT-generated / gpt生成 on the homepage, Work card and detail page. It is an illustration, not documentary evidence.

Original `IMG_5248.HEIC`, `IMG_5254.HEIC`, `IMG_5255.HEIC` and `IMG_5261.HEIC` were converted with `heif-convert -q 92` to browser-compatible JPEGs in `public/images/gratitude/2026-10-17/`. No content was recreated or cropped. IMG_5261 is the lead image; the remaining three follow the supplied bilingual diary text. The diary date is the owner's explicit 2026-10-17.

The owner-supplied Quaker Table of Contents, Abstract (including Keywords), and Afterword are stored in `src/quaker-excerpts.ts` and replace that project's pending-material block. English research text is retained without an invented Chinese translation. The supplied YouTube reference is rendered as a clickable link.

For the South Asia essay, the opening-image caption is hidden, and the image note heading and paragraph use smaller type than the subsequent essay body. Extracted essay wording and references remain unchanged.


## 2025 LSE screening photographs — integrated

The new upload commit `d1c2bb2` supplied seven LSE screening photographs and `you never know photo.png`. Only these image assets were copied from main; application source and main were not merged.

The seven photographs are in `public/images/invisible-macau/lse-2025/` and appear in the Invisible Macau project's “LSE Screening · 2025 / 2025 年 LSE 展映” section. The owner-selected `e1af9b07710bcdf82e7c9cb9c3b84e9a.JPG` appears first at full gallery width, followed by `30cdac514b3e9ce348018cdc2d274ba2.JPG` and the other five photographs. Six JPGs are copied byte-for-byte; `a7e596a4f3a1a7b99acd365b0b155e0d.HEIC` is converted to browser-compatible JPEG using `heif-convert -q 92`. All seven are displayed uncropped with original proportions and lazy loading. The existing film poster and trailer remain. No precise screening date, speaker identity or extra event information is inferred. Identifiable attendees appear in these photographs; include this gallery in the owner's publication-permission review.

`you never know photo.png` is copied unchanged to `public/images/you-never-know/cover.png` for that project's Work card and detail cover. Existing obscured faces are preserved; no image edits are made. The report was subsequently supplied and is integrated as described below.

Anthro Dumpling Night's owner-supplied Spring Festival wording is used only on its homepage card via `homeCardIntro`. The Work card and project detail retain the existing description.

The NIO illustration credit now explicitly identifies the image as generated: “Image generated by GPT / 图片由 GPT 生成”. The Quaker cover caption is removed. Anthro Dumpling Night is included on the homepage and keeps its existing detail URL; its revised description uses only the owner's confirmation of the department's first Chinese New Year event.


## Walking photographs and original networking report

The owner-uploaded main commit `254716e` supplies `走路1.HEIC` through `走路6.HEIC` and `走路8.HEIC` through `走路12.HEIC`, plus `Start up Networking-Observational report-Phyllis.pdf`. Main application source was not merged. The owner agreed to proceed with the 11 existing walking photos; walking 7 is not present. They were converted with `heif-convert -q 92` to browser-compatible `public/images/walking/walking-NN.jpg` without cropping or altering their contents. About → Walking displays 12 first, then 1–6 and 8–11; all photos preserve their full proportions and load lazily. No place names or route details were invented.

The original PDF is copied byte-for-byte to `public/documents/you-never-know/observational-report-phyllis.pdf`. It contains eight unencrypted A4 pages. The subsequent owner request replaces the PDF iframe with a fully readable HTML article at the same project detail URL. `scripts/extract-networking-report.py` generates the complete original prose, two source headings, three reference entries and all ten embedded images in order; repeated template headers, footers and physical line wraps are removed. Three paragraphs continuing across page boundaries are rejoined. Original image bytes, including existing face obscuring, remain intact. No prose is rewritten or translated. The source PDF stays available in the repository for verification. Stale statements that the report is unavailable are removed or point to the integrated report. The separate Walking With Anthropologists album still has no public PDF link.


## Anthro Dumpling Night after PR #3 merge

Work continues on `codex/portfolio-dumpling-assets`, based on the merged main and the owner's subsequent upload commit `f0d51c8`. No merge to main or production publication is performed by this update.

`(Compressed)DumplingPoster.pdf` has four complete 1920 × 1080 pages. They are rendered with all original PDF layers intact to `public/images/dumpling-night/posters/page-01.png` through `page-04.png`, using `python3 scripts/export-dumpling-posters.py`. Page 2 is the homepage and Work cover. The project detail opens with page 1, followed by pages 2–4 in source order and the former homepage programme image. All pages are displayed in their full original proportions. `--check` verifies all four complete-page exports against the PDF. Individual embedded photographs are not substituted for the composite pages.

The Chinese Word story `anthro-dumpling night .docx` follows the posters. `scripts/extract-dumpling-story.py` extracts its original title, location line, four prose paragraphs and six embedded JPEGs in document order. The text is neither rewritten nor translated; adjacent final images remain adjacent. `--check` verifies the generated data and each original image's bytes. Original uploaded photos `anthro dumpling night 1.JPG`, `anthro dumpling 2.JPG`, `anthro dumpling 3.JPG` and `anthro dumpling4.JPG` are copied unchanged into `public/images/dumpling-night/events/` and appear once in the following gallery. Photo 5 is not added because the owner requested 1–4.

The original `隐形的小莲岛-剧照3.JPG`, `隐形的小莲岛-剧照4.JPG` and `隐形的小莲岛-剧照5.JPG` are copied unchanged into `public/images/invisible-macau/stills/`, in order 3–5. They appear in a dedicated detail-page image section, preserving the existing poster, trailer and seven LSE screening photographs. The new poster collages, Word story and activity images include identifiable participants and should be included in the owner's existing publication-permission review.
