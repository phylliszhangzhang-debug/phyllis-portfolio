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


## Pending 2025 LSE screening photographs

The owner requested the upload batch including `30cdac514b3e9ce348018cdc2d274ba2`, with `e1af9b07710bcdf82e7c9cb9c3b84e9a` first in the screening gallery. Neither filename was present in the trees of any of the repository's four branches when checked for this update. No replacement image or screening details have been invented. The Invisible Macau Film Stills placeholder section and pending-material block were removed as requested; its original poster, trailer, synopsis, behind-the-film block and credits remain. Integrate the real 2025 LSE photographs once uploaded, preserving the requested gallery lead and full image proportions.

The NIO illustration credit now explicitly identifies the image as generated: “Image generated by GPT / 图片由 GPT 生成”. The Quaker cover caption is removed. Anthro Dumpling Night is included on the homepage and keeps its existing detail URL; its revised description uses only the owner's confirmation of the department's first Chinese New Year event.
