"""Export the four complete original PDF pages, preserving composite design.
Requires PyMuPDF: python3 scripts/export-dumpling-posters.py [--check]
"""
from pathlib import Path
import sys
import fitz

source = Path('(Compressed)DumplingPoster.pdf')
document = fitz.open(source)
assert len(document) == 4
out = Path('public/images/dumpling-night/posters')
check = '--check' in sys.argv
if not check:
    out.mkdir(parents=True, exist_ok=True)
for index, page in enumerate(document, 1):
    assert tuple(page.rect) == (0, 0, 1920, 1080)
    # Render every original layer together; extracting a single embedded photo
    # would lose the poster's typography, collage, masks and page layout.
    image = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False).tobytes('png')
    target = out / f'page-{index:02}.png'
    if check:
        assert target.read_bytes() == image, f'Page {index} differs from full-page export.'
    else:
        target.write_bytes(image)
print('Verified all 4 complete poster pages at the original 1920 × 1080 page proportions.')
