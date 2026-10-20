"""Extract the checked owner-supplied essay without rewriting its wording.
Run from the checkout root: python3 scripts/extract-south-asia.py
"""
import hashlib
import json
import sys
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET

source = Path('South Asia-AS2.docx')
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(source) as document:
    root = ET.fromstring(document.read('word/document.xml'))
    body = root.find('w:body', ns)
    paragraphs = [''.join(t.text or '' for t in p.findall('.//w:t', ns)) for p in body.findall('w:p', ns)]
    assert len(body.findall('w:tbl', ns)) == 0, 'Review any newly introduced tables before extraction.'
    assert not root.findall('.//w:del', ns), 'Review tracked deletions before extraction.'
    assert len(paragraphs) == 56, 'Source layout changed; recheck paragraph mapping.'
    assert paragraphs[0].lstrip().startswith('What are the multiple lives of religion in South Asia?')
    assert paragraphs[3] == 'A note for the image:'
    assert paragraphs[12] == 'Intimate religion is not private: body, gender, marriage and time'
    assert paragraphs[22] == 'Materializing public religion: temples, media and urban space'
    assert paragraphs[31] == 'Conclusion：'
    assert paragraphs[37] == 'Reference:'
    section_map = [(3, [4]), (None, [6, 8, 10]), (12, [14, 16, 18, 20]), (22, [24, 26, 28, 29]), (31, [32])]
    sections = []
    used = {0, 37}  # Paragraph zero is the assignment question, not essay prose.
    for heading, indices in section_map:
        item = {'paragraphs': [paragraphs[i] for i in indices]}
        used.update(indices)
        if heading is not None:
            item = {'heading': paragraphs[heading], **item}
            used.add(heading)
        sections.append(item)
    reference_indices = list(range(38, 55, 2))
    used.update(reference_indices)
    assert not [(i, text) for i, text in enumerate(paragraphs) if text.strip() and i not in used], 'Unmapped original text.'
    result = {'sections': sections, 'referencesHeading': paragraphs[37], 'references': [paragraphs[i] for i in reference_indices]}
    image = document.read('word/media/image1.png')
    image_path = Path('public/images/writing/south-asia/plant-between-bricks.png')
    image_path.parent.mkdir(parents=True, exist_ok=True)
    if '--check' in sys.argv:
        assert image_path.read_bytes() == image, 'Opening image differs from the source.'
    else:
        image_path.write_bytes(image)

output = Path('src/south-asia-essay.ts')
generated = ('// Extracted from South Asia-AS2.docx; wording, citations and references are unchanged.\n'
                  f'// Source SHA-256: {hashlib.sha256(source.read_bytes()).hexdigest()}\n'
                  'export const southAsiaEssay = ' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n')
if '--check' in sys.argv:
    assert output.read_text() == generated, 'Essay content differs from the source extraction.'
else:
    output.write_text(generated)
print('Verified extraction: 13 body paragraphs, 4 original headings, 9 references, 1 original image.')
