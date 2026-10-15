# Original asset integration and publication review

## Files now integrated

The owner uploaded these files to the existing PR branch in commit `1c1abed`:

- `phyllis portfolio homepage photo.JPG` → moved unchanged to `public/images/portrait/phyllis-zhang.JPG`.
- `recap poster-SA Screening night.png` → moved unchanged to `public/images/south-asia/recap-poster.png`.
- `walking_with_anthropologists_album_17pages_compressed.pdf` → retained at the checkout root, outside public assets and the production build.

The homepage uses the supplied portrait. CSS sets a face-centred display crop for desktop and mobile; the original image file is unchanged. About's separate portrait placeholder is untouched because the request specifies the homepage.

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
