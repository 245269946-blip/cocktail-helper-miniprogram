const STAR_FULL = '★'
const STAR_EMPTY = '☆'
const illustrations = require('./illustrations')

function clampScore(value) {
  const number = Number(value || 0)
  if (number < 0) return 0
  if (number > 5) return 5
  return Math.round(number)
}

function stars(value) {
  const score = clampScore(value)
  return STAR_FULL.repeat(score) + STAR_EMPTY.repeat(5 - score)
}

function flavorNote(key, value) {
  const score = clampScore(value)
  const notes = {
    sweet: ['完全不甜', '很轻', '不腻', '顺口', '像饮料', '像甜品'],
    alcohol: ['无酒感', '很轻', '后面才有', '会慢慢有感觉', '别空腹喝', '适合老手'],
    fresh: ['厚重', '不冰爽', '还算清爽', '清爽顺口', '像冰饮', '很适合夏天'],
    tipsy: ['没负担', '轻轻微醺', '慢慢有感觉', '别喝太快', '别空腹喝', '后劲明显'],
    difficulty: ['倒一起就行', '新手友好', '稍微注意比例', '需要一点手法', '要工具', '进阶尝试']
  }
  return (notes[key] || [])[score] || ''
}

function flavorRows(item, compact) {
  const flavor = item.flavor || {}
  const tipsy = flavor.tipsy || flavor.alcohol || 0
  const rows = [
    { key: 'sweet', label: '甜度', value: clampScore(flavor.sweet), note: flavorNote('sweet', flavor.sweet) },
    { key: 'alcohol', label: '酒感', value: clampScore(flavor.alcohol), note: flavorNote('alcohol', flavor.alcohol) },
    { key: 'fresh', label: '清爽', value: clampScore(flavor.fresh), note: flavorNote('fresh', flavor.fresh) },
    { key: 'tipsy', label: '微醺', value: clampScore(tipsy), note: flavorNote('tipsy', tipsy) },
    { key: 'difficulty', label: '难度', value: clampScore(flavor.difficulty), note: flavorNote('difficulty', flavor.difficulty) }
  ].map((row) => Object.assign({}, row, { stars: stars(row.value), percent: row.value * 20 }))
  return compact ? rows.slice(0, 3) : rows
}

function audienceText(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  if (tags.includes('奶香') || tags.includes('甜口')) return '适合：怕酒味 / 饭后甜口'
  if (tags.includes('便利店') || tags.includes('聚会')) return '适合：朋友小聚 / 临时招待'
  if (flavor.fresh >= 4) return '适合：不爱甜 / 想喝清爽'
  if (flavor.alcohol <= 1) return '适合：第一次尝试 / 低酒感'
  return '适合：想轻松决定今晚喝什么'
}

function entryLine(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  if (item.name && item.name.includes('百利甜')) return '像液体巧克力一样，几乎喝不出酒味'
  if (item.name && (item.name.includes('可乐') || tags.includes('聚会'))) return '聚会最不容易翻车的一杯'
  if (item.name && item.name.includes('梅酒')) return '像夏天夜风一样的清爽感'
  if (tags.includes('便利店')) return '照着买就能做，适合今晚临时起意'
  if (flavor.fresh >= 4) return '前半口像冰饮，后面才慢慢有酒感'
  if (flavor.sweet >= 4) return '甜口顺滑，比想象中更像饮料'
  return item.reason || '这杯适合现在想轻松喝点的人'
}

function executionLine(item) {
  const flavor = item.flavor || {}
  const tags = item.tags || []
  const parts = []
  if (tags.includes('便利店') || item.type === 'scheme') parts.push('便利店能买齐')
  else parts.push('只买 2 样')
  parts.push(flavor.difficulty <= 1 ? '3 分钟' : '5 分钟')
  if (item.price) parts.push(item.price)
  else parts.push('新手成功率高')
  return parts.join(' · ')
}

function beginnerText(item) {
  const flavor = item.flavor || {}
  const tags = item.tags || []
  if (tags.includes('新手友好') || flavor.alcohol <= 1 || flavor.difficulty <= 1) return '新手友好'
  if (flavor.difficulty <= 2 && flavor.alcohol <= 3) return '新手可试'
  return '更适合喝过几次'
}

function convenienceText(item) {
  const tags = item.tags || []
  const materials = item.materials || {}
  if (item.type === 'scheme') return '照清单买'
  if (tags.includes('便利店') || (materials.convenience || []).length) return '便利店可做'
  return '建议家里备料'
}

function difficultyText(item) {
  const value = item.flavor && item.flavor.difficulty
  return flavorNote('difficulty', value)
}

function timeText(item) {
  const difficulty = item.flavor && item.flavor.difficulty
  if (difficulty <= 1) return '3 分钟'
  if (difficulty <= 3) return '5 分钟'
  return '认真做一杯'
}

function alcoholText(item) {
  const alcohol = item.flavor && item.flavor.alcohol
  if (alcohol <= 1) return '低酒感'
  if (alcohol <= 2) return '轻微醺'
  if (alcohol <= 3) return '微醺'
  return '酒感明显'
}

function materialCountText(item) {
  const materials = item.materials || {}
  const standard = materials.standard || []
  if (standard.length) return `${standard.length} 样`
  return item.type === 'scheme' ? '看清单' : '少材料'
}

function sceneFactText(item) {
  const scenes = item.scenes || []
  return scenes[0] || '今晚第一杯'
}

function basicFacts(item) {
  return [
    { label: '难度', value: timeText(item) },
    { label: '酒感', value: alcoholText(item) },
    { label: '材料', value: materialCountText(item) },
    { label: '场景', value: sceneFactText(item) }
  ]
}

function visualClass(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  const name = item.name || ''
  if (tags.includes('便利店') || item.type === 'scheme') return 'illo-convenience'
  if (tags.includes('奶香') || name.includes('百利甜') || name.includes('牛奶')) return 'illo-milky'
  if (tags.includes('果味') || tags.includes('酸甜') || name.includes('梅酒') || name.includes('橙')) return 'illo-fruity'
  if (tags.includes('微醺') || flavor.alcohol >= 3) return 'illo-tipsy'
  if (flavor.fresh >= 4 || tags.includes('清爽')) return 'illo-fresh'
  return 'illo-fruity'
}

function detailActionLine(item) {
  if ((item.id || '').indexOf('cv-') === 0) {
    return '先倒入小瓶酒，再补你喜欢的软饮；柠檬、薄荷这类辅料有就加，没有也不影响。'
  }
  const steps = item.steps || []
  if (steps.length) {
    return steps
      .slice(0, 3)
      .map((step) => step.replace(/[。.]$/, ''))
      .join('，')
      .replace(/，$/, '。') + '。'
  }
  return `${timeText(item)}，${convenienceText(item)}，${beginnerText(item)}。`
}

function materialSummary(item) {
  if ((item.id || '').indexOf('cv-') === 0) {
    return '便利店重点买小瓶酒、喜欢的软饮和冰杯；柠檬、薄荷等辅料都算加分项。'
  }
  const materials = item.materials || {}
  const standard = materials.standard || []
  if (!standard.length) return '展开后看材料和做法'
  const first = standard.slice(0, 2).join('；')
  const convenience = (materials.convenience || [])[1]
  return convenience ? `${first}；便利店版可用 ${convenience}` : first
}

function exploreOptions(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  if (flavor.fresh >= 4) {
    return [
      { title: '更清爽一点', desc: '气泡更多、甜度更低' },
      { title: '不苦版本', desc: '换雪碧或加柠檬' },
      { title: '更像果酒', desc: '梅酒苏打 / 果酒气泡' },
      { title: '夏夜推荐', desc: '少材料、冰爽、有气泡' }
    ]
  }
  if (tags.includes('甜口') || flavor.sweet >= 4) {
    return [
      { title: '更像奶茶一点', desc: '奶香更重、酒感更低' },
      { title: '更低酒感', desc: '像冰饮，后面才微醺' },
      { title: '更适合聚会', desc: '能做多杯，不容易翻车' },
      { title: '便利店也能做', desc: '只买 2-3 样' }
    ]
  }
  return [
    { title: '更适合新手', desc: '步骤更短、少工具' },
    { title: '更低酒感', desc: '喝起来更像饮料' },
    { title: '同样少材料', desc: '只买 2 样就能做' },
    { title: '便利店可替代', desc: '5 分钟买齐' }
  ]
}

function badgeText(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  if (tags.includes('经典') || flavor.fresh >= 4 && flavor.alcohol >= 2) return '经典推荐'
  if (tags.includes('便利店') || item.type === 'scheme') return '快手方案'
  if (flavor.sweet >= 4) return '甜口首选'
  if (flavor.alcohol <= 1) return '低酒感'
  if (flavor.difficulty <= 1) return '新手友好'
  return '第一杯推荐'
}

function metaTags(item) {
  const tags = []
  const base = item.base
  if (base) tags.push(base)
  tags.push(difficultyText(item))
  if ((item.tags || []).includes('便利店')) tags.push('便利店可做')
  return tags.slice(0, 3)
}

function resultCard(item) {
  return Object.assign({}, item, {
    /* 模板字段映射：enName → nameEn */
    nameEn: item.enName || '',
    /* 模板所需但原数据没有的字段 */
    badgeText: badgeText(item),
    quote: item.reason || '',
    metaTags: metaTags(item),
    /* 原有计算字段 */
    entryLine: entryLine(item),
    audienceText: audienceText(item),
    executionLine: executionLine(item),
    basicFacts: basicFacts(item),
    scoreRows: flavorRows(item, true),
    visualClass: visualClass(item),
    illustration: illustrations.drinkPath(item, 'hero'),
    thumbnail: illustrations.drinkPath(item, 'thumb')
  })
}

function detailView(item) {
  return Object.assign({}, item, {
    entryLine: entryLine(item),
    audienceText: audienceText(item),
    sceneText: ((item.scenes || []).slice(0, 3).join(' / ')) || '今晚想轻松喝点时',
    actionLine: detailActionLine(item),
    materialSummary: materialSummary(item),
    basicFacts: basicFacts(item),
    scoreRows: flavorRows(item, false),
    exploreOptions: exploreOptions(item),
    visualClass: visualClass(item),
    illustration: illustrations.drinkPath(item, 'hero'),
    thumbnail: illustrations.drinkPath(item, 'thumb')
  })
}

function packageView(item, index) {
  const names = ['711 今晚微醺套餐', '全家低酒感套餐', '宿舍便宜好喝套餐', '聚会不会翻车套餐']
  const title = names[index % names.length]
  return Object.assign({}, item, {
    packageTitle: title,
    packageIntro: entryLine(item),
    packageMeta: `${item.price || '约 35-55 元'} · 可做 ${index === 0 ? '3-4' : '2-3'} 杯 · ${item.flavor && item.flavor.difficulty <= 1 ? '成功率高' : '少买少错'}`,
    packageFit: `适合：${((item.scenes || []).slice(0, 2).join(' / ')) || '今晚临时想喝'}`,
    visualClass: visualClass(item),
    illustration: illustrations.drinkPath(item, 'hero'),
    thumbnail: illustrations.drinkPath(item, 'thumb')
  })
}

module.exports = {
  stars,
  flavorRows,
  visualClass,
  resultCard,
  detailView,
  exploreOptions,
  packageView
}
