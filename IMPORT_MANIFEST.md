# 调酒小程序内容导入清单

本文件记录本次把历史调酒小程序内容汇总到当前项目的导入范围。

## 当前主项目

来源：

`C:\Users\Administrator\WorkBuddy\20260528110722\cocktail-helper-miniprogram-main`

导入位置：

当前项目根目录 `C:\Users\Administrator\Documents\New project`

导入内容：

- 原生微信小程序源码：`app.js`、`app.json`、`app.wxss`
- 页面目录：`pages/`
- 工具模块：`utils/`
- 图片与视觉资产：`assets/`
- 云开发导入数据：`cloud-data/`
- 原型与预览：`prototype/`、`preview.html`、`preview-v2.html`、`preview-v3.html`
- 开发脚本：`scripts/`
- 项目文档：`README.md`、`PROJECT_OVERVIEW.md`、`PRODUCT_LAYERS.md`、`DESIGN_SYSTEM.md`、`FLAVOR_VISUAL_MAPPING.md`、`VISUAL_ASSET_SPEC.md`、`CLOUD.md`
- 阶段报告：`P0_INTEGRATION_REPORT.md`、`P1_INTEGRATION_REPORT.md`、`SEARCH_FIX_REPORT.md`

## 历史项目归档

来源：

`C:\Users\Administrator\Documents\Codex\2026-05-26\ok-1-2-6-a-b`

导入位置：

`_history/2026-05-26-codex-project`

用途：

保留早期完整项目、设计系统、视觉母版、截图工具、上传清单和当时的源码状态，便于回查早期讨论和版本演进。

导入时排除了依赖和临时运行文件：

- `node_modules`
- `miniprogram_npm`
- `.git`
- `.deps`
- `__pycache__`
- `dist`
- `*.pyc`
- `*.log`

## 预览会话归档

来源：

`C:\Users\Administrator\Documents\Codex\2026-06-02\new-chat`

导入位置：

`_history/2026-06-02-preview-session`

用途：

保留 6 月 2 日围绕微信开发者工具预览、搜索结果、详情页、首页 v2 和页面截图的渲染脚本与图片证据。

关键内容包括：

- `render-home-v2.js`
- `render-results-detail-v2.js`
- `screenshot-pages.js`
- 首页、搜索、详情、便利店、家里有什么等页面截图
- 微信开发者工具预览截图

## 新增汇总文档

本次新增：

- `CONVERSATION_SUMMARY.md`：前几轮调酒小程序对话与产品/开发内容汇总。
- `IMPORT_MANIFEST.md`：本次导入范围、来源和归档位置说明。

## 使用方式

继续开发时，以当前根目录为准。

如果要回看历史设计和旧版本源码，查看 `_history/2026-05-26-codex-project`。

如果要回看 6 月 2 日的预览截图和验证脚本，查看 `_history/2026-06-02-preview-session`。

