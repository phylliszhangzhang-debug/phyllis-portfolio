"""Extract the owner's original PDF into responsive HTML content, without rewriting.
Requires PyMuPDF: python3 scripts/extract-networking-report.py [--check]
"""
import hashlib
import json
import re
import sys
from pathlib import Path
import fitz

source = Path('public/documents/you-never-know/observational-report-phyllis.pdf')
document = fitz.open(source)
assert len(document) == 8, 'Review a changed source before remapping.'
check = '--check' in sys.argv
out = Path('public/images/you-never-know/report')
if not check:
    out.mkdir(parents=True, exist_ok=True)

def paragraph(block):
    result = ''
    for line in block['lines']:
        text = ''.join(span['text'] for span in line['spans']).strip()
        # Remove physical line wraps, retaining the source's hyphens and words.
        join = '' if result.endswith(('-', '’', "'")) else ' '
        result += (join if result else '') + text
    return result

image_alts = [
    "Original flowchart showing the sequence of actions at a networking event.",
    "Original diagram connecting past stories, shared values, present projects, resource exchange, future potential and emergent opportunities.",
    "A crowded event venue under purple lights and a mirrored disco ball.",
    "People gathered around a bar; faces are obscured in the source photograph.",
    "An indoor venue with a large tree and patterned floor.",
    "Glasses and a Han of Chiang display card on a bar counter.",
    "Five event attendees posing together, with faces obscured in the source photograph.",
    "A dimly lit event room with people gathered near a stage.",
    "Two attendees talking, with faces obscured in the source photograph.",
    "A seated panel discussion in a red-lit venue, with faces obscured in the source photograph.",
]
blocks = []
image_count = 0
excluded = []
for page_index, page in enumerate(document):
    for block in sorted(page.get_text('dict')['blocks'], key=lambda b: (b['bbox'][1], b['bbox'][0])):
        if block['type'] == 1:
            image_count += 1
            filename = f'image-{image_count:02}.jpg'
            # Extract original embedded image bytes; never rasterise or recreate artwork.
            matches = [info for info in page.get_image_info(xrefs=True) if tuple(info['bbox']) == tuple(block['bbox'])]
            assert len(matches) == 1 and matches[0]['xref'] > 0
            original = document.extract_image(matches[0]['xref'])
            assert original['ext'] == 'jpeg'
            path = out / filename
            if check:
                assert path.read_bytes() == original['image'], f'{filename} differs from original.'
            else:
                path.write_bytes(original['image'])
            blocks.append({'kind': 'image', 'src': f'/images/you-never-know/report/{filename}',
                           'alt': image_alts[image_count - 1],
                           'width': original['width'], 'height': original['height']})
            continue
        if block['type'] != 0:
            raise AssertionError('Unreviewed PDF block type.')
        text = paragraph(block)
        if text.startswith('Type course code here.') or re.fullmatch(r'Page \d+ of 14', text):
            excluded.append(text)
            continue
        if page_index == 0 and len(blocks) < 2:
            kind = 'title' if len(blocks) == 0 else 'subtitle'
        elif text in ('Practicing the Future: Hope as Method in Networking', 'References'):
            kind = 'heading'
        else:
            kind = 'paragraph'
        # These three source paragraphs continue onto the next PDF page.
        if (page_index, text.split()[0]) in [(2, 'with'), (3, 'are'), (4, 'science')]:
            assert blocks[-1]['kind'] == 'paragraph'
            blocks[-1]['text'] += ' ' + text
        else:
            blocks.append({'kind': kind, 'text': text})
assert image_count == 10
assert len(excluded) == 12
assert blocks[0]['text'] == '‘ You never know’:'
assert blocks[1]['text'] == 'How Hope is fostering in ritualized Business Networking Events in London'
assert blocks[-1]['text'].endswith('27(S1), 23–43.')
assert sum(block['kind'] == 'heading' for block in blocks) == 2
# The source title is displayed as the article's heading, followed by its exact subtitle.
result = {'title': blocks[0]['text'], 'subtitle': blocks[1]['text'], 'blocks': blocks[2:]}
output = Path('src/networking-report.ts')
generated = ('// Extracted from the owner-supplied networking PDF; no prose or research is rewritten.\n'
             f'// Source SHA-256: {hashlib.sha256(source.read_bytes()).hexdigest()}\n'
             'import type { ReportContent } from "./types";\n'
             'export const networkingReport: ReportContent = ' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n')
if check:
    assert output.read_text() == generated, 'HTML article differs from source extraction.'
else:
    output.write_text(generated)
print(f'Verified original report: {len(document)} pages, {image_count} original images, {len(blocks)-2-image_count} text blocks; only repeated template headers/footers excluded.')
