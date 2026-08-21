# Cloud Images

The mini program keeps a small local fallback package under 1.5 MB.
Full-resolution cocktail images live in WeChat Cloud Storage.

## Current Cloud Storage

Environment:

```text
cloud1-d0gsasl6gcb3f22c5
```

Cloud root:

```text
cloud://cloud1-d0gsasl6gcb3f22c5.636c-cloud1-d0gsasl6gcb3f22c5-1472356778
```

Image path format:

```text
cloud://cloud1-d0gsasl6gcb3f22c5.636c-cloud1-d0gsasl6gcb3f22c5-1472356778/v1.0.5/p2/recipe-{slug}-{variant}.jpg
```

Example:

```text
cloud://cloud1-d0gsasl6gcb3f22c5.636c-cloud1-d0gsasl6gcb3f22c5-1472356778/v1.0.5/p2/recipe-aperol-spritz-card.jpg
```

## Local Source For Uploading Images

Upload this folder to WeChat Cloud Storage:

```text
_cloud_upload/cocktail-images/v1.0.5
```

The uploaded cloud path should become:

```text
v1.0.5/p2/recipe-gin-tonic-card.jpg
```

## Generate Cloud Images Again

```powershell
powershell -ExecutionPolicy Bypass -File scripts\prepare-cloud-images.ps1 -Version v1.0.5
```

Output:

```text
_cloud_upload/cocktail-images/v1.0.5/p2/
```

Each cocktail has:

```text
recipe-{slug}-card.jpg
recipe-{slug}-feature.jpg
```

## Runtime Config

Cloud image URLs are configured in:

```text
utils/imageCloud.js
```

WeChat Cloud environment is configured in:

```text
utils/cloudConfig.js
```
