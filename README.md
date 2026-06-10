# 调酒助手微信小程序

这个仓库以微信开发者工具上传的小程序版本为准。当前主版本是原生微信小程序，不是 Vite / React / Vue Web 项目。

## 当前版本边界

- 小程序源码：`app.js`、`app.json`、`app.wxss`、`pages/`、`utils/`
- 小程序素材：`assets/`
- 本地数据源：`cloud-data/`
- 微信项目配置：`project.config.json`、`sitemap.json`
- 私有本机配置不会入库：`project.private.config.json`

`prototype/`、旧版 `preview*.html`、过程报告和历史备份不再作为当前主版本保存，避免和微信小程序上线版本混在一起。

## 导入方式

1. 打开微信开发者工具
2. 选择导入项目
3. 项目目录选择仓库根目录
4. 使用 `project.config.json` 中配置的 AppID，或按需要切换为自己的测试 AppID

## 包体说明

微信上传包体以 `project.config.json` 的 `packOptions` 为准。仓库会保留完整源码和素材，但微信上传时会忽略原型、文档、脚本、部分大图和非运行时资源，以保持正式预览包体在限制内。

## GitHub Pages

GitHub Pages 只作为仓库说明页使用，不代表小程序运行环境。真实体验和上传验证仍以微信开发者工具为准。
