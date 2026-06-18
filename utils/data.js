const expandedRecipes = require('./expandedRecipes')

const hotKeywords = ['气泡水能做什么', '咖啡怎么调好喝', '茶饮能调什么', '果汁能调什么', '可乐能调什么', '便利店饮品', '无酒精', '低酒感', '经典鸡尾酒']

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
      classic: ['gin-tonic', 'tom-collins', 'negroni', 'dry-martini', 'french-75', 'aviation', 'clover-club', 'bees-knees'],
      beginner: ['gin-tonic', 'tom-collins', 'bees-knees'],
      convenience: ['gin-tonic', 'tom-collins'],
      lowAlcohol: ['gin-tonic', 'tom-collins', 'french-75'],
      sweet: ['tom-collins', 'bees-knees', 'clover-club'],
      fresh: ['gin-tonic', 'tom-collins', 'french-75', 'bees-knees'],
      friendly: ['gin-tonic', 'tom-collins', 'bees-knees'],
      advanced: ['negroni', 'dry-martini', 'aviation', 'clover-club', 'french-75']
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
      classic: ['vodka-orange', 'moscow-mule', 'sea-breeze', 'cosmopolitan'],
      beginner: ['vodka-orange', 'vodka-soda', 'sea-breeze'],
      convenience: ['vodka-orange', 'vodka-soda', 'sea-breeze'],
      lowAlcohol: ['vodka-orange', 'sea-breeze'],
      sweet: ['vodka-orange', 'sea-breeze'],
      fresh: ['vodka-soda', 'moscow-mule', 'sea-breeze'],
      friendly: ['vodka-orange', 'sea-breeze'],
      advanced: ['espresso-martini', 'cosmopolitan']
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
      classic: ['whisky-highball', 'whiskey-sour', 'whisky-cola', 'old-fashioned', 'manhattan', 'boulevardier', 'sazerac', 'penicillin', 'paper-plane'],
      beginner: ['whisky-cola', 'whisky-oolong'],
      convenience: ['cola-bucket', 'whisky-cola', 'whisky-oolong'],
      lowAlcohol: ['whisky-oolong', 'whisky-highball'],
      sweet: ['cola-bucket', 'whisky-cola'],
      fresh: ['whisky-highball', 'whiskey-sour', 'paper-plane'],
      friendly: ['whisky-oolong'],
      advanced: ['whiskey-sour', 'old-fashioned', 'manhattan', 'boulevardier', 'sazerac', 'penicillin', 'paper-plane']
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
      classic: ['mojito', 'cuba-libre', 'daiquiri', 'caipirinha', 'mai-tai', 'jungle-bird', 'dark-n-stormy'],
      beginner: ['cuba-libre', 'mojito', 'caipirinha'],
      convenience: ['cuba-libre'],
      lowAlcohol: ['cuba-libre'],
      sweet: ['cuba-libre', 'mai-tai', 'jungle-bird'],
      fresh: ['mojito', 'caipirinha', 'daiquiri', 'dark-n-stormy'],
      friendly: ['cuba-libre', 'dark-n-stormy'],
      advanced: ['daiquiri', 'caipirinha', 'mai-tai', 'jungle-bird']
    }
  },
  {
    id: 'tequila',
    name: '龙舌兰',
    subtitle: '明亮、刺激、适合酸甜',
    tags: ['酸甜', '果味', '聚会', '进阶'],
    intro: '龙舌兰适合和柑橘、盐、气泡、葡萄柚一起出现，做酸甜方向会比纯饮友好得多。',
    recipes: {
      first: ['paloma'],
      classic: ['margarita', 'paloma', 'tequila-sunrise', 'tommys-margarita', 'naked-and-famous'],
      beginner: ['paloma', 'tequila-sunrise'],
      convenience: ['paloma', 'tequila-sunrise'],
      lowAlcohol: ['paloma'],
      sweet: ['tequila-sunrise', 'naked-and-famous'],
      fresh: ['paloma', 'tequila-sunrise', 'tommys-margarita'],
      friendly: ['paloma', 'tequila-sunrise'],
      advanced: ['margarita', 'tommys-margarita', 'naked-and-famous']
    }
  },
  {
    id: 'brandy',
    name: '干邑/白兰地',
    subtitle: '果干、橙香、温暖老派感',
    tags: ['酒感', '柑橘', '经典', '进阶'],
    intro: '干邑和白兰地适合做酸甜短饮，橙味利口酒和柠檬能把厚重酒体变得更利落。',
    recipes: {
      first: ['sidecar'],
      classic: ['sidecar'],
      beginner: ['sidecar'],
      convenience: ['sidecar'],
      lowAlcohol: [],
      sweet: ['sidecar'],
      fresh: ['sidecar'],
      friendly: ['sidecar'],
      advanced: ['sidecar']
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
      classic: ['baileys-milk', 'white-russian', 'jager-cola'],
      beginner: ['baileys-milk', 'white-russian', 'jager-cola'],
      convenience: ['baileys-milk', 'white-russian', 'jager-cola'],
      lowAlcohol: ['baileys-milk', 'white-russian', 'baileys-coffee'],
      sweet: ['baileys-milk', 'white-russian'],
      fresh: ['jager-cola'],
      friendly: ['baileys-milk', 'white-russian'],
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
      classic: ['jager-cola'],
      beginner: ['jager-cola'],
      convenience: ['jager-cola'],
      lowAlcohol: ['jager-cola'],
      sweet: ['jager-cola'],
      fresh: ['jager-cola'],
      friendly: ['jager-cola'],
      advanced: ['jager-cola']
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
      beginner: ['sake-highball', 'sake-green-tea'],
      convenience: ['sake-highball', 'sake-green-tea'],
      lowAlcohol: ['sake-highball', 'sake-green-tea'],
      sweet: ['sake-highball'],
      fresh: ['sake-highball', 'sake-green-tea'],
      friendly: ['sake-highball', 'sake-green-tea'],
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
    recipes: ['vodka-orange', 'sea-breeze', 'paloma', 'mimosa', 'fruit-wine-spritz'],
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
    recipes: ['cv-sweet-party', 'cuba-libre', 'tequila-sunrise', 'sake-highball'],
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
    recipes: ['whisky-oolong', 'umeshu-oolong', 'sake-green-tea', 'cv-tea-light'],
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
    recipes: ['tom-collins', 'daiquiri', 'margarita', 'whisky-highball'],
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
    recipes: ['paloma', 'sea-breeze'],
    lowAlcohol: ['sea-breeze'],
    warnings: ['葡萄柚自带轻微苦味，怕苦就加一点糖或换橙汁。']
  },
  {
    id: 'oolong',
    name: '乌龙茶',
    category: '茶饮',
    tags: ['茶感', '不太甜', '清爽', '便利店'],
    goodWith: ['威士忌', '梅酒', '伏特加'],
    recipes: ['whisky-oolong', 'umeshu-oolong', 'sake-green-tea', 'cv-tea-light'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['无糖乌龙更适合做酒饮，含糖款会让整体显腻。']
  },
  {
    id: 'lemon-tea',
    name: '柠檬茶',
    category: '茶饮',
    tags: ['酸甜', '茶感', '便利店', '新手友好'],
    goodWith: ['金酒', '伏特加', '朗姆'],
    recipes: ['cv-tea-light', 'tom-collins'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['瓶装柠檬茶通常已经很甜，基酒用量建议保守。']
  },
  {
    id: 'green-tea',
    name: '绿茶',
    category: '茶饮',
    tags: ['茶感', '清爽', '不太甜', '便利店'],
    goodWith: ['清酒', '伏特加', '梅酒'],
    recipes: ['sake-green-tea', 'umeshu-oolong', 'cv-tea-light'],
    lowAlcohol: ['tea-lemon-zero'],
    warnings: ['无糖绿茶更清爽，含糖绿茶要减少基酒量。']
  },
  {
    id: 'apple-juice',
    name: '苹果汁',
    category: '果汁',
    tags: ['果味', '甜口', '低门槛', '便利店'],
    goodWith: ['威士忌', '伏特加', '朗姆'],
    recipes: ['sea-breeze', 'vodka-orange'],
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
    similar: ['gin-tonic', 'cuba-libre', 'caipirinha']
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
    similar: ['tom-collins', 'vodka-soda', 'mojito']
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
    similar: ['sea-breeze', 'tequila-sunrise', 'cuba-libre']
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
    hidden: true,
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
    similar: ['gin-tonic', 'vodka-orange', 'cuba-libre']
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
    similar: ['whisky-oolong', 'sake-green-tea', 'whisky-highball']
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
    similar: ['gin-tonic', 'vodka-soda', 'moscow-mule']
  },
  {
    id: 'gin-lemon-tea',
    type: 'recipe',
    hidden: true,
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
    similar: ['whisky-oolong', 'sake-green-tea', 'cv-tea-light']
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
    hidden: true,
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
    similar: ['whisky-oolong', 'sake-green-tea']
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
    similar: ['whisky-cola', 'cola-bucket', 'jager-cola']
  },
  {
    id: 'rum-sprite',
    type: 'recipe',
    hidden: true,
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
    similar: ['mojito', 'cuba-libre', 'gin-tonic']
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
    similar: ['margarita', 'tequila-sunrise']
  },
  {
    id: 'tequila-sprite',
    type: 'recipe',
    hidden: true,
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
    similar: ['paloma', 'tequila-sunrise', 'cuba-libre']
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
    similar: ['whisky-cola', 'cuba-libre', 'cola-bucket']
  },
  {
    id: 'jager-redbull',
    type: 'recipe',
    hidden: true,
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
    hidden: true,
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
    id: 'sea-breeze',
    type: 'recipe',
    name: '海风',
    enName: 'Sea Breeze',
    aliases: ['海风鸡尾酒', 'sea breeze', '伏特加海风'],
    base: '伏特加',
    tags: ['果味', '酸甜', '清爽', '新手友好', '低门槛'],
    reason: '适合想要比螺丝刀更清爽、有一点莓果酸甜和葡萄柚微苦的人。',
    flavor: { sweet: 2, sour: 3, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['伏特加 35ml', '葡萄柚汁 60ml', '蔓越莓汁 60ml', '冰块'],
      convenience: ['伏特加小瓶', '葡萄柚汁或西柚饮料', '蔓越莓汁或莓果汁', '冰杯'],
      simple: ['伏特加', '葡萄柚汁', '莓果汁', '冰块']
    },
    steps: ['杯中加满冰。', '倒入伏特加、葡萄柚汁和蔓越莓汁。', '轻轻搅匀，试味后用果汁调整酸甜。'],
    scenes: ['新手第一杯', '夏天晚上', '果味低酒精', '下班放松'],
    substitutes: ['没有蔓越莓汁可用莓果汁或少量石榴汁。', '没有葡萄柚汁可用橙汁，但清爽感会降低。', '想更低酒感就多加果汁。'],
    warnings: ['果汁很遮酒味，伏特加先少倒。'],
    similar: ['vodka-orange', 'paloma', 'vodka-soda']
  },
  {
    id: 'whisky-apple',
    type: 'recipe',
    hidden: true,
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
    hidden: true,
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
    similar: ['vodka-orange', 'sea-breeze']
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
    similar: ['umeshu-oolong', 'whisky-oolong', 'sake-green-tea']
  },
  {
    id: 'sake-sprite',
    type: 'recipe',
    hidden: true,
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
    similar: ['gin-tonic', 'cuba-libre', 'umeshu-soda']
  },
  {
    id: 'whiskey-sour',
    type: 'recipe',
    name: '威士忌酸',
    enName: 'Whiskey Sour',
    aliases: ['威士忌柠檬', 'whiskey sour', 'whisky sour'],
    base: '威士忌',
    tags: ['酸甜', '经典', '泡沫感', '进阶', '适合在家做'],
    reason: '适合想从长饮进阶到经典酸甜型的人，柠檬、糖和厚泡沫会把威士忌变得更圆润。',
    flavor: { sweet: 2, sour: 4, alcohol: 3, fresh: 3, difficulty: 3 },
    materials: {
      standard: ['威士忌 45ml', '柠檬汁 25ml', '糖浆 15ml', '蛋清或可省略', '冰块'],
      convenience: ['威士忌小瓶', '柠檬汁或柠檬', '糖浆或蜂蜜', '冰杯'],
      simple: ['威士忌', '柠檬', '糖或蜂蜜', '冰块']
    },
    steps: ['摇壶加入威士忌、柠檬汁、糖浆和蛋清。', '先不加冰干摇，让泡沫打起来。', '加冰后再用力摇到冰冷。', '滤入矮杯，可加柠檬片装饰。'],
    scenes: ['夜晚放松', '经典鸡尾酒', '适合在家做', '酸甜爱好者'],
    substitutes: ['不想用蛋清可以省略，泡沫会少一些。', '糖浆可用蜂蜜水替代。', '怕酸就把糖浆加到 20ml。'],
    similar: ['daiquiri', 'margarita', 'whisky-highball']
  },
  {
    id: 'caipirinha',
    type: 'recipe',
    name: '卡琵莉亚',
    enName: 'Caipirinha',
    aliases: ['卡皮莉亚', 'caipirinha', '卡莎萨青柠'],
    base: '卡莎萨',
    tags: ['青柠', '酸甜', '捣压', '清爽', '夏天'],
    reason: '适合喜欢青柠块、冰块和直接清爽口感的人，捣压后的青柠香气很明显。',
    flavor: { sweet: 2, sour: 4, alcohol: 3, fresh: 5, difficulty: 2 },
    materials: {
      standard: ['卡莎萨 50ml', '青柠 半颗切块', '白糖 2茶匙', '碎冰或冰块'],
      convenience: ['卡莎萨或白朗姆', '青柠', '白糖或糖浆', '冰杯'],
      simple: ['白朗姆', '青柠', '糖', '冰块']
    },
    steps: ['青柠切块放入杯中。', '加入糖，轻轻捣压出汁和香气。', '加满碎冰或冰块。', '倒入卡莎萨并搅匀。'],
    scenes: ['夏天晚上', '朋友小聚', '清爽果味', '新手进阶'],
    substitutes: ['没有卡莎萨可用白朗姆做简化版。', '怕酸就少压青柠白色部分。', '没有碎冰就用普通冰块。'],
    similar: ['mojito', 'daiquiri', 'cuba-libre']
  },
  {
    id: 'white-russian',
    type: 'recipe',
    name: '白俄罗斯',
    enName: 'White Russian',
    aliases: ['white russian', '伏特加咖啡奶', '咖啡奶酒'],
    base: '伏特加',
    tags: ['咖啡感', '奶香', '甜口', '顺滑', '夜晚'],
    reason: '适合喜欢咖啡奶感、顺滑甜口和夜晚放松的人，步骤很短但层次很明显。',
    flavor: { sweet: 4, sour: 0, alcohol: 2, fresh: 1, difficulty: 1 },
    materials: {
      standard: ['伏特加 40ml', '咖啡利口酒 25ml', '牛奶或淡奶油 40ml', '冰块'],
      convenience: ['伏特加小瓶', '咖啡利口酒或冷萃咖啡', '牛奶', '冰杯'],
      simple: ['伏特加', '冷萃咖啡', '牛奶', '糖']
    },
    steps: ['矮杯加满冰块。', '倒入伏特加和咖啡利口酒。', '缓慢倒入牛奶或淡奶油。', '轻轻搅一下，让咖啡棕和奶白形成融合层次。'],
    scenes: ['夜晚放松', '甜口入门', '咖啡爱好者', '适合在家做'],
    substitutes: ['没有咖啡利口酒可用冷萃咖啡加糖。', '想更轻就用牛奶，不用淡奶油。', '怕甜就多加冰和牛奶。'],
    similar: ['espresso-martini', 'baileys-coffee', 'baileys-milk']
  },
  {
    id: 'cola-bucket',
    type: 'recipe',
    name: '可乐桶',
    enName: 'Cola Bucket',
    aliases: ['可乐酒桶', '朋友局可乐桶', 'cola bucket', '大杯可乐酒'],
    base: '威士忌',
    tags: ['甜口', '气泡感', '聚会', '便利店', '适合分享'],
    reason: '适合朋友局和临时聚会，原料好买、容量大、接受度高，但要注意控制基酒比例。',
    flavor: { sweet: 4, sour: 1, alcohol: 3, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['威士忌或朗姆 120ml', '可乐 500ml', '青柠或柠檬', '大量冰块'],
      convenience: ['小瓶威士忌或朗姆', '大瓶可乐', '冰杯或冰袋', '柠檬片'],
      simple: ['基酒', '可乐', '冰块']
    },
    steps: ['大杯或小桶先加大量冰块。', '倒入基酒。', '补可乐并轻轻搅匀。', '加入青柠或柠檬片，按人数分杯。'],
    scenes: ['朋友小聚', '聚会前临时采购', '便利店调酒', '适合分享'],
    substitutes: ['可乐可换无糖可乐。', '基酒可以用威士忌、朗姆或伏特加。', '人多时先少倒酒，后面再补。'],
    similar: ['whisky-cola', 'cuba-libre', 'jager-cola']
  },
  {
    id: 'dry-martini',
    type: 'recipe',
    name: '干马天尼',
    enName: 'Dry Martini',
    aliases: ['干马丁尼', 'dry martini', '金酒马天尼'],
    base: '金酒',
    tags: ['经典', '清冷', '酒感', '进阶', '不太甜'],
    reason: '适合想了解经典短饮、能接受明显酒感的人，透明酒液和橄榄是最强识别点。',
    flavor: { sweet: 0, sour: 0, alcohol: 5, fresh: 2, difficulty: 4 },
    materials: {
      standard: ['金酒 60ml', '干味美思 10ml', '橄榄或柠檬皮', '冰块'],
      convenience: ['金酒', '干味美思', '橄榄或柠檬皮', '冰块'],
      simple: ['金酒', '少量干味美思', '冰块']
    },
    steps: ['调酒杯加冰。', '倒入金酒和干味美思。', '充分搅拌到冰冷。', '滤入马天尼杯，用橄榄或柠檬皮点缀。'],
    scenes: ['经典鸡尾酒', '夜晚放松', '进阶尝试', '不想喝太甜'],
    substitutes: ['没有马天尼杯可用小酒杯。', '怕酒感太强就降低金酒、增加冰镇时间。', '不喜欢橄榄可换柠檬皮。'],
    similar: ['gin-tonic', 'negroni', 'old-fashioned']
  },
  {
    id: 'tequila-sunrise',
    type: 'recipe',
    name: '龙舌兰日出',
    enName: 'Tequila Sunrise',
    aliases: ['tequila sunrise', '龙舌兰橙汁', '日出鸡尾酒'],
    base: '龙舌兰',
    tags: ['果味', '甜口', '橙汁', '新手进阶', '聚会'],
    reason: '适合想要果汁好入口、颜色有记忆点的一杯，橙汁会把龙舌兰做得更友好。',
    flavor: { sweet: 4, sour: 2, alcohol: 3, fresh: 3, difficulty: 2 },
    materials: {
      standard: ['龙舌兰 45ml', '橙汁 120ml', '红石榴糖浆 10ml', '冰块'],
      convenience: ['龙舌兰小瓶', '橙汁', '红石榴糖浆或少量莓果汁', '冰杯'],
      simple: ['龙舌兰', '橙汁', '少量红色果汁']
    },
    steps: ['高杯加冰。', '倒入龙舌兰和橙汁并轻轻搅匀。', '沿杯壁慢慢加入红石榴糖浆。', '不要过度搅拌，让颜色自然下沉。'],
    scenes: ['新手进阶', '朋友小聚', '甜口入门', '聚会'],
    substitutes: ['没有红石榴糖浆可用少量莓果汁。', '怕甜就减少糖浆。', '想更清爽可加一点气泡水。'],
    similar: ['paloma', 'margarita', 'vodka-orange']
  }
]

recipes.push(
  {
    id: 'cv-gin-tonic',
    type: 'recipe',
    name: '便利店版金汤力',
    enName: 'Convenience Gin Tonic',
    aliases: ['便利店金汤力', '便利店版gin tonic'],
    base: '金酒',
    tags: ['便利店', '清爽', '微醺', '低门槛', '气泡感'],
    reason: '适合下班路上临时买，小瓶金酒加一瓶喜欢的软饮就能做，汤力水和气泡水只是最清爽的方向。',
    flavor: { sweet: 1, sour: 2, alcohol: 2, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['金酒小瓶 1支', '汤力水 / 气泡水 / 雪碧 1瓶', '冰杯 1杯'],
      convenience: ['金酒小瓶', '喜欢的软饮', '冰杯', '柠檬片可选'],
      simple: ['金酒', '饮料', '冰块']
    },
    steps: ['冰杯倒入金酒 25-35ml。', '补汤力水、气泡水、雪碧或你喜欢的饮料。', '有柠檬再挤一点，没有也可以直接轻搅。'],
    scenes: ['下班放松', '便利店调酒', '夏天晚上', '不想喝甜'],
    substitutes: ['没有汤力水就用气泡水、雪碧或无糖茶。', '柠檬买不到可以不加。', '想更低酒精就只倒半瓶小酒。'],
    similar: ['gin-tonic', 'vodka-soda', 'whisky-highball']
  },
  {
    id: 'cv-cuba-libre',
    type: 'recipe',
    name: '便利店版自由古巴',
    enName: 'Convenience Cuba Libre',
    aliases: ['便利店朗姆可乐', '便利店自由古巴'],
    base: '朗姆',
    tags: ['便利店', '甜口', '聚会', '低门槛', '气泡感'],
    reason: '适合朋友局临时起意，朗姆加可乐最稳；没有柠檬也不影响成杯。',
    flavor: { sweet: 4, sour: 1, alcohol: 2, fresh: 3, difficulty: 1 },
    materials: {
      standard: ['朗姆小瓶 1支', '可乐 1瓶', '冰杯 1杯'],
      convenience: ['朗姆小瓶', '可乐', '冰杯', '柠檬片可选'],
      simple: ['朗姆', '可乐', '冰块']
    },
    steps: ['冰杯倒入朗姆 30-45ml。', '补可乐，轻轻搅匀。', '有柠檬再加一点清爽感，没有就直接喝。'],
    scenes: ['朋友小聚', '便利店调酒', '聚会前临时采购', '甜口入门'],
    substitutes: ['朗姆可换威士忌。', '怕甜用无糖可乐或加一点气泡水。', '没有柠檬也可以直接做。'],
    similar: ['cuba-libre', 'whisky-cola', 'cola-bucket']
  },
  {
    id: 'cv-vodka-soda',
    type: 'recipe',
    name: '便利店版伏特加苏打',
    enName: 'Convenience Vodka Soda',
    aliases: ['便利店伏特加苏打', '便利店伏特加气泡水'],
    base: '伏特加',
    tags: ['便利店', '清爽', '低糖', '微醺', '气泡感'],
    reason: '适合想要干净、低甜、低负担的一杯；如果不爱气泡水，可以换成茶饮、果汁或自己喜欢的饮料。',
    flavor: { sweet: 0, sour: 1, alcohol: 2, fresh: 5, difficulty: 1 },
    materials: {
      standard: ['伏特加小瓶 1支', '气泡水 / 无糖茶 / 果汁 1瓶', '冰杯 1杯'],
      convenience: ['伏特加小瓶', '喜欢的饮料', '冰杯', '柠檬片可选'],
      simple: ['伏特加', '饮料', '冰块']
    },
    steps: ['冰杯倒入伏特加 25-35ml。', '补气泡水、茶饮、果汁或你喜欢的饮料。', '有柠檬再挤一点，没有也可以不加。'],
    scenes: ['下班放松', '便利店调酒', '不想喝甜', '低糖'],
    substitutes: ['不喜欢气泡水就换茶饮、果汁或运动饮料。', '酒感明显就多加饮料。', '柠檬和薄荷都不是必需。'],
    similar: ['vodka-soda', 'gin-tonic', 'coffee-tonic']
  },
  {
    id: 'cv-screwdriver',
    type: 'recipe',
    name: '便利店版螺丝刀',
    enName: 'Convenience Screwdriver',
    aliases: ['便利店伏特加橙汁', '便利店螺丝刀'],
    base: '伏特加',
    tags: ['便利店', '果味', '甜口', '低门槛', '新手友好'],
    reason: '适合想要果汁感和轻微微醺的人，伏特加加橙汁最简单，也可以换成葡萄柚汁、苹果汁或茶饮。',
    flavor: { sweet: 3, sour: 2, alcohol: 1, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['伏特加小瓶 1支', '橙汁 / 果汁 / 茶饮 1瓶', '冰杯 1杯'],
      convenience: ['伏特加小瓶', '喜欢的果汁或茶饮', '冰杯'],
      simple: ['伏特加', '果汁']
    },
    steps: ['冰杯倒入伏特加 20-30ml。', '补橙汁、葡萄柚汁、苹果汁或茶饮到七八分满。', '轻轻搅匀后试甜度。'],
    scenes: ['新手第一杯', '便利店调酒', '女生更容易接受', '果味低酒精'],
    substitutes: ['橙汁可换葡萄柚汁、苹果汁或柠檬茶。', '想更轻就多加饮料或冰。', '没有水果辅料也不影响。'],
    similar: ['vodka-orange', 'tequila-sunrise', 'sea-breeze']
  }
)

const schemes = [
  {
    id: 'cv-fresh-tipsy',
    type: 'scheme',
    name: '便利店清爽微醺方案',
    enName: 'Convenience Fresh Highball',
    tags: ['便利店', '清爽', '微醺', '低酒精', '气泡感'],
    reason: '适合下班路上临时买，小瓶酒加一瓶清爽软饮就能做；气泡水、汤力水、雪碧都可以按口味替换。',
    flavor: { sweet: 1, sour: 2, alcohol: 2, fresh: 5, difficulty: 1 },
    place: ['便利店', '宿舍/租房', '聚会前临时采购'],
    mood: ['清爽', '微醺', '低酒精', '气泡感'],
    price: '约 35-55 元',
    materials: {
      standard: ['金酒小瓶', '汤力水 / 气泡水 / 雪碧', '冰杯', '柠檬片可选'],
      convenience: ['金酒小瓶 1支', '喜欢的清爽软饮 1瓶', '冰杯 1杯', '柠檬片可选'],
      simple: ['金酒', '喜欢的饮料', '冰块']
    },
    steps: ['冰杯倒入金酒 25-35ml。', '补汤力水、气泡水、雪碧或喜欢的茶饮。', '有柠檬再挤一点，没有就直接轻搅。'],
    scenes: ['下班放松', '夏天晚上', '一个人微醺', '不想喝甜'],
    substitutes: ['没有汤力水就用气泡水、雪碧或无糖茶。', '不喜欢气泡水就换茶饮或果汁。', '柠檬和薄荷买不到都可以不加。'],
    warnings: ['便利店冰杯融化快，先冰饮料再混合。'],
    similar: ['gin-tonic', 'tom-collins', 'whisky-highball']
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
      standard: ['威士忌或朗姆', '可乐', '冰块', '柠檬可选'],
      convenience: ['威士忌小瓶或朗姆小瓶 1支', '可乐 1瓶', '冰杯 2杯', '柠檬片可选'],
      simple: ['威士忌', '可乐']
    },
    steps: ['冰杯加威士忌或朗姆 30-45ml。', '补可乐。', '有柠檬再加一点减少甜腻，没有就直接做。'],
    scenes: ['朋友小聚', '聚会前临时采购', '甜口入门', '不想失败'],
    substitutes: ['威士忌可换朗姆。', '怕甜用无糖可乐或加一点气泡水。', '想增加风味可换樱桃可乐、柠檬茶或果汁。'],
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
    similar: ['whisky-oolong', 'sake-green-tea', 'umeshu-oolong']
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
      standard: ['伏特加或低度果酒', '橙汁 / 葡萄柚汁 / 茶饮', '冰块', '气泡水可选'],
      convenience: ['伏特加小瓶或果酒', '喜欢的果汁或茶饮 1瓶', '冰杯', '气泡水可选'],
      simple: ['伏特加', '果汁或茶饮', '冰块']
    },
    steps: ['冰杯倒入少量基酒。', '加入果汁或茶饮至七八分满。', '喜欢更轻盈再补一点气泡水，不喜欢就省略。'],
    scenes: ['新手第一杯', '女生更容易接受', '夏天晚上', '朋友小聚'],
    substitutes: ['橙汁更甜，葡萄柚更清爽。', '不喜欢气泡水就全用果汁或茶饮。', '没有水果辅料也不影响。'],
    warnings: ['果汁遮酒味，聚会时别连续加酒。'],
    similar: ['vodka-orange', 'sea-breeze', 'fruit-wine-spritz']
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
    reason: '适合不喝酒但想有“调饮感”的场景，重点是冰杯和喜欢的饮料，柠檬只是让味道更亮。',
    flavor: { sweet: 1, sour: 2, alcohol: 0, fresh: 5, difficulty: 1 },
    place: ['便利店', '超市', '家里', '宿舍/租房', '聚会前临时采购'],
    mood: ['无酒精', '清爽', '酸甜', '气泡感'],
    price: '约 15-35 元',
    materials: {
      standard: ['气泡水 / 雪碧 / 茶饮', '无糖茶或冷萃咖啡', '冰块', '柠檬可选'],
      convenience: ['喜欢的饮料 1瓶', '冰杯 1杯', '无糖茶或冷萃咖啡', '柠檬片可选'],
      simple: ['喜欢的饮料', '冰块']
    },
    steps: ['冰杯倒入喜欢的气泡饮、茶饮或雪碧。', '想要层次可加少量茶或咖啡。', '有柠檬再加一点，没有就省略。'],
    scenes: ['无酒精', '聚会照顾款', '下午', '不想喝甜'],
    substitutes: ['想甜口用雪碧。', '想咖啡感用冷萃加汤力水。', '不想气泡就用茶饮或果汁。'],
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

// 常见错别字/别名 → 正确词的映射（搜索前自动扩展）
const searchAliases = {
  '莫希托': '莫吉托', '毛吉托': '莫吉托', '毛希托': '莫吉托', '莫西托': '莫吉托',
  '螺丝起子': '螺丝刀', '螺丝刀': '伏特加橙汁',
  '嗨棒': '威士忌嗨棒', '海棒': '威士忌嗨棒',
  '金汤力水': '金汤力', '金巴利': '内格罗尼',
  '姜汁伏特加': '莫斯科骡子', '莫斯科毛驴': '莫斯科骡子',
  '马格丽特': '玛格丽特', '玛格丽': '玛格丽特',
  'g&t': '金汤力', 'gt': '金汤力', 'gintonic': '金汤力',
  '长岛冰茶': '', 'b52': '', '长岛': '',
  '西柚': '葡萄柚', '柚子': '葡萄柚', '西柚汁': '葡萄柚汁',
  '红牛': '能量饮料', '红牛兑酒': '能量饮料', '能量': '能量饮料',
  '椰奶': '牛奶', '燕麦奶': '牛奶',
  '蜂蜜': '糖', '蜂蜜水': '糖',
  '苏打水': '气泡水', '苏打': '气泡水',
  '基酒': '', '利口酒': '百利甜',
  '野格炸弹': '野格红牛', '野格子弹': '野格红牛',
  '甜苦艾酒': '甜味美思', '味美思': '甜味美思',
  '黑朗姆': '朗姆', '白朗姆': '朗姆', '深色朗姆': '朗姆',
  '含羞草': 'mimosa', '香槟橙汁': 'mimosa',
  '桑格利亚': '简易桑格利亚', '桑格莉亚': '简易桑格利亚',
  '梅酒苏打': '梅酒苏打', '梅子酒': '梅酒', 'ume': '梅酒',
  '清酒气泡水': '清酒嗨棒', '日本酒': '清酒',
  '奶酒': '百利甜', '百利甜牛奶': '百利甜牛奶',
  '咖啡马丁尼': '浓缩咖啡马天尼', '咖啡马天尼': '浓缩咖啡马天尼',
  'tomcollins': '汤姆柯林斯', '汤姆克林斯': '汤姆柯林斯',
  '朗姆可乐': '自由古巴', '可乐桶': '可乐桶',
  '威可': '威士忌可乐', '金雪': '金汤力',
  '朗姆雪碧': '自由古巴', '龙舌兰葡萄柚': '帕洛玛',
  '伏特加西柚': '海风', '西柚伏特加': '海风',
  '威士忌酸': '威士忌酸', '威士忌柠檬': '威士忌酸',
  '卡琵莉亚': '卡琵莉亚', '卡皮莉亚': '卡琵莉亚',
  '白俄罗斯': '白俄罗斯', '伏特加咖啡奶': '白俄罗斯',
  '干马天尼': '干马天尼', '干马丁尼': '干马天尼',
  '龙舌兰日出': '龙舌兰日出',
  '威士忌兑苹果汁': '威士忌可乐', '苹果嗨棒': '威士忌嗨棒',
  '伏特加兑橙汁': '伏特加橙汁', '伏特加葡萄柚': '海风',
  '百利甜兑咖啡': '百利甜咖啡', '奶酒咖啡': '百利甜咖啡',
  '冷萃汤力': '咖啡汤力', '金酒兑柠檬茶': '汤姆柯林斯',
  '梅酒兑苏打': '梅酒苏打', '梅酒兑乌龙茶': '梅酒乌龙',
  '果酒气泡': '果酒气泡杯', '果酒苏打': '果酒气泡杯',
  '起泡酒橙汁': '含羞草', '阿佩罗': '阿佩罗橙光',
  '威士忌兑茶': '威士忌乌龙茶', '乌龙嗨棒': '威士忌乌龙茶',
  '伏特加兑茶': '便利店茶感不甜方案', '茶兑伏特加': '便利店茶感不甜方案',
  '金酒兑雪碧': '金汤力', '龙舌兰兑雪碧': '龙舌兰日出',
  '野格兑可乐': '野格可乐', '金巴利金酒': '内格罗尼',
  '伏特加气泡水': '伏特加苏打', '金酒汤力': '金汤力',
  '伏特加兑葡萄柚': '海风', '野格可乐桶': '野格可乐',

  /* ========== 反向映射：中文常用名/简称 → recipe ID（确保搜中文名能命中）========== */
  '金汤力': 'gin-tonic', '金酒汤力': 'gin-tonic', 'gin tonic': 'gin-tonic', '金汤': 'gin-tonic',
  '莫吉托': 'mojito', '莫希托': 'mojito', '毛吉托': 'mojito', '毛希托': 'mojito', '薄荷朗姆': 'mojito',
  '百利甜牛奶': 'baileys-milk', '百利甜': 'baileys-milk', '奶酒': 'baileys-milk',
  '威士忌可乐': 'whisky-cola', '威可': 'whisky-cola', '威士忌兑可乐': 'whisky-cola',
  '威士忌嗨棒': 'whisky-highball', '嗨棒': 'whisky-highball', '海棒': 'whisky-highball', '威士忌苏打': 'whisky-highball',
  '威士忌酸': 'whiskey-sour', '威士忌柠檬': 'whiskey-sour', 'whiskey sour': 'whiskey-sour', 'whisky sour': 'whiskey-sour',
  '伏特加橙汁': 'vodka-orange', '螺丝刀': 'vodka-orange', '伏特加兑橙汁': 'vodka-orange',
  '海风': 'sea-breeze', '海风鸡尾酒': 'sea-breeze', 'sea breeze': 'sea-breeze', '伏特加海风': 'sea-breeze',
  '金酒雪碧': 'gin-tonic', '金酒兑雪碧': 'gin-tonic', '金雪': 'gin-tonic',
  '自由古巴': 'cuba-libre', '朗姆可乐': 'cuba-libre',
  '朗姆雪碧': 'cuba-libre', '朗姆汽水': 'cuba-libre',
  '浓缩咖啡马天尼': 'espresso-martini', '咖啡马天尼': 'espresso-martini',
  '汤姆柯林斯': 'tom-collins', '金酒柠檬苏打': 'tom-collins',
  '内格罗尼': 'negroni', '金巴利金酒': 'negroni',
  '莫斯科骡子': 'moscow-mule', '姜汁伏特加': 'moscow-mule',
  '伏特加苏打': 'vodka-soda', '伏特加气泡水': 'vodka-soda',
  '伏特加茶饮': 'cv-tea-light', '伏特加兑茶': 'cv-tea-light',
  '威士忌乌龙茶': 'whisky-oolong', '威士忌乌龙': 'whisky-oolong', '乌龙嗨棒': 'whisky-oolong',
  '古典鸡尾酒': 'old-fashioned', '威士忌古典': 'old-fashioned',
  '玛格丽特': 'margarita', '龙舌兰酸': 'margarita',
  '帕洛玛': 'paloma', '龙舌兰葡萄柚': 'paloma',
  '龙舌兰日出': 'tequila-sunrise', 'tequila sunrise': 'tequila-sunrise',
  '龙舌兰雪碧': 'tequila-sunrise', '龙舌兰兑雪碧': 'tequila-sunrise',
  '野格可乐': 'jager-cola', '野格兑可乐': 'jager-cola',
  '野格红牛': 'jager-cola', '野格炸弹': 'jager-cola',
  '梅酒苏打': 'umeshu-soda', '梅酒气泡水': 'umeshu-soda',
  '梅酒乌龙': 'umeshu-oolong', '梅酒兑乌龙茶': 'umeshu-oolong',
  '清酒嗨棒': 'sake-highball', '清酒苏打': 'sake-highball', '清酒气泡水': 'sake-highball',
  '含羞草': 'mimosa',
  '阿佩罗橙光': 'aperol-spritz',
  '代基里': 'daiquiri', '戴基里': 'daiquiri', '朗姆酸': 'daiquiri',
  '卡琵莉亚': 'caipirinha', '卡皮莉亚': 'caipirinha', 'caipirinha': 'caipirinha',
  '白俄罗斯': 'white-russian', 'white russian': 'white-russian', '伏特加咖啡奶': 'white-russian',
  '可乐桶': 'cola-bucket', '可乐酒桶': 'cola-bucket', 'cola bucket': 'cola-bucket',
  '干马天尼': 'dry-martini', '干马丁尼': 'dry-martini', 'dry martini': 'dry-martini',
  '咖啡汤力': 'coffee-tonic', '冷萃汤力': 'coffee-tonic',
  '果酒气泡杯': 'fruit-wine-spritz', '果酒气泡': 'fruit-wine-spritz',
  '简易桑格利亚': 'sangria-light',
  '威士忌苹果汁': 'whisky-cola', '苹果嗨棒': 'whisky-highball',
  '伏特加苹果汁': 'vodka-orange',
  '伏特加葡萄柚': 'sea-breeze',
  '金酒柠檬茶': 'tom-collins', '金酒兑柠檬茶': 'tom-collins',
  '百利甜咖啡': 'baileys-coffee', '百利甜兑咖啡': 'baileys-coffee',
  '飞行': 'aviation', '飞行鸡尾酒': 'aviation', 'aviation': 'aviation',
  '蜂之膝': 'bees-knees', '蜂膝': 'bees-knees', '蜂蜜金酒酸': 'bees-knees', "bee's knees": 'bees-knees', 'bees knees': 'bees-knees',
  '三叶草俱乐部': 'clover-club', '三叶草': 'clover-club', '覆盆子金酒酸': 'clover-club', 'clover club': 'clover-club',
  '法式75': 'french-75', '法国75': 'french-75', '法兰西75': 'french-75', 'french 75': 'french-75',
  '曼哈顿': 'manhattan', '曼哈顿鸡尾酒': 'manhattan', 'manhattan': 'manhattan',
  '林荫大道': 'boulevardier', '布尔瓦迪耶': 'boulevardier', '威士忌内格罗尼': 'boulevardier', 'boulevardier': 'boulevardier',
  '萨泽拉克': 'sazerac', '萨泽拉克鸡尾酒': 'sazerac', 'sazerac': 'sazerac',
  '盘尼西林': 'penicillin', '青霉素鸡尾酒': 'penicillin', '姜蜜威士忌酸': 'penicillin', 'penicillin': 'penicillin',
  '纸飞机': 'paper-plane', '纸飞机鸡尾酒': 'paper-plane', 'paper plane': 'paper-plane',
  '迈泰': 'mai-tai', '麦泰': 'mai-tai', '美态': 'mai-tai', 'mai tai': 'mai-tai',
  '丛林鸟': 'jungle-bird', '丛林鸟鸡尾酒': 'jungle-bird', 'jungle bird': 'jungle-bird',
  '黑暗风暴': 'dark-n-stormy', '黑色风暴': 'dark-n-stormy', '黑朗姆姜啤': 'dark-n-stormy', 'dark n stormy': 'dark-n-stormy',
  '汤米玛格丽特': 'tommys-margarita', '汤米马格丽特': 'tommys-margarita', "tommy's margarita": 'tommys-margarita',
  '裸与成名': 'naked-and-famous', '裸露成名': 'naked-and-famous', 'naked and famous': 'naked-and-famous',
  '大都会': 'cosmopolitan', '大都会鸡尾酒': 'cosmopolitan', 'cosmo': 'cosmopolitan', 'cosmopolitan': 'cosmopolitan',
  '边车': 'sidecar', '边车鸡尾酒': 'sidecar', '干邑酸': 'sidecar', 'sidecar': 'sidecar'
}

const searchMappings = [
  {
    keywords: ['金酒兑什么', '金酒怎么喝', '金酒调什么', 'gin兑什么', '金酒搭配'],
    recipeIds: ['gin-tonic', 'tom-collins', 'negroni', 'dry-martini', 'bees-knees', 'french-75', 'aviation'],
    reason: '金酒优先从气泡、柠檬和茶饮方向开始。'
  },
  {
    keywords: ['威士忌怎么喝', '威士忌兑什么', '威士忌调什么', 'whisky怎么喝', '威士忌搭配'],
    recipeIds: ['whisky-highball', 'whiskey-sour', 'cola-bucket', 'whisky-cola', 'whisky-oolong', 'old-fashioned', 'manhattan', 'penicillin'],
    reason: '威士忌先用苏打、可乐、乌龙茶降低冲击感。'
  },
  {
    keywords: ['伏特加怎么喝', '伏特加兑什么', '伏特加调什么', 'vodka怎么喝', '伏特加搭配'],
    recipeIds: ['vodka-orange', 'vodka-soda', 'sea-breeze', 'white-russian', 'espresso-martini', 'cosmopolitan'],
    reason: '伏特加百搭，果汁、茶饮和气泡水都稳。'
  },
  {
    keywords: ['朗姆怎么喝', '朗姆兑什么', '朗姆调什么', 'rum怎么喝', '朗姆搭配'],
    recipeIds: ['cuba-libre', 'mojito', 'caipirinha', 'daiquiri', 'mai-tai', 'jungle-bird', 'dark-n-stormy'],
    reason: '朗姆适合甜口、可乐、雪碧和薄荷柠檬。'
  },
  {
    keywords: ['龙舌兰怎么喝', '龙舌兰兑什么', '龙舌兰调什么', 'tequila怎么喝', '龙舌兰搭配'],
    recipeIds: ['paloma', 'tequila-sunrise', 'margarita', 'tommys-margarita', 'naked-and-famous'],
    reason: '龙舌兰先做酸甜长饮，比纯喝友好很多。'
  },
  {
    keywords: ['白兰地怎么喝', '干邑怎么喝', '白兰地调什么', '干邑调什么', 'brandy怎么喝', 'cognac怎么喝'],
    recipeIds: ['sidecar'],
    reason: '干邑和白兰地先从边车这类酸甜短饮开始，更容易喝出橙香和酒体。'
  },
  {
    keywords: ['经典鸡尾酒', '酒吧经典', '经典款', '出名鸡尾酒', '有名的鸡尾酒'],
    recipeIds: ['gin-tonic', 'negroni', 'dry-martini', 'old-fashioned', 'manhattan', 'sidecar', 'daiquiri', 'mai-tai', 'cosmopolitan', 'french-75'],
    reason: '经典款优先给酒吧常见、辨识度高、适合继续探索的配方。'
  },
  {
    keywords: ['老酒鬼', '老派', '酒感强', '成熟一点', '不想喝甜饮'],
    recipeIds: ['old-fashioned', 'manhattan', 'sazerac', 'boulevardier', 'negroni', 'dry-martini'],
    reason: '老派方向优先短饮、苦甜和高酒感款。'
  },
  {
    keywords: ['现代经典', '新经典', '酒吧新经典', '想喝特别一点'],
    recipeIds: ['penicillin', 'paper-plane', 'naked-and-famous', 'jungle-bird', 'tommys-margarita', 'espresso-martini'],
    reason: '现代经典更适合想喝出记忆点的人。'
  },
  {
    keywords: ['热带鸡尾酒', '热带风味', '菠萝调酒', '朗姆热带'],
    recipeIds: ['mai-tai', 'jungle-bird', 'mojito', 'daiquiri', 'dark-n-stormy', 'cuba-libre'],
    reason: '热带方向优先朗姆、青柠、菠萝和姜味。'
  },
  {
    keywords: ['百利甜怎么喝', '百利甜兑什么', '百利甜调什么', '奶酒怎么喝', '百利甜搭配'],
    recipeIds: ['baileys-milk', 'baileys-coffee'],
    reason: '百利甜优先搭牛奶和咖啡，目标是甜品微醺。'
  },
  {
    keywords: ['梅酒怎么喝', '梅酒兑什么', '梅酒调什么', '梅酒搭配'],
    recipeIds: ['umeshu-soda', 'umeshu-oolong'],
    reason: '梅酒本身已经好喝，加气泡或乌龙就够。'
  },
  {
    keywords: ['清酒怎么喝', '清酒兑什么', '清酒调什么', 'sake怎么喝', '清酒搭配'],
    recipeIds: ['sake-highball', 'sake-green-tea'],
    reason: '清酒适合低酒感长饮，气泡、绿茶、雪碧都容易成功。'
  },
  {
    keywords: ['野格怎么喝', '野格兑什么', '野格调什么', '野格搭配'],
    recipeIds: ['jager-cola'],
    reason: '野格适合派对场景，可乐和能量饮料是经典搭配。'
  },
  {
    keywords: ['可乐能调什么', '可乐兑什么酒', '可乐调酒', '可乐搭配'],
    recipeIds: ['cola-bucket', 'whisky-cola', 'cuba-libre', 'jager-cola'],
    reason: '可乐适合聚会型长饮，甜味会遮住酒精刺激。'
  },
  {
    keywords: ['雪碧能调什么', '雪碧兑什么酒', '雪碧调酒', '雪碧搭配'],
    recipeIds: ['cv-sweet-party', 'cuba-libre', 'tequila-sunrise', 'sake-highball'],
    reason: '雪碧适合新手甜口，记得加冰和柠檬。'
  },
  {
    keywords: ['果汁能调什么', '橙汁能调什么', '苹果汁能调什么', '果汁搭配'],
    recipeIds: ['vodka-orange', 'sea-breeze', 'tequila-sunrise', 'mimosa'],
    reason: '果汁能把基酒做得更顺口，适合第一杯。'
  },
  {
    keywords: ['茶饮能调什么', '茶能调什么', '绿茶能调什么', '乌龙茶能调什么', '茶饮搭配'],
    recipeIds: ['whisky-oolong', 'umeshu-oolong', 'sake-green-tea', 'cv-tea-light'],
    reason: '茶饮适合不想太甜的人，便利店很容易买齐。'
  },
  {
    keywords: ['气泡水能做什么', '气泡饮', '清爽气泡', '苏打水能做什么', '气泡水搭配'],
    recipeIds: ['coffee-tonic', 'vodka-soda', 'umeshu-soda', 'sake-highball', 'cv-nonalcohol-fresh'],
    reason: '气泡水优先做清爽、低负担、冰块多的长饮。'
  },
  {
    keywords: ['咖啡怎么调好喝', '咖啡特调', '咖啡能调什么', '冷萃能调什么', '咖啡搭配'],
    recipeIds: ['coffee-tonic', 'white-russian', 'baileys-coffee', 'espresso-martini', 'cv-coffee-night'],
    reason: '咖啡适合做苦甜、奶香和无酒精气泡方向。'
  },
  {
    keywords: ['无酒精', '不喝酒', 'mocktail', '零酒精', '不喝酒调什么'],
    recipeIds: ['cv-nonalcohol-fresh', 'coffee-tonic'],
    reason: '先给有调饮感但没有酒精负担的方案。'
  },
  {
    keywords: ['便利店调酒', '便利店饮品', '便利店能做什么', '下楼买什么调酒'],
    recipeIds: ['cv-nonalcohol-fresh', 'cv-fresh-tipsy', 'cv-sweet-party', 'cv-milk-soft', 'cv-tea-light', 'cv-fruit-low'],
    reason: '优先给能现在买、现在做的方案。'
  },
  {
    keywords: ['低酒感', '喝不出酒味', '新手第一杯', '第一次尝试', '低度酒'],
    recipeIds: ['baileys-milk', 'umeshu-soda', 'vodka-orange', 'sake-highball', 'mimosa'],
    reason: '这些更像饮料，适合第一次打开就决定。'
  },
  // === 新增：场景意图词 ===
  {
    keywords: ['聚会喝什么', '聚会调酒', '朋友聚会', '聚会', 'party'],
    recipeIds: ['cola-bucket', 'cuba-libre', 'tequila-sunrise', 'whisky-cola', 'jager-cola', 'fruit-wine-spritz', 'sangria-light', 'cosmopolitan', 'french-75'],
    reason: '聚会优先选接受度高、能批量做的方案。'
  },
  {
    keywords: ['夏天喝什么', '夏天调酒', '夏天', '清爽夏夜', '夏日饮品'],
    recipeIds: ['mojito', 'caipirinha', 'paloma', 'gin-tonic', 'umeshu-soda', 'fruit-wine-spritz', 'dark-n-stormy', 'bees-knees'],
    reason: '夏天优先清爽、气泡、果味和冰饮感方向。'
  },
  {
    keywords: ['下班喝什么', '下班后', '下班放松', '回家喝什么', '晚上喝什么'],
    recipeIds: ['whisky-highball', 'whisky-oolong', 'gin-tonic', 'umeshu-soda', 'cv-tea-light'],
    reason: '下班后选不累、步骤短的轻松方向。'
  },
  {
    keywords: ['约会喝什么', '约会', '两个人喝什么', '浪漫'],
    recipeIds: ['mimosa', 'aperol-spritz', 'umeshu-soda', 'fruit-wine-spritz', 'french-75', 'cosmopolitan', 'clover-club'],
    reason: '约会选好看、低压力、果味和气泡方向。'
  },
  {
    keywords: ['宿舍调酒', '宿舍喝什么', '租房喝什么', '宿舍'],
    recipeIds: ['vodka-orange', 'sea-breeze', 'baileys-milk', 'cv-tea-light'],
    reason: '宿舍/租房优先不需要工具、材料简单的方案。'
  },
  {
    keywords: ['女生喝什么', '女生调酒', '给女生推荐'],
    recipeIds: ['baileys-milk', 'mimosa', 'umeshu-soda', 'fruit-wine-spritz', 'sea-breeze', 'cosmopolitan', 'clover-club'],
    reason: '优先甜口、果味、奶香、低酒感方向。'
  },
  {
    keywords: ['不苦', '不烈', '不呛', '怕苦', '怕辣'],
    recipeIds: ['baileys-milk', 'vodka-orange', 'umeshu-soda', 'mimosa', 'cuba-libre'],
    reason: '怕苦怕辣就选甜口、果味、奶香方向。'
  },
  // === 新增：材料别名扩展 ===
  {
    keywords: ['西柚能调什么', '葡萄柚能调什么', '柚子调酒'],
    recipeIds: ['paloma', 'sea-breeze'],
    reason: '葡萄柚适合酸甜微苦、清爽果味方向。'
  },
  {
    keywords: ['蜂蜜能调什么', '蜂蜜调酒'],
    recipeIds: ['tom-collins', 'whisky-highball', 'old-fashioned'],
    reason: '蜂蜜适合增加圆润甜感，特别适合威士忌和金酒方向。'
  },
  {
    keywords: ['椰子调酒', '椰奶调酒', '椰子能调什么'],
    recipeIds: ['baileys-milk', 'fruit-wine-spritz'],
    reason: '椰奶和牛奶一样，适合甜口奶香方向。'
  },
  {
    keywords: ['薄荷调酒', '薄荷能调什么', '薄荷饮品'],
    recipeIds: ['mojito', 'jager-cola'],
    reason: '薄荷适合清爽、辛香方向，莫吉托是经典选择。'
  },
  {
    keywords: ['能量饮料调酒', '红牛调酒', '能量饮料兑什么'],
    recipeIds: ['jager-cola'],
    reason: '能量饮料搭配野格是派对经典，但注意咖啡因。'
  },
  // === 新增：兜底/泛搜索词 ===
  {
    keywords: ['好喝的', '推荐一杯', '随便来一杯', '喝什么好', '调什么好喝'],
    recipeIds: ['gin-tonic', 'mojito', 'baileys-milk', 'whisky-cola', 'umeshu-soda'],
    reason: '不确定时给最不容易踩雷的经典款。'
  },
  {
    keywords: ['甜的', '甜口', '喜欢甜的', '甜味调酒'],
    recipeIds: ['baileys-milk', 'cuba-libre', 'mimosa', 'umeshu-soda'],
    reason: '甜口优先奶香、果味、甜口长饮方向。'
  },
  {
    keywords: ['清爽的', '清爽', '冰的', '解腻'],
    recipeIds: ['gin-tonic', 'mojito', 'vodka-soda', 'umeshu-soda', 'coffee-tonic'],
    reason: '清爽优先气泡、柑橘、薄荷和茶感方向。'
  },
  {
    keywords: ['酒感强', '想喝醉', '酒感明显', '高度数'],
    recipeIds: ['old-fashioned', 'negroni', 'espresso-martini', 'margarita', 'manhattan', 'sazerac', 'boulevardier'],
    reason: '酒感强优先经典短饮和进阶款。'
  },
  {
    keywords: ['简单', '快手', '懒人调酒', '最简单'],
    recipeIds: ['vodka-orange', 'whisky-cola', 'baileys-milk', 'umeshu-soda', 'gin-tonic'],
    reason: '简单优先两三步就能做的低门槛方案。'
  }
]

const pantryGroups = [
  { title: '基酒', items: ['金酒', '伏特加', '威士忌', '朗姆', '龙舌兰', '干邑', '白兰地', '百利甜', '梅酒', '清酒', '野格', '果酒', '起泡酒'] },
  { title: '饮料', items: ['可乐', '雪碧', '气泡水', '汤力水', '姜汁汽水', '果汁', '橙汁', '菠萝汁', '葡萄柚汁', '蔓越莓汁', '苹果汁', '茶', '绿茶', '咖啡', '牛奶'] },
  { title: '辅助', items: ['冰块', '柠檬', '青柠', '糖', '蜂蜜', '盐', '水果', '薄荷', '蛋清', '苦精', '金巴利', '阿佩罗', '甜味美思', '橙味利口酒', '能量饮料'] }
]

module.exports = {
  hotKeywords,
  quickEntries,
  homeCards,
  flavorCollections,
  sceneCollections,
  searchAliases,
  searchMappings,
  bases,
  ingredients,
  ingredientCategories,
  recipes: recipes.concat(expandedRecipes),
  schemes,
  pantryGroups
}
