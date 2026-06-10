const DEFAULT_PROCESS = {
  method: 'build',
  methodLabel: 'build',
  actionLine: '杯中加冰，倒入材料，轻轻搅匀后试味。',
  quickSteps: [
    { icon: 'ice', text: '加满冰', sub: '杯子先降温' },
    { icon: 'pour', text: '倒入材料', sub: '先酒后饮料' },
    { icon: 'stir', text: '轻轻搅匀', sub: '保留清爽感' }
  ],
  steps: ['杯中加满冰块。', '倒入基酒和搭配饮料。', '轻轻搅匀，试味后调整比例。']
}

const PROCESS_MAP = {
  'mojito': {
    method: 'muddle-build',
    methodLabel: 'muddle',
    actionLine: '先把青柠和薄荷轻轻压香，再加朗姆、冰和气泡水；薄荷不要捣碎到发苦。',
    quickSteps: [
      { icon: 'lime', text: '压青柠薄荷', sub: '只压出香气' },
      { icon: 'pour', text: '加朗姆和冰', sub: '冰要够多' },
      { icon: 'sparkle', text: '补气泡轻搅', sub: '别搅散气泡' }
    ],
    steps: ['青柠切块入杯，加入糖和薄荷。', '用捣棒轻压出汁和香气，不要把薄荷捣烂。', '加入朗姆和大量冰块。', '补苏打水或雪碧，轻轻提拉搅匀。']
  },
  'gin-tonic': buildHighball('金酒', '汤力水', '柠檬或青柠挤香即可，不需要摇。'),
  'baileys-milk': buildCream('百利甜', '牛奶', '杯中直接搅匀，想更冰就多加冰。'),
  'whisky-cola': buildHighball('威士忌', '可乐', '最后挤一点柠檬能减少甜腻，没有也可以不加。'),
  'vodka-orange': buildJuice('伏特加', '橙汁', '直接搅匀即可，橙汁越冰越顺口。'),
  'whisky-highball': buildHighball('威士忌', '气泡水', '先把威士忌和冰搅冷，再补气泡水轻轻提拉。'),
  'whisky-oolong': buildTea('威士忌', '乌龙茶', '茶饮先冰镇，搅匀后按酒感加茶。'),
  'espresso-martini': {
    method: 'shake',
    methodLabel: 'shake',
    actionLine: '咖啡、伏特加和咖啡利口酒需要用力摇，泡沫来自摇壶里的空气感。',
    quickSteps: [
      { icon: 'coffee', text: '咖啡冷却', sub: '热咖啡先降温' },
      { icon: 'shaker', text: '加冰用力摇', sub: '摇到壶壁冰冷' },
      { icon: 'strain', text: '滤入杯中', sub: '保留咖啡泡沫' }
    ],
    steps: ['摇壶加入伏特加、咖啡利口酒和冷却后的浓缩咖啡。', '加满冰块后用力摇到摇壶外壁冰冷。', '细滤入冰过的杯中，让咖啡泡沫留在表面。', '可用咖啡豆或少量可可粉点缀。']
  },
  'tom-collins': buildCollins('金酒', '柠檬汁和糖', '先把酸甜搅开，再补气泡水。'),
  'negroni': buildStir('金酒、金巴利和甜味美思', '橙皮', '三种酒等量，必须搅冷，不需要摇。'),
  'moscow-mule': buildHighball('伏特加', '姜汁汽水', '青柠汁先入杯，最后用吧勺轻轻提拉。'),
  'vodka-soda': buildHighball('伏特加', '气泡水', '不想太淡可以换成喜欢的茶饮或果汁。'),
  'cuba-libre': buildHighball('朗姆', '可乐', '青柠汁先进杯，能让甜味更立体。'),
  'daiquiri': buildShake('白朗姆、青柠汁和糖浆', '冰镇 coupe 杯', '摇冷后细滤，口感会更利落。'),
  'margarita': {
    method: 'shake',
    methodLabel: 'shake',
    actionLine: '杯口先做盐边，再把龙舌兰、橙酒和青柠汁摇冷，酸咸感才会干净。',
    quickSteps: [
      { icon: 'salt', text: '杯口做盐边', sub: '只沾半圈也可以' },
      { icon: 'shaker', text: '加冰摇冷', sub: '酸甜充分融合' },
      { icon: 'strain', text: '滤入杯中', sub: '青柠片点缀' }
    ],
    steps: ['杯口抹青柠汁，轻轻沾盐，可只做半圈。', '摇壶加入龙舌兰、橙酒、青柠汁和冰。', '用力摇到摇壶外壁冰冷。', '滤入杯中，用青柠片点缀。']
  },
  'paloma': buildHighball('龙舌兰', '葡萄柚汽水', '青柠和盐边是加分项，没有也能做。'),
  'jager-cola': buildHighball('野格', '可乐', '野格本身草本味重，冰要多，轻搅即可。'),
  'baileys-coffee': buildCream('百利甜', '咖啡', '咖啡先放凉或直接用冷萃，避免奶感变薄。'),
  'coffee-tonic': {
    method: 'layer-build',
    methodLabel: 'layer',
    actionLine: '先倒汤力水，再沿冰块慢慢倒咖啡，保留上深下浅的层次。',
    quickSteps: [
      { icon: 'ice', text: '杯中加冰', sub: '冰块要硬' },
      { icon: 'sparkle', text: '先倒汤力', sub: '到七分满' },
      { icon: 'coffee', text: '慢倒咖啡', sub: '沿冰块下去' }
    ],
    steps: ['高杯加满冰块。', '先倒入汤力水。', '把冷萃或浓缩咖啡沿冰块慢慢倒入。', '喝前轻轻搅一下即可。']
  },
  'old-fashioned': {
    method: 'stir',
    methodLabel: 'stir',
    actionLine: '这是慢慢搅冷的酒，不需要摇；糖、苦精和橙皮香气要先处理好。',
    quickSteps: [
      { icon: 'sugar', text: '化开糖和苦精', sub: '少量水帮助融合' },
      { icon: 'stir', text: '加威士忌搅冷', sub: '慢慢稀释' },
      { icon: 'orange', text: '橙皮增香', sub: '挤出精油' }
    ],
    steps: ['杯中加入糖、苦精和少量水，搅到糖基本化开。', '加入大冰块和威士忌。', '慢慢搅拌到杯壁变冷。', '橙皮在杯口挤香后放入杯中。']
  },
  'umeshu-soda': buildHighball('梅酒', '气泡水', '梅酒偏甜，气泡水多一点会更清爽。'),
  'umeshu-oolong': buildTea('梅酒', '乌龙茶', '茶香能压甜，适合不想太腻的时候。'),
  'fruit-wine-spritz': buildFruitSpritz('果酒', '气泡水', '水果只做香气和视觉加分。'),
  'sangria-light': {
    method: 'batch-build',
    methodLabel: 'batch',
    actionLine: '这是分享壶做法，水果先泡出香气，饮用前再补气泡水。',
    quickSteps: [
      { icon: 'fruit', text: '水果切片', sub: '橙子苹果都行' },
      { icon: 'pour', text: '倒入果酒', sub: '冷藏更好喝' },
      { icon: 'sparkle', text: '喝前补气泡', sub: '保持轻盈' }
    ],
    steps: ['橙子、苹果等水果切片放入壶中。', '倒入果酒，冷藏一会儿或直接加冰。', '饮用前补气泡水。', '每杯按口味加少量橙汁或柠檬汁。']
  },
  'mimosa': {
    method: 'layer-build',
    methodLabel: 'gentle',
    actionLine: '不要摇也不要大力搅，先倒橙汁，再慢慢倒起泡酒保留气泡。',
    quickSteps: [
      { icon: 'juice', text: '先倒橙汁', sub: '杯子先冰镇' },
      { icon: 'sparkle', text: '慢倒起泡酒', sub: '保留气泡' },
      { icon: 'stir', text: '轻晃即可', sub: '不用搅拌' }
    ],
    steps: ['香槟杯或高脚杯先冰镇。', '倒入冰镇橙汁。', '缓慢倒入起泡酒。', '轻轻晃杯即可，不要用力搅拌。']
  },
  'aperol-spritz': buildSpritz('阿佩罗', '起泡酒和气泡水', '按 3:2:1 更稳，最后轻搅一下。'),
  'sea-breeze': buildJuice('伏特加', '葡萄柚汁和蔓越莓汁', '果汁型直接 build，试味后用果汁调酸甜。'),
  'sake-highball': buildHighball('清酒', '气泡水', '动作要轻，别把米香和气泡搅散。'),
  'sake-green-tea': buildTea('清酒', '无糖绿茶', '清酒和绿茶都冰过会更干净。'),
  'whiskey-sour': {
    method: 'dry-shake',
    methodLabel: 'dry shake',
    actionLine: '先不加冰干摇打出厚泡沫，再加冰摇冷；这是威士忌酸和普通酸甜杯的关键区别。',
    quickSteps: [
      { icon: 'egg', text: '先干摇起泡', sub: '不加冰更容易起沫' },
      { icon: 'shaker', text: '加冰再摇', sub: '摇到冰冷' },
      { icon: 'strain', text: '滤入矮杯', sub: '保留厚泡沫' }
    ],
    steps: ['摇壶加入威士忌、柠檬汁、糖浆和蛋清。', '先不加冰干摇 10-15 秒，把泡沫打起来。', '加入冰块后再用力摇到冰冷。', '滤入矮杯，让泡沫自然浮在表面。']
  },
  'caipirinha': {
    method: 'muddle-build',
    methodLabel: 'muddle',
    actionLine: '青柠块和糖要在杯中轻压出汁和油香，再加冰和卡莎萨搅匀。',
    quickSteps: [
      { icon: 'lime', text: '青柠切块', sub: '去掉太苦的白芯' },
      { icon: 'muddle', text: '加糖轻压', sub: '压出汁和香气' },
      { icon: 'stir', text: '加冰搅匀', sub: '碎冰更适合' }
    ],
    steps: ['青柠切块放入矮杯。', '加入糖，轻轻捣压出青柠汁和果皮香气。', '加满碎冰或冰块。', '倒入卡莎萨，充分搅匀。']
  },
  'white-russian': {
    method: 'layer-build',
    methodLabel: 'float',
    actionLine: '先倒伏特加和咖啡利口酒，再慢慢倒奶油，保留咖啡棕和奶白融合层次。',
    quickSteps: [
      { icon: 'ice', text: '矮杯加冰', sub: '冰块要明显' },
      { icon: 'coffee', text: '倒咖啡酒', sub: '和伏特加打底' },
      { icon: 'cream', text: '慢倒奶油', sub: '形成旋涡层次' }
    ],
    steps: ['矮杯加满冰块。', '倒入伏特加和咖啡利口酒。', '沿杯壁慢慢倒入牛奶或淡奶油。', '只轻轻搅一下，让咖啡棕和奶白形成融合纹理。']
  },
  'cola-bucket': {
    method: 'batch-build',
    methodLabel: 'share',
    actionLine: '大容量分享型做法，先放足冰，再加基酒和可乐，最后分杯。',
    quickSteps: [
      { icon: 'ice', text: '大杯加冰', sub: '冰要足' },
      { icon: 'pour', text: '倒入基酒', sub: '按人数控制量' },
      { icon: 'sparkle', text: '补可乐分杯', sub: '轻搅不劝酒' }
    ],
    steps: ['大杯或小桶先加入大量冰块。', '倒入威士忌、朗姆或其他基酒。', '补可乐并轻轻搅匀。', '可加青柠或柠檬片，按人数分杯。']
  },
  'dry-martini': {
    method: 'stir',
    methodLabel: 'stir',
    actionLine: '干马天尼要搅拌到冰冷再滤入杯中，不摇，保持酒液清透。',
    quickSteps: [
      { icon: 'ice', text: '调酒杯加冰', sub: '先降温' },
      { icon: 'stir', text: '金酒味美思搅冷', sub: '保持清透' },
      { icon: 'olive', text: '滤入杯中', sub: '橄榄点缀' }
    ],
    steps: ['调酒杯加满冰。', '倒入金酒和少量干味美思。', '充分搅拌到酒液冰冷。', '滤入马天尼杯，用橄榄或柠檬皮点缀。']
  },
  'tequila-sunrise': {
    method: 'layer-build',
    methodLabel: 'sink',
    actionLine: '红石榴糖浆要最后沿杯壁慢慢倒，让颜色自然下沉成日出渐层。',
    quickSteps: [
      { icon: 'ice', text: '高杯加冰', sub: '先倒橙汁龙舌兰' },
      { icon: 'juice', text: '轻轻搅匀', sub: '橙色打底' },
      { icon: 'layer', text: '糖浆下沉', sub: '不要再搅' }
    ],
    steps: ['高杯加冰，倒入龙舌兰和橙汁。', '先轻轻搅匀橙色底液。', '沿杯壁慢慢倒入红石榴糖浆。', '不要过度搅拌，让颜色自然下沉。']
  },
  'cv-gin-tonic': convenience('金酒', '汤力水、气泡水、雪碧或喜欢的饮料', '柠檬只是加分项，买不到也可以不加。'),
  'cv-cuba-libre': convenience('朗姆', '可乐', '没有青柠不影响成杯，冰够多就好喝。'),
  'cv-vodka-soda': convenience('伏特加', '气泡水、茶饮、果汁或喜欢的饮料', '气泡水只是清爽方向，不喜欢就换软饮。'),
  'cv-screwdriver': convenience('伏特加', '橙汁、葡萄柚汁、苹果汁或茶饮', '便利店重点是买得到，果汁冷一点更好入口。'),
  'cv-fresh-tipsy': convenience('小瓶酒', '气泡水、汤力水、茶饮或果汁', '先挑喜欢的软饮，再决定要不要柠檬。'),
  'cv-sweet-party': convenience('威士忌或朗姆', '可乐', '适合朋友局，冰要多，比例不要太烈。'),
  'cv-milk-soft': convenience('百利甜', '牛奶或咖啡', '奶感方案只需要轻搅，不需要摇。'),
  'cv-tea-light': convenience('威士忌、伏特加或清酒', '乌龙茶、绿茶或柠檬茶', '茶饮能拉低甜腻和酒感，按口味加茶。'),
  'cv-fruit-low': convenience('少量基酒', '果汁、茶饮或喜欢的软饮', '低酒感重点是少酒多软饮，不一定要气泡。'),
  'cv-coffee-night': convenience('百利甜或伏特加', '冷萃咖啡和牛奶', '咖啡先冰，想柔和就补牛奶。'),
  'cv-nonalcohol-fresh': convenience('不加酒', '气泡饮、茶饮、雪碧或咖啡', '做无酒精版本，柠檬薄荷有就加，没有也没关系。'),
  'supermarket-party': convenience('果酒或低度酒', '气泡水、橙汁或可乐', '大壶分享，饮用前再补气泡。')
}

const ICONS = {
  ice: '🧊',
  pour: '🍾',
  stir: '🥄',
  sparkle: '🫧',
  lime: '🍋',
  shaker: '🍸',
  strain: '⇣',
  coffee: '☕',
  salt: '🧂',
  sugar: '◇',
  orange: '🍊',
  fruit: '🍎',
  juice: '🧃',
  tea: '🍵',
  cream: '🥛',
  egg: '◎',
  muddle: '↧',
  olive: '●',
  layer: '⇣',
  shop: '▣'
}

function buildHighball(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'build',
    actionLine: `${spirit}和${mixer}直接在杯中完成，重点是冰多、动作轻，${tip}`,
    quickSteps: [
      { icon: 'ice', text: '高杯加满冰', sub: '先把杯子降温' },
      { icon: 'pour', text: `倒入${spirit}`, sub: '控制酒感' },
      { icon: 'sparkle', text: `补${mixer}`, sub: '轻轻提拉搅匀' }
    ],
    steps: [`高杯或矮杯加满冰块。`, `倒入${spirit}。`, `补入${mixer}。`, `用吧勺轻轻提拉搅匀，避免把气泡搅散。`]
  }
}

function buildJuice(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'build',
    actionLine: `${spirit}和${mixer}直接杯中搅匀即可，${tip}`,
    quickSteps: [
      { icon: 'ice', text: '杯中加冰', sub: '果汁先冰镇' },
      { icon: 'pour', text: `倒入${spirit}`, sub: '少量开始更稳' },
      { icon: 'juice', text: `补${mixer}`, sub: '搅匀后试味' }
    ],
    steps: ['杯中加满冰块。', `倒入${spirit}。`, `补入${mixer}到七八分满。`, '轻轻搅匀，试味后用果汁调整酸甜。']
  }
}

function buildTea(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'stir',
    actionLine: `${spirit}和${mixer}是茶饮型做法，不需要摇，轻搅均匀即可；${tip}`,
    quickSteps: [
      { icon: 'ice', text: '冰杯准备', sub: '茶饮先冰镇' },
      { icon: 'pour', text: `倒入${spirit}`, sub: '少量起步' },
      { icon: 'tea', text: `补${mixer}`, sub: '轻搅试味' }
    ],
    steps: ['杯中加冰。', `倒入${spirit}。`, `补入${mixer}。`, '轻轻搅匀，按酒感继续加茶。']
  }
}

function buildCream(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'stir',
    actionLine: `${spirit}和${mixer}属于奶感快手杯，直接杯中轻搅，${tip}`,
    quickSteps: [
      { icon: 'ice', text: '矮杯加冰', sub: '冰块明显一点' },
      { icon: 'cream', text: `倒入${spirit}`, sub: '奶甜打底' },
      { icon: 'stir', text: `补${mixer}`, sub: '轻轻搅匀' }
    ],
    steps: ['矮杯加冰。', `倒入${spirit}。`, `补入${mixer}。`, '轻轻搅匀，喜欢更浓可减少冰或增加奶感。']
  }
}

function buildShake(materials, glass, tip) {
  return {
    method: 'shake',
    methodLabel: 'shake',
    actionLine: `${materials}需要进摇壶加冰摇冷，酸甜融合会比杯中搅拌更干净；${tip}`,
    quickSteps: [
      { icon: 'shaker', text: '材料入摇壶', sub: '酸甜比例先定' },
      { icon: 'ice', text: '加冰用力摇', sub: '摇到壶壁冰冷' },
      { icon: 'strain', text: '滤入杯中', sub: glass }
    ],
    steps: [`摇壶加入${materials}。`, '加入冰块，用力摇到摇壶外壁冰冷。', `滤入${glass}。`, '试味后下次用糖或柠檬调整酸甜。']
  }
}

function buildStir(materials, garnish, tip) {
  return {
    method: 'stir',
    methodLabel: 'stir',
    actionLine: `${materials}是酒感明确的搅拌型做法，重点是搅冷和适度稀释；${tip}`,
    quickSteps: [
      { icon: 'ice', text: '调酒杯加冰', sub: '先降温' },
      { icon: 'stir', text: '倒酒慢搅', sub: '搅到冰冷' },
      { icon: 'orange', text: `加${garnish}`, sub: '补香气' }
    ],
    steps: ['调酒杯或矮杯加满冰。', `倒入${materials}。`, '慢慢搅拌到酒液冰冷。', `用${garnish}增加香气。`]
  }
}

function buildCollins(spirit, sourMix, tip) {
  return {
    method: 'build',
    methodLabel: 'build',
    actionLine: `${spirit}、${sourMix}先在杯中融合，再补气泡水；${tip}`,
    quickSteps: [
      { icon: 'lime', text: '先调酸甜', sub: sourMix },
      { icon: 'ice', text: '加满冰', sub: '高杯更适合' },
      { icon: 'sparkle', text: '补气泡水', sub: '轻搅即可' }
    ],
    steps: [`高杯中加入${spirit}、${sourMix}。`, '先轻轻搅开酸甜。', '加满冰块。', '补气泡水并轻轻提拉搅匀。']
  }
}

function buildFruitSpritz(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'spritz',
    actionLine: `${spirit}加${mixer}就是轻盈果酒杯，${tip}`,
    quickSteps: [
      { icon: 'fruit', text: '水果和冰', sub: '先放杯中' },
      { icon: 'pour', text: `倒入${spirit}`, sub: '不要太满' },
      { icon: 'sparkle', text: `补${mixer}`, sub: '轻轻搅一下' }
    ],
    steps: ['杯中加入冰块和少量水果。', `倒入${spirit}。`, `补入${mixer}。`, '轻轻搅一下，水果只是加分项。']
  }
}

function buildSpritz(spirit, mixer, tip) {
  return {
    method: 'build',
    methodLabel: 'spritz',
    actionLine: `${spirit}、${mixer}直接杯中 build，颜色和气泡是重点；${tip}`,
    quickSteps: [
      { icon: 'ice', text: '酒杯加满冰', sub: '橙片可选' },
      { icon: 'pour', text: `倒入${spirit}`, sub: '再加起泡酒' },
      { icon: 'sparkle', text: '补气泡水', sub: '轻搅一下' }
    ],
    steps: ['酒杯加满冰。', `倒入${spirit}。`, `加入${mixer}。`, '轻轻搅匀，保留气泡和橙色层次。']
  }
}

function convenience(spirit, mixer, tip) {
  return {
    method: 'convenience-build',
    methodLabel: 'easy build',
    actionLine: `便利店版先买${spirit}和${mixer}，冰杯里直接组合；${tip}`,
    quickSteps: [
      { icon: 'shop', text: '先买齐主料', sub: '小瓶酒 + 软饮' },
      { icon: 'ice', text: '冰杯降温', sub: '冰比辅料更关键' },
      { icon: 'stir', text: '轻搅试味', sub: '按口味补软饮' }
    ],
    steps: [`准备${spirit}和${mixer}。`, '杯中加满冰块。', `先倒入${spirit}，再补${mixer}。`, '轻轻搅匀，柠檬、薄荷等辅料买不到也可以不加。']
  }
}

function getProcess(item) {
  const id = item && item.id
  const process = Object.assign({}, DEFAULT_PROCESS, PROCESS_MAP[id] || {})
  process.quickSteps = (process.quickSteps || []).map((step) => Object.assign({}, step, {
    icon: ICONS[step.icon] || step.icon
  }))
  return process
}

module.exports = {
  getProcess
}
