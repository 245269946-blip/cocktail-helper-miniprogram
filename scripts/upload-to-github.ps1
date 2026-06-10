param(
  [string]$Repo = "245269946-blip/cocktail-helper-miniprogram",
  [string]$Branch = "main",
  [string]$Message = "Upload current miniprogram source and assets"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$ManifestPath = Join-Path $Root "github-upload-manifest.json"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI gh is not available. Install it first, then run gh auth login."
}

$authStatus = & gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  $authStatus | Write-Host
  throw "GitHub CLI is not logged in. Run: gh auth login"
}

if (-not (Test-Path -LiteralPath $ManifestPath)) {
  throw "Missing upload manifest: $ManifestPath"
}

$Files = Get-Content -Raw $ManifestPath | ConvertFrom-Json
$Ref = & gh api "repos/$Repo/git/ref/heads/$Branch" | ConvertFrom-Json
$ParentSha = $Ref.object.sha
$Commit = & gh api "repos/$Repo/git/commits/$ParentSha" | ConvertFrom-Json
$BaseTreeSha = $Commit.tree.sha

$Tree = New-Object System.Collections.Generic.List[object]
$Index = 0

foreach ($RelativePath in $Files) {
  $Index += 1
  $FullPath = Join-Path $Root $RelativePath
  if (-not (Test-Path -LiteralPath $FullPath -PathType Leaf)) {
    Write-Warning "Skip missing file: $RelativePath"
    continue
  }

  Write-Host "[$Index/$($Files.Count)] blob $RelativePath"
  $Bytes = [System.IO.File]::ReadAllBytes($FullPath)
  $Base64 = [Convert]::ToBase64String($Bytes)
  $BlobBody = @{ content = $Base64; encoding = "base64" } | ConvertTo-Json -Compress
  $Blob = $BlobBody | gh api "repos/$Repo/git/blobs" --method POST --input - | ConvertFrom-Json

  $Tree.Add([ordered]@{
    path = ($RelativePath -replace "\\", "/")
    mode = "100644"
    type = "blob"
    sha = $Blob.sha
  })
}

$TreeBody = @{
  base_tree = $BaseTreeSha
  tree = $Tree
} | ConvertTo-Json -Depth 6 -Compress

Write-Host "Creating tree..."
$NewTree = $TreeBody | gh api "repos/$Repo/git/trees" --method POST --input - | ConvertFrom-Json

$CommitBody = @{
  message = $Message
  tree = $NewTree.sha
  parents = @($ParentSha)
} | ConvertTo-Json -Depth 4 -Compress

Write-Host "Creating commit..."
$NewCommit = $CommitBody | gh api "repos/$Repo/git/commits" --method POST --input - | ConvertFrom-Json

$RefBody = @{
  sha = $NewCommit.sha
  force = $false
} | ConvertTo-Json -Compress

Write-Host "Updating $Branch..."
$RefBody | gh api "repos/$Repo/git/refs/heads/$Branch" --method PATCH --input - | Out-Null

Write-Host "Uploaded $($Tree.Count) files to https://github.com/$Repo/commit/$($NewCommit.sha)"
