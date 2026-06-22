param(
  [string]$Version,
  [string]$Name = "cocktail-helper-miniprogram",
  [switch]$LightUpload,
  [switch]$HighQualityRepair,
  [int]$MaxBytes = 1500000
)

$ErrorActionPreference = "Stop"

function New-UString([int[]]$CodePoints) {
  return -join ($CodePoints | ForEach-Object { [char]$_ })
}

$OfficialDirName = New-UString @(0x6B63,0x5F0F,0x7248,0x5F,0x5C0F,0x7A0B,0x5E8F,0x4E0A,0x4F20)
$PreviewDirName = New-UString @(0x9884,0x89C8,0x7248,0x5F,0x4EC5,0x67E5,0x770B)
$LightDirSuffix = New-UString @(0x5FAE,0x4FE1,0x4E0A,0x4F20,0x5F,0x8F7B,0x91CF,0x7248)
$HighRepairSuffix = New-UString @(0x9AD8,0x6E05,0x4FEE,0x590D,0x7248)
$ReadmeName = "README_" + (New-UString @(0x4E0A,0x4F20,0x8BF4,0x660E)) + ".txt"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not $Version) {
  $package = Get-Content -LiteralPath (Join-Path $Root "package.json") -Raw | ConvertFrom-Json
  $Version = $package.version
}

if ($Version -notmatch "^v") {
  $VersionLabel = "v$Version"
} else {
  $VersionLabel = $Version
}

$UploadRoot = Join-Path $Root "_github_upload"
$OfficialRoot = Join-Path $UploadRoot $OfficialDirName
$PreviewRoot = Join-Path $UploadRoot $PreviewDirName
$BuildTag = if ($HighQualityRepair) { "high-quality-repair" } else { "wechat-upload" }
$BuildRoot = Join-Path $UploadRoot "build-$VersionLabel-$BuildTag"

if ($HighQualityRepair) {
  $FolderName = "$Name-$VersionLabel-high-quality-upload-folder"
  $ZipName = "$Name-$VersionLabel-high-quality-upload.zip"
  $PreviewFolderName = "$Name-$VersionLabel-high-quality-preview-folder"
  $VersionDirName = "$VersionLabel`_$HighRepairSuffix"
} elseif ($LightUpload) {
  $FolderName = "$Name-$VersionLabel-light-upload-folder"
  $ZipName = "$Name-$VersionLabel-light-upload.zip"
  $PreviewFolderName = "$Name-$VersionLabel-light-preview-folder"
  $VersionDirName = "$VersionLabel`_$LightDirSuffix"
} else {
  $FolderName = "$Name-$VersionLabel-official-folder"
  $ZipName = "$Name-$VersionLabel-official.zip"
  $PreviewFolderName = "$Name-$VersionLabel-preview-folder"
  $VersionDirName = $VersionLabel
}

$OfficialVersionRoot = Join-Path $OfficialRoot $VersionDirName
$PreviewVersionRoot = Join-Path $PreviewRoot $VersionDirName
$BuildFolder = Join-Path $BuildRoot $FolderName
$OfficialFolder = Join-Path $OfficialVersionRoot $FolderName
$OfficialZip = Join-Path $OfficialVersionRoot $ZipName
$PreviewFolder = Join-Path $PreviewVersionRoot $PreviewFolderName

$Include = @(
  "app.js",
  "app.json",
  "app.wxss",
  "assets",
  "cloud-data",
  "pages",
  "utils",
  "project.config.json",
  "project.private.config.json",
  "sitemap.json"
)

function Remove-IfExists($Path) {
  if (Test-Path -LiteralPath $Path) {
    try {
      Remove-Item -LiteralPath $Path -Recurse -Force
      return $true
    } catch {
      return $false
    }
  }
  return $true
}

function Get-FolderBytes($Path) {
  return (Get-ChildItem -LiteralPath $Path -Recurse -File | Measure-Object Length -Sum).Sum
}

function Add-TimeStampToOutputNames() {
  $Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  if ($HighQualityRepair) {
    $script:FolderName = "$Name-$VersionLabel-high-quality-upload-$Stamp-folder"
    $script:ZipName = "$Name-$VersionLabel-high-quality-upload-$Stamp.zip"
    $script:PreviewFolderName = "$Name-$VersionLabel-high-quality-preview-$Stamp-folder"
  } elseif ($LightUpload) {
    $script:FolderName = "$Name-$VersionLabel-light-upload-$Stamp-folder"
    $script:ZipName = "$Name-$VersionLabel-light-upload-$Stamp.zip"
    $script:PreviewFolderName = "$Name-$VersionLabel-light-preview-$Stamp-folder"
  } else {
    $script:FolderName = "$Name-$VersionLabel-official-$Stamp-folder"
    $script:ZipName = "$Name-$VersionLabel-official-$Stamp.zip"
    $script:PreviewFolderName = "$Name-$VersionLabel-preview-$Stamp-folder"
  }
  $script:OfficialFolder = Join-Path $OfficialVersionRoot $script:FolderName
  $script:OfficialZip = Join-Path $OfficialVersionRoot $script:ZipName
  $script:PreviewFolder = Join-Path $PreviewVersionRoot $script:PreviewFolderName
}

[void](Remove-IfExists $BuildRoot)
New-Item -ItemType Directory -Path $BuildFolder | Out-Null

foreach ($Item in $Include) {
  $Source = Join-Path $Root $Item
  if (Test-Path -LiteralPath $Source) {
    Copy-Item -LiteralPath $Source -Destination $BuildFolder -Recurse -Force
  }
}

if ($LightUpload -or $HighQualityRepair) {
  $env:LIGHT_ROOT = $BuildFolder
  $env:HIGH_QUALITY_REPAIR = if ($HighQualityRepair) { "1" } else { "0" }
  @'
import os
import re
from pathlib import Path
from PIL import Image, ImageEnhance, ImageStat

root = Path(os.environ["LIGHT_ROOT"])
assets = root / "assets"
high_quality_repair = os.environ.get("HIGH_QUALITY_REPAIR") == "1"
warm_bg = (255, 251, 242)

KEEP_STATIC = {
    "assets/tabbar/home-normal.png",
    "assets/tabbar/home-active.png",
    "assets/tabbar/search-normal.png",
    "assets/tabbar/search-active.png",
    "assets/tabbar/collections-normal.png",
    "assets/tabbar/collections-active.png",
    "assets/layer1/splash-hero.png",
    "assets/layer1/furin-deco.png",
    "assets/layer1/receipt-deco.png",
    "assets/layer2/header-cocktail.png",
    "assets/layer2/card-pantry.png",
    "assets/layer2/card-base.png",
    "assets/layer2/card-store.png",
    "assets/layer3/conv-fridge-bg.png",
    "assets/scenes/scene-header.png",
}

PRIORITY_P2 = {
    "recipe-gin-tonic-card.png",
    "recipe-gin-tonic-hero.png",
    "recipe-whiskey-sour-card.png",
    "recipe-whiskey-sour-hero.png",
    "recipe-mojito-card.png",
    "recipe-mojito-hero.png",
    "recipe-cuba-libre-card.png",
    "recipe-cuba-libre-hero.png",
    "recipe-white-russian-card.png",
    "recipe-white-russian-hero.png",
}

REPORT_NAMES = {
    "assets/p2/recipe-gin-tonic-card.jpg",
    "assets/p2/recipe-gin-tonic-hero.jpg",
    "assets/p2/recipe-whiskey-sour-card.jpg",
    "assets/p2/recipe-mojito-card.jpg",
    "assets/p2/recipe-cuba-libre-card.jpg",
    "assets/p2/recipe-white-russian-card.jpg",
    "assets/layer3/conv-fridge-bg.jpg",
}

def should_keep_asset(path):
    rel = path.relative_to(root).as_posix()
    name = path.name
    if rel.startswith("assets/p2/"):
        return name.startswith("recipe-") and (name.endswith("-card.png") or name.endswith("-hero.png"))
    if rel.startswith("assets/illustrations/ingredients/"):
        return True
    return rel in KEEP_STATIC

for path in list(assets.rglob("*")):
    if path.is_file() and not should_keep_asset(path):
        path.unlink()

for path in sorted(assets.rglob("*"), key=lambda item: len(item.parts), reverse=True):
    if path.is_dir():
        try:
            path.rmdir()
        except OSError:
            pass

def flatten_image(path):
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        bg = Image.new("RGBA", rgba.size, warm_bg + (255,))
        bg.alpha_composite(rgba)
        return bg.convert("RGB")
    return im.convert("RGB")

def image_policy(rel, name):
    if rel.startswith("assets/p2/"):
        if name.endswith("-card.png"):
            return (380, 56) if (high_quality_repair and name in PRIORITY_P2) else (340, 48)
        if name.endswith("-hero.png"):
            return (520, 60) if (high_quality_repair and name in PRIORITY_P2) else (460, 52)
        if high_quality_repair:
            return 470, 50
        return 520, 56
    if high_quality_repair and rel in (
        "assets/layer1/splash-hero.png",
        "assets/layer2/header-cocktail.png",
        "assets/layer2/card-pantry.png",
        "assets/layer2/card-base.png",
        "assets/layer2/card-store.png",
        "assets/layer3/conv-fridge-bg.png",
        "assets/scenes/scene-header.png",
    ):
        return 340, 55
    if high_quality_repair:
        return 300, 42
    return 280, 38

def enhance_image(im, rel, name):
    if not high_quality_repair:
        return im
    if rel.startswith("assets/p2/"):
        stat = ImageStat.Stat(im)
        light = sum(stat.mean) / 3
        contrast = sum(stat.stddev) / 3
        if name in PRIORITY_P2 or (light > 232 and contrast < 24):
            im = ImageEnhance.Color(im).enhance(1.12)
            im = ImageEnhance.Contrast(im).enhance(1.18)
            im = ImageEnhance.Sharpness(im).enhance(1.16)
    elif rel in (
        "assets/layer2/header-cocktail.png",
        "assets/layer2/card-pantry.png",
        "assets/layer2/card-base.png",
        "assets/layer2/card-store.png",
        "assets/layer3/conv-fridge-bg.png",
        "assets/scenes/scene-header.png",
    ):
        im = ImageEnhance.Contrast(im).enhance(1.08)
        im = ImageEnhance.Sharpness(im).enhance(1.08)
    return im

for path in list(assets.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        continue
    rel = path.relative_to(root).as_posix()
    if rel.startswith("assets/tabbar/"):
        continue
    max_px, quality = image_policy(rel, path.name)
    out = path.with_suffix(".jpg")
    im = flatten_image(path)
    im = enhance_image(im, rel, path.name)
    im.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True, progressive=False)
    if path != out:
        path.unlink()

for path in root.rglob("*"):
    if path.is_file() and path.suffix.lower() in (".js", ".json", ".wxml", ".wxss"):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        next_text = text.replace(".png", ".jpg")
        for name in (
            "home-normal",
            "home-active",
            "search-normal",
            "search-active",
            "collections-normal",
            "collections-active",
        ):
            next_text = next_text.replace(
                f"assets/tabbar/{name}.jpg",
                f"assets/tabbar/{name}.png",
            )
        if next_text != text:
            path.write_text(next_text, encoding="utf-8")

if high_quality_repair:
    quality_rows = []
    for rel in sorted(REPORT_NAMES):
        path = root / rel
        if not path.exists():
            quality_rows.append(f"{rel}\tMISSING")
            continue
        im = Image.open(path).convert("RGB")
        stat = ImageStat.Stat(im)
        quality_rows.append(
            f"{rel}\t{im.size[0]}x{im.size[1]}\t{path.stat().st_size}\t"
            f"mean={','.join(str(round(v, 1)) for v in stat.mean)}\t"
            f"std={','.join(str(round(v, 1)) for v in stat.stddev)}"
        )
    report = root / "QUALITY_REPORT_v1.0.4.txt"
    report.write_text(
        "v1.0.4 high quality repair image report\n"
        "format: path, dimensions, bytes, rgb mean, rgb stddev\n\n"
        + "\n".join(sorted(quality_rows))
        + "\n",
        encoding="utf-8",
    )
'@ | python -
}

New-Item -ItemType Directory -Path $OfficialRoot -Force | Out-Null
New-Item -ItemType Directory -Path $PreviewVersionRoot -Force | Out-Null
New-Item -ItemType Directory -Path $OfficialVersionRoot -Force | Out-Null

if ($HighQualityRepair -and ((Test-Path -LiteralPath $OfficialFolder) -or (Test-Path -LiteralPath $OfficialZip) -or (Test-Path -LiteralPath $PreviewFolder))) {
  Add-TimeStampToOutputNames
} elseif (-not $HighQualityRepair) {
  if (-not (Remove-IfExists $OfficialFolder)) {
    Add-TimeStampToOutputNames
  }
}

if (Test-Path -LiteralPath $OfficialZip) {
  if ($HighQualityRepair) {
    Add-TimeStampToOutputNames
  } elseif (-not (Remove-IfExists $OfficialZip)) {
    Add-TimeStampToOutputNames
  }
}

if (Test-Path -LiteralPath $PreviewFolder) {
  if ($HighQualityRepair) {
    $Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $PreviewFolderName = "$Name-$VersionLabel-high-quality-preview-$Stamp-folder"
    $PreviewFolder = Join-Path $PreviewVersionRoot $PreviewFolderName
  } else {
    [void](Remove-IfExists $PreviewFolder)
  }
}

New-Item -ItemType Directory -Path $OfficialFolder -Force | Out-Null
Copy-Item -Path (Join-Path $BuildFolder "*") -Destination $OfficialFolder -Recurse -Force
Compress-Archive -Path (Join-Path $OfficialFolder "*") -DestinationPath $OfficialZip -Force

New-Item -ItemType Directory -Path $PreviewFolder -Force | Out-Null
Copy-Item -Path (Join-Path $BuildFolder "*") -Destination $PreviewFolder -Recurse -Force

$FolderBytes = Get-FolderBytes $OfficialFolder
$ZipBytes = (Get-Item -LiteralPath $OfficialZip).Length
$PreviewBytes = Get-FolderBytes $PreviewFolder

$ReadmeLines = @(
  "$VersionLabel WeChat Mini Program upload package.",
  "",
  "Upload this folder in WeChat DevTools:",
  "1. $FolderName",
  "",
  "Zip for sharing:",
  "1. $ZipName",
  "",
  "Size:",
  "- folder: $([math]::Round($FolderBytes / 1MB, 3)) MB",
  "- zip: $([math]::Round($ZipBytes / 1MB, 3)) MB",
  "- preview folder: $([math]::Round($PreviewBytes / 1MB, 3)) MB",
  "",
  "Directory rules:",
  "- official upload packages live only under _github_upload/$OfficialDirName",
  "- previews live only under _github_upload/$PreviewDirName",
  "- do not upload from release-folders, releases, previews, or old lightweight packages"
)

if ($HighQualityRepair) {
  $ReadmeLines += "- this is the recommended v1.0.4 high quality repair upload package"
  $ReadmeLines += "- previous v1.0.4 lightweight packages are kept only as history and are not recommended"
  $ReadmeLines += "- key watercolor images use baseline JPG with warm-background compositing and light enhancement"
} elseif ($LightUpload) {
  $ReadmeLines += "- content images are lightweight JPG; tabbar icons stay PNG"
} else {
  $ReadmeLines += "- original official package, no image lightening"
}

$ReadmeLines | Set-Content -LiteralPath (Join-Path $OfficialVersionRoot $ReadmeName) -Encoding UTF8

if ($LightUpload -and $FolderBytes -gt $MaxBytes) {
  throw "Light upload folder is $FolderBytes bytes, over limit $MaxBytes bytes."
}

Write-Output "OfficialFolder=$OfficialFolder"
Write-Output "OfficialZip=$OfficialZip"
Write-Output "PreviewFolder=$PreviewFolder"
Write-Output "FolderBytes=$FolderBytes"
Write-Output "ZipBytes=$ZipBytes"
Write-Output "PreviewBytes=$PreviewBytes"
