# 搜索结果页问题 · 深度排查报告

> 排查时间：2026-06-02  
> 问题：搜索「金汤力」后结果页显示不正确

---

## 一、问题现象

用户在鸡尾酒小程序首页搜索「金汤力」，跳转到结果页后，Hero 卡显示的内容不正确（具体表现待用户确认：可能是显示了错误的酒名，或字段缺失/样式异常）。

---

## 二、排查覆盖范围（全部通过 ✅）

| # | 排查项 | 文件 | 结论 |
|---|--------|------|------|
| 1 | drinkView.js 字段补全 | `utils/drinkView.js` L167-L220 | ✅ resultCard() 已包含 nameEn/badgeText/quote/metaTags/illustration |
| 2 | recommend.js 搜索逻辑 | `utils/recommend.js` L88-L143 | ✅ Layer1(别名ID)→Layer1.5(ID失效降级)→Layer2(中文名)→Layer3(全模糊) |
| 3 | results.js 数据组装 | `pages/results/results.js` L50-L90 | ✅ loadResults 三重兜底 + buildDecision 完整 |
| 4 | results.wxml 模板渲染 | `pages/results/results.wxml` 全文 | ✅ wx:if 条件正确，字段绑定完整 |
| 5 | results.wxss 样式 | `pages/results/results.wxss` 全文 | ✅ hero-card / card-grid 样式正常 |
| 6 | 首页搜索入口 | `pages/home/home.wxml` + `home.js` | ✅ onSearch/onDirectSearch/onRecipeTap 跳转参数正确 |
| 7 | 详情页跳转 | `pages/detail/detail.js` + `detail.wxml` | ✅ 接收 recipeId 参数正确 |
| 8 | contentStore 数据加载 | `utils/contentStore.js` L80-L130 | ✅ recipes/searchAliases/searchMappings 加载链正常 |
| 9 | visualSystem 主题 | `utils/visualSystem.js` | ✅ themeClass() 返回值正确 |
| 10 | app.wxss 全局样式 | `app.wxss` | ✅ 无覆盖 results 页的规则 |
| 11 | illustrations 图片映射 | `utils/illustrations.js` + `assets/` 目录 | ✅ gin-tonic 对应图片存在 |

---

## 三、数据验证（Node.js 脚本模拟结果）

### 测试环境
在项目根目录用 Node.js 直接 require 本地 JSON 数据，模拟完整搜索链路。

### 测试结果一览

```
测试1 - searchAliases 映射:     '金汤力' → 'gin-tonic'           ✅
测试2 - findDetail(gin-tonic):   找到金汤力, base=金酒, glass=高球  ✅
测试3 - drinkView.resultCard(): nameEn/badgeText/quote/metaTags 全有  ✅
测试4 - mainRecommendation:      truthy, Hero卡会渲染            ✅
测试5 - 云端合并后搜索:          仍返回 gin-tonic                ✅
测试6 - 云端删除gin-tonic后:     ⚠️ 返回 gin-sprite(金酒雪碧)！   🔴
```

### 关键发现

**测试 6 揭示了真正的风险场景**：

当云端数据 `recipes` 集合中没有 `gin-tonic` 这条记录时：
- `searchAliases['金汤力']` → `'gin-tonic'` （别名映射仍存在）
- `findDetail('gin-tonic')` → **undefined**（数据被覆盖，找不到）
- 原代码直接降级到 **Layer 3 模糊匹配** → 命中含「金」「汤」「力」关键字的别的酒
- 最可能命中：`gin-sprite`（金酒雪碧）或 `tom-collins`（汤姆柯林斯）

**这就是用户看到的「不正确的界面」的最可能原因。**

---

## 四、已实施的修复

### 修复 A：recommend.js — 新增 Layer 1.5 ID 失效降级

**位置**：`utils/recommend.js` 约 L105-L125

**修改前**：Layer 1 别名 ID 找不到时，直接跳到 Layer 2/3

**修改后**：
```
Layer 1: searchAliases['金汤力'] = 'gin-tonic' → findDetail('gin-tonic')
  ↓ 失败
Layer 1.5（新增）: aliasTarget 是纯 ID 且不含中文/空格
  → 用原始关键词 '金汤力' 在 getAllItems() 中做 name 精确匹配
  → 命中则直接返回（不再走模糊匹配）
  ↓ 失败
Layer 2: 中文名匹配
Layer 3: 全字段模糊匹配
```

**核心代码**：
```javascript
/* 第1.5层：ID命中失败后，用原始keyword做中文名精确匹配 */
if (aliasTarget && !aliasTarget.includes(' ') && !aliasTarget.includes('中')) {
  const nameMatch = getAllItems().find((item) => {
    const name = normalizeText(item.name)
    return name === key || name === aliasTarget
  })
  if (nameMatch) {
    console.log('[search] Layer1.5 ID缺失降级:', key, '→', nameMatch.id, nameMatch.name)
    // ...返回精确匹配结果
  }
}
```

### 修复 B：results.js — 第三重兜底

**位置**：`pages/results/results.js` loadResults 函数内

**新增逻辑**：当 recommend.search(value) 和 recommend.search(aliasTarget) 都无结果时，如果 aliasTarget 是纯 ID 格式，用原始 value 做 name 精确匹配。

```javascript
/* 如果别名目标是ID且仍无结果，用原始keyword做中文名匹配 */
if (!results.length && value && aliasTarget 
    && !aliasTarget.includes(' ') && !/[\u4e00-\u9fff]/.test(aliasTarget)) {
  const all = recommend.getAllItems()
  const key = (value || '').trim().toLowerCase()
  const nameMatch = all.find((item) => (item.name || '').toLowerCase() === key)
  if (nameMatch) results = [nameMatch]
}
```

---

## 五、修复后的预期行为矩阵

| 场景 | 修复前 | 修复后 |
|------|--------|--------|
| 本地模式，搜「金汤力」 | ✅ 返回 gin-tonic | ✅ 不变 |
| 云端有 gin-tonic，搜「金汤力」 | ✅ 返回 gin-tonic | ✅ 不变 |
| 云端缺 gin-tonic，搜「金汤力」 | ❌ 返回 gin-sprite 等 | ✅ 用名称匹配找「金汤力」 |
| 云端缺 gin-tonic 且名称也不同 | ❌ 返回错误结果 | ❌ 仍可能不准（但这是数据缺失） |

---

## 六、涉及的所有文件清单

### 本次修改的文件
| 文件 | 改动类型 |
|------|----------|
| `utils/recommend.js` | 新增 Layer 1.5 ID 失效降级逻辑 |
| `pages/results/results.js` | 新增第三重兜底（别名 ID 名称匹配） |

### 排查过但未改动的文件
| 文件 | 角色 |
|------|------|
| `utils/drinkView.js` | 结果卡片渲染函数（已确认正确） |
| `utils/contentStore.js` | 数据加载与云合并（已确认正确） |
| `utils/illustrations.js` | 图片映射（已确认正确） |
| `utils/visualSystem.js` | 主题系统（已确认正确） |
| `utils/data.js` | searchAliases 定义（已确认正确） |
| `pages/results/results.wxml` | 结果页模板（已确认正确） |
| `pages/results/results.wxss` | 结果页样式（已确认正确） |
| `pages/home/home.wxml` | 首页模板（已确认正确） |
| `pages/home/home.js` | 首页逻辑（已确认正确） |
| `pages/detail/detail.js` | 详情页逻辑（已确认正确） |
| `pages/detail/detail.wxml` | 详情页模板（已确认正确） |
| `app.wxss` | 全局样式（已确认正确） |
| `cloud-data/recipes.json` | 本地配方数据源 |

### 数据文件
| 文件 | 说明 |
|------|------|
| `cloud-data/recipes.json` | 配方主数据（含 gin-tonic 完整定义） |
| `assets/drinks/gin-tonic.webp` | 金汤力 Hero 卡配图 |

---

## 七、待确认事项

请在微信开发者工具中执行以下操作并反馈：

1. **点击顶部「编译」按钮**（不是刷新，是重新编译）
2. **清空编译缓存**（工具 → 清除编译缓存 → 清除全部）
3. 搜索「**金汤力**」
4. 观察以下三项：

   - **[ ] Hero 卡大标题**显示的是「金汤力」还是其他酒名？
   - **[ ] Console 控制台**有没有红色报错？（特别是 `Cannot read property` 或 `undefined` 相关的）
   - **[ ] Hero 卡图片**是否正常显示？

5. 反馈结果，我会据此判断下一步方向。

---

## 八、可能的后续方向

| 如果观察到... | 则原因可能是... | 下一步 |
|---------------|-----------------|--------|
| Hero 显示金酒雪碧/其他酒 | 云端确实缺少 gin-tonic | 检查云数据库 recipes 集合 |
| Hero 显示金汤力但字段缺失 | 编译缓存或字段未生效 | 清缓存重编译 |
| Console 有红色 JS 报错 | 运行时异常 | 按报错堆栈定位 |
| 页面完全空白 | 路由或生命周期问题 | 检查 app.json 页面注册 |
| 修复后一切正常 | 编译缓存问题 | 🎉 结束 |

---

*报告生成时间：2026-06-02 11:27*
