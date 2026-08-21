# Cloud Images

全量高清酒品图建议放在云存储 / COS / CDN，小程序主包只保留首屏兜底图。

## 生成上传素材

```powershell
powershell -ExecutionPolicy Bypass -File scripts\prepare-cloud-images.ps1 -Version v1.0.5
```

输出目录：

```text
_cloud_upload/cocktail-images/v1.0.5/p2/
```

每个酒品会生成：

```text
recipe-{slug}-card.jpg
recipe-{slug}-feature.jpg
```

## 上传后的配置

上传到云存储后，在 `utils/imageCloud.js` 里填写：

```js
const CLOUD_IMAGE_BASE = 'https://your-cdn-domain.example.com'
```

如果使用微信云开发文件 ID，也可以填 `cloud://...` 根路径。最终拼出的路径格式是：

```text
{CLOUD_IMAGE_BASE}/cocktail-images/v1.0.5/p2/recipe-gin-tonic-card.jpg
```

`CLOUD_IMAGE_BASE` 为空时，小程序自动使用本地兜底图。
