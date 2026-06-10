# P0 资产接入报告

> 日期：2026-06-01 | 版本：v2.1 规格首次出图接入 | 状态：✅ 完成

---

## 一、资产映射总览

| # | 资产 ID | 源文件 | 目标路径 | 规格 | 对应页面 |
|---|---------|--------|---------|------|---------|
| 1 | **splash-hero** | P0-02.png | `assets/layer1/splash-hero.png` | 750×1334 竖向全屏 | Layer 1 启动欢迎页 |
| 2 | **furin-deco** | P0-03.png | `assets/layer1/furin-deco.png` | 320×640 透明 PNG | Layer 1 启动页风铃 |
| 3 | **header-cocktail** | P0-04.png | `assets/layer2/header-cocktail.png` | 400×320 横图 | Layer 2 首页顶部装饰 |
| 4 | **card-pantry** | P0-05.png | `assets/layer2/card-pantry.png` | 680×380 横图 | Layer 2 入口卡「家里有什么」|
| 5 | **card-store** | P0-01.png | `assets/layer2/card-store.png` | 680×380 横图 | Layer 2 入口卡「便利店调酒」|
| 6 | **card-base** | P0-06.png | `assets/layer2/card-base.png` | 680×380 横图 | Layer 2 入口卡「按基酒找」|

---

## 二、代码改动量

### ✅ 零行代码修改

原因：小程序代码（WXML / JS / preview.html）中所有图片引用均已使用 **文件名路径匹配**：
- WXML 中 `<image src="/assets/layer1/splash-hero.png" />` 
- JS 中 `image: '/assets/layer2/card-store.png'`
- preview.html 中 `<img src="assets/layer2/header-cocktail.png" />`

P0 图片以相同文件名覆盖写入 assets 目录后，**所有引用自动生效，无需任何代码变更。**

### 受影响的文件清单（自动生效，无需编辑）

| 文件 | 引用的 P0 资产 | 行号 |
|------|--------------|------|
| `pages/home/home.wxml` | splash-hero, furin-deco, header-cocktail, card-pantry, card-store, card-base | 6, 12, 81, 130, 146, 162 |
| `pages/home/home.js` | splash-hero (todayRecipes 第3项) | 15 |
| `preview.html` | 同上 6 个 (相对路径) | 457, 460, 517, 555, 570, 585 |
| `preview-v2.html` | layer3 引用（未受影响） | — |
| `preview-v3.html` | layer3 引用（未受影响） | — |

---

## 三、图片质量自检（基于 v2.1 规范）

### ✅ 通过项

| 检查维度 | 结果 | 说明 |
|---------|------|------|
| **情绪关键词命中** | ✅ ≥3个/张 | 微醺/晚风/生活痕迹/安静/想截图保存 均有体现 |
| **真实生活感(0.8)** | ✅ | 冰块融化、杯壁水珠、小票卷边、桌面水渍、光线不均匀 |
| **饮品诱惑力(0.8.5)** | ✅ | 液体通透、冰块层次、光线穿透液体、杯壁冷凝水珠 |
| **去过度精致化** | ✅ | 无完美摆拍、无影棚布光、构图自然偏移 |
| **亚洲城市夜晚感** | ✅ | 便利店蓝光、窗边台灯、城市夜景、深夜氛围 |
| **杂志内页感** | ✅ | 水彩手绘、大量留白、淡雅配色 |

### ⚠️ 注意事项

| 项目 | 说明 | 建议 |
|------|------|------|
| **receipt-deco.png** 未替换 | layer1 的 receipt-deco 仍是旧占位图 | v2.1 规范标注为「可选 CSS 也可」，当前保留不变 |
| **home.js:15** todayRecipes[3] 复用了 splash-hero | 「威士忌可乐」的缩略图暂时使用了启动页大图 | Phase 2 时替换为专用 hero 图更佳 |
| **layer3 图片仍为旧占位图** | hero-gin-tonic / conv-can-drink 等 11 张仍是旧图 | 待 Phase 1 出图后替换 |

---

## 四、下一步

### 立即可做
- [ ] 在微信开发者工具中打开项目，预览 6 张 P0 图的实际效果
- [ ] 检查 iPhone SE (375pt) 和 Pro Max (430pt) 上的显示适配
- [ ] 确认 splash-hero 全屏背景的文字叠加区域（上半部分留白是否足够）

### Phase 2 对接（~32 张）
- [ ] 8 张 Hero 大图（gin/whisky/rum/vodka/convenience/sweet/coffee/tea）→ 替换 `layer3/hero-*.png`
- [ ] 1 张冰箱背景 → 替换 `layer3/conv-fridge-bg.png`
- [ ] ~20 张配方详情大图 → 新增到 `layer3/drink-hero-{id}.png`
- [ ] 届时需更新 `illustrations.js` 的 HERO_POOL 映射 + `home.js` todayRecipes

---

## 五、文件清单

```
cocktail-helper-miniprogram-main/assets/
├── layer1/
│   ├── splash-hero.png      ← 🔄 已替换为 P0-02（窗台金汤力+城市夜景）
│   ├── furin-deco.png       ← 🔄 已替换为 P0-03（风铃水彩）
│   └── receipt-deco.png      （保持不变，CSS 可实现替代）
├── layer2/
│   ├── header-cocktail.png  ← 🔄 已替换为 P0-04（简约饮品手绘）
│   ├── card-pantry.png      ← 🔄 已替换为 P0-05（厨房台面场景）
│   ├── card-store.png       ← 🔄 已替换为 P0-01（便利店户外桌）
│   └── card-base.png        ← 🔄 已替换为 P0-06（三瓶基酒阵列）
└── layer3/
    └── （11 张旧占位图 —— 待 Phase 2 替换）
```
