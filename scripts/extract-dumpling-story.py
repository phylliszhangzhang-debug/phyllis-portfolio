"""Preserve the owner's Word text and inline images in document order.
Run from the repository root: python3 scripts/extract-dumpling-story.py [--check]
"""
import hashlib
import json
import sys
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
from PIL import Image
from io import BytesIO

source = Path('anthro-dumpling night .docx')
check = '--check' in sys.argv
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
alts = [
    'Participants making dumplings together at a table.',
    'A large group photograph of participants at the dumpling event.',
    'A small cooking pot beside trays of prepared dumplings.',
    'Hands filling dumpling wrappers at a shared table.',
    'Participants sitting together around a table to make dumplings.',
    'Participants preparing dumplings and sharing bowls of fillings.',
]
blocks = []
texts = []
image_count = 0
with ZipFile(source) as document:
    root = ET.fromstring(document.read('word/document.xml'))
    relationships = {r.get('Id'): r.get('Target') for r in ET.fromstring(document.read('word/_rels/document.xml.rels'))}
    body = root.find('w:body', ns)
    assert not body.findall('w:tbl', ns), 'Review any new tables before extracting.'
    for node in body:
        if node.tag.endswith('}sectPr'):
            continue
        assert node.tag == '{'+ns['w']+'}p'
        # Walk text and drawing nodes in sequence, including adjacent inline images.
        paragraph = ''
        for element in node.iter():
            if element.tag == '{'+ns['w']+'}t':
                paragraph += element.text or ''
            elif element.tag == '{'+ns['a']+'}blip':
                if paragraph:
                    blocks.append({'kind': 'paragraph', 'text': paragraph})
                    texts.append(paragraph)
                    paragraph = ''
                image_count += 1
                target = relationships[element.get('{'+ns['r']+'}embed')]
                image = document.read('word/'+target)
                width, height = Image.open(BytesIO(image)).size
                path = Path(f'public/images/dumpling-night/story/image-{image_count:02}.jpeg')
                if check:
                    assert path.read_bytes() == image, 'Image differs from original Word file.'
                else:
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_bytes(image)
                blocks.append({'kind': 'image', 'src': '/'+str(path.relative_to('public')),
                               'alt': alts[image_count-1], 'width': width, 'height': height})
        if paragraph:
            blocks.append({'kind': 'paragraph', 'text': paragraph})
            texts.append(paragraph)
assert len(texts) == 6 and image_count == 6
assert texts[0] == '饺子里的春节'
assert texts[1] == '地点：伦敦·伦敦大学亚非学院'
assert [b['kind'] for b in blocks[2:]] == ['paragraph', 'image', 'paragraph', 'image', 'paragraph', 'image', 'image', 'paragraph', 'image', 'image']
result = {'title': texts[0], 'subtitle': texts[1], 'lang': 'zh-Hans', 'blocks': blocks[2:]}
generated = ('// Extracted from the owner-supplied Word document in source order; no translation or rewriting.\n'
             f'// Source SHA-256: {hashlib.sha256(source.read_bytes()).hexdigest()}\n'
             'import type { ReportContent } from "./types";\n'
             'export const dumplingStory: ReportContent = ' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n')
output = Path('src/dumpling-story.ts')
if check:
    assert output.read_text() == generated, 'Story differs from Word extraction.'
else:
    output.write_text(generated)
print('Verified original Word story: title, location, 4 prose paragraphs and 6 original images in source order.')
