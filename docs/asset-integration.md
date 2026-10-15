# Original asset integration — pending files

The existing PR branch is preserved. No stock images, reconstructed photographs, or invented album pages are added.

## Actual access results

- `walking with anthropologists photo album.pdf` was supplied, but the file download tool rejected it because it exceeds its 32 MiB transfer limit. The PDF has not been opened or inspected. Seventeen is the owner-reported page count, not an independently verified count.
- The portrait and Walking With Anthropologists poster are visible in the chat, but their original image files are not available in the workspace. A chat preview is not a usable original asset file. They have not been recreated from the preview.
- No South Asia event-photo files or recap poster were available in the workspace.

## Files needed

1. A readable album PDF under 32 MiB, or smaller PDF parts preserving page order/design (for example pages 1–8 and 9–17), or all 17 original page exports.
2. The personal photograph attached as a downloadable JPG/PNG/WebP file.
3. Original Walking activity photographs and the original poster image file, if it should also be displayed.
4. Original South Asia event photographs and `recap poster-SA Screening night.png`.

## Prepared viewer

`src/AlbumViewer.tsx` displays whole-page image exports in their original order and proportions, with previous/next controls, a counter, fit/enlarged viewing, mobile scrolling, and image-load error handling. No PDF is embedded, linked, or exposed through a download button. It shows an honest pending state until the complete ordered page manifest is populated in `src/walking-album.ts`.

Once source files are accessible, verify the actual page count and render every whole page without trimming, compositing, removing text, or changing artwork. Store exports under `public/images/walking-album/` and record page number, original dimensions, descriptive alt text, and review flag. Do not enable a subset as though it were the whole album. Original page designs must remain intact; image-export resolution should allow readable enlarged viewing.

## Publication-permission review

No page-specific permission assessment is possible until the PDF is readable. Every album page is currently **unreviewed**; no consent is assumed. When pages can be inspected, record exact page numbers containing identifiable group photographs for the owner's review. The typed manifest supports `permissionReviewRequired` per page and the viewer flags those pages. Keep the original image unchanged. The owner must decide whether permissions cover public publication; do not blur, crop out, or recreate participants without instruction.

## Remaining integration

The homepage `homePhoto`, Walking cover/gallery, and South Asia cover/gallery still retain their existing placeholders because their original asset bytes are unavailable. When supplied, integrate those originals, choose a portrait focal point for desktop/mobile, and check the actual crops in a browser. Preserve the existing founder/organiser role labels and all project facts. Do not infer a screening programme or event dates from an uninspected poster.
