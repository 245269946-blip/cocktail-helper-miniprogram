#!/usr/bin/env python3
import base64
import hashlib
import json
import math
import os
import random
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, os.path.join(ROOT, 'prototype', '.deps'))

from PIL import Image, ImageDraw

OUT_ROOT = os.path.join(ROOT, 'assets', 'illustrations')
SIZE = (360, 280)

SLUGS = {
    '可乐': 'cola',
    '雪碧': 'sprite',
    '气泡水': 'soda-water',
    '汤力水': 'tonic-water',
    '果汁': 'juice',
    '橙汁': 'orange-juice',
    '葡萄柚汁': 'grapefruit-juice',
    '苹果汁': 'apple-juice',
    '乌龙茶': 'oolong',
    '柠檬茶': 'lemon-tea',
    '绿茶': 'green-tea',
    '冷萃咖啡': 'cold-brew',
    '浓缩咖啡': 'espresso',
    '牛奶': 'milk',
    '椰奶': 'coconut-milk',
    '柠檬': 'lemon',
    '青柠': 'lime',
    '橙子': 'orange',
    '薄荷': 'mint',
    '冰块': 'ice',
    '糖': 'sugar',
    '盐': 'salt',
    '蜂蜜': 'honey',
}

PALETTES = [
    ('#fffaf0', '#bfe9ec', '#8fd6d0', '#2f4f4a'),
    ('#fff8ed', '#ffd9b8', '#ff9f9a', '#6d5145'),
    ('#fff7f8', '#f2c7e8', '#b7aadf', '#584a6f'),
    ('#f8fff7', '#d7f0c0', '#8ac9a5', '#315d54'),
    ('#fffaf0', '#fff2d8', '#dfc29c', '#644a35'),
    ('#f5fbff', '#cbe9ff', '#95bfe8', '#304d6b'),
]


def run_node_manifest():
    script = r"""
const data = require('./utils/data')
const names = Array.from(new Set(data.ingredientCategories.flatMap((group) => group.items)))
console.log(JSON.stringify({
  bases: data.bases.map(({id, name, tags}) => ({id, name, tags})),
  ingredients: data.ingredients.map(({id, name, category, tags}) => ({id, name, category, tags})),
  ingredientNames: names,
  recipes: data.recipes.map(({id, name, tags, base, flavor}) => ({id, name, tags, base, flavor})),
  schemes: data.schemes.map(({id, name, tags, flavor}) => ({id, name, tags, flavor}))
}))
"""
    return json.loads(subprocess.check_output(['node', '-e', script], cwd=ROOT, text=True))


def hex_to_rgb(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def color(value, alpha=255):
    return hex_to_rgb(value) + (alpha,)


def seed_for(value):
    return int(hashlib.sha1(value.encode('utf-8')).hexdigest()[:12], 16)


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def save(img, category, item_id):
    ensure_dir(os.path.join(OUT_ROOT, category))
    path = os.path.join(OUT_ROOT, category, f'{item_id}.png')
    img.save(path, 'PNG', optimize=True)
    return path


def jittered_line(draw, points, fill, width, rng, repeats=2):
    for _ in range(repeats):
        offset = rng.randint(-2, 2)
        moved = [(x + rng.randint(-2, 2), y + offset + rng.randint(-2, 2)) for x, y in points]
        draw.line(moved, fill=fill, width=width, joint='curve')


def rounded_bg(draw, rng, bg, accent):
    draw.rounded_rectangle([18, 18, 342, 262], radius=34, fill=color(bg), outline=color('#5f5148', 38), width=3)
    for _ in range(10):
        x = rng.randint(34, 320)
        y = rng.randint(34, 238)
        r = rng.choice([4, 5, 7, 9])
        draw.ellipse([x - r, y - r, x + r, y + r], outline=color(accent, 70), width=2)
    draw.arc([250, 30, 324, 104], 80, 320, fill=color('#ffe8a8', 150), width=10)
    draw.arc([258, 28, 330, 102], 90, 320, fill=color(bg), width=14)


def draw_ice(draw, x, y, rng):
    points = [(x, y + 8), (x + 13, y), (x + 28, y + 8), (x + 20, y + 25), (x + 4, y + 25), (x, y + 8)]
    jittered_line(draw, points, color('#ffffff', 210), 3, rng, 2)


def draw_garnish(draw, name, rng, x=126, y=86):
    if any(key in name for key in ['柠檬', '青柠', '金汤力', '莫吉托', '苏打', '雪碧', '汤力']):
        fill = '#f8f6a8' if '柠檬' in name or '汤力' in name else '#cbe77c'
        edge = '#a8d86f'
        draw.ellipse([x, y, x + 42, y + 42], fill=color(fill), outline=color(edge), width=5)
        draw.arc([x + 8, y + 8, x + 34, y + 34], 30, 300, fill=color('#ffffff', 130), width=3)
    elif any(key in name for key in ['可乐', '野格', '桑格利亚', '果酒']):
        draw.ellipse([x + 4, y + 4, x + 36, y + 36], fill=color('#e46f7d'), outline=color('#7c4c45'), width=4)
        jittered_line(draw, [(x + 20, y + 6), (x + 30, y - 8)], color('#6f8b57'), 3, rng)
    elif any(key in name for key in ['咖啡', '百利甜', '牛奶']):
        draw.rounded_rectangle([x, y + 12, x + 48, y + 30], radius=10, fill=color('#fff1dc'), outline=color('#b68a68'), width=3)
    else:
        draw.ellipse([x + 7, y, x + 28, y + 38], fill=color('#8ac9a5'), outline=color('#4f806a'), width=3)
        draw.ellipse([x + 28, y + 8, x + 48, y + 38], fill=color('#a9d8b2'), outline=color('#4f806a'), width=3)


def palette_for(item_id):
    return PALETTES[seed_for(item_id) % len(PALETTES)]


def draw_drink(item):
    rng = random.Random(seed_for('drink:' + item['id']))
    bg, top, bottom, ink = palette_for(item['id'])
    name = item['name']
    tags = item.get('tags') or []
    if '奶香' in tags or '百利甜' in name or '牛奶' in name:
        top, bottom = '#fff2d8', '#dfc29c'
    elif '果味' in tags or '酸甜' in tags or any(k in name for k in ['橙', '梅', '葡萄柚', '苹果', '果酒']):
        top, bottom = '#ffd9b8', '#ff9f9a'
    elif '微醺' in tags or '酒感' in tags:
        top, bottom = '#f2c7e8', '#b7aadf'
    elif '便利店' in tags:
        top, bottom = '#cbe9ff', '#95d6bd'

    img = Image.new('RGBA', SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    rounded_bg(draw, rng, bg, top)
    cup = [132 + rng.randint(-4, 4), 76, 228 + rng.randint(-4, 4), 222]
    draw.rounded_rectangle(cup, radius=18, fill=(255, 255, 255, 75), outline=color(ink, 170), width=5)
    liquid_y = 128 + rng.randint(-10, 12)
    draw.rounded_rectangle([cup[0] + 10, liquid_y, cup[2] - 10, cup[3] - 12], radius=13, fill=color(bottom, 230))
    draw.rounded_rectangle([cup[0] + 10, liquid_y, cup[2] - 10, liquid_y + 28], radius=12, fill=color(top, 220))
    draw_ice(draw, cup[0] + 22, liquid_y + 16, rng)
    draw_ice(draw, cup[0] + 52, liquid_y + 42, rng)
    draw_garnish(draw, name, rng, cup[0] - 18, cup[1] + 22)
    jittered_line(draw, [(cup[0] + 22, cup[1] - 26), (cup[0] + 38, cup[1] + 18)], color('#7a6254', 160), 4, rng)
    draw.rounded_rectangle([86, 224, 274, 232], radius=8, fill=color('#6d5a4a', 42))
    return img


def draw_base(item):
    rng = random.Random(seed_for('base:' + item['id']))
    bg, top, bottom, ink = palette_for(item['id'])
    name = item['name']
    if item['id'] in ['whisky', 'rum', 'jager']:
        top, bottom = '#e7bd72', '#8c5837'
    elif item['id'] in ['gin', 'vodka']:
        top, bottom = '#d8f5ef', '#89c9d4'
    elif item['id'] in ['baileys', 'liqueur']:
        top, bottom = '#f4d0b2', '#9b6a48'
    elif item['id'] in ['plum-wine', 'fruit-wine', 'sparkling-wine']:
        top, bottom = '#f6bad0', '#c7a8e8'

    img = Image.new('RGBA', SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    rounded_bg(draw, rng, bg, top)
    x = 144 + rng.randint(-8, 8)
    shoulder = 108 if item['id'] not in ['whisky', 'jager'] else 132
    bottle = [(x + 28, 56), (x + 56, 56), (x + 60, shoulder), (x + 88, shoulder + 30), (x + 80, 226), (x + 6, 226), (x, shoulder + 30), (x + 24, shoulder), (x + 28, 56)]
    draw.polygon(bottle, fill=color(top, 90))
    jittered_line(draw, bottle, color(ink, 190), 5, rng, 3)
    draw.rounded_rectangle([x + 16, 144, x + 70, 184], radius=10, fill=color('#fffaf0', 210), outline=color(ink, 140), width=3)
    draw.rounded_rectangle([x + 30, 40, x + 56, 62], radius=8, fill=color(bottom, 210), outline=color(ink, 150), width=3)
    draw.rounded_rectangle([x + 12, 186, x + 76, 218], radius=14, fill=color(bottom, 210))
    draw_garnish(draw, name, rng, 80, 104)
    draw.rounded_rectangle([90, 230, 280, 238], radius=8, fill=color('#6d5a4a', 42))
    return img


def draw_ingredient(name, item_id):
    rng = random.Random(seed_for('ingredient:' + item_id))
    bg, top, bottom, ink = palette_for(item_id)
    img = Image.new('RGBA', SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    rounded_bg(draw, rng, bg, top)

    if any(k in name for k in ['可乐', '雪碧', '气泡水', '汤力水']):
        x = 136
        draw.rounded_rectangle([x, 70, x + 88, 220], radius=24, fill=color(top, 170), outline=color(ink, 175), width=5)
        draw.rounded_rectangle([x + 12, 112, x + 76, 154], radius=14, fill=color('#fffaf0', 210), outline=color(ink, 100), width=3)
        for by in [82, 96, 180]:
            bx = x + rng.randint(8, 70)
            draw.ellipse([bx, by, bx + rng.randint(7, 12), by + 8], outline=color('#ffffff', 160), width=2)
    elif any(k in name for k in ['橙', '柠檬', '青柠', '葡萄柚', '苹果']):
        fill = '#ffb45d'
        if '柠檬' in name:
            fill = '#f8e978'
        if '青柠' in name:
            fill = '#bde46a'
        if '葡萄柚' in name:
            fill = '#ff9f9a'
        if '苹果' in name:
            fill = '#f08a7e'
        draw.ellipse([120, 78, 230, 188], fill=color(fill), outline=color(ink, 170), width=5)
        draw.arc([140, 98, 210, 168], 20, 300, fill=color('#fffdf8', 160), width=4)
        draw.ellipse([206, 64, 236, 102], fill=color('#8ac9a5'), outline=color('#4f806a'), width=3)
    elif any(k in name for k in ['咖啡', '茶', '乌龙', '绿茶']):
        draw.rounded_rectangle([118, 102, 232, 204], radius=22, fill=color(top, 185), outline=color(ink, 175), width=5)
        draw.arc([220, 126, 272, 176], -70, 80, fill=color(ink, 145), width=5)
        draw.rounded_rectangle([96, 206, 254, 216], radius=8, fill=color('#6d5a4a', 44))
        for sx in [150, 176, 202]:
            jittered_line(draw, [(sx, 90), (sx + rng.randint(-8, 8), 66)], color('#8bbdb4', 130), 3, rng)
    elif any(k in name for k in ['牛奶', '椰奶']):
        draw.rounded_rectangle([124, 76, 226, 220], radius=18, fill=color('#fffaf0', 230), outline=color(ink, 170), width=5)
        draw.polygon([(124, 88), (174, 56), (226, 88), (226, 104), (124, 104)], fill=color('#fff2d8'), outline=color(ink, 130))
        draw.rounded_rectangle([140, 132, 210, 174], radius=12, fill=color(top, 150))
    elif '薄荷' in name:
        for i in range(5):
            x = 120 + i * 24
            draw.ellipse([x, 98 - i * 4, x + 54, 158 - i * 4], fill=color('#8ac9a5'), outline=color('#4f806a'), width=3)
        jittered_line(draw, [(128, 210), (196, 116)], color('#4f806a', 170), 5, rng)
    elif '冰' in name:
        for x, y in [(112, 94), (166, 78), (148, 146), (214, 130)]:
            draw_ice(draw, x, y, rng)
    elif any(k in name for k in ['糖', '盐']):
        draw.rounded_rectangle([118, 108, 232, 204], radius=18, fill=color('#fffdf8', 210), outline=color(ink, 165), width=5)
        for _ in range(18):
            x = rng.randint(134, 216)
            y = rng.randint(126, 188)
            draw.ellipse([x, y, x + 4, y + 4], fill=color(top, 170))
    elif '蜂蜜' in name:
        draw.rounded_rectangle([130, 78, 224, 218], radius=24, fill=color('#ffd66e', 190), outline=color(ink, 175), width=5)
        draw.rounded_rectangle([146, 58, 208, 84], radius=12, fill=color('#fff2a9'), outline=color(ink, 130), width=3)
        draw.arc([126, 132, 226, 176], 0, 180, fill=color('#fff2a9', 170), width=5)
    else:
        draw_garnish(draw, name, rng, 136, 100)

    draw.rounded_rectangle([90, 230, 280, 238], radius=8, fill=color('#6d5a4a', 42))
    return img


def main():
    manifest = run_node_manifest()
    counts = {'drinks': 0, 'bases': 0, 'ingredients': 0}

    for item in manifest['recipes'] + manifest['schemes']:
        save(draw_drink(item), 'drinks', item['id'])
        counts['drinks'] += 1

    for item in manifest['bases']:
        save(draw_base(item), 'bases', item['id'])
        counts['bases'] += 1

    seen = {}
    for item in manifest['ingredients']:
        seen[item['name']] = item['id']
    for name in manifest['ingredientNames']:
        seen.setdefault(name, SLUGS.get(name, hashlib.sha1(name.encode('utf-8')).hexdigest()[:10]))

    for name, item_id in sorted(seen.items(), key=lambda pair: pair[1]):
        save(draw_ingredient(name, item_id), 'ingredients', item_id)
        counts['ingredients'] += 1

    print(json.dumps(counts, ensure_ascii=False))


if __name__ == '__main__':
    main()
