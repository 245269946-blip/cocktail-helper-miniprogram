param(
  [string]$Version = "v1.0.5",
  [int]$CardMaxPx = 960,
  [int]$FeatureSize = 640,
  [int]$Quality = 90
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$env:CLOUD_IMAGE_VERSION = $Version
$env:CLOUD_CARD_MAX_PX = [string]$CardMaxPx
$env:CLOUD_FEATURE_SIZE = [string]$FeatureSize
$env:CLOUD_IMAGE_QUALITY = [string]$Quality

@'
import hashlib
import json
import os
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageOps

root = Path.cwd()
version = os.environ["CLOUD_IMAGE_VERSION"]
card_max_px = int(os.environ["CLOUD_CARD_MAX_PX"])
feature_size = int(os.environ["CLOUD_FEATURE_SIZE"])
quality = int(os.environ["CLOUD_IMAGE_QUALITY"])
src_dir = root / "assets" / "p2"
out_dir = root / "_cloud_upload" / "cocktail-images" / version / "p2"
out_dir.mkdir(parents=True, exist_ok=True)
warm_bg = (255, 251, 242)

def flatten(path):
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        bg = Image.new("RGBA", rgba.size, warm_bg + (255,))
        bg.alpha_composite(rgba)
        return bg.convert("RGB")
    return im.convert("RGB")

def enhance(im):
    im = ImageEnhance.Color(im).enhance(1.06)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Sharpness(im).enhance(1.08)
    return im

def save_jpg(im, out, max_px=None):
    im = enhance(im)
    if max_px:
        im.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True, progressive=False)

def smart_square_crop(im):
    bg = Image.new("RGB", im.size, warm_bg)
    diff = ImageChops.difference(im, bg).convert("L")
    mask = diff.point(lambda p: 255 if p > 18 else 0)
    bbox = mask.getbbox()
    if not bbox:
        side = min(im.size)
        left = (im.width - side) // 2
        top = (im.height - side) // 2
        return im.crop((left, top, left + side, top + side))
    left, top, right, bottom = bbox
    width = right - left
    height = bottom - top
    pad = int(max(width, height) * 0.20)
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(im.width, right + pad)
    bottom = min(im.height, bottom + pad)
    cx = (left + right) / 2
    cy = (top + bottom) / 2
    side = min(max(right - left, bottom - top), max(im.size))
    left = int(round(cx - side / 2))
    top = int(round(cy - side / 2))
    right = left + side
    bottom = top + side
    if left < 0:
        right -= left
        left = 0
    if top < 0:
        bottom -= top
        top = 0
    if right > im.width:
        left -= right - im.width
        right = im.width
    if bottom > im.height:
        top -= bottom - im.height
        bottom = im.height
    return im.crop((max(0, left), max(0, top), right, bottom))

def sha1(path):
    h = hashlib.sha1()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

manifest = []

for card_src in sorted(src_dir.glob("recipe-*-card.png")):
    slug = card_src.name[len("recipe-"):-len("-card.png")]
    card_out = out_dir / f"recipe-{slug}-card.jpg"
    card_im = flatten(card_src)
    save_jpg(card_im.copy(), card_out, card_max_px)

    feature_src = src_dir / f"recipe-{slug}-feature.jpg"
    feature_out = out_dir / f"recipe-{slug}-feature.jpg"
    if feature_src.exists():
        feature_im = Image.open(feature_src).convert("RGB")
        feature_im = ImageOps.fit(feature_im, (feature_size, feature_size), method=Image.Resampling.LANCZOS)
    else:
        feature_im = ImageOps.fit(
            smart_square_crop(card_im),
            (feature_size, feature_size),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.48)
        )
    save_jpg(feature_im, feature_out, None)

    for variant, out in (("card", card_out), ("feature", feature_out)):
        im = Image.open(out)
        manifest.append({
            "slug": slug,
            "variant": variant,
            "localSource": str(card_src.relative_to(root)).replace("\\", "/"),
            "uploadPath": f"cocktail-images/{version}/p2/{out.name}",
            "dimensions": list(im.size),
            "bytes": out.stat().st_size,
            "sha1": sha1(out)
        })

manifest_path = root / "_cloud_upload" / f"cocktail-images-{version}-manifest.json"
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

readme = root / "_cloud_upload" / f"README_cloud_images_{version}.txt"
readme.write_text(
    f"Cloud image package: {version}\n\n"
    f"Upload this folder to cloud storage root:\n"
    f"{(root / '_cloud_upload' / 'cocktail-images' / version).resolve()}\n\n"
    f"Expected remote base example:\n"
    f"https://your-cdn-domain.example.com\n"
    f"or cloud://your-env-id.your-env-id\n\n"
    f"Remote path format:\n"
    f"cocktail-images/{version}/p2/recipe-gin-tonic-card.jpg\n"
    f"cocktail-images/{version}/p2/recipe-gin-tonic-feature.jpg\n\n"
    f"Generated files: {len(manifest)}\n"
    f"Manifest:\n{manifest_path.resolve()}\n",
    encoding="utf-8"
)

total = sum(p.stat().st_size for p in out_dir.rglob("*") if p.is_file())
print(f"CloudFolder={out_dir.resolve()}")
print(f"Manifest={manifest_path.resolve()}")
print(f"Files={len(manifest)}")
print(f"Bytes={total}")
'@ | python -
