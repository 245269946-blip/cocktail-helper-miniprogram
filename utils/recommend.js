let data = require('./data')

function useContent(content) {
  if (content) data = content
}

function getContent() {
  return data
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

function isVisibleItem(item) {
  return item && !item.hidden
}

function getAllItems() {
  return data.recipes.filter(isVisibleItem).concat(data.schemes.filter(isVisibleItem))
}

function findRecipe(id) {
  return data.recipes.find((item) => item.id === id)
}

function findScheme(id) {
  return data.schemes.find((item) => item.id === id)
}

function findDetail(id) {
  return findRecipe(id) || findScheme(id)
}

function findBase(idOrName) {
  const key = normalizeText(idOrName)
  return data.bases.find((item) => item.id === key || normalizeText(item.name) === key)
}

function findIngredient(idOrName) {
  const key = normalizeText(idOrName)
  return data.ingredients.find((item) => item.id === key || normalizeText(item.name) === key)
}

function getItemsByIds(ids) {
  return (ids || []).map((id) => findDetail(id)).filter(isVisibleItem)
}

const CORE_INTENT_GROUPS = [
  {
    tokens: ['无酒精', '不喝酒', '零酒精', 'mocktail'],
    ids: ['cv-nonalcohol-fresh', 'coffee-tonic']
  },
  {
    tokens: ['不苦', '不烈', '不呛', '怕苦', '怕辣', '好入口'],
    ids: ['baileys-milk', 'vodka-orange', 'umeshu-soda', 'mimosa', 'cuba-libre']
  },
  {
    tokens: ['低酒感', '喝不出酒味', '低度', '轻微醺', '不想太烈'],
    ids: ['baileys-milk', 'umeshu-soda', 'sake-highball', 'mimosa', 'vodka-orange']
  },
  {
    tokens: ['便利店', '下楼买', '马上买', '买齐'],
    ids: ['cv-fresh-tipsy', 'cv-sweet-party', 'cv-tea-light', 'cv-fruit-low', 'cv-nonalcohol-fresh']
  },
  {
    tokens: ['清爽', '气泡', '夏天', '冰饮'],
    ids: ['gin-tonic', 'mojito', 'umeshu-soda', 'sake-highball', 'paloma']
  },
  {
    tokens: ['甜口', '甜一点', '奶香', '果味'],
    ids: ['baileys-milk', 'vodka-orange', 'sea-breeze', 'mimosa', 'fruit-wine-spritz']
  },
  {
    tokens: ['新手', '第一次', '不翻车', '简单'],
    ids: ['gin-tonic', 'baileys-milk', 'vodka-orange', 'sea-breeze', 'sake-highball']
  }
]

function coreIntentItems(key) {
  const normalizedKey = normalizeText(key)
  if (!normalizedKey) return []
  const ids = []
  CORE_INTENT_GROUPS.forEach((group) => {
    const matched = group.tokens.some((token) => normalizedKey.includes(normalizeText(token)))
    if (matched) ids.push(...group.ids)
  })
  return getItemsByIds(uniqueIds(ids))
}

function uniqueIds(ids) {
  const result = []
  ;(ids || []).forEach((id) => {
    if (id && !result.includes(id)) result.push(id)
  })
  return result
}

function baseRecipeIds(base) {
  if (!base || !base.recipes) return []
  const priority = ['first', 'beginner', 'convenience', 'lowAlcohol', 'classic', 'sweet', 'fresh', 'friendly']
  return uniqueIds(priority.reduce((list, key) => list.concat(base.recipes[key] || []), []))
}

function mappedSearchItems(key) {
  const normalizedKey = normalizeText(key)
  const mappings = data.searchMappings || []
  const ids = []

  mappings.forEach((mapping) => {
    const matched = (mapping.keywords || []).some((keyword) => {
      const text = normalizeText(keyword)
      return normalizedKey.includes(text) || (text.length >= 2 && text.includes(normalizedKey))
    })
    if (matched) ids.push(...(mapping.recipeIds || []))
  })

  data.bases.forEach((base) => {
    const name = normalizeText(base.name)
    const id = normalizeText(base.id)
    if (normalizedKey.includes(name) || normalizedKey.includes(id)) {
      ids.push(...baseRecipeIds(base))
    }
  })

  data.ingredients.forEach((ingredient) => {
    const name = normalizeText(ingredient.name)
    const id = normalizeText(ingredient.id)
    if (normalizedKey.includes(name) || normalizedKey.includes(id)) {
      ids.push(...(ingredient.recipes || []))
    }
  })

  if (normalizedKey.includes('果汁')) ids.push('vodka-orange', 'sea-breeze', 'paloma', 'mimosa')
  if (normalizedKey.includes('菠萝')) ids.push('jungle-bird', 'mai-tai')
  if (normalizedKey.includes('蔓越莓')) ids.push('cosmopolitan', 'sea-breeze')
  if (normalizedKey.includes('姜汁') || normalizedKey.includes('姜啤')) ids.push('dark-n-stormy', 'moscow-mule', 'penicillin')
  if (normalizedKey.includes('金巴利')) ids.push('negroni', 'boulevardier', 'jungle-bird')
  if (normalizedKey.includes('甜味美思') || normalizedKey.includes('味美思')) ids.push('manhattan', 'negroni', 'boulevardier')
  if (normalizedKey.includes('橙味利口酒') || normalizedKey.includes('君度') || normalizedKey.includes('三秒')) ids.push('margarita', 'sidecar', 'cosmopolitan', 'mai-tai')
  if (normalizedKey.includes('蜂蜜')) ids.push('bees-knees', 'penicillin', 'whiskey-sour')
  if (normalizedKey.includes('蛋清')) ids.push('clover-club', 'whiskey-sour')
  if (normalizedKey.includes('茶饮') || normalizedKey.includes('茶')) ids.push('whisky-oolong', 'umeshu-oolong', 'sake-green-tea', 'cv-tea-light')
  if (normalizedKey.includes('便利店')) ids.push('cv-fresh-tipsy', 'cv-sweet-party', 'cv-milk-soft', 'cv-tea-light', 'cv-fruit-low')

  return getItemsByIds(uniqueIds(ids))
}

function search(keyword) {
  const key = normalizeText(keyword)
  if (!key) return []
  const coreIntent = coreIntentItems(key)

  /* ========== 第1层：别名快速通道（ID直命中）========== */
  const aliases = data.searchAliases || {}
  const aliasTarget = aliases[key]
  
  // 如果别名指向 recipe ID 且能找到，优先返回（最高优先级）
  if (aliasTarget && !aliasTarget.includes(' ') && !aliasTarget.includes('中')) {
    const idMatch = findDetail(aliasTarget)
    if (idMatch) {
      const baseResult = [idMatch]
      const expanded = mappedSearchItems(key)
      const merged = []
      baseResult.concat(coreIntent, expanded).forEach((item) => {
        if (!merged.some((exists) => exists.id === item.id)) merged.push(item)
      })
      return merged.length ? merged : baseResult
    }
    // ID 命中但找不到 recipe（可能云端数据覆盖后 ID 不存在）
    // → 不要停！继续走第2层名称匹配，同时记录降级
  }

  /* ========== 第1.5层：ID命中失败后，用原始keyword做中文名精确匹配（防止云端覆盖导致ID失效）========== */
  if (aliasTarget && !aliasTarget.includes(' ') && !aliasTarget.includes('中')) {
    /* aliasTarget 是一个 recipe ID（如 gin-tonic），但 findDetail 没找到
       说明云端数据可能没有这个 ID。此时用用户输入的原始中文关键词做名称匹配 */
    const nameMatch = getAllItems().find((item) => {
      const name = normalizeText(item.name)
      return name === key || name === aliasTarget
    })
    if (nameMatch) {
      const expanded = mappedSearchItems(key)
      const merged = [nameMatch]
      expanded.forEach((item) => { if (!merged.some((e) => e.id === item.id)) merged.push(item) })
      return merged
    }
  }
  /* 别名目标本身是中文名时的间接查找 */
  if (aliasTarget && aliasTarget !== key && (aliasTarget.includes('中') || /[\u4e00-\u9fff]/.test(aliasTarget))) {
    const nameMatch = getAllItems().find((item) => {
      const name = normalizeText(item.name)
      return name === aliasTarget || name.includes(aliasTarget) || aliasTarget.includes(name)
    })
    if (nameMatch) {
      const expanded = mappedSearchItems(key)
      const merged = [nameMatch]
      expanded.forEach((item) => { if (!merged.some((e) => e.id === item.id)) merged.push(item) })
      return merged
    }
  }

  /* ========== 第2层：中文名/英文名直接匹配（核心兜底）========== */
  const nameMatch = getAllItems().find((item) => {
    const name = normalizeText(item.name)
    const enName = normalizeText(item.enName || '')
    // 精确匹配 或 包含匹配（搜"金汤力"匹配 name="金汤力"）
    return name === key || name.includes(key) || key.includes(name)
      || enName === key || enName.includes(key) || key.includes(enName)
  })

  /* ========== 第3层：别名扩展 + 全字段模糊搜索（原有逻辑保留）========== */
  const expandedKeys = aliasTarget && aliasTarget !== key
    ? [key, normalizeText(aliasTarget)]
    : [key]

  // 意图标签识别
  const intentTags = []
  if (key.includes('便利店')) intentTags.push('便利店')
  if (key.includes('女生')) intentTags.push('女生更容易接受', '甜口', '奶香')
  if (key.includes('不苦') || key.includes('不烈') || key.includes('不呛') || key.includes('怕苦')) intentTags.push('甜口', '果味', '奶香')
  if (key.includes('新手')) intentTags.push('新手友好', '低门槛')
  if (key.includes('低酒精') || key.includes('微醺')) intentTags.push('低酒精', '微醺')
  if (key.includes('家里')) intentTags.push('低门槛', '家里')
  if (key.includes('聚会') || key.includes('party')) intentTags.push('聚会', '朋友小聚')
  if (key.includes('夏天') || key.includes('夏日')) intentTags.push('夏天', '清爽')
  if (key.includes('下班')) intentTags.push('下班放松')
  if (key.includes('约会') || key.includes('浪漫')) intentTags.push('朋友小聚', '低酒精')

  let allMapped = []
  let allDirect = []
  let allIntent = []

  expandedKeys.forEach((expandedKey) => {
    allMapped = allMapped.concat(mappedSearchItems(expandedKey))

    const direct = getAllItems().filter((item) => {
      const fields = [
        item.name,
        item.enName,
        item.base,
        item.reason,
        ...materialNames(item),
        ...(item.aliases || []),
        ...(item.tags || []),
        ...(item.scenes || [])
      ]
      return fields.some((field) => {
        const text = normalizeText(field)
        return text.includes(expandedKey) || (text.length >= 2 && expandedKey.includes(text))
      })
    })
    allDirect = allDirect.concat(direct)

    if (intentTags.length) {
      const intent = getAllItems().filter((item) => {
        const fields = (item.tags || []).concat(item.scenes || [])
        return fields.some((field) => intentTags.includes(field))
      })
      allIntent = allIntent.concat(intent)
    }
  })

  /* ========== 合并去重，第2层名称匹配结果排最前 ========== */
  const merged = []
  // 名称精确匹配的结果放最前面
  if (nameMatch && !merged.some((e) => e.id === nameMatch.id)) merged.push(nameMatch)
  // 核心需求词（无酒精/不苦/低酒感/便利店等）必须稳定保底
  coreIntent.forEach((item) => {
    if (!merged.some((exists) => exists.id === item.id)) merged.push(item)
  })
  // 其余搜索结果追加
  allMapped.concat(allDirect, allIntent).forEach((item) => {
    if (!merged.some((exists) => exists.id === item.id)) merged.push(item)
  })

  return merged
}

function filterByTag(tag) {
  const key = normalizeText(tag)
  return getAllItems().filter((item) => {
    return (item.tags || []).some((value) => normalizeText(value).includes(key))
  })
}

function filterConvenience(place, moods) {
  const moodList = Array.isArray(moods) ? moods : [moods].filter(Boolean)
  return data.schemes.filter((scheme) => {
    const placeMatched = !place || (scheme.place || []).includes(place)
    const moodMatched = moodList.length === 0 || moodList.some((mood) => (scheme.mood || []).includes(mood) || (scheme.tags || []).includes(mood))
    return placeMatched && moodMatched
  })
}

function beginnerRecommend(level, flavor, buy) {
  const items = getAllItems()
  return items.filter((item) => {
    const tags = item.tags || []
    const scenes = item.scenes || []
    const alcohol = item.flavor ? item.flavor.alcohol : 3
    const levelMatched =
      !level ||
      (level === '几乎不要酒味' && alcohol <= 1) ||
      (level === '可以有一点' && alcohol <= 2) ||
      (level === '想明显微醺' && alcohol >= 2 && alcohol <= 3) ||
      (level === '想要酒感强一点' && alcohol >= 3)
    const flavorMatched = !flavor || tags.includes(flavor)
    const buyMatched =
      !buy ||
      tags.includes(buy) ||
      scenes.includes(buy) ||
      (buy === '家里现有' && tags.includes('低门槛')) ||
      (buy === '外卖/电商' && item.type === 'recipe')
    return levelMatched && flavorMatched && buyMatched
  }).slice(0, 8)
}

function materialNames(item) {
  const values = []
  Object.keys(item.materials || {}).forEach((group) => {
    ;(item.materials[group] || []).forEach((line) => {
      values.push(line.replace(/\s*\d+.*$/, '').replace(/或.*/, '').trim())
    })
  })
  return values
}

// 材料同义词映射：材料行文本中的关键词 → pantryGroups 里的标准名
const MATERIAL_ALIASES = {
  '苏打水': '气泡水', '苏打': '气泡水',
  '葡萄柚汽水': '葡萄柚汁', '葡萄柚': '葡萄柚汁',
  '橙味利口酒': '橙味利口酒',
  '樱桃利口酒': '甜味美思',
  '紫罗兰利口酒': '甜味美思',
  '覆盆子糖浆': '糖',
  '莓果糖浆': '糖',
  '咖啡利口酒': '咖啡', '冷萃咖啡': '咖啡', '浓缩咖啡': '咖啡',
  '甜味美思': '甜味美思', '苦精': '苦精',
  '安格斯图拉苦精': '苦精', '佩肖苦精': '苦精',
  '苦艾酒': '苦精',
  '金巴利': '金巴利', '阿玛罗': '金巴利',
  '阿佩罗': '阿佩罗', '黄查特酒': '阿佩罗',
  '橙皮': '橙味利口酒', '橙子': '橙汁',
  '青柠汁': '青柠', '柠檬汁': '柠檬', '柠檬茶': '茶',
  '蜂蜜糖浆': '蜂蜜', '蜂蜜姜糖浆': '蜂蜜',
  '姜糖浆': '姜汁汽水', '姜汁': '姜汁汽水', '姜啤': '姜汁汽水',
  '菠萝汁': '菠萝汁', '蔓越莓汁': '蔓越莓汁',
  '蛋清': '蛋清', '杏仁糖浆': '糖',
  '无糖乌龙茶': '茶', '无糖绿茶': '绿茶', '柠檬味气泡水': '气泡水',
  '方糖': '糖', '糖浆': '糖', '盐边': '盐',
  '冰杯': '冰块',
  '红/白果酒': '果酒', '低度红酒': '果酒',
  '水果': '柠檬', '水果片': '柠檬', '水果盒': '柠檬'
}

// 基酒关键词 → 标准名
const BASE_KEYWORDS = {
  '金酒': '金酒', 'gin': '金酒',
  '伏特加': '伏特加', 'vodka': '伏特加',
  '威士忌': '威士忌', 'whisky': '威士忌', 'whiskey': '威士忌',
  '朗姆': '朗姆', 'rum': '朗姆', '白朗姆': '朗姆', '黑朗姆': '朗姆',
  '龙舌兰': '龙舌兰', 'tequila': '龙舌兰', '梅斯卡尔': '龙舌兰', 'mezcal': '龙舌兰',
  '干邑': '干邑', '白兰地': '白兰地', 'brandy': '白兰地', 'cognac': '干邑',
  '波本': '威士忌', '黑麦威士忌': '威士忌', '调和威士忌': '威士忌',
  '百利甜': '百利甜', '利口酒': '百利甜', '奶酒': '百利甜',
  '野格': '野格', 'jager': '野格',
  '梅酒': '梅酒', '梅子酒': '梅酒',
  '清酒': '清酒', 'sake': '清酒', '日本酒': '清酒',
  '果酒': '果酒', '起泡酒': '起泡酒', 'sparkling': '起泡酒',
  '阿佩罗': '起泡酒', 'aperol': '起泡酒'
}

function recipeRequirementNames(item) {
  const lines = (item.materials && item.materials.simple) || (item.materials && item.materials.standard) || []
  const allPantryItems = (data.pantryGroups || []).reduce((acc, g) => acc.concat(g.items || []), [])
  const allNames = new Set(allPantryItems)

  return lines.map((line) => {
    // 1. 先查材料同义词映射
    for (const [keyword, standardName] of Object.entries(MATERIAL_ALIASES)) {
      if (line.includes(keyword) && allNames.has(standardName)) return standardName
    }
    // 2. 再查基酒关键词
    const lineLower = line.toLowerCase()
    for (const [keyword, standardName] of Object.entries(BASE_KEYWORDS)) {
      if (lineLower.includes(keyword)) return standardName
    }
    // 3. 最后模糊匹配 pantryGroups 里的标准名
    for (const name of allNames) {
      if (line.includes(name)) return name
    }
    // 4. 兜底：去掉数量后缀作为材料名
    return line.replace(/\s+\d+.*$/, '').replace(/或.*$/, '').trim()
  }).filter((name) => name && name !== '冰块')
}

function pantryRecommend(selected) {
  const selectedSet = new Set(selected || [])
  if (selectedSet.has('干邑')) selectedSet.add('白兰地')
  if (selectedSet.has('白兰地')) selectedSet.add('干邑')
  if (selectedSet.has('波本')) selectedSet.add('威士忌')
  if (selectedSet.has('威士忌')) selectedSet.add('波本')
  const result = {
    ready: [],
    missingOne: [],
    convenienceFill: [],
    upgrade: []
  }

  data.recipes.filter(isVisibleItem).forEach((recipe) => {
    const requirements = Array.from(new Set(recipeRequirementNames(recipe)))
    const missing = requirements.filter((name) => !selectedSet.has(name))
    const hitCount = requirements.length - missing.length
    const withMeta = Object.assign({}, recipe, { missing })

    if (missing.length === 0) {
      result.ready.push(withMeta)
    } else if (missing.length === 1 && hitCount > 0) {
      result.missingOne.push(withMeta)
    } else if (missing.length <= 2 && missing.some((name) => ['可乐', '雪碧', '气泡水', '汤力水', '橙汁', '葡萄柚汁', '苹果汁', '牛奶', '冰块', '柠檬'].includes(name))) {
      result.convenienceFill.push(withMeta)
    } else if (hitCount >= 2) {
      result.upgrade.push(withMeta)
    }
  })

  Object.keys(result).forEach((key) => {
    result[key] = result[key].slice(0, 6)
  })

  return result
}

module.exports = {
  useContent,
  getContent,
  getAllItems,
  findRecipe,
  findScheme,
  findDetail,
  findBase,
  findIngredient,
  getItemsByIds,
  search,
  filterByTag,
  filterConvenience,
  beginnerRecommend,
  materialNames,
  pantryRecommend
}
