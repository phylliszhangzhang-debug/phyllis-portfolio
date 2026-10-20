# South Asia course essay — source check

Source: the owner's `South Asia-AS2.docx`, uploaded in commit `a55ec73`. The original DOCX and HEIC photo remain unchanged at the checkout root. Neither file is needed as a download for online reading.

## Extraction and online reading

`python3 scripts/extract-south-asia.py` extracts original Word paragraph text and the embedded opening PNG. `--check` compares the generated essay data and image to the original. The explicit paragraph map covers every non-empty source paragraph; it rejects unmapped content, changed section layout, tables, and tracked deletions for manual review.

The online version includes **13 body paragraphs**, **4 original headings** (including the image note), **9 complete reference entries**, in-text citations, and the original plant-between-bricks image. The opening assignment question and empty paragraphs are omitted. The supplied portfolio article title and bilingual summary remain unchanged. Full body text stays English-only. Academic words, punctuation, citations, double spaces and source spellings remain unchanged; the website supplies reading typography rather than the submission layout. The source reference heading `Reference:` and conclusion heading `Conclusion：` are preserved.

Verification here concerns faithful extraction against the source, not independent academic validation. No factual arguments or grammar have been silently corrected.

## Source wording to review separately, if desired

- The body cites **Pati(2019)**; the reference list says **Pati, S. (2018)**.
- The conclusion spells the term **sarbar**, while earlier paragraphs use **sabar**.
- Phrases such as **“can help to explain more clear”**, **“Maqsood(2023) discuss”**, and **“immediately visible,but a quiet and gradual way”** are retained exactly as supplied.
- Bibliographic details and citation consistency have not been independently verified. Any substantive edits need the owner's instruction.

## Daily Gratitude

The owner's exact bilingual text, title **Appreciate everything / 心怀感恩**, and supplied date **2026-10-16** are in `src/notes-content.ts`. Its supplied `appreciate everything.HEIC` photo is converted with `heif-convert -q 92` into a browser-compatible JPEG at `public/images/gratitude/2026-10-16-appreciate-everything.jpg`; the original remains intact. The image shows a projected lecture slide, so the alt text describes that scene rather than inventing a dinner photograph. No changes to the owner's personal wording or extra diary entries are made.
