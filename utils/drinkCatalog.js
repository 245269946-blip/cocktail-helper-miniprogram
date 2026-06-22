/**
 * Drink catalog data layer.
 *
 * This file only defines drink structures, drink metadata, P2 image paths,
 * and pure query helpers. It is intentionally not wired to pages yet.
 */

function toKebabId(id) {
  return String(id || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

const ASSET_OVERRIDES = {
  ginTonic: 'gin',
  whiskyOolong: 'whiskey-highball',
  umeshuSoda: 'whiskey-highball',
  umeshuOolong: 'whiskey-highball',
  sakeHighball: 'vodka-soda',
  sakeGreenTea: 'vodka-soda',
  coffeeTonic: 'vodka-soda',
  fruitWineSpritz: 'paloma',
  sangriaLight: 'cola-bucket',
  baileysMilk: 'white-russian',
  baileysCoffee: 'white-russian',
  jagerCola: 'cola-bucket',
  cvGinTonic: 'gin',
  cvTeaLight: 'whiskey-highball',
  cvFruitLow: 'paloma',
  cvMilkSoft: 'white-russian',
  cvNonalcoholFresh: 'vodka-soda',
  cvFreshTipsy: 'vodka-soda'
}

function buildAssets(id) {
  const kebab = ASSET_OVERRIDES[id] || toKebabId(id)
  const card = `/assets/p2/recipe-${kebab}-card.png`
  const hero = `/assets/p2/recipe-${kebab}-hero.png`
  return {
    base: card,
    card,
    hero
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '')
}

const DRINK_STRUCTURES = [
  {
    id: 'highball',
    name: '长饮气泡型',
    subtitle: '加冰、加气泡、好入口',
    description: '适合新手、便利店、下班放松和夏天晚上。核心是用气泡、冰块和长饮比例降低酒精冲击感。',
    drinkIds: ['ginTonic', 'whiskeyHighball', 'cubaLibre', 'vodkaSoda', 'moscowMule', 'paloma']
  },
  {
    id: 'juice',
    name: '果汁好入口型',
    subtitle: '果味明显，酒感更柔和',
    description: '适合第一次尝试、甜口、低门槛和便利店果汁搭配场景。',
    drinkIds: ['screwdriver', 'seaBreeze', 'tequilaSunrise']
  },
  {
    id: 'sour',
    name: '酸甜经典型',
    subtitle: '酸、甜、酒感的经典平衡',
    description: '适合从基础配方进阶到经典鸡尾酒的人，强调柑橘、糖和基酒骨架。',
    drinkIds: ['margarita', 'whiskeySour', 'daiquiri']
  },
  {
    id: 'muddle',
    name: '青柠捣压型',
    subtitle: '青柠、冰块、清爽直接',
    description: '适合夏夜、朋友小聚和清爽口感偏好，识别重点是捣压青柠和清爽冰感。',
    drinkIds: ['mojito', 'caipirinha']
  },
  {
    id: 'coffeeCream',
    name: '咖啡奶感型',
    subtitle: '顺滑、微醺、夜晚放松',
    description: '适合喜欢咖啡、奶香、甜苦和夜晚放松感的人。',
    drinkIds: ['espressoMartini', 'whiteRussian']
  },
  {
    id: 'share',
    name: '朋友局分享型',
    subtitle: '大容量、好凑材料、适合多人',
    description: '适合便利店采购、聚会和朋友局，强调材料好买、出杯轻松和分享感。',
    drinkIds: ['colaBucket', 'sangria']
  }
]

const DRINKS = [
  {
    id: 'ginTonic',
    name: '金汤力',
    englishName: 'Gin Tonic',
    aliases: ['金汤力', 'gin tonic', 'gin and tonic', '金酒汤力', '金酒兑汤力水'],
    structure: 'highball',
    baseSpirit: '金酒',
    flavorTags: ['清爽', '微苦', '气泡感', '柑橘'],
    sceneTags: ['新手第一杯', '下班放松', '夏天晚上', '不想太甜', '便利店调酒'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('ginTonic')
  },
  {
    id: 'whiskeyHighball',
    name: '威士忌高球',
    englishName: 'Whiskey Highball',
    aliases: ['威士忌高球', '威士忌嗨棒', 'highball', 'whiskey highball', 'whisky highball'],
    structure: 'highball',
    baseSpirit: '威士忌',
    flavorTags: ['清爽', '气泡感', '微苦', '酒感明确'],
    sceneTags: ['下班放松', '夜晚放松', '不想太甜', '适合在家做'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('whiskeyHighball')
  },
  {
    id: 'cubaLibre',
    name: '自由古巴',
    englishName: 'Cuba Libre',
    aliases: ['自由古巴', '朗姆可乐', 'rum cola', 'cuba libre', '可乐朗姆'],
    structure: 'highball',
    baseSpirit: '朗姆',
    flavorTags: ['甜口', '气泡感', '酸甜', '可乐感'],
    sceneTags: ['朋友小聚', '聚会', '便利店调酒', '新手友好'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('cubaLibre')
  },
  {
    id: 'vodkaSoda',
    name: '伏特加苏打',
    englishName: 'Vodka Soda',
    aliases: ['伏特加苏打', 'vodka soda', '伏特加气泡水', '伏特加兑苏打'],
    structure: 'highball',
    baseSpirit: '伏特加',
    flavorTags: ['清爽', '低糖', '气泡感', '干净'],
    sceneTags: ['低负担', '下班放松', '不想太甜', '便利店调酒'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('vodkaSoda')
  },
  {
    id: 'moscowMule',
    name: '莫斯科骡子',
    englishName: 'Moscow Mule',
    aliases: ['莫斯科骡子', 'moscow mule', '伏特加姜汁汽水', '姜汁伏特加'],
    structure: 'highball',
    baseSpirit: '伏特加',
    flavorTags: ['姜味', '清爽', '酸甜', '气泡感'],
    sceneTags: ['夏天晚上', '朋友小聚', '进阶尝试', '便利店调酒'],
    difficulty: 2,
    time: '4 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('moscowMule')
  },
  {
    id: 'paloma',
    name: '帕洛玛',
    englishName: 'Paloma',
    aliases: ['帕洛玛', 'paloma', '龙舌兰葡萄柚', 'tequila grapefruit'],
    structure: 'highball',
    baseSpirit: '龙舌兰',
    flavorTags: ['酸甜', '果味', '清爽', '气泡感'],
    sceneTags: ['夏天晚上', '朋友小聚', '清爽果味', '新手进阶'],
    difficulty: 2,
    time: '4 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('paloma')
  },
  {
    id: 'screwdriver',
    name: '螺丝刀',
    englishName: 'Screwdriver',
    aliases: ['螺丝刀', 'screwdriver', '伏特加橙汁', 'vodka orange'],
    structure: 'juice',
    baseSpirit: '伏特加',
    flavorTags: ['果味', '甜口', '橙汁', '低门槛'],
    sceneTags: ['新手第一杯', '便利店调酒', '朋友小聚', '甜口入门'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('screwdriver')
  },
  {
    id: 'seaBreeze',
    name: '海风',
    englishName: 'Sea Breeze',
    aliases: ['海风', 'sea breeze', '伏特加蔓越莓', '蔓越莓葡萄柚'],
    structure: 'juice',
    baseSpirit: '伏特加',
    flavorTags: ['果味', '酸甜', '清爽', '低门槛'],
    sceneTags: ['女生微醺', '朋友小聚', '新手友好', '便利店调酒'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('seaBreeze')
  },
  {
    id: 'tequilaSunrise',
    name: '龙舌兰日出',
    englishName: 'Tequila Sunrise',
    aliases: ['龙舌兰日出', 'tequila sunrise', '龙舌兰橙汁', '日出鸡尾酒'],
    structure: 'juice',
    baseSpirit: '龙舌兰',
    flavorTags: ['果味', '甜口', '橙汁', '视觉感'],
    sceneTags: ['新手进阶', '聚会', '朋友小聚', '甜口入门'],
    difficulty: 2,
    time: '4 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('tequilaSunrise')
  },
  {
    id: 'margarita',
    name: '玛格丽特',
    englishName: 'Margarita',
    aliases: ['玛格丽特', 'margarita', '龙舌兰酸甜', '盐边龙舌兰'],
    structure: 'sour',
    baseSpirit: '龙舌兰',
    flavorTags: ['酸甜', '经典', '盐边', '酒感明确'],
    sceneTags: ['进阶尝试', '朋友小聚', '经典鸡尾酒', '酸甜爱好者'],
    difficulty: 3,
    time: '5 分钟',
    alcoholLevel: 3,
    convenienceFriendly: false,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('margarita')
  },
  {
    id: 'whiskeySour',
    name: '威士忌酸',
    englishName: 'Whiskey Sour',
    aliases: ['威士忌酸', 'whiskey sour', '威士忌酸甜', '威士忌柠檬'],
    structure: 'sour',
    baseSpirit: '威士忌',
    flavorTags: ['酸甜', '经典', '酒感明确', '泡沫感'],
    sceneTags: ['进阶尝试', '夜晚放松', '经典鸡尾酒', '适合在家做'],
    difficulty: 3,
    time: '5 分钟',
    alcoholLevel: 3,
    convenienceFriendly: false,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('whiskeySour')
  },
  {
    id: 'daiquiri',
    name: '戴基里',
    englishName: 'Daiquiri',
    aliases: ['戴基里', 'daiquiri', '朗姆酸甜', '经典戴基里'],
    structure: 'sour',
    baseSpirit: '朗姆',
    flavorTags: ['酸甜', '清爽', '经典', '简洁'],
    sceneTags: ['经典鸡尾酒', '夏天晚上', '进阶尝试', '酸甜爱好者'],
    difficulty: 2,
    time: '4 分钟',
    alcoholLevel: 3,
    convenienceFriendly: false,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('daiquiri')
  },
  {
    id: 'mojito',
    name: '莫吉托',
    englishName: 'Mojito',
    aliases: ['莫吉托', 'mojito', '朗姆薄荷', '薄荷青柠朗姆'],
    structure: 'muddle',
    baseSpirit: '朗姆',
    flavorTags: ['清爽', '薄荷', '酸甜', '气泡感'],
    sceneTags: ['夏天晚上', '朋友小聚', '新手友好', '清爽果味'],
    difficulty: 2,
    time: '5 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('mojito')
  },
  {
    id: 'caipirinha',
    name: '卡琵莉亚',
    englishName: 'Caipirinha',
    aliases: ['卡琵莉亚', 'caipirinha', '卡皮莉亚', '卡莎萨青柠'],
    structure: 'muddle',
    baseSpirit: '卡莎萨',
    flavorTags: ['青柠', '酸甜', '清爽', '捣压感'],
    sceneTags: ['夏天晚上', '朋友小聚', '清爽果味', '新手进阶'],
    difficulty: 2,
    time: '5 分钟',
    alcoholLevel: 3,
    convenienceFriendly: false,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('caipirinha')
  },
  {
    id: 'espressoMartini',
    name: '浓缩马天尼',
    englishName: 'Espresso Martini',
    aliases: ['浓缩马天尼', 'espresso martini', '咖啡马天尼', '伏特加咖啡'],
    structure: 'coffeeCream',
    baseSpirit: '伏特加',
    flavorTags: ['咖啡感', '苦甜', '进阶', '夜晚'],
    sceneTags: ['夜晚放松', '进阶尝试', '咖啡爱好者', '朋友小聚'],
    difficulty: 3,
    time: '5 分钟',
    alcoholLevel: 3,
    convenienceFriendly: false,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('espressoMartini')
  },
  {
    id: 'whiteRussian',
    name: '白俄罗斯',
    englishName: 'White Russian',
    aliases: ['白俄罗斯', 'white russian', '伏特加咖啡奶', '咖啡奶酒'],
    structure: 'coffeeCream',
    baseSpirit: '伏特加',
    flavorTags: ['咖啡感', '奶香', '顺滑', '甜苦'],
    sceneTags: ['夜晚放松', '甜口入门', '咖啡爱好者', '适合在家做'],
    difficulty: 1,
    time: '3 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('whiteRussian')
  },
  {
    id: 'colaBucket',
    name: '可乐桶',
    englishName: 'Cola Bucket',
    aliases: ['可乐桶', 'cola bucket', '可乐酒桶', '朋友局可乐桶', '威士忌可乐桶'],
    structure: 'share',
    baseSpirit: '威士忌',
    flavorTags: ['甜口', '可乐感', '气泡感', '大容量'],
    sceneTags: ['朋友小聚', '聚会', '便利店调酒', '适合分享'],
    difficulty: 1,
    time: '5 分钟',
    alcoholLevel: 3,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: true,
    assets: buildAssets('colaBucket')
  },
  {
    id: 'sangria',
    name: '桑格利亚',
    englishName: 'Sangria',
    aliases: ['桑格利亚', 'sangria', '水果酒壶', '红酒水果桶'],
    structure: 'share',
    baseSpirit: '红酒',
    flavorTags: ['果味', '甜口', '低酒感', '大容量'],
    sceneTags: ['朋友小聚', '聚会', '适合分享', '周末'],
    difficulty: 2,
    time: '10 分钟',
    alcoholLevel: 2,
    convenienceFriendly: true,
    homeFriendly: true,
    recommended: false,
    assets: buildAssets('sangriaLight')
  }
]

const DRINK_MAP = DRINKS.reduce((map, drink) => {
  map[drink.id] = drink
  return map
}, {})

function getDrinkById(id) {
  return DRINK_MAP[id] || null
}

function getDrinksByStructure(structureId) {
  const structure = DRINK_STRUCTURES.find((item) => item.id === structureId)
  if (!structure) return []
  return structure.drinkIds.map(getDrinkById).filter(Boolean)
}

function getDrinksByScene(sceneTag) {
  const key = normalizeText(sceneTag)
  if (!key) return []
  return DRINKS.filter((drink) => (drink.sceneTags || []).some((tag) => normalizeText(tag).includes(key) || key.includes(normalizeText(tag))))
}

function getDrinksByBaseSpirit(baseSpirit) {
  const key = normalizeText(baseSpirit)
  if (!key) return []
  return DRINKS.filter((drink) => {
    const value = normalizeText(drink.baseSpirit)
    return value.includes(key) || key.includes(value)
  })
}

function getRecommendedDrinks() {
  return DRINKS.filter((drink) => drink.recommended)
}

function searchDrinks(query) {
  const key = normalizeText(query)
  if (!key) return []

  const structureById = DRINK_STRUCTURES.reduce((map, structure) => {
    map[structure.id] = structure
    return map
  }, {})

  return DRINKS.map((drink, index) => {
    const structure = structureById[drink.structure]
    const names = [drink.id, drink.name, drink.englishName, ...(drink.aliases || [])].map(normalizeText)
    const tags = [
      drink.baseSpirit,
      drink.structure,
      structure && structure.name,
      structure && structure.subtitle,
      ...(drink.flavorTags || []),
      ...(drink.sceneTags || [])
    ].filter(Boolean).map(normalizeText)

    let score = 0
    const exactNameMatch = names.some((name) => name === key)
    const fuzzyNameMatch = names.some((name) => name.includes(key) || key.includes(name))
    const exactTagMatch = tags.some((tag) => tag === key)
    const fuzzyTagMatch = tags.some((tag) => tag.includes(key))

    if (exactNameMatch) score += 100
    if (fuzzyNameMatch) score += 60
    if (exactTagMatch) score += 40
    if (fuzzyTagMatch) score += 20

    if (score > 0) {
      if (drink.recommended) score += 5
      if (drink.convenienceFriendly) score += 2
      if (drink.homeFriendly) score += 1
    }

    return { drink, score, index }
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.drink)
}

module.exports = {
  DRINK_STRUCTURES,
  DRINKS,
  getDrinkById,
  searchDrinks,
  getDrinksByStructure,
  getDrinksByScene,
  getDrinksByBaseSpirit,
  getRecommendedDrinks
}
