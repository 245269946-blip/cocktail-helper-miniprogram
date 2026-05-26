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

function getAllItems() {
  return data.recipes.concat(data.schemes)
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
  return (ids || []).map((id) => findDetail(id)).filter(Boolean)
}

function search(keyword) {
  const key = normalizeText(keyword)
  if (!key) return []

  const intentTags = []
  if (key.includes('便利店')) intentTags.push('便利店')
  if (key.includes('女生')) intentTags.push('女生更容易接受', '甜口', '奶香')
  if (key.includes('不苦')) intentTags.push('甜口', '果味', '奶香')
  if (key.includes('新手')) intentTags.push('新手友好', '低门槛')
  if (key.includes('低酒精') || key.includes('微醺')) intentTags.push('低酒精', '微醺')
  if (key.includes('家里')) intentTags.push('低门槛', '家里')

  const direct = getAllItems().filter((item) => {
    const fields = [
      item.name,
      item.enName,
      item.base,
      item.reason,
      ...(item.aliases || []),
      ...(item.tags || []),
      ...(item.scenes || [])
    ]
    return fields.some((field) => {
      const text = normalizeText(field)
      return text.includes(key) || (text.length >= 2 && key.includes(text))
    })
  })

  const intent = intentTags.length ? getAllItems().filter((item) => {
    const fields = (item.tags || []).concat(item.scenes || [])
    return fields.some((field) => intentTags.includes(field))
  }) : []

  const merged = []
  direct.concat(intent).forEach((item) => {
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

function recipeRequirementNames(item) {
  const lines = (item.materials && item.materials.simple) || (item.materials && item.materials.standard) || []
  return lines.map((line) => {
    if (line.includes('金酒')) return '金酒'
    if (line.includes('伏特加')) return '伏特加'
    if (line.includes('威士忌')) return '威士忌'
    if (line.includes('朗姆')) return '朗姆'
    if (line.includes('龙舌兰')) return '龙舌兰'
    if (line.includes('百利甜')) return '百利甜'
    if (line.includes('野格')) return '野格'
    if (line.includes('梅酒')) return '梅酒'
    if (line.includes('果酒')) return '果酒'
    if (line.includes('起泡酒')) return '起泡酒'
    if (line.includes('可乐')) return '可乐'
    if (line.includes('雪碧')) return '雪碧'
    if (line.includes('汤力')) return '汤力水'
    if (line.includes('葡萄柚')) return '葡萄柚汁'
    if (line.includes('苹果汁')) return '苹果汁'
    if (line.includes('能量')) return '能量饮料'
    if (line.includes('气泡') || line.includes('苏打')) return '气泡水'
    if (line.includes('橙汁')) return '橙汁'
    if (line.includes('咖啡')) return '咖啡'
    if (line.includes('牛奶')) return '牛奶'
    if (line.includes('茶')) return '茶'
    if (line.includes('柠檬') || line.includes('青柠')) return '柠檬'
    if (line.includes('冰')) return '冰块'
    if (line.includes('糖')) return '糖'
    if (line.includes('薄荷')) return '薄荷'
    return line
  })
}

function pantryRecommend(selected) {
  const selectedSet = new Set(selected || [])
  const result = {
    ready: [],
    missingOne: [],
    convenienceFill: [],
    upgrade: []
  }

  data.recipes.forEach((recipe) => {
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
