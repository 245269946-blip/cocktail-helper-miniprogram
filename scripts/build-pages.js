const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>调酒助手微信小程序</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #18352f;
      background: #fbf7ef;
    }
    main {
      max-width: 760px;
      margin: 0 auto;
      padding: 64px 24px;
    }
    .panel {
      border: 1px solid rgba(56, 137, 123, 0.22);
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 18px 48px rgba(25, 64, 56, 0.08);
      padding: 32px;
    }
    .eyebrow {
      color: #3d9c8b;
      font-weight: 700;
      margin: 0 0 12px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 34px;
      line-height: 1.2;
    }
    p {
      margin: 0 0 14px;
      color: #5d706b;
      line-height: 1.8;
      font-size: 16px;
    }
    ul {
      margin: 18px 0 0;
      padding-left: 20px;
      color: #34524b;
      line-height: 1.9;
    }
    a {
      color: #258f7d;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <section class="panel">
      <p class="eyebrow">WeChat Mini Program Source</p>
      <h1>调酒助手微信小程序</h1>
      <p>这个 GitHub Pages 页面只用于说明仓库状态，不是小程序的 Web 运行版。</p>
      <p>当前主版本以微信开发者工具上传的小程序源码为准，导入仓库根目录即可继续预览、上传和发布。</p>
      <ul>
        <li>源码入口：app.js / app.json / app.wxss</li>
        <li>页面目录：pages/</li>
        <li>数据与映射：utils/ 和 cloud-data/</li>
        <li>素材目录：assets/</li>
      </ul>
      <p style="margin-top: 24px;"><a href="https://github.com/245269946-blip/cocktail-helper-miniprogram">查看 GitHub 仓库</a></p>
    </section>
  </main>
</body>
</html>`

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })
fs.writeFileSync(path.join(dist, 'index.html'), html)

console.log('GitHub Pages repository landing built: dist/index.html')
