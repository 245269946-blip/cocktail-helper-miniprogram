const ingredientSlugs = {
  '可乐': 'cola',
  '雪碧': 'sprite',
  '气泡水': 'soda-water',
  '苏打水': 'soda-water',
  '汤力水': 'tonic-water',
  '果汁': 'juice',
  '橙汁': 'orange-juice',
  '葡萄柚汁': 'grapefruit-juice',
  '西柚汁': 'grapefruit-juice',
  '乌龙茶': 'oolong',
  '柠檬茶': 'lemon-tea',
  '绿茶': 'green-tea',
  '冷萃咖啡': 'cold-brew',
  '浓缩咖啡': 'espresso',
  '咖啡': 'coffee',
  '茶': 'tea',
  '牛奶': 'milk',
  '椰奶': 'coconut-milk',
  '柠檬': 'lemon',
  '青柠': 'lime',
  '橙子': 'orange',
  '薄荷': 'mint',
  '冰块': 'ice',
  '糖': 'sugar',
  '盐': 'salt',
  '蜂蜜': 'honey'
}

const DEFAULT_HERO = '/assets/p2/recipe-gin-tonic-hero.png'
const DEFAULT_CARD = '/assets/p2/recipe-gin-tonic-card.png'
const DEFAULT_LIST = DEFAULT_CARD
const DEFAULT_CONV = '/assets/p2/recipe-vodka-soda-card.png'
const DEFAULT_DECO = DEFAULT_HERO

const P2_BASE_POOL = {
  gin: '/assets/p2/recipe-gin-tonic-card.png',
  vodka: '/assets/p2/recipe-vodka-soda-card.png',
  whisky: '/assets/p2/recipe-whiskey-highball-card.png',
  rum: '/assets/p2/recipe-cuba-libre-card.png',
  tequila: '/assets/p2/recipe-margarita-card.png',
  brandy: '/assets/p2/recipe-sidecar-card.png',
  baileys: '/assets/p2/recipe-white-russian-card.png',
  jager: '/assets/p2/recipe-cola-bucket-card.png',
  sake: '/assets/p2/recipe-sake-highball-card.png',
  'plum-wine': '/assets/p2/recipe-umeshu-soda-card.png'
}

const visual = (slug) => ({
  card: `/assets/p2/recipe-${slug}-card.png`,
  hero: `/assets/p2/recipe-${slug}-hero.png`,
  thumb: `/assets/p2/recipe-${slug}-card.png`
})

const aliasVisual = (slug) => ({
  card: `/assets/p2/recipe-${slug}-card.png`,
  hero: `/assets/p2/recipe-${slug}-hero.png`,
  thumb: `/assets/p2/recipe-${slug}-card.png`
})

const P2_RECIPE_VISUALS = {
  'mojito': aliasVisual('mojito'),
  'gin-tonic': visual('gin-tonic'),
  'baileys-milk': aliasVisual('white-russian'),
  'whisky-cola': aliasVisual('cola-bucket'),
  'vodka-orange': aliasVisual('screwdriver'),
  'whisky-highball': aliasVisual('whiskey-highball'),
  'whisky-oolong': aliasVisual('whiskey-highball'),
  'espresso-martini': aliasVisual('espresso-martini'),
  'tom-collins': aliasVisual('tom-collins'),
  'negroni': aliasVisual('negroni'),
  'moscow-mule': aliasVisual('moscow-mule'),
  'vodka-soda': aliasVisual('vodka-soda'),
  'cuba-libre': aliasVisual('cuba-libre'),
  'daiquiri': aliasVisual('daiquiri'),
  'margarita': aliasVisual('margarita'),
  'paloma': aliasVisual('paloma'),
  'jager-cola': aliasVisual('cola-bucket'),
  'baileys-coffee': aliasVisual('white-russian'),
  'coffee-tonic': aliasVisual('vodka-soda'),
  'old-fashioned': aliasVisual('old-fashioned'),
  'umeshu-soda': aliasVisual('whiskey-highball'),
  'umeshu-oolong': aliasVisual('whiskey-highball'),
  'fruit-wine-spritz': aliasVisual('paloma'),
  'sangria-light': aliasVisual('cola-bucket'),
  'mimosa': aliasVisual('mimosa'),
  'aperol-spritz': aliasVisual('aperol-spritz'),
  'sea-breeze': aliasVisual('sea-breeze'),
  'sake-highball': aliasVisual('vodka-soda'),
  'sake-green-tea': aliasVisual('vodka-soda'),
  'whiskey-sour': aliasVisual('whiskey-sour'),
  'caipirinha': aliasVisual('caipirinha'),
  'white-russian': aliasVisual('white-russian'),
  'cola-bucket': aliasVisual('cola-bucket'),
  'dry-martini': aliasVisual('dry-martini'),
  'tequila-sunrise': aliasVisual('tequila-sunrise'),
  'cv-fresh-tipsy': aliasVisual('vodka-soda'),
  'cv-gin-tonic': visual('gin-tonic'),
  'cv-cuba-libre': aliasVisual('cuba-libre'),
  'cv-vodka-soda': aliasVisual('vodka-soda'),
  'cv-screwdriver': aliasVisual('screwdriver'),
  'cv-sweet-party': aliasVisual('cola-bucket'),
  'cv-milk-soft': aliasVisual('white-russian'),
  'cv-tea-light': aliasVisual('whiskey-highball'),
  'cv-fruit-low': aliasVisual('paloma'),
  'cv-coffee-night': aliasVisual('white-russian'),
  'cv-nonalcohol-fresh': aliasVisual('vodka-soda'),
  'supermarket-party': aliasVisual('cola-bucket'),
  'aviation': aliasVisual('aviation'),
  'bees-knees': aliasVisual('bees-knees'),
  'clover-club': aliasVisual('clover-club'),
  'french-75': aliasVisual('french-75'),
  'manhattan': aliasVisual('manhattan'),
  'boulevardier': aliasVisual('boulevardier'),
  'sazerac': aliasVisual('sazerac'),
  'penicillin': aliasVisual('penicillin'),
  'paper-plane': aliasVisual('paper-plane'),
  'mai-tai': aliasVisual('mai-tai'),
  'jungle-bird': aliasVisual('jungle-bird'),
  'dark-n-stormy': aliasVisual('dark-n-stormy'),
  'tommys-margarita': aliasVisual('tommys-margarita'),
  'naked-and-famous': aliasVisual('naked-and-famous'),
  'cosmopolitan': aliasVisual('cosmopolitan'),
  'sidecar': aliasVisual('sidecar')
}

const P2_RECIPE_ALIASES = {
  '金汤力': 'gin-tonic',
  '金酒雪碧': 'gin-tonic',
  '汤姆柯林斯': 'tom-collins',
  '内格罗尼': 'negroni',
  '伏特加橙汁': 'vodka-orange',
  '螺丝刀': 'vodka-orange',
  '伏特加苏打': 'vodka-soda',
  '莫斯科骡子': 'moscow-mule',
  '浓缩咖啡马天尼': 'espresso-martini',
  '咖啡马天尼': 'espresso-martini',
  '威士忌嗨棒': 'whisky-highball',
  '威士忌高球': 'whisky-highball',
  '威士忌可乐': 'whisky-cola',
  '威士忌乌龙': 'whisky-oolong',
  '古典鸡尾酒': 'old-fashioned',
  '莫吉托': 'mojito',
  '自由古巴': 'cuba-libre',
  '朗姆可乐': 'cuba-libre',
  '朗姆雪碧': 'cuba-libre',
  '龙舌兰雪碧': 'tequila-sunrise',
  '玛格丽特': 'margarita',
  '百利甜牛奶': 'baileys-milk',
  '百利甜咖啡': 'baileys-coffee',
  '野格可乐': 'jager-cola',
  '野格红牛': 'jager-cola',
  '梅酒苏打': 'umeshu-soda',
  '梅酒乌龙': 'umeshu-oolong',
  '清酒嗨棒': 'sake-highball',
  '清酒绿茶': 'sake-green-tea',
  '清酒雪碧': 'sake-highball',
  '含羞草': 'mimosa',
  '果酒气泡杯': 'fruit-wine-spritz',
  '简易桑格利亚': 'sangria-light',
  '咖啡汤力': 'coffee-tonic',
  '伏特加茶饮': 'cv-tea-light',
  '帕洛玛': 'paloma',
  '阿佩罗橙光': 'aperol-spritz',
  '代基里': 'daiquiri',
  '戴基里': 'daiquiri',
  '伏特加葡萄柚': 'sea-breeze',
  '海风': 'sea-breeze',
  '威士忌苹果汁': 'whisky-highball',
  '伏特加苹果汁': 'vodka-orange',
  '龙舌兰日出': 'tequila-sunrise',
  '威士忌酸': 'whiskey-sour',
  '卡琵莉亚': 'caipirinha',
  '卡皮莉亚': 'caipirinha',
  '白俄罗斯': 'white-russian',
  '可乐桶': 'cola-bucket',
  '干马天尼': 'dry-martini',
  '干马丁尼': 'dry-martini',
  '飞行': 'aviation',
  '蜂之膝': 'bees-knees',
  '蜂膝': 'bees-knees',
  '三叶草俱乐部': 'clover-club',
  '三叶草': 'clover-club',
  '法式75': 'french-75',
  '法国75': 'french-75',
  '曼哈顿': 'manhattan',
  '林荫大道': 'boulevardier',
  '布尔瓦迪耶': 'boulevardier',
  '萨泽拉克': 'sazerac',
  '盘尼西林': 'penicillin',
  '纸飞机': 'paper-plane',
  '迈泰': 'mai-tai',
  '丛林鸟': 'jungle-bird',
  '黑暗风暴': 'dark-n-stormy',
  '汤米玛格丽特': 'tommys-margarita',
  '裸与成名': 'naked-and-famous',
  '大都会': 'cosmopolitan',
  '边车': 'sidecar'
}

const BASE_PATHS = {
  'mojito': '/assets/p2/recipe-mojito-card.png',
  'gin-tonic': '/assets/p2/recipe-gin-tonic-card.png',
  'baileys-milk': '/assets/p2/recipe-white-russian-card.png',
  'whisky-cola': '/assets/p2/recipe-cola-bucket-card.png',
  'vodka-orange': '/assets/p2/recipe-screwdriver-card.png',
  'whisky-highball': '/assets/p2/recipe-whiskey-highball-card.png',
  'whisky-oolong': '/assets/p2/recipe-whiskey-highball-card.png',
  'espresso-martini': '/assets/p2/recipe-espresso-martini-card.png',
  'tom-collins': '/assets/p2/recipe-tom-collins-card.png',
  'negroni': '/assets/p2/recipe-negroni-card.png',
  'moscow-mule': '/assets/p2/recipe-moscow-mule-card.png',
  'vodka-soda': '/assets/p2/recipe-vodka-soda-card.png',
  'cuba-libre': '/assets/p2/recipe-cuba-libre-card.png',
  'daiquiri': '/assets/p2/recipe-daiquiri-card.png',
  'margarita': '/assets/p2/recipe-margarita-card.png',
  'paloma': '/assets/p2/recipe-paloma-card.png',
  'jager-cola': '/assets/p2/recipe-cola-bucket-card.png',
  'baileys-coffee': '/assets/p2/recipe-white-russian-card.png',
  'coffee-tonic': '/assets/p2/recipe-vodka-soda-card.png',
  'old-fashioned': '/assets/p2/recipe-old-fashioned-card.png',
  'umeshu-soda': '/assets/p2/recipe-whiskey-highball-card.png',
  'umeshu-oolong': '/assets/p2/recipe-whiskey-highball-card.png',
  'fruit-wine-spritz': '/assets/p2/recipe-paloma-card.png',
  'sangria-light': '/assets/p2/recipe-cola-bucket-card.png',
  'mimosa': '/assets/p2/recipe-mimosa-card.png',
  'aperol-spritz': '/assets/p2/recipe-aperol-spritz-card.png',
  'sea-breeze': '/assets/p2/recipe-sea-breeze-card.png',
  'sake-highball': '/assets/p2/recipe-vodka-soda-card.png',
  'sake-green-tea': '/assets/p2/recipe-vodka-soda-card.png',
  'whiskey-sour': '/assets/p2/recipe-whiskey-sour-card.png',
  'caipirinha': '/assets/p2/recipe-caipirinha-card.png',
  'white-russian': '/assets/p2/recipe-white-russian-card.png',
  'cola-bucket': '/assets/p2/recipe-cola-bucket-card.png',
  'dry-martini': '/assets/p2/recipe-dry-martini-card.png',
  'tequila-sunrise': '/assets/p2/recipe-tequila-sunrise-card.png',
  'aviation': '/assets/p2/recipe-aviation-card.png',
  'bees-knees': '/assets/p2/recipe-bees-knees-card.png',
  'clover-club': '/assets/p2/recipe-clover-club-card.png',
  'french-75': '/assets/p2/recipe-french-75-card.png',
  'manhattan': '/assets/p2/recipe-manhattan-card.png',
  'boulevardier': '/assets/p2/recipe-boulevardier-card.png',
  'sazerac': '/assets/p2/recipe-sazerac-card.png',
  'penicillin': '/assets/p2/recipe-penicillin-card.png',
  'paper-plane': '/assets/p2/recipe-paper-plane-card.png',
  'mai-tai': '/assets/p2/recipe-mai-tai-card.png',
  'jungle-bird': '/assets/p2/recipe-jungle-bird-card.png',
  'dark-n-stormy': '/assets/p2/recipe-dark-n-stormy-card.png',
  'tommys-margarita': '/assets/p2/recipe-tommys-margarita-card.png',
  'naked-and-famous': '/assets/p2/recipe-naked-and-famous-card.png',
  'cosmopolitan': '/assets/p2/recipe-cosmopolitan-card.png',
  'sidecar': '/assets/p2/recipe-sidecar-card.png'
}

function resolveVisual(visual, variant) {
  if (!visual) return variant === 'card' ? DEFAULT_CARD : (variant === 'thumb' ? DEFAULT_LIST : DEFAULT_HERO)
  return visual[variant] || visual.hero || DEFAULT_HERO
}

function normalizeValues(itemOrId) {
  if (typeof itemOrId === 'string') return [itemOrId]
  if (!itemOrId) return []
  return [itemOrId.id, itemOrId.name, itemOrId.enName, itemOrId.englishName, itemOrId.base]
    .filter(Boolean)
    .map((value) => String(value))
}

function matchRecipeKey(itemOrId) {
  const values = normalizeValues(itemOrId)
  const joined = values.join(' ').toLowerCase()
  for (const value of values) {
    if (P2_RECIPE_VISUALS[value]) return value
  }
  for (const key of Object.keys(P2_RECIPE_VISUALS)) {
    if (joined.includes(key.toLowerCase())) return key
  }
  for (const [name, slug] of Object.entries(P2_RECIPE_ALIASES)) {
    if (joined.includes(name.toLowerCase())) return slug
  }
  return ''
}

function drinkPath(itemOrId, variant = 'hero') {
  const slug = matchRecipeKey(itemOrId)
  if (slug) return resolveVisual(P2_RECIPE_VISUALS[slug], variant)
  if (variant === 'card') return DEFAULT_CARD
  return variant === 'thumb' ? DEFAULT_LIST : DEFAULT_HERO
}

function basePath(itemOrId) {
  const slug = matchRecipeKey(itemOrId)
  if (slug && BASE_PATHS[slug]) return BASE_PATHS[slug]
  if (slug && P2_RECIPE_VISUALS[slug]) return resolveVisual(P2_RECIPE_VISUALS[slug], 'hero')
  const key = normalizeValues(itemOrId).join(' ').toLowerCase()
  if (key.includes('whisk') || key.includes('bourbon') || key.includes('威士忌')) return P2_BASE_POOL.whisky
  if (key.includes('gin') || key.includes('金酒')) return P2_BASE_POOL.gin
  if (key.includes('vodka') || key.includes('伏特加')) return P2_BASE_POOL.vodka
  if (key.includes('rum') || key.includes('朗姆')) return P2_BASE_POOL.rum
  if (key.includes('tequila') || key.includes('龙舌兰')) return P2_BASE_POOL.tequila
  if (key.includes('brandy') || key.includes('cognac') || key.includes('白兰地') || key.includes('干邑')) return P2_BASE_POOL.brandy
  if (key.includes('baileys') || key.includes('百利')) return P2_BASE_POOL.baileys
  if (key.includes('jager') || key.includes('野格')) return P2_BASE_POOL.jager
  if (key.includes('sake') || key.includes('清酒')) return P2_BASE_POOL.sake
  if (key.includes('plum') || key.includes('梅酒')) return P2_BASE_POOL['plum-wine']
  return DEFAULT_DECO
}

function ingredientPath(nameOrItem) {
  const name = typeof nameOrItem === 'string' ? nameOrItem : (nameOrItem && (nameOrItem.name || nameOrItem.id))
  const slug = ingredientSlugs[name] || name
  return slug ? `/assets/illustrations/ingredients/${slug}.png` : ''
}

function decorateDrink(item) {
  return Object.assign({}, item, { illustration: drinkPath(item) })
}

function decorateBase(item) {
  return Object.assign({}, item, { illustration: basePath(item) })
}

function decorateIngredient(item) {
  return Object.assign({}, item, { illustration: ingredientPath(item) })
}

function ingredientChoice(name) {
  return { name, illustration: ingredientPath(name) }
}

function ingredientGroups(groups) {
  return (groups || []).map((group) => Object.assign({}, group, {
    items: (group.items || []).map(ingredientChoice)
  }))
}

module.exports = {
  drinkPath,
  basePath,
  ingredientPath,
  decorateDrink,
  decorateBase,
  decorateIngredient,
  ingredientChoice,
  ingredientGroups,
  DEFAULT_HERO,
  DEFAULT_CARD,
  DEFAULT_LIST,
  DEFAULT_CONV,
  DEFAULT_DECO
}
