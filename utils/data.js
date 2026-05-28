const hotKeywords = ['气泡水能做什么', '咖啡怎么调好喝', '茶饮能调什么', '果汁能调什么', '可乐能调什么', '便利店饮品', '无酒精', '低酒感']

const quickEntries = [
  { title: '搜配方', desc: '明确想喝哪一杯', path: '/pages/search/search' },
  { title: '按酒底找', desc: '金酒、伏特加、威士忌', path: '/pages/base-list/base-list' },
  { title: '按材料找', desc: '可乐、雪碧、橙汁、咖啡', path: '/pages/ingredient-list/ingredient-list' },
  { title: '便利店饮品', desc: '临时采购也能调', path: '/pages/convenience/convenience' },
  { title: '家里有什么', desc: '勾选材料出酒单', path: '/pages/pantry/pantry' },
  { title: '新手推荐', desc: '不知道喝什么就点这', path: '/pages/beginner/beginner' }
]

const homeCards = [
  { title: '今天不知道喝什么？', desc: '三步选出适合你现在状态的第一杯。', path: '/pages/beginner/beginner' },
  { title: '便利店能调什么？', desc: '清爽、甜口、奶香、茶感，买得到就能做。', path: '/pages/convenience/convenience' },
  { title: '家里有材料但不会搭？', desc: '勾选现有东西，看立刻能做和缺一项方案。', path: '/pages/pantry/pantry' },
  { title: '新手不容易翻车酒单', desc: '低门槛、步骤短、材料好买。', path: '/pages/results/results?mode=tag&value=新手友好&title=新手不容易翻车酒单' },
  { title: '找一杯好喝的', desc: '从甜口、清爽、微醺开始，快速缩小选择。', path: '/pages/flavor-list/flavor-list' },
  { title: '按需求找一杯', desc: '下班不踩雷、聚会好喝、便利店买齐。', path: '/pages/scene-list/scene-list' }
]

const flavorCollections = [
  { title: '几乎喝不出酒味', value: '甜口', desc: '像奶茶、果汁或甜品饮料，适合第一次尝试。' },
  { title: '像冰饮一样清爽', value: '清爽', desc: '气泡、柠檬、薄荷、茶饮方向，入口轻松。' },
  { title: '像果汁一样顺口', value: '酸甜', desc: '橙汁、葡萄柚、梅酒和果味气泡方向。' },
  { title: '饭后甜品感', value: '奶香', desc: '百利甜、牛奶、咖啡和奶香方案。' },
  { title: '不想太甜', value: '茶感', desc: '乌龙茶、柠檬茶、汤力和高球方向。' },
  { title: '咖啡苦甜', value: '咖啡感', desc: '前半口像咖啡，后面才有酒感。' },
  { title: '有气泡更好喝', value: '气泡感', desc: '汤力水、苏打水、雪碧、起泡酒方向。' },
  { title: '想明显微醺', value: '酒感', desc: '酒感更清楚，适合已经喝过几次的人。' },
  { title: '不喝酒也像调饮', value: '无酒精', desc: '气泡水、咖啡汤力、柠檬和茶饮方案。' }
]

const sceneCollections = [
  { title: '下班后不容易踩雷', value: '下班放松', desc: '3 分钟、少步骤，回家就能直接做。' },
  { title: '聚会最容易被夸好喝', value: '朋友小聚', desc: '颜色好看、能做多杯，不容易翻车。' },
  { title: '便利店能买齐', value: '便利店调酒', desc: '只买 2-3 样，今晚就能做。' },
  { title: '少器具少材料', value: '宿舍/租房', desc: '没有雪克杯也能做，宿舍和租房友好。' },
  { title: '第一次尝试不容易翻车', value: '新手第一杯', desc: '酒味温和、材料好买、步骤短。' },
  { title: '夏天像冰饮一样清爽', value: '夏天晚上', desc: '清爽、气泡、柠檬、薄荷和果味。' },
  { title: '今晚聚会直接能用', value: '聚会前临时采购', desc: '预算可控，超市和便利店都能买到。' },
  { title: '不甜也顺口', value: '不想喝太甜', desc: '茶、气泡、汤力和高球方向。' },
  { title: '轻轻微醺', value: '低酒精', desc: '前半口像冰饮，后面才慢慢有感觉。' },
  { title: '不喝酒也像调饮', value: '无酒精', desc: '照顾不喝酒的人，也有调饮感。' }
]

const bases = [
  {
    id: 'gin',
    name: '金酒',
    subtitle: '草本、柑橘、清爽气泡感',
    tags: ['清爽', '微苦', '气泡感', '夏天'],
    intro: '金酒最适合做清爽、气泡、柑橘感明显的酒，搭配汤力水、苏打水、柠檬茶都很容易成立。',
    recipes: {
      first: ['gin-tonic'],
      classic: ['gin-tonic', 'tom-collins'],
      beginner: ['gin-tonic', 'gin-sprite'],
      convenience: ['gin-sprite', 'gin-lemon-tea'],
      lowAlcohol: ['gin-sprite', 'gin-lemon-tea'],
      sweet: ['gin-sprite'],
      fresh: ['gin-tonic', 'tom-collins'],
      friendly: ['gin-sprite', 'gin-lemon-tea'],
      advanced: ['negroni']
    }
  },
  {
    id: 'vodka',
    name: '伏特加',
    subtitle: '干净、百搭、不抢味',
    tags: ['百搭', '果味', '便利店', '低门槛'],
    intro: '伏特加本身存在感低，适合和果汁、茶饮、咖啡、汽水组合，做新手第一杯很稳。',
    recipes: {
      first: ['vodka-orange'],
      classic: ['vodka-orange', 'moscow-mule'],
      beginner: ['vodka-orange', 'vodka-soda'],
      convenience: ['vodka-orange', 'vodka-tea'],
      lowAlcohol: ['vodka-orange', 'vodka-tea'],
      sweet: ['vodka-orange'],
      fresh: ['vodka-soda', 'moscow-mule'],
      friendly: ['vodka-orange', 'vodka-tea'],
      advanced: ['espresso-martini']
    }
  },
  {
    id: 'whisky',
    name: '威士忌',
    subtitle: '谷物、木桶、可乐和茶感',
    tags: ['酒感', '可乐', '茶感', '聚会'],
    intro: '威士忌适合和可乐、苏打水、乌龙茶、咖啡做长饮，想降低冲击感就加足冰和气泡。',
    recipes: {
      first: ['whisky-highball'],
      classic: ['whisky-highball', 'whisky-cola'],
      beginner: ['whisky-cola', 'whisky-oolong'],
      convenience: ['whisky-cola', 'whisky-oolong'],
      lowAlcohol: ['whisky-oolong', 'whisky-apple'],
      sweet: ['whisky-cola'],
      fresh: ['whisky-highball'],
      friendly: ['whisky-oolong'],
      advanced: ['old-fashioned']
    }
  },
  {
    id: 'rum',
    name: '朗姆',
    subtitle: '甘蔗甜感、薄荷、热带果味',
    tags: ['甜口', '薄荷', '果味', '夏天'],
    intro: '朗姆适合做莫吉托、可乐桶和各种果汁长饮，香甜感明显，聚会接受度高。',
    recipes: {
      first: ['cuba-libre'],
      classic: ['mojito', 'cuba-libre'],
      beginner: ['cuba-libre', 'rum-sprite'],
      convenience: ['cuba-libre', 'rum-sprite'],
      lowAlcohol: ['rum-sprite'],
      sweet: ['cuba-libre', 'rum-sprite'],
      fresh: ['mojito'],
      friendly: ['rum-sprite'],
      advanced: ['daiquiri']
    }
  },
  {
    id: 'tequila',
    name: '龙舌兰',
    subtitle: '明亮、刺激、适合酸甜',
    tags: ['酸甜', '果味', '聚会', '进阶'],
    intro: '龙舌兰适合和柑橘、盐、气泡、葡萄柚一起出现，做酸甜方向会比纯饮友好得多。',
    recipes: {
      first: ['tequila-sprite'],
      classic: ['margarita', 'paloma'],
      beginner: ['tequila-sprite'],
      convenience: ['tequila-sprite'],
      lowAlcohol: ['paloma'],
      sweet: ['tequila-sprite'],
      fresh: ['paloma'],
      friendly: ['tequila-sprite'],
      advanced: ['margarita']
    }
  },
  {
    id: 'liqueur',
    name: '利口酒',
    subtitle: '甜味、果味、奶香和风味增强',
    tags: ['甜口', '奶香', '低门槛', '女生更容易接受'],
    intro: '利口酒适合做甜口、奶香、果味方案，也适合作为鸡尾酒里的风味补强。',
    recipes: {
      first: ['baileys-milk'],
      classic: ['baileys-milk', 'jager-cola'],
      beginner: ['baileys-milk', 'jager-redbull'],
      convenience: ['baileys-milk', 'jager-cola'],
      lowAlcohol: ['baileys-milk', 'baileys-coffee'],
      sweet: ['baileys-milk'],
      fresh: ['jager-redbull'],
      friendly: ['baileys-milk'],
      advanced: ['espresso-martini']
    }
  },
  {
    id: 'baileys',
    name: '百利甜',
    subtitle: '奶油、可可、咖啡和甜品感',
    tags: ['甜口', '奶香', '低酒精', '新手友好'],
    intro: '百利甜最适合和牛奶、咖啡、冰淇淋方向组合，目标不是做烈酒感，而是做一杯带微醺的甜品饮料。',
    recipes: {
      first: ['baileys-milk'],
      classic: ['baileys-milk', 'baileys-coffee'],
      beginner: ['baileys-milk'],
      convenience: ['baileys-milk', 'baileys-coffee'],
      lowAlcohol: ['baileys-milk', 'baileys-coffee'],
      sweet: ['baileys-milk'],
      fresh: ['baileys-coffee'],
      friendly: ['baileys-milk', 'baileys-coffee'],
      advanced: ['espresso-martini']
    }
  },
  {
    id: 'jager',
    name: '野格',
    subtitle: '草本、甜苦、派对和能量饮料',
    tags: ['苦甜', '聚会', '便利店', '酒感'],
    intro: '野格适合做派对型长饮，和可乐、能量饮料、柠檬汽水都能快速成杯，但甜苦和酒感都比较明显。',
    recipes: {
      first: ['jager-cola'],
      classic: ['jager-cola', 'jager-redbull'],
      beginner: ['jager-cola'],
      convenience: ['jager-cola', 'jager-redbull'],
      lowAlcohol: ['jager-cola'],
      sweet: ['jager-cola'],
      fresh: ['jager-redbull'],
      friendly: ['jager-cola'],
      advanced: ['jager-redbull']
    }
  },
  {
    id: 'plum-wine',
    name: '梅酒',
    subtitle: '酸甜、果脯、茶饮和苏打',
    tags: ['酸甜', '果味', '低酒精', '女生更容易接受'],
    intro: '梅酒本身酸甜明显，适合加冰、苏打、乌龙茶或绿茶，几乎不需要复杂调制。',
    recipes: {
      first: ['umeshu-soda'],
      classic: ['umeshu-soda', 'umeshu-oolong'],
      beginner: ['umeshu-soda', 'umeshu-oolong'],
      convenience: ['umeshu-soda', 'umeshu-oolong'],
      lowAlcohol: ['umeshu-soda', 'umeshu-oolong'],
      sweet: ['umeshu-soda'],
      fresh: ['umeshu-oolong'],
      friendly: ['umeshu-soda', 'umeshu-oolong'],
      advanced: ['umeshu-soda']
    }
  },
  {
    id: 'sake',
    name: '清酒',
    subtitle: '米香、清爽、茶饮和气泡',
    tags: ['清爽', '低酒精', '茶感', '新手友好'],
    intro: '清酒适合做低压力长饮，和气泡水、绿茶、苹果汁都能把米香变得更轻松。',
    recipes: {
      first: ['sake-highball'],
      classic: ['sake-highball', 'sake-green-tea'],
      beginner: ['sake-sprite', 'sake-green-tea'],
      convenience: ['sake-sprite', 'sake-green-tea'],
      lowAlcohol: ['sake-highball', 'sake-green-tea'],
      sweet: ['sake-sprite'],
      fresh: ['sake-highball', 'sake-green-tea'],
      friendly: ['sake-sprite', 'sake-green-tea'],
      advanced: ['sake-highball']
    }
  },
  {
    id: 'fruit-wine',
    name: '果酒',
    subtitle: '低度、果味、气泡和甜口',
    tags: ['果味', '甜口', '低酒精', '聚会'],
    intro: '果酒更像“微醺饮料底”，适合加气泡水、冰块、柠檬和水果做低酒精方案。',
    recipes: {
      first: ['fruit-wine-spritz'],
      classic: ['fruit-wine-spritz', 'sangria-light'],
      beginner: ['fruit-wine-spritz'],
      convenience: ['fruit-wine-spritz'],
      lowAlcohol: ['fruit-wine-spritz'],
      sweet: ['sangria-light'],
      fresh: ['fruit-wine-spritz'],
      friendly: ['fruit-wine-spritz', 'sangria-light'],
      advanced: ['sangria-light']
    }
  },
  {
    id: 'sparkling-wine',
    name: '起泡酒',
    subtitle: '气泡、果香、轻盈和庆祝感',
    tags: ['气泡感', '清爽', '低酒精', '聚会'],
    intro: '起泡酒适合做轻松的 Spritz、果汁 Mimosa 和聚会低度饮，重点是保持冰冷和气泡。',
    recipes: {
      first: ['mimosa'],
      classic: ['mimosa', 'aperol-spritz'],
      beginner: ['mimosa', 'fruit-wine-spritz'],
      convenience: ['mimosa'],
      lowAlcohol: ['mimosa'],
      sweet: ['mimosa'],
      fresh: ['aperol-spritz'],
      friendly: ['mimosa'],
      advanced: ['aperol-spritz']
    }
  }
]

const ingredientCategories = [
  { title: '碳酸饮料', items: ['可乐', '雪碧', '气泡水', '汤力水'] },
  { title: '果汁', items: ['果汁', '橙汁', '葡萄柚汁', '苹果汁'] },
  { title: '茶饮', items: ['乌龙茶', '柠檬茶', '绿茶'] },
  { title: '咖啡', items: ['冷萃咖啡', '浓缩咖啡'] },
  { title: '乳饮', items: ['牛奶', '椰奶'] },
  { title: '水果', items: ['柠檬', '青柠', '橙子', '薄荷'] },
  { title: '冰块/糖浆/小料', items: ['冰块', '糖', '盐', '蜂蜜'] }
]

const ingredients = [
  {
    id: 'juice',
    name: '果汁',
    category: '果汁',
    tags: ['果味', '酸甜', '低门槛', '便利店'],
    goodWith: ['伏特加', '朗姆', '龙舌兰', '果酒', '起泡酒'],
    recipes: ['vodka-orange', 'vodka-grapefruit', 'vodka-apple', 'paloma', 'mimosa', 'fruit-wine-spritz'],
    lowAlcohol: ['orange-soda-zero', 'apple-soda-zero'],
    warnings: ['果汁很遮酒味，基酒先少倒，试味后再加。', '想清爽就加气泡水或柠檬。']
  },
  {
    id: 'cola',
    name: '可乐',
    category: '碳酸饮料',
    tags: ['甜口', '气泡感', '聚会', '便利店'],
    goodWith: ['威士忌', '朗姆', '野格', '金酒'],
    recipes: ['whisky-cola', 'cuba-libre', 'jager-cola'],
    lowAlcohol: ['cola-lemon-zero'],
    warnings: ['不太建议搭奶类利口酒，甜腻感会被放大。', '搭金酒时建议加柠檬，不然草本味容易显得突兀。']
  },
  {
    id: 'sprite',
    name: '雪碧',
    category: '碳酸饮料',
    tags: ['清爽', '甜口', '低门槛', '便利店'],
    goodWith: ['金酒', '朗姆', '龙舌兰', '伏特加'],
    recipes: ['gin-sprite', 'rum-sprite', 'tequila-sprite'],
    lowAlcohol: ['sprite-lemon-zero'],
    warnings: ['本身偏甜，基酒不要倒太多。', '想更清爽可以加冰和柠檬。']
  },
  {
    id: 'orange-juice',
    name: '橙汁',
    category: '果汁',
    tags: ['果味', '酸甜', '新手友好', '便利店'],
    goodWith: ['伏特加', '朗姆', '龙舌兰'],
    recipes: ['vodka-orange', 'mimosa'],
    lowAlcohol: ['orange-soda-zero'],
    warnings: ['和烟熏感强的威士忌不一定搭。']
  },
  {
    id: 'coffee',
    name: '咖啡',
    category: '咖啡',
    tags: ['咖啡感', '苦甜', '进阶', '夜晚'],
    goodWith: ['伏特加', '百利甜', '威士忌'],
    recipes: ['espresso-martini', 'baileys-coffee'],
    lowAlcohol: ['coffee-tonic-zero'],
    warnings: ['含咖啡因，晚上别做太大杯。']
  },
  {
    id: 'milk',
    name: '牛奶',
    category: '乳饮',
    tags: ['奶香', '甜口', '新手友好', '低门槛'],
    goodWith: ['百利甜', '咖啡利口酒'],
    recipes: ['baileys-milk'],
    lowAlcohol: ['milk-coffee-zero'],
    warnings: ['不建议和高酸果汁同杯，容易分层或结块。']
  },
  {
    id: 'tea',
    name: '茶',
    category: '茶饮',
    tags: ['茶感', '清爽', '不太甜', '便利店'],
    goodWith: ['威士忌', '伏特加', '梅酒'],
    recipes: ['whisky-oolong', 'vodka-tea', 'gin-lemon-tea'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['无糖茶更稳，含糖茶要减少糖浆或甜饮比例。']
  },
  {
    id: 'soda-water',
    name: '气泡水',
    category: '碳酸饮料',
    tags: ['清爽', '气泡感', '低酒精', '不太甜'],
    goodWith: ['金酒', '威士忌', '伏特加', '梅酒', '果酒'],
    recipes: ['gin-tonic', 'whisky-highball', 'vodka-soda', 'umeshu-soda', 'fruit-wine-spritz'],
    lowAlcohol: ['soda-lemon-zero'],
    warnings: ['气泡水不遮酒味，基酒品质差时会更明显。', '先加酒再补气泡水，轻搅即可，别把气泡搅没。']
  },
  {
    id: 'tonic-water',
    name: '汤力水',
    category: '碳酸饮料',
    tags: ['微苦', '清爽', '气泡感', '酒吧感'],
    goodWith: ['金酒', '伏特加', '咖啡'],
    recipes: ['gin-tonic', 'coffee-tonic'],
    lowAlcohol: ['coffee-tonic-zero'],
    warnings: ['汤力水有苦味，怕苦的人可以换雪碧或半汤力半气泡水。']
  },
  {
    id: 'lemon',
    name: '柠檬',
    category: '水果',
    tags: ['酸甜', '清爽', '去腻', '便利店'],
    goodWith: ['金酒', '伏特加', '朗姆', '威士忌', '龙舌兰'],
    recipes: ['tom-collins', 'daiquiri', 'margarita', 'whisky-highball', 'gin-sprite'],
    lowAlcohol: ['soda-lemon-zero', 'tea-lemon-zero'],
    warnings: ['柠檬主要负责提亮，不要一次挤太多，酸度会压住酒香。']
  },
  {
    id: 'lime',
    name: '青柠',
    category: '水果',
    tags: ['酸甜', '清爽', '去腻', '经典'],
    goodWith: ['金酒', '朗姆', '伏特加', '龙舌兰'],
    recipes: ['mojito', 'gin-tonic', 'daiquiri', 'margarita', 'paloma'],
    lowAlcohol: ['soda-lemon-zero'],
    warnings: ['青柠香气更尖锐，怕酸可以用柠檬替代。']
  },
  {
    id: 'grapefruit-juice',
    name: '葡萄柚汁',
    category: '果汁',
    tags: ['酸甜', '微苦', '果味', '清爽'],
    goodWith: ['龙舌兰', '伏特加', '金酒'],
    recipes: ['paloma', 'vodka-grapefruit'],
    lowAlcohol: ['grapefruit-soda-zero'],
    warnings: ['葡萄柚自带轻微苦味，怕苦就加一点糖或换橙汁。']
  },
  {
    id: 'oolong',
    name: '乌龙茶',
    category: '茶饮',
    tags: ['茶感', '不太甜', '清爽', '便利店'],
    goodWith: ['威士忌', '梅酒', '伏特加'],
    recipes: ['whisky-oolong', 'umeshu-oolong', 'vodka-tea'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['无糖乌龙更适合做酒饮，含糖款会让整体显腻。']
  },
  {
    id: 'lemon-tea',
    name: '柠檬茶',
    category: '茶饮',
    tags: ['酸甜', '茶感', '便利店', '新手友好'],
    goodWith: ['金酒', '伏特加', '朗姆'],
    recipes: ['gin-lemon-tea', 'vodka-tea'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['瓶装柠檬茶通常已经很甜，基酒用量建议保守。']
  },
  {
    id: 'green-tea',
    name: '绿茶',
    category: '茶饮',
    tags: ['茶感', '清爽', '不太甜', '便利店'],
    goodWith: ['清酒', '伏特加', '梅酒'],
    recipes: ['sake-green-tea', 'vodka-tea', 'umeshu-oolong'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['无糖绿茶更清爽，含糖绿茶要减少基酒量。']
  },
  {
    id: 'apple-juice',
    name: '苹果汁',
    category: '果汁',
    tags: ['果味', '甜口', '低门槛', '便利店'],
    goodWith: ['威士忌', '伏特加', '朗姆'],
    recipes: ['whisky-apple', 'vodka-apple'],
    lowAlcohol: ['apple-soda-zero'],
    warnings: ['苹果汁甜度高，适合加柠檬或气泡水降低厚重感。']
  }
]

const recipes = [
  {
    id: 'mojito',
    type: 'recipe',
    name: '莫吉托',
    enName: 'Mojito',
    aliases: ['薄荷朗姆', 'mojito'],
    base: '朗姆',
    tags: ['清爽', '薄荷', '酸甜', '低门槛', '夏天', '新手友好'],
    reason: '适合想要清爽、带薄荷香、酒感不压人的夏天第一杯。',
    flavor: { sweet: 3, sour: 4, alcohol: 2, fresh: 5, difficulty: 3 },
    materials: {
      standard: ['白朗姆 45ml', '青柠 半颗', '薄荷 8-10片', '糖 2茶匙', '苏打水 补满', '冰块'],
      convenience: ['朗姆', '雪碧或气泡水', '青柠/柠檬', '薄荷糖或薄荷叶', '冰块'],
      simple: ['朗姆', '雪碧', '柠檬', '冰块']
    },
    steps: ['杯中压出青柠汁和薄荷香气。', '加入朗姆和大量冰块。', '补苏打水或雪碧，轻轻搅匀。', '试味后用柠檬或糖调整酸甜。'],
    scenes: ['夏天晚上', '朋友小聚', '新手第一杯', '不想喝太甜'],
    substitutes: ['没有薄荷就做朗姆雪碧。', '不想太甜就用气泡水替代雪碧。', '想低酒精就把朗姆减半。'],
    similar: ['gin-sprite', 'rum-sprite', 'gin-tonic']
  },
  {
    id: 'gin-tonic',
    type: 'recipe',
    name: '金汤力',
    enName: 'Gin Tonic',
    aliases: ['金酒汤力', 'gin tonic', 'gt'],
    base: '金酒',
    tags: ['清爽', '微苦', '气泡感', '新手友好', '夏天'],
    reason: '适合想要清爽、不太甜、又有一点酒吧感的人。',
    flavor: { sweet: 1, sour: 2, alcohol: 3, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['金酒 45ml', '汤力水 120ml', '青柠或柠檬', '冰块'],
      convenience: ['小瓶金酒', '汤力水', '柠檬片杯', '冰杯'],
      simple: ['金酒', '汤力水或气泡水', '柠檬', '冰块']
    },
    steps: ['高杯加满冰块。', '倒入金酒。', '补汤力水，沿杯壁轻搅。', '挤一点柠檬汁提升清爽感。'],
    scenes: ['下班放松', '夏天晚上', '不想喝太甜', '新手第一杯'],
    substitutes: ['没有汤力水可用气泡水加少量柠檬。', '不想太苦就换雪碧或加蜂蜜。', '想低酒精就用 25ml 金酒。'],
    similar: ['gin-sprite', 'tom-collins', 'vodka-soda']
  },
  {
    id: 'baileys-milk',
    type: 'recipe',
    name: '百利甜牛奶',
    enName: 'Baileys Milk',
    aliases: ['百利甜', '奶酒', '百利甜牛奶'],
    base: '利口酒',
    tags: ['甜口', '奶香', '低门槛', '女生更容易接受', '新手友好'],
    reason: '适合几乎不要酒味、喜欢奶香和甜口的人。',
    flavor: { sweet: 5, sour: 0, alcohol: 1, fresh: 2, difficulty: 1 },
    materials: {
      standard: ['百利甜 45ml', '牛奶 120ml', '冰块'],
      convenience: ['百利甜小瓶', '鲜牛奶或冰牛奶', '冰杯'],
      simple: ['百利甜', '牛奶']
    },
    steps: ['杯中加冰。', '倒入百利甜。', '补牛奶并搅匀。', '喜欢咖啡感可加一小份冷萃。'],
    scenes: ['饭后甜口', '女生更容易接受', '宿舍/租房', '不想有明显酒味'],
    substitutes: ['没有牛奶可换咖啡或燕麦奶。', '怕甜就多加冰和牛奶。', '想更像甜品可加咖啡。'],
    similar: ['baileys-coffee', 'espresso-martini']
  },
  {
    id: 'whisky-cola',
    type: 'recipe',
    name: '威士忌可乐',
    enName: 'Whisky Cola',
    aliases: ['威可', '威士忌兑可乐', '可乐桶'],
    base: '威士忌',
    tags: ['甜口', '气泡感', '聚会', '便利店', '低门槛'],
    reason: '适合聚会临时做，材料好买，甜味能遮住大部分酒精刺激。',
    flavor: { sweet: 4, sour: 0, alcohol: 3, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['威士忌 45ml', '可乐 150ml', '柠檬角', '冰块'],
      convenience: ['威士忌小瓶', '可乐', '冰杯', '柠檬片杯'],
      simple: ['威士忌', '可乐', '冰块']
    },
    steps: ['杯中加满冰。', '倒入威士忌。', '补可乐。', '挤一点柠檬减少甜腻。'],
    scenes: ['朋友小聚', '聚会前临时采购', '便利店调酒', '甜口入门'],
    substitutes: ['想低酒精就少倒威士忌。', '想不那么甜可换无糖可乐。', '没有柠檬也可以直接喝。'],
    similar: ['cuba-libre', 'jager-cola', 'whisky-oolong']
  },
  {
    id: 'vodka-orange',
    type: 'recipe',
    name: '伏特加橙汁',
    enName: 'Vodka Orange',
    aliases: ['螺丝刀', 'screwdriver', '伏特加兑橙汁'],
    base: '伏特加',
    tags: ['果味', '酸甜', '新手友好', '便利店', '低门槛'],
    reason: '适合想要果味、酒味弱、步骤极少的新手。',
    flavor: { sweet: 3, sour: 3, alcohol: 2, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['伏特加 45ml', '橙汁 150ml', '冰块'],
      convenience: ['伏特加小瓶', '橙汁', '冰杯'],
      simple: ['伏特加', '橙汁']
    },
    steps: ['杯中加冰。', '倒入伏特加。', '补橙汁并搅匀。'],
    scenes: ['新手第一杯', '便利店调酒', '低酒精', '不喜欢苦味'],
    substitutes: ['橙汁可换葡萄柚汁。', '想更清爽可加气泡水。', '想低酒精就减少伏特加。'],
    similar: ['gin-sprite', 'rum-sprite', 'tequila-sprite']
  },
  {
    id: 'whisky-highball',
    type: 'recipe',
    name: '威士忌嗨棒',
    enName: 'Whisky Highball',
    aliases: ['嗨棒', 'highball', '威士忌苏打'],
    base: '威士忌',
    tags: ['清爽', '不太甜', '气泡感', '酒感', '进阶'],
    reason: '适合不想喝甜、但想保留威士忌香气的人。',
    flavor: { sweet: 0, sour: 1, alcohol: 4, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['威士忌 45ml', '苏打水 150ml', '柠檬皮或柠檬角', '冰块'],
      convenience: ['威士忌小瓶', '气泡水', '冰杯', '柠檬'],
      simple: ['威士忌', '气泡水', '冰块']
    },
    steps: ['杯中加满硬冰。', '倒入威士忌并搅冷。', '补气泡水。', '轻轻提拉搅拌，保持气泡。'],
    scenes: ['下班放松', '不想喝太甜', '晚餐搭配', '进阶入门'],
    substitutes: ['气泡水可换无糖苏打。', '想更易入口可加一点蜂蜜。', '酒感强就多加冰和气泡水。'],
    similar: ['gin-tonic', 'vodka-soda', 'whisky-oolong']
  },
  {
    id: 'gin-sprite',
    type: 'recipe',
    name: '金酒雪碧',
    enName: 'Gin Sprite',
    aliases: ['金酒兑雪碧', '金雪'],
    base: '金酒',
    tags: ['甜口', '清爽', '便利店', '低门槛', '女生更容易接受'],
    reason: '适合想试金酒但怕苦的人，甜和气泡会把草本感变得轻松。',
    flavor: { sweet: 4, sour: 1, alcohol: 2, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['金酒 35ml', '雪碧 150ml', '柠檬', '冰块'],
      convenience: ['金酒小瓶', '雪碧', '柠檬片杯', '冰杯'],
      simple: ['金酒', '雪碧']
    },
    steps: ['杯中加冰。', '倒入金酒。', '补雪碧。', '加柠檬会更清爽。'],
    scenes: ['便利店调酒', '新手第一杯', '甜口入门', '宿舍/租房'],
    substitutes: ['想低糖可用无糖雪碧。', '想更像金汤力可换汤力水。', '没有柠檬也能做。'],
    similar: ['gin-tonic', 'vodka-orange', 'rum-sprite']
  },
  {
    id: 'whisky-oolong',
    type: 'recipe',
    name: '威士忌乌龙茶',
    enName: 'Whisky Oolong',
    aliases: ['威士忌兑茶', '乌龙嗨棒'],
    base: '威士忌',
    tags: ['茶感', '不太甜', '便利店', '清爽', '新手友好'],
    reason: '适合不想太甜，又想把威士忌做得更日常的人。',
    flavor: { sweet: 1, sour: 0, alcohol: 3, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['威士忌 35ml', '无糖乌龙茶 150ml', '冰块'],
      convenience: ['威士忌小瓶', '无糖乌龙茶', '冰杯'],
      simple: ['威士忌', '茶', '冰块']
    },
    steps: ['杯中加冰。', '倒入威士忌。', '补乌龙茶并搅匀。'],
    scenes: ['下班放松', '便利店调酒', '不想喝太甜', '夜晚独处'],
    substitutes: ['乌龙茶可换绿茶或柠檬茶。', '想更甜用含糖茶饮。', '酒感强就增加茶的比例。'],
    similar: ['vodka-tea', 'gin-lemon-tea', 'whisky-highball']
  },
  {
    id: 'espresso-martini',
    type: 'recipe',
    name: '浓缩咖啡马天尼',
    enName: 'Espresso Martini',
    aliases: ['咖啡马天尼', 'espresso martini'],
    base: '伏特加',
    tags: ['咖啡感', '苦甜', '进阶', '夜晚'],
    reason: '适合喜欢咖啡苦甜和明显酒吧感的人。',
    flavor: { sweet: 3, sour: 0, alcohol: 4, fresh: 2, difficulty: 4 },
    materials: {
      standard: ['伏特加 45ml', '咖啡利口酒 20ml', '浓缩咖啡 30ml', '糖浆 10ml', '冰块'],
      convenience: ['伏特加', '冷萃咖啡', '咖啡利口酒或百利甜', '冰杯'],
      simple: ['伏特加', '冷萃咖啡', '糖']
    },
    steps: ['摇壶加入全部材料和冰。', '用力摇到杯壁冰冷。', '滤入杯中。', '可用咖啡豆或可可粉装饰。'],
    scenes: ['夜晚聚会', '咖啡爱好者', '进阶尝试', '饭后'],
    substitutes: ['没有咖啡利口酒可少量百利甜替代。', '没有摇壶可用密封杯摇。', '怕苦就增加糖浆。'],
    similar: ['baileys-coffee', 'baileys-milk']
  },
  {
    id: 'tom-collins',
    type: 'recipe',
    name: '汤姆柯林斯',
    enName: 'Tom Collins',
    aliases: ['金酒柠檬苏打', 'tom collins'],
    base: '金酒',
    tags: ['清爽', '酸甜', '气泡感', '夏天', '新手友好'],
    reason: '适合喜欢柠檬汽水口感，但又想保留一点金酒草本香的人。',
    flavor: { sweet: 2, sour: 4, alcohol: 3, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['金酒 45ml', '柠檬汁 20ml', '糖浆 15ml', '苏打水 补满', '冰块'],
      convenience: ['金酒小瓶', '柠檬味气泡水', '冰杯', '柠檬'],
      simple: ['金酒', '气泡水', '柠檬', '糖']
    },
    steps: ['杯中加入金酒、柠檬汁和糖。', '加满冰块。', '补气泡水并轻轻搅匀。'],
    scenes: ['夏天晚上', '朋友小聚', '不想喝太甜', '新手第一杯'],
    substitutes: ['没有糖浆可用白糖先溶在柠檬汁里。', '怕酸就减少柠檬。', '想更省事可直接用柠檬味气泡水。'],
    similar: ['gin-tonic', 'gin-sprite', 'vodka-soda']
  },
  {
    id: 'gin-lemon-tea',
    type: 'recipe',
    name: '金酒柠檬茶',
    enName: 'Gin Lemon Tea',
    aliases: ['金酒兑柠檬茶', '便利店金酒茶'],
    base: '金酒',
    tags: ['茶感', '酸甜', '便利店', '新手友好', '女生更容易接受'],
    reason: '适合想喝茶饮感、不想太像烈酒的人，便利店材料就能完成。',
    flavor: { sweet: 3, sour: 2, alcohol: 2, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['金酒 35ml', '柠檬茶 150ml', '柠檬片', '冰块'],
      convenience: ['金酒小瓶', '瓶装柠檬茶', '冰杯'],
      simple: ['金酒', '柠檬茶']
    },
    steps: ['冰杯倒入金酒。', '补柠檬茶。', '搅匀后用冰块控制甜度。'],
    scenes: ['便利店调酒', '宿舍/租房', '新手第一杯', '甜口入门'],
    substitutes: ['柠檬茶可换绿茶加柠檬。', '太甜就加气泡水。', '想低酒精就减少金酒。'],
    similar: ['vodka-tea', 'whisky-oolong', 'gin-sprite']
  },
  {
    id: 'negroni',
    type: 'recipe',
    name: '内格罗尼',
    enName: 'Negroni',
    aliases: ['negroni', '金巴利金酒'],
    base: '金酒',
    tags: ['苦甜', '酒感', '进阶', '餐前'],
    reason: '适合能接受苦味、想要经典酒吧感和明确酒感的人。',
    flavor: { sweet: 2, sour: 0, alcohol: 5, fresh: 2, difficulty: 3 },
    materials: {
      standard: ['金酒 30ml', '金巴利 30ml', '甜味美思 30ml', '橙皮', '冰块'],
      convenience: ['金酒', '金巴利小瓶', '甜味美思', '冰杯'],
      simple: ['金酒', '金巴利', '甜味美思']
    },
    steps: ['杯中加冰。', '三种酒等量倒入。', '搅拌至冰冷。', '用橙皮增香。'],
    scenes: ['餐前', '进阶尝试', '不想喝甜', '酒吧感'],
    substitutes: ['怕苦就减少金巴利。', '想更清爽可加气泡水做长饮。', '没有橙皮也可以省略。'],
    similar: ['gin-tonic', 'old-fashioned']
  },
  {
    id: 'moscow-mule',
    type: 'recipe',
    name: '莫斯科骡子',
    enName: 'Moscow Mule',
    aliases: ['姜汁伏特加', 'moscow mule'],
    base: '伏特加',
    tags: ['清爽', '辛香', '酸甜', '气泡感', '进阶'],
    reason: '适合喜欢姜味、柠檬和气泡冲击感的人。',
    flavor: { sweet: 2, sour: 3, alcohol: 3, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['伏特加 45ml', '姜汁汽水 120ml', '青柠汁 15ml', '冰块'],
      convenience: ['伏特加小瓶', '姜汁汽水', '柠檬', '冰杯'],
      simple: ['伏特加', '姜汁汽水', '柠檬']
    },
    steps: ['杯中加满冰。', '倒入伏特加和柠檬汁。', '补姜汁汽水并轻搅。'],
    scenes: ['夏天晚上', '朋友小聚', '想要清爽刺激', '进阶入门'],
    substitutes: ['没有姜汁汽水可用雪碧加姜片。', '怕辣就少放姜味饮料。', '想低酒精就减少伏特加。'],
    similar: ['vodka-soda', 'tom-collins']
  },
  {
    id: 'vodka-soda',
    type: 'recipe',
    name: '伏特加苏打',
    enName: 'Vodka Soda',
    aliases: ['伏特加气泡水', 'vodka soda'],
    base: '伏特加',
    tags: ['清爽', '不太甜', '低糖', '低门槛'],
    reason: '适合不想喝甜、想要干净低负担微醺的人。',
    flavor: { sweet: 0, sour: 1, alcohol: 3, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['伏特加 35ml', '气泡水 150ml', '柠檬', '冰块'],
      convenience: ['伏特加小瓶', '气泡水', '柠檬片杯', '冰杯'],
      simple: ['伏特加', '气泡水', '冰块']
    },
    steps: ['冰杯倒入伏特加。', '补气泡水。', '挤入柠檬并轻搅。'],
    scenes: ['下班放松', '低糖', '不想喝太甜', '便利店调酒'],
    substitutes: ['觉得酒感明显就加更多气泡水。', '想甜一点可换雪碧。', '没有柠檬也能做。'],
    similar: ['gin-tonic', 'whisky-highball', 'tom-collins']
  },
  {
    id: 'vodka-tea',
    type: 'recipe',
    name: '伏特加茶饮',
    enName: 'Vodka Tea',
    aliases: ['伏特加兑茶', '茶兑伏特加'],
    base: '伏特加',
    tags: ['茶感', '便利店', '低门槛', '新手友好'],
    reason: '适合想用手边茶饮做一杯低门槛长饮的人。',
    flavor: { sweet: 2, sour: 1, alcohol: 2, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['伏特加 35ml', '无糖茶或柠檬茶 150ml', '冰块'],
      convenience: ['伏特加小瓶', '茶饮', '冰杯'],
      simple: ['伏特加', '茶', '冰块']
    },
    steps: ['杯中加冰。', '倒入伏特加。', '补茶饮并搅匀。'],
    scenes: ['便利店调酒', '宿舍/租房', '新手第一杯', '不想复杂'],
    substitutes: ['想清爽用无糖茶。', '想甜口用柠檬茶。', '想低酒精就增加茶的比例。'],
    similar: ['whisky-oolong', 'gin-lemon-tea']
  },
  {
    id: 'cuba-libre',
    type: 'recipe',
    name: '自由古巴',
    enName: 'Cuba Libre',
    aliases: ['朗姆可乐', 'cuba libre'],
    base: '朗姆',
    tags: ['甜口', '气泡感', '便利店', '聚会'],
    reason: '适合想要比普通可乐桶多一点柠檬香和朗姆甜香的人。',
    flavor: { sweet: 4, sour: 1, alcohol: 3, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['白朗姆 45ml', '可乐 150ml', '青柠或柠檬', '冰块'],
      convenience: ['朗姆小瓶', '可乐', '柠檬片杯', '冰杯'],
      simple: ['朗姆', '可乐', '柠檬']
    },
    steps: ['杯中加冰。', '挤入柠檬汁。', '倒入朗姆并补可乐。'],
    scenes: ['朋友小聚', '便利店调酒', '甜口入门', '聚会前临时采购'],
    substitutes: ['没有柠檬也能做。', '怕甜用无糖可乐。', '朗姆可换威士忌。'],
    similar: ['whisky-cola', 'rum-sprite', 'jager-cola']
  },
  {
    id: 'rum-sprite',
    type: 'recipe',
    name: '朗姆雪碧',
    enName: 'Rum Sprite',
    aliases: ['朗姆兑雪碧', '朗姆汽水'],
    base: '朗姆',
    tags: ['甜口', '清爽', '便利店', '低门槛', '新手友好'],
    reason: '适合想要简单、甜口、酒味不重的聚会杯。',
    flavor: { sweet: 4, sour: 1, alcohol: 2, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['白朗姆 35ml', '雪碧 150ml', '柠檬', '冰块'],
      convenience: ['朗姆小瓶', '雪碧', '冰杯'],
      simple: ['朗姆', '雪碧']
    },
    steps: ['杯中加冰。', '倒入朗姆。', '补雪碧，喜欢清爽就加柠檬。'],
    scenes: ['便利店调酒', '新手第一杯', '朋友小聚', '甜口入门'],
    substitutes: ['雪碧可换可乐。', '想不甜用气泡水。', '想更像莫吉托就加薄荷和柠檬。'],
    similar: ['mojito', 'gin-sprite', 'cuba-libre']
  },
  {
    id: 'daiquiri',
    type: 'recipe',
    name: '代基里',
    enName: 'Daiquiri',
    aliases: ['朗姆酸', 'daiquiri'],
    base: '朗姆',
    tags: ['酸甜', '清爽', '酒感', '进阶'],
    reason: '适合想从便利店长饮进阶到经典短饮的人。',
    flavor: { sweet: 2, sour: 4, alcohol: 4, fresh: 4, difficulty: 3 },
    materials: {
      standard: ['白朗姆 45ml', '青柠汁 20ml', '糖浆 15ml', '冰块'],
      convenience: ['朗姆', '柠檬汁', '糖', '冰杯'],
      simple: ['朗姆', '柠檬', '糖']
    },
    steps: ['把朗姆、柠檬汁和糖加入摇壶。', '加冰用力摇冷。', '滤入杯中。'],
    scenes: ['进阶尝试', '酸甜爱好者', '夏天晚上', '酒吧感'],
    substitutes: ['没有摇壶可用密封杯。', '怕酸就增加糖。', '想长饮可补气泡水。'],
    similar: ['margarita', 'mojito']
  },
  {
    id: 'margarita',
    type: 'recipe',
    name: '玛格丽特',
    enName: 'Margarita',
    aliases: ['龙舌兰酸', 'margarita'],
    base: '龙舌兰',
    tags: ['酸甜', '酒感', '聚会', '进阶'],
    reason: '适合喜欢酸甜、盐边和明显龙舌兰风味的人。',
    flavor: { sweet: 2, sour: 5, alcohol: 4, fresh: 4, difficulty: 4 },
    materials: {
      standard: ['龙舌兰 45ml', '橙味利口酒 20ml', '青柠汁 20ml', '盐边', '冰块'],
      convenience: ['龙舌兰', '橙汁少量', '柠檬汁', '盐', '冰杯'],
      simple: ['龙舌兰', '柠檬', '盐']
    },
    steps: ['杯口抹柠檬并沾盐。', '摇壶加入材料和冰。', '摇冷后滤入杯中。'],
    scenes: ['朋友小聚', '进阶尝试', '酸甜爱好者', '聚会'],
    substitutes: ['没有橙味利口酒可少量橙汁替代。', '怕酸就加一点糖。', '想低酒精可加气泡水做长饮。'],
    similar: ['paloma', 'daiquiri']
  },
  {
    id: 'paloma',
    type: 'recipe',
    name: '帕洛玛',
    enName: 'Paloma',
    aliases: ['龙舌兰葡萄柚', 'paloma'],
    base: '龙舌兰',
    tags: ['酸甜', '果味', '清爽', '气泡感'],
    reason: '适合想让龙舌兰变得清爽、果味明显、比玛格丽特更轻松的人。',
    flavor: { sweet: 2, sour: 3, alcohol: 3, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['龙舌兰 45ml', '葡萄柚汽水 150ml', '青柠汁 10ml', '盐少量', '冰块'],
      convenience: ['龙舌兰小瓶', '葡萄柚汁或葡萄柚汽水', '冰杯'],
      simple: ['龙舌兰', '葡萄柚汁', '气泡水']
    },
    steps: ['杯中加冰。', '倒入龙舌兰和柠檬汁。', '补葡萄柚汽水，轻搅。'],
    scenes: ['夏天晚上', '朋友小聚', '清爽果味', '新手进阶'],
    substitutes: ['没有葡萄柚汽水可用葡萄柚汁加气泡水。', '怕苦可换橙汁。', '想更甜加雪碧。'],
    similar: ['margarita', 'tequila-sprite']
  },
  {
    id: 'tequila-sprite',
    type: 'recipe',
    name: '龙舌兰雪碧',
    enName: 'Tequila Sprite',
    aliases: ['龙舌兰兑雪碧'],
    base: '龙舌兰',
    tags: ['甜口', '酸甜', '便利店', '聚会', '低门槛'],
    reason: '适合想试龙舌兰，但还不想面对强烈酒感的人。',
    flavor: { sweet: 4, sour: 1, alcohol: 3, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['龙舌兰 35ml', '雪碧 150ml', '柠檬', '冰块'],
      convenience: ['龙舌兰小瓶', '雪碧', '柠檬片杯', '冰杯'],
      simple: ['龙舌兰', '雪碧']
    },
    steps: ['冰杯倒入龙舌兰。', '补雪碧。', '加柠檬后轻搅。'],
    scenes: ['便利店调酒', '朋友小聚', '新手第一杯', '甜口入门'],
    substitutes: ['雪碧可换葡萄柚汽水。', '想更酸加柠檬。', '想低酒精就减少龙舌兰。'],
    similar: ['paloma', 'gin-sprite', 'rum-sprite']
  },
  {
    id: 'jager-cola',
    type: 'recipe',
    name: '野格可乐',
    enName: 'Jager Cola',
    aliases: ['野格兑可乐', '野格可乐桶'],
    base: '野格',
    tags: ['苦甜', '甜口', '便利店', '聚会'],
    reason: '适合聚会临时做，草本甜苦和可乐气泡结合很直接。',
    flavor: { sweet: 4, sour: 0, alcohol: 3, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['野格 35ml', '可乐 150ml', '柠檬', '冰块'],
      convenience: ['野格小瓶', '可乐', '冰杯'],
      simple: ['野格', '可乐']
    },
    steps: ['杯中加冰。', '倒入野格。', '补可乐并轻搅。'],
    scenes: ['朋友小聚', '聚会前临时采购', '便利店调酒', '甜口入门'],
    substitutes: ['怕甜用无糖可乐。', '想更刺激可换能量饮料。', '加柠檬能减少草本药感。'],
    similar: ['whisky-cola', 'cuba-libre', 'jager-redbull']
  },
  {
    id: 'jager-redbull',
    type: 'recipe',
    name: '野格能量饮',
    enName: 'Jager Energy',
    aliases: ['野格炸弹', '野格红牛'],
    base: '野格',
    tags: ['聚会', '苦甜', '酒感', '便利店'],
    reason: '适合聚会场景，但酒精和咖啡因存在感都强，适合小杯慢喝。',
    flavor: { sweet: 4, sour: 1, alcohol: 4, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['野格 30ml', '能量饮料 120ml', '冰块'],
      convenience: ['野格小瓶', '能量饮料', '冰杯'],
      simple: ['野格', '能量饮料']
    },
    steps: ['冰杯倒入野格。', '补能量饮料。', '轻轻搅匀。'],
    scenes: ['朋友小聚', '聚会前临时采购', '酒感强一点', '夜晚聚会'],
    substitutes: ['想温和一点可换可乐。', '不要做太大杯。', '晚上容易睡不着的人谨慎选择。'],
    similar: ['jager-cola', 'whisky-cola']
  },
  {
    id: 'baileys-coffee',
    type: 'recipe',
    name: '百利甜咖啡',
    enName: 'Baileys Coffee',
    aliases: ['百利甜兑咖啡', '奶酒咖啡'],
    base: '百利甜',
    tags: ['咖啡感', '奶香', '甜口', '新手友好'],
    reason: '适合喜欢咖啡奶香、想要甜品微醺但不想明显烈酒感的人。',
    flavor: { sweet: 4, sour: 0, alcohol: 1, fresh: 2, difficulty: 1 },
    materials: {
      standard: ['百利甜 45ml', '冷萃咖啡 120ml', '冰块'],
      convenience: ['百利甜小瓶', '冷萃咖啡', '冰杯'],
      simple: ['百利甜', '咖啡']
    },
    steps: ['杯中加冰。', '倒入百利甜。', '补咖啡并搅匀。'],
    scenes: ['饭后甜口', '咖啡爱好者', '宿舍/租房', '低酒精'],
    substitutes: ['咖啡可换牛奶。', '怕苦就加牛奶。', '想更浓郁可用浓缩咖啡。'],
    similar: ['baileys-milk', 'espresso-martini']
  },
  {
    id: 'coffee-tonic',
    type: 'recipe',
    name: '咖啡汤力',
    enName: 'Coffee Tonic',
    aliases: ['冷萃汤力', 'coffee tonic'],
    base: '无酒精',
    tags: ['咖啡感', '微苦', '清爽', '无酒精'],
    reason: '适合想要咖啡香、气泡和轻微苦感，但暂时不喝酒的人。',
    flavor: { sweet: 1, sour: 1, alcohol: 0, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['冷萃咖啡 60ml', '汤力水 120ml', '冰块'],
      convenience: ['冷萃咖啡', '汤力水', '冰杯'],
      simple: ['咖啡', '汤力水']
    },
    steps: ['杯中加满冰。', '先倒汤力水。', '沿冰块慢慢倒入咖啡。'],
    scenes: ['无酒精', '下午', '咖啡爱好者', '清爽提神'],
    substitutes: ['汤力水可换气泡水。', '怕苦就加一点糖。', '晚上避免摄入太多咖啡因。'],
    similar: ['baileys-coffee', 'espresso-martini']
  },
  {
    id: 'old-fashioned',
    type: 'recipe',
    name: '古典鸡尾酒',
    enName: 'Old Fashioned',
    aliases: ['old fashioned', '威士忌古典'],
    base: '威士忌',
    tags: ['酒感', '苦甜', '进阶', '经典'],
    reason: '适合想喝威士忌本味，同时用一点甜和苦味修饰的人。',
    flavor: { sweet: 2, sour: 0, alcohol: 5, fresh: 1, difficulty: 4 },
    materials: {
      standard: ['威士忌 60ml', '方糖或糖浆', '苦精 2滴', '橙皮', '大冰块'],
      convenience: ['威士忌', '糖', '橙皮或橙子', '大冰块'],
      simple: ['威士忌', '糖', '冰块']
    },
    steps: ['杯中加入糖和少量水化开。', '加入威士忌和大冰块。', '慢慢搅拌至冰冷。', '用橙皮增香。'],
    scenes: ['下班放松', '进阶尝试', '酒感强一点', '夜晚独处'],
    substitutes: ['没有苦精可省略。', '怕烈就加一小块冰慢慢稀释。', '想更甜就增加糖。'],
    similar: ['whisky-highball', 'negroni']
  },
  {
    id: 'umeshu-soda',
    type: 'recipe',
    name: '梅酒苏打',
    enName: 'Umeshu Soda',
    aliases: ['梅酒气泡水', '梅酒兑苏打'],
    base: '梅酒',
    tags: ['酸甜', '果味', '低酒精', '清爽', '女生更容易接受'],
    reason: '适合想要轻松酸甜、酒精负担低、几乎不需要技巧的人。',
    flavor: { sweet: 3, sour: 3, alcohol: 1, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['梅酒 45ml', '气泡水 120ml', '冰块'],
      convenience: ['梅酒小瓶', '气泡水', '冰杯'],
      simple: ['梅酒', '气泡水']
    },
    steps: ['杯中加冰。', '倒入梅酒。', '补气泡水并轻搅。'],
    scenes: ['新手第一杯', '夏天晚上', '低酒精', '女生更容易接受'],
    substitutes: ['气泡水可换雪碧。', '想更茶感可换乌龙茶。', '太甜就多加冰。'],
    similar: ['umeshu-oolong', 'fruit-wine-spritz']
  },
  {
    id: 'umeshu-oolong',
    type: 'recipe',
    name: '梅酒乌龙',
    enName: 'Umeshu Oolong',
    aliases: ['梅酒兑乌龙茶', '梅子乌龙'],
    base: '梅酒',
    tags: ['茶感', '酸甜', '低酒精', '不太甜'],
    reason: '适合觉得梅酒纯喝偏甜，想用茶感拉平甜度的人。',
    flavor: { sweet: 2, sour: 2, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['梅酒 45ml', '无糖乌龙茶 120ml', '冰块'],
      convenience: ['梅酒小瓶', '无糖乌龙茶', '冰杯'],
      simple: ['梅酒', '茶', '冰块']
    },
    steps: ['杯中加冰。', '倒入梅酒。', '补乌龙茶并搅匀。'],
    scenes: ['下班放松', '低酒精', '不想喝太甜', '便利店调酒'],
    substitutes: ['乌龙茶可换绿茶。', '想更甜用含糖茶。', '想更清爽加气泡水。'],
    similar: ['whisky-oolong', 'umeshu-soda']
  },
  {
    id: 'fruit-wine-spritz',
    type: 'recipe',
    name: '果酒气泡杯',
    enName: 'Fruit Wine Spritz',
    aliases: ['果酒苏打', '果酒气泡'],
    base: '果酒',
    tags: ['果味', '甜口', '低酒精', '气泡感', '聚会'],
    reason: '适合把低度果酒做得更清爽，适合聚会批量出杯。',
    flavor: { sweet: 3, sour: 2, alcohol: 1, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['果酒 90ml', '气泡水 90ml', '水果片', '冰块'],
      convenience: ['果酒', '气泡水', '水果杯', '冰杯'],
      simple: ['果酒', '气泡水']
    },
    steps: ['杯中加冰和水果。', '倒入果酒。', '补气泡水。'],
    scenes: ['朋友小聚', '低酒精', '女生更容易接受', '夏天晚上'],
    substitutes: ['气泡水可换雪碧。', '水果可省略。', '想更酸加柠檬。'],
    similar: ['umeshu-soda', 'mimosa']
  },
  {
    id: 'sangria-light',
    type: 'recipe',
    name: '简易桑格利亚',
    enName: 'Light Sangria',
    aliases: ['水果酒', '简易水果酒'],
    base: '果酒',
    tags: ['果味', '甜口', '聚会', '低酒精'],
    reason: '适合聚会提前准备，用水果把普通果酒变得更丰富。',
    flavor: { sweet: 4, sour: 2, alcohol: 2, fresh: 3, difficulty: 2 },
    materials: {
      standard: ['红/白果酒 300ml', '橙子或苹果', '气泡水 150ml', '冰块'],
      convenience: ['果酒', '水果杯', '气泡水', '冰杯'],
      simple: ['果酒', '水果', '冰块']
    },
    steps: ['水果切片放入壶中。', '倒入果酒冷藏或加冰。', '饮用前补气泡水。'],
    scenes: ['朋友小聚', '聚会前临时采购', '低酒精', '甜口入门'],
    substitutes: ['果酒可换低度红酒。', '没有水果杯可用橙汁少量补香。', '想不甜加无糖气泡水。'],
    similar: ['fruit-wine-spritz', 'mimosa']
  },
  {
    id: 'mimosa',
    type: 'recipe',
    name: '含羞草',
    enName: 'Mimosa',
    aliases: ['起泡酒橙汁', 'mimosa'],
    base: '起泡酒',
    tags: ['果味', '低酒精', '气泡感', '新手友好'],
    reason: '适合早午餐、轻松聚会和不想有明显酒感的人。',
    flavor: { sweet: 3, sour: 2, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['起泡酒 90ml', '橙汁 60ml'],
      convenience: ['起泡酒小瓶', '橙汁'],
      simple: ['起泡酒', '橙汁']
    },
    steps: ['杯中先倒橙汁。', '缓慢倒入冰镇起泡酒。', '不要用力搅拌，保留气泡。'],
    scenes: ['朋友小聚', '低酒精', '女生更容易接受', '周末下午'],
    substitutes: ['橙汁可换葡萄柚汁。', '想更清爽减少橙汁。', '没有起泡酒可用果酒加气泡水。'],
    similar: ['fruit-wine-spritz', 'aperol-spritz']
  },
  {
    id: 'aperol-spritz',
    type: 'recipe',
    name: '阿佩罗橙光',
    enName: 'Aperol Spritz',
    aliases: ['aperol spritz', '阿佩罗 Spritz'],
    base: '起泡酒',
    tags: ['苦甜', '气泡感', '清爽', '进阶'],
    reason: '适合能接受轻微苦味，想要轻盈餐前酒和度假感的人。',
    flavor: { sweet: 2, sour: 1, alcohol: 2, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['阿佩罗 60ml', '起泡酒 90ml', '气泡水 30ml', '橙片', '冰块'],
      convenience: ['阿佩罗', '起泡酒小瓶', '气泡水', '冰杯'],
      simple: ['阿佩罗', '起泡酒', '气泡水']
    },
    steps: ['酒杯加满冰。', '倒入阿佩罗和起泡酒。', '补一点气泡水并轻搅。'],
    scenes: ['餐前', '朋友小聚', '夏天晚上', '进阶尝试'],
    substitutes: ['怕苦就减少阿佩罗。', '没有橙片可省略。', '想更低酒精就增加气泡水。'],
    similar: ['mimosa', 'negroni']
  },
  {
    id: 'vodka-grapefruit',
    type: 'recipe',
    name: '伏特加葡萄柚',
    enName: 'Vodka Grapefruit',
    aliases: ['伏特加西柚', '西柚伏特加'],
    base: '伏特加',
    tags: ['果味', '酸甜', '微苦', '清爽'],
    reason: '适合想要比橙汁更清爽、有一点微苦果味的人。',
    flavor: { sweet: 2, sour: 3, alcohol: 2, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['伏特加 35ml', '葡萄柚汁 120ml', '气泡水 60ml', '冰块'],
      convenience: ['伏特加小瓶', '葡萄柚汁', '气泡水', '冰杯'],
      simple: ['伏特加', '葡萄柚汁']
    },
    steps: ['杯中加冰。', '倒入伏特加和葡萄柚汁。', '补气泡水并轻搅。'],
    scenes: ['夏天晚上', '便利店调酒', '果味清爽', '新手第一杯'],
    substitutes: ['葡萄柚汁可换橙汁。', '怕苦加一点雪碧。', '想低酒精减少伏特加。'],
    similar: ['vodka-orange', 'paloma']
  },
  {
    id: 'whisky-apple',
    type: 'recipe',
    name: '威士忌苹果汁',
    enName: 'Whisky Apple',
    aliases: ['威士忌兑苹果汁', '苹果嗨棒'],
    base: '威士忌',
    tags: ['果味', '甜口', '便利店', '新手友好'],
    reason: '适合觉得可乐太甜腻，但又想用果味柔化威士忌的人。',
    flavor: { sweet: 3, sour: 1, alcohol: 2, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['威士忌 35ml', '苹果汁 120ml', '气泡水 60ml', '冰块'],
      convenience: ['威士忌小瓶', '苹果汁', '冰杯'],
      simple: ['威士忌', '苹果汁']
    },
    steps: ['杯中加冰。', '倒入威士忌。', '补苹果汁，想更清爽就加气泡水。'],
    scenes: ['便利店调酒', '新手第一杯', '甜口入门', '下班放松'],
    substitutes: ['苹果汁可换橙汁。', '太甜就加柠檬或气泡水。', '想不甜可换乌龙茶。'],
    similar: ['whisky-cola', 'whisky-oolong']
  },
  {
    id: 'vodka-apple',
    type: 'recipe',
    name: '伏特加苹果汁',
    enName: 'Vodka Apple',
    aliases: ['苹果伏特加'],
    base: '伏特加',
    tags: ['果味', '甜口', '便利店', '低门槛'],
    reason: '适合想要果汁感强、酒味弱、步骤极少的人。',
    flavor: { sweet: 3, sour: 1, alcohol: 2, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['伏特加 35ml', '苹果汁 150ml', '冰块'],
      convenience: ['伏特加小瓶', '苹果汁', '冰杯'],
      simple: ['伏特加', '苹果汁']
    },
    steps: ['冰杯倒入伏特加。', '补苹果汁。', '搅匀后试甜度。'],
    scenes: ['便利店调酒', '新手第一杯', '甜口入门', '宿舍/租房'],
    substitutes: ['苹果汁可换橙汁。', '想清爽就加气泡水。', '想酸甜就加柠檬。'],
    similar: ['vodka-orange', 'whisky-apple']
  },
  {
    id: 'sake-highball',
    type: 'recipe',
    name: '清酒嗨棒',
    enName: 'Sake Highball',
    aliases: ['清酒苏打', '日本酒苏打', '清酒气泡水', 'sake highball'],
    base: '清酒',
    tags: ['清爽', '气泡感', '低酒精', '新手友好', '便利店'],
    reason: '适合想喝清酒但怕米香太明显的人，加气泡后会像更轻的冰饮。',
    flavor: { sweet: 1, sour: 1, alcohol: 1, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['清酒 60ml', '气泡水 120ml', '柠檬或青柠', '冰块'],
      convenience: ['清酒小瓶', '气泡水', '柠檬片杯', '冰杯'],
      simple: ['清酒', '气泡水', '冰块']
    },
    steps: ['杯中加满冰块。', '倒入清酒。', '补气泡水，轻轻搅一下。', '挤一点柠檬让米香更清爽。'],
    scenes: ['新手第一杯', '下班放松', '便利店调酒', '不想喝太甜'],
    substitutes: ['气泡水可换苏打水。', '想甜一点可换雪碧。', '想低酒感就减少清酒、增加气泡水。'],
    similar: ['umeshu-soda', 'vodka-soda', 'whisky-highball']
  },
  {
    id: 'sake-green-tea',
    type: 'recipe',
    name: '清酒绿茶',
    enName: 'Sake Green Tea',
    aliases: ['清酒兑绿茶', '日本酒绿茶', '清酒茶饮'],
    base: '清酒',
    tags: ['茶感', '清爽', '低酒精', '便利店', '不太甜'],
    reason: '适合不想喝甜饮的人，绿茶能把清酒做得更像日常冰茶。',
    flavor: { sweet: 1, sour: 0, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['清酒 60ml', '无糖绿茶 120ml', '冰块'],
      convenience: ['清酒小瓶', '无糖绿茶', '冰杯'],
      simple: ['清酒', '茶', '冰块']
    },
    steps: ['冰杯倒入清酒。', '补无糖绿茶。', '轻轻搅匀后试味。'],
    scenes: ['下班放松', '便利店调酒', '低酒精', '不想喝太甜'],
    substitutes: ['绿茶可换乌龙茶。', '想甜一点用含糖茶饮。', '酒感明显就增加茶的比例。'],
    similar: ['umeshu-oolong', 'whisky-oolong', 'vodka-tea']
  },
  {
    id: 'sake-sprite',
    type: 'recipe',
    name: '清酒雪碧',
    enName: 'Sake Sprite',
    aliases: ['清酒兑雪碧', '日本酒雪碧', '清酒汽水'],
    base: '清酒',
    tags: ['甜口', '清爽', '低酒精', '便利店', '新手友好'],
    reason: '适合第一次尝试清酒，雪碧会把米香变得更软、更像冰镇汽水。',
    flavor: { sweet: 4, sour: 1, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['清酒 60ml', '雪碧 120ml', '柠檬', '冰块'],
      convenience: ['清酒小瓶', '雪碧', '冰杯'],
      simple: ['清酒', '雪碧']
    },
    steps: ['杯中加冰。', '倒入清酒。', '补雪碧。', '加柠檬会更清爽。'],
    scenes: ['新手第一杯', '便利店调酒', '甜口入门', '宿舍/租房'],
    substitutes: ['雪碧可换气泡水。', '想不甜就换无糖茶。', '想低酒感就减少清酒。'],
    similar: ['gin-sprite', 'rum-sprite', 'umeshu-soda']
  }
]

const schemes = [
  {
    id: 'cv-fresh-tipsy',
    type: 'scheme',
    name: '便利店清爽微醺方案',
    enName: 'Convenience Fresh Highball',
    tags: ['便利店', '清爽', '微醺', '低酒精', '气泡感'],
    reason: '适合下班路上临时买，回家三分钟做一杯清爽低负担长饮。',
    flavor: { sweet: 1, sour: 2, alcohol: 2, fresh: 5, difficulty: 1 },
    place: ['便利店', '宿舍/租房', '聚会前临时采购'],
    mood: ['清爽', '微醺', '低酒精', '气泡感'],
    price: '约 35-55 元',
    materials: {
      standard: ['金酒小瓶', '汤力水或气泡水', '柠檬片杯', '冰杯'],
      convenience: ['金酒小瓶 1支', '汤力水 1瓶', '柠檬片杯 1份', '冰杯 1杯'],
      simple: ['金酒', '气泡水', '冰块']
    },
    steps: ['冰杯倒入金酒 25-35ml。', '补汤力水或气泡水。', '挤入柠檬，轻轻搅匀。'],
    scenes: ['下班放松', '夏天晚上', '一个人微醺', '不想喝甜'],
    substitutes: ['没有汤力水就用气泡水。', '怕苦就换雪碧。', '想更低酒精就只倒半瓶小酒。'],
    warnings: ['便利店冰杯融化快，先冰饮料再混合。'],
    similar: ['gin-tonic', 'gin-sprite', 'whisky-highball']
  },
  {
    id: 'cv-sweet-party',
    type: 'scheme',
    name: '便利店甜口聚会方案',
    enName: 'Convenience Sweet Party',
    tags: ['便利店', '甜口', '聚会', '低门槛', '气泡感'],
    reason: '适合朋友小聚，材料好买，几乎不需要调酒工具。',
    flavor: { sweet: 4, sour: 1, alcohol: 3, fresh: 3, difficulty: 1 },
    place: ['便利店', '超市', '聚会前临时采购'],
    mood: ['甜口', '果味', '微醺'],
    price: '约 45-80 元',
    materials: {
      standard: ['威士忌或朗姆', '可乐', '柠檬', '冰块'],
      convenience: ['威士忌小瓶 1支', '可乐 1瓶', '冰杯 2杯', '柠檬片杯 1份'],
      simple: ['威士忌', '可乐']
    },
    steps: ['冰杯加威士忌 30-45ml。', '补可乐。', '加柠檬减少甜腻。'],
    scenes: ['朋友小聚', '聚会前临时采购', '甜口入门', '不想失败'],
    substitutes: ['威士忌可换朗姆。', '怕甜用无糖可乐。', '想更酸甜就加橙汁或柠檬。'],
    warnings: ['可乐很遮酒味，别连续加太多基酒。'],
    similar: ['whisky-cola', 'cuba-libre', 'jager-cola']
  },
  {
    id: 'cv-milk-soft',
    type: 'scheme',
    name: '便利店奶香低门槛方案',
    enName: 'Convenience Creamy Soft',
    tags: ['便利店', '奶香', '甜口', '新手友好', '低门槛'],
    reason: '适合不喜欢明显酒味的人，像一杯带酒感的甜品饮料。',
    flavor: { sweet: 5, sour: 0, alcohol: 1, fresh: 2, difficulty: 1 },
    place: ['便利店', '家里', '宿舍/租房'],
    mood: ['奶香', '甜口', '低酒精'],
    price: '约 30-60 元',
    materials: {
      standard: ['百利甜', '牛奶', '冰块'],
      convenience: ['百利甜小瓶', '鲜牛奶或冰牛奶', '冰杯'],
      simple: ['百利甜', '牛奶']
    },
    steps: ['冰杯倒入百利甜。', '补牛奶。', '搅匀后试甜度。'],
    scenes: ['饭后甜口', '宿舍/租房', '女生更容易接受', '低酒精'],
    substitutes: ['牛奶可换咖啡。', '怕甜就增加牛奶比例。', '想更冰爽就多加冰。'],
    warnings: ['不要和高酸果汁混合。'],
    similar: ['baileys-milk', 'baileys-coffee']
  },
  {
    id: 'cv-tea-light',
    type: 'scheme',
    name: '便利店茶感不甜方案',
    enName: 'Convenience Tea Light',
    tags: ['便利店', '茶感', '不太甜', '清爽', '新手友好'],
    reason: '适合不想喝甜饮，又想要一点微醺和茶香的人。',
    flavor: { sweet: 1, sour: 0, alcohol: 2, fresh: 4, difficulty: 1 },
    place: ['便利店', '宿舍/租房', '家里'],
    mood: ['茶感', '清爽', '微醺', '低酒精'],
    price: '约 30-55 元',
    materials: {
      standard: ['威士忌或伏特加', '无糖乌龙茶', '冰块'],
      convenience: ['威士忌小瓶或伏特加小瓶', '无糖乌龙茶 1瓶', '冰杯 1杯'],
      simple: ['基酒', '茶', '冰块']
    },
    steps: ['冰杯倒入基酒 25-35ml。', '补无糖乌龙茶。', '搅匀后按酒感加茶调整。'],
    scenes: ['下班放松', '宿舍/租房', '不想喝太甜', '便利店调酒'],
    substitutes: ['威士忌更有香气，伏特加更干净。', '想甜一点换柠檬茶。', '想低酒精就只倒半瓶小酒。'],
    warnings: ['茶饮越浓越显酒感，新手建议先少倒酒。'],
    similar: ['whisky-oolong', 'vodka-tea', 'umeshu-oolong']
  },
  {
    id: 'cv-fruit-low',
    type: 'scheme',
    name: '便利店果味低酒精方案',
    enName: 'Convenience Fruit Low ABV',
    tags: ['便利店', '果味', '低酒精', '女生更容易接受', '酸甜'],
    reason: '适合想要果汁感、轻微微醺、不想被酒味压住的人。',
    flavor: { sweet: 3, sour: 2, alcohol: 1, fresh: 4, difficulty: 1 },
    place: ['便利店', '超市', '宿舍/租房', '聚会前临时采购'],
    mood: ['果味', '酸甜', '低酒精', '微醺'],
    price: '约 35-65 元',
    materials: {
      standard: ['伏特加或低度果酒', '橙汁或葡萄柚汁', '气泡水', '冰块'],
      convenience: ['伏特加小瓶或果酒', '果汁 1瓶', '气泡水 1瓶', '冰杯'],
      simple: ['伏特加', '果汁', '冰块']
    },
    steps: ['冰杯倒入少量基酒。', '加入果汁至七分满。', '补气泡水，让口感更轻。'],
    scenes: ['新手第一杯', '女生更容易接受', '夏天晚上', '朋友小聚'],
    substitutes: ['橙汁更甜，葡萄柚更清爽。', '不用伏特加也可以直接果酒加气泡水。', '怕酸就选苹果汁。'],
    warnings: ['果汁遮酒味，聚会时别连续加酒。'],
    similar: ['vodka-orange', 'vodka-grapefruit', 'fruit-wine-spritz']
  },
  {
    id: 'cv-coffee-night',
    type: 'scheme',
    name: '便利店咖啡夜晚方案',
    enName: 'Convenience Coffee Night',
    tags: ['便利店', '咖啡感', '苦甜', '夜晚', '进阶'],
    reason: '适合咖啡爱好者，做成甜品感或清爽苦甜都可以。',
    flavor: { sweet: 3, sour: 0, alcohol: 2, fresh: 2, difficulty: 2 },
    place: ['便利店', '家里', '宿舍/租房'],
    mood: ['咖啡感', '苦甜', '奶香', '微醺'],
    price: '约 35-70 元',
    materials: {
      standard: ['百利甜或伏特加', '冷萃咖啡', '牛奶可选', '冰块'],
      convenience: ['百利甜小瓶或伏特加小瓶', '冷萃咖啡', '冰杯', '牛奶可选'],
      simple: ['百利甜', '咖啡']
    },
    steps: ['冰杯倒入百利甜或伏特加。', '补冷萃咖啡。', '想柔和就加牛奶。'],
    scenes: ['饭后甜口', '咖啡爱好者', '夜晚聚会', '宿舍/租房'],
    substitutes: ['百利甜走奶香甜口，伏特加走苦甜酒吧感。', '怕苦就加牛奶。', '想无酒精就做咖啡汤力。'],
    warnings: ['咖啡因会影响睡眠，晚上不要做太大杯。'],
    similar: ['baileys-coffee', 'espresso-martini', 'coffee-tonic']
  },
  {
    id: 'cv-nonalcohol-fresh',
    type: 'scheme',
    name: '便利店无酒精清爽方案',
    enName: 'Convenience Zero Proof Fresh',
    tags: ['便利店', '无酒精', '清爽', '低门槛', '气泡感'],
    reason: '适合不喝酒但想有“调饮感”的场景，也可以作为聚会照顾款。',
    flavor: { sweet: 1, sour: 2, alcohol: 0, fresh: 5, difficulty: 1 },
    place: ['便利店', '超市', '家里', '宿舍/租房', '聚会前临时采购'],
    mood: ['无酒精', '清爽', '酸甜', '气泡感'],
    price: '约 15-35 元',
    materials: {
      standard: ['气泡水', '柠檬', '无糖茶或冷萃咖啡', '冰块'],
      convenience: ['气泡水 1瓶', '柠檬片杯 1份', '冰杯 1杯', '无糖茶或冷萃咖啡'],
      simple: ['气泡水', '柠檬', '冰块']
    },
    steps: ['冰杯加入柠檬。', '倒入气泡水。', '想要层次可加少量茶或咖啡。'],
    scenes: ['无酒精', '聚会照顾款', '下午', '不想喝甜'],
    substitutes: ['想甜口用雪碧。', '想咖啡感用冷萃加汤力水。', '想茶感用无糖茶加柠檬。'],
    warnings: ['无酒精方案也要注意含糖饮料和咖啡因。'],
    similar: ['coffee-tonic', 'fruit-wine-spritz']
  },
  {
    id: 'supermarket-party',
    type: 'scheme',
    name: '超市聚会批量方案',
    enName: 'Supermarket Party Batch',
    tags: ['超市', '聚会', '果味', '甜口', '低酒精'],
    reason: '适合人数多、要快速出杯，用果酒和水果做低风险批量方案。',
    flavor: { sweet: 3, sour: 2, alcohol: 2, fresh: 4, difficulty: 2 },
    place: ['超市', '聚会前临时采购', '家里'],
    mood: ['果味', '甜口', '低酒精', '微醺'],
    price: '约 80-160 元',
    materials: {
      standard: ['果酒或低度红酒', '气泡水', '橙汁', '水果', '冰块'],
      convenience: ['果酒 1瓶', '气泡水 2瓶', '水果盒 1份', '冰袋'],
      simple: ['果酒', '气泡水', '水果']
    },
    steps: ['大壶里加入水果和冰。', '倒入果酒。', '饮用前补气泡水。', '每杯可按口味加橙汁。'],
    scenes: ['朋友小聚', '聚会前临时采购', '低酒精', '甜口入门'],
    substitutes: ['没有果酒可用低度红酒。', '想更清爽减少橙汁。', '有人不喝酒就单独准备气泡水果杯。'],
    warnings: ['批量调酒容易喝太快，建议做低酒精比例。'],
    similar: ['sangria-light', 'fruit-wine-spritz', 'mimosa']
  }
]

const searchMappings = [
  {
    keywords: ['金酒兑什么', '金酒怎么喝', '金酒调什么', 'gin兑什么'],
    recipeIds: ['gin-tonic', 'gin-sprite', 'tom-collins', 'gin-lemon-tea'],
    reason: '金酒优先从气泡、柠檬和茶饮方向开始。'
  },
  {
    keywords: ['威士忌怎么喝', '威士忌兑什么', '威士忌调什么', 'whisky怎么喝'],
    recipeIds: ['whisky-highball', 'whisky-cola', 'whisky-oolong', 'whisky-apple'],
    reason: '威士忌先用苏打、可乐、乌龙茶降低冲击感。'
  },
  {
    keywords: ['伏特加怎么喝', '伏特加兑什么', '伏特加调什么', 'vodka怎么喝'],
    recipeIds: ['vodka-orange', 'vodka-soda', 'vodka-tea', 'vodka-apple'],
    reason: '伏特加百搭，果汁、茶饮和气泡水都稳。'
  },
  {
    keywords: ['朗姆怎么喝', '朗姆兑什么', '朗姆调什么', 'rum怎么喝'],
    recipeIds: ['cuba-libre', 'rum-sprite', 'mojito', 'daiquiri'],
    reason: '朗姆适合甜口、可乐、雪碧和薄荷柠檬。'
  },
  {
    keywords: ['龙舌兰怎么喝', '龙舌兰兑什么', '龙舌兰调什么', 'tequila怎么喝'],
    recipeIds: ['tequila-sprite', 'paloma', 'margarita'],
    reason: '龙舌兰先做酸甜长饮，比纯喝友好很多。'
  },
  {
    keywords: ['百利甜怎么喝', '百利甜兑什么', '百利甜调什么', '奶酒怎么喝'],
    recipeIds: ['baileys-milk', 'baileys-coffee'],
    reason: '百利甜优先搭牛奶和咖啡，目标是甜品微醺。'
  },
  {
    keywords: ['梅酒怎么喝', '梅酒兑什么', '梅酒调什么'],
    recipeIds: ['umeshu-soda', 'umeshu-oolong'],
    reason: '梅酒本身已经好喝，加气泡或乌龙就够。'
  },
  {
    keywords: ['清酒怎么喝', '清酒兑什么', '清酒调什么', 'sake怎么喝'],
    recipeIds: ['sake-highball', 'sake-green-tea', 'sake-sprite'],
    reason: '清酒适合低酒感长饮，气泡、绿茶、雪碧都容易成功。'
  },
  {
    keywords: ['可乐能调什么', '可乐兑什么酒', '可乐调酒'],
    recipeIds: ['whisky-cola', 'cuba-libre', 'jager-cola'],
    reason: '可乐适合聚会型长饮，甜味会遮住酒精刺激。'
  },
  {
    keywords: ['雪碧能调什么', '雪碧兑什么酒', '雪碧调酒'],
    recipeIds: ['gin-sprite', 'rum-sprite', 'tequila-sprite', 'sake-sprite'],
    reason: '雪碧适合新手甜口，记得加冰和柠檬。'
  },
  {
    keywords: ['果汁能调什么', '橙汁能调什么', '苹果汁能调什么'],
    recipeIds: ['vodka-orange', 'vodka-apple', 'whisky-apple', 'mimosa'],
    reason: '果汁能把基酒做得更顺口，适合第一杯。'
  },
  {
    keywords: ['茶饮能调什么', '茶能调什么', '绿茶能调什么', '乌龙茶能调什么'],
    recipeIds: ['whisky-oolong', 'vodka-tea', 'umeshu-oolong', 'sake-green-tea'],
    reason: '茶饮适合不想太甜的人，便利店很容易买齐。'
  },
  {
    keywords: ['气泡水能做什么', '气泡饮', '清爽气泡', '苏打水能做什么'],
    recipeIds: ['coffee-tonic', 'vodka-soda', 'umeshu-soda', 'sake-highball', 'cv-nonalcohol-fresh'],
    reason: '气泡水优先做清爽、低负担、冰块多的长饮。'
  },
  {
    keywords: ['咖啡怎么调好喝', '咖啡特调', '咖啡能调什么', '冷萃能调什么'],
    recipeIds: ['coffee-tonic', 'baileys-coffee', 'espresso-martini', 'cv-coffee-night'],
    reason: '咖啡适合做苦甜、奶香和无酒精气泡方向。'
  },
  {
    keywords: ['无酒精', '不喝酒', 'mocktail', '零酒精'],
    recipeIds: ['cv-nonalcohol-fresh', 'coffee-tonic'],
    reason: '先给有调饮感但没有酒精负担的方案。'
  },
  {
    keywords: ['便利店调酒', '便利店饮品', '便利店能做什么', '下楼买什么调酒'],
    recipeIds: ['cv-nonalcohol-fresh', 'cv-fresh-tipsy', 'cv-sweet-party', 'cv-milk-soft', 'cv-tea-light', 'cv-fruit-low'],
    reason: '优先给能现在买、现在做的方案。'
  },
  {
    keywords: ['低酒感', '喝不出酒味', '新手第一杯', '第一次尝试'],
    recipeIds: ['baileys-milk', 'umeshu-soda', 'vodka-orange', 'sake-highball', 'mimosa'],
    reason: '这些更像饮料，适合第一次打开就决定。'
  }
]

const pantryGroups = [
  { title: '基酒', items: ['金酒', '伏特加', '威士忌', '朗姆', '龙舌兰', '百利甜', '梅酒', '清酒', '野格', '果酒', '起泡酒'] },
  { title: '饮料', items: ['可乐', '雪碧', '气泡水', '汤力水', '果汁', '橙汁', '葡萄柚汁', '苹果汁', '茶', '绿茶', '咖啡', '牛奶'] },
  { title: '辅助', items: ['冰块', '柠檬', '青柠', '糖', '盐', '水果', '薄荷', '能量饮料'] }
]

module.exports = {
  hotKeywords,
  quickEntries,
  homeCards,
  flavorCollections,
  sceneCollections,
  searchMappings,
  bases,
  ingredients,
  ingredientCategories,
  recipes,
  schemes,
  pantryGroups
}
