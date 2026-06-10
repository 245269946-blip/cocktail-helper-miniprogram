from PIL import Image
import base64

files = ['layer1-ref', 'layer2-ref', 'layer3-1-ref', 'layer3-2-ref', 'layer3-3-ref']
for f in files:
    name = f.replace('-ref', '')
    img = Image.open(f'prototype/screenshots/{f}.png')
    img = img.resize((480, int(480 * img.height / img.width)))
    jpg_path = f'prototype/screenshots/{name}-sm.jpg'
    img.save(jpg_path, 'JPEG', quality=40)
    b = base64.b64encode(open(jpg_path, 'rb').read()).decode()
    b64_path = f'prototype/screenshots/{f}-b64.txt'
    open(b64_path, 'w').write(b)
    print(f'{f}: {len(b)} bytes')
