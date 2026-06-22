param(
  [string]$Version,
  [string]$Name = "cocktail-helper-miniprogram",
  [switch]$LightUpload,
  [int]$MaxBytes = 1500000
)

$ErrorActionPreference = "Stop"

function New-UString([int[]]$CodePoints) {
  return -join ($CodePoints | ForEach-Object { [char]$_ })
}

$OfficialDirName = New-UString @(0x6B63,0x5F0F,0x7248,0x5F,0x5C0F,0x7A0B,0x5E8F,0x4E0A,0x4F20)
$PreviewDirName = New-UString @(0x9884,0x89C8,0x7248,0x5F,0x4EC5,0x67E5,0x770B)
$LightDirSuffix = New-UString @(0x5FAE,0x4FE1,0x4E0A,0x4F20,0x5F,0x8F7B,0x91CF,0x7248)
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
$BuildRoot = Join-Path $UploadRoot "build-$VersionLabel-wechat-upload"

if ($LightUpload) {
  $FolderName = "$Name-$VersionLabel-light-upload-folder"
  $ZipName = "$Name-$VersionLabel-light-upload.zip"
  $VersionDirName = "$VersionLabel`_$LightDirSuffix"
} else {
  $FolderName = "$Name-$VersionLabel-official-folder"
  $ZipName = "$Name-$VersionLabel-official.zip"
  $VersionDirName = $VersionLabel
}

$OfficialVersionRoot = Join-Path $OfficialRoot $VersionDirName
$PreviewVersionRoot = Join-Path $PreviewRoot $VersionLabel
$BuildFolder = Join-Path $BuildRoot $FolderName
$OfficialFolder = Join-Path $OfficialVersionRoot $FolderName
$OfficialZip = Join-Path $OfficialVersionRoot $ZipName

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

[void](Remove-IfExists $BuildRoot)
New-Item -ItemType Directory -Path $BuildFolder | Out-Null

foreach ($Item in $Include) {
  $Source = Join-Path $Root $Item
  if (Test-Path -LiteralPath $Source) {
    Copy-Item -LiteralPath $Source -Destination $BuildFolder -Recurse -Force
  }
}

if ($LightUpload) {
  $env:LIGHT_ROOT = $BuildFolder
  @'
import os
from pathlib import Path
from PIL import Image

root = Path(os.environ["LIGHT_ROOT"])
assets = root / "assets"

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

def should_keep_asset(path):
    rel = path.relative_to(root).as_posix()
    name = path.name
    if rel.startswith("assets/p2/"):
        return (
            name.startswith("recipe-") and name.endswith("-hero.png")
        ) or (
            name.startswith("base-") and name.endswith("-result.png")
        )
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

for path in list(assets.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        continue
    rel = path.relative_to(root).as_posix()
    if rel.startswith("assets/tabbar/"):
        continue
    is_p2 = rel.startswith("assets/p2/")
    max_px = 420 if is_p2 else 320
    quality = 50 if is_p2 else 45
    out = path.with_suffix(".jpg")
    im = Image.open(path).convert("RGB")
    im.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)
    im.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
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
'@ | python -
}

New-Item -ItemType Directory -Path $OfficialRoot -Force | Out-Null
New-Item -ItemType Directory -Path $PreviewVersionRoot -Force | Out-Null
New-Item -ItemType Directory -Path $OfficialVersionRoot -Force | Out-Null

if (-not (Remove-IfExists $OfficialFolder)) {
  $Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  if ($LightUpload) {
    $FolderName = "$Name-$VersionLabel-light-upload-$Stamp-folder"
    $ZipName = "$Name-$VersionLabel-light-upload-$Stamp.zip"
  } else {
    $FolderName = "$Name-$VersionLabel-official-$Stamp-folder"
    $ZipName = "$Name-$VersionLabel-official-$Stamp.zip"
  }
  $OfficialFolder = Join-Path $OfficialVersionRoot $FolderName
  $OfficialZip = Join-Path $OfficialVersionRoot $ZipName
}

if (Test-Path -LiteralPath $OfficialZip) {
  if (-not (Remove-IfExists $OfficialZip)) {
    $Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $OfficialZip = Join-Path $OfficialVersionRoot "$Name-$VersionLabel-upload-$Stamp.zip"
    $ZipName = Split-Path -Leaf $OfficialZip
  }
}

New-Item -ItemType Directory -Path $OfficialFolder -Force | Out-Null
Copy-Item -Path (Join-Path $BuildFolder "*") -Destination $OfficialFolder -Recurse -Force
Compress-Archive -Path (Join-Path $OfficialFolder "*") -DestinationPath $OfficialZip -Force

$FolderBytes = Get-FolderBytes $OfficialFolder
$ZipBytes = (Get-Item -LiteralPath $OfficialZip).Length

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
  "",
  "Directory rules:",
  "- official upload packages live only under _github_upload/$OfficialDirName",
  "- previews live only under _github_upload/$PreviewDirName",
  "- do not upload from release-folders, releases, or previews"
)

if ($LightUpload) {
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
Write-Output "FolderBytes=$FolderBytes"
Write-Output "ZipBytes=$ZipBytes"
