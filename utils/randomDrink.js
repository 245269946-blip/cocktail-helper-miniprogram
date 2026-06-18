const recommend = require('./recommend')
const drinkView = require('./drinkView')

const PICK_POOL = [
  'gin-tonic',
  'mojito',
  'whisky-highball',
  'whiskey-sour',
  'cuba-libre',
  'paloma',
  'margarita',
  'moscow-mule',
  'negroni',
  'mimosa',
  'aperol-spritz',
  'daiquiri',
  'espresso-martini',
  'white-russian',
  'vodka-orange',
  'old-fashioned',
  'tom-collins',
  'aviation',
  'bees-knees',
  'clover-club',
  'french-75',
  'manhattan',
  'boulevardier',
  'sazerac',
  'penicillin',
  'paper-plane',
  'mai-tai',
  'jungle-bird',
  'dark-n-stormy',
  'tommys-margarita',
  'naked-and-famous',
  'cosmopolitan',
  'sidecar'
]

const FALLBACK_SENTENCES = [
  '今天不用急着给生活下结论，先让冰块替你慢一点。',
  '适合把心情调亮一点，也适合把没说出口的话留到傍晚。',
  '今天的好运藏在第一口里，轻一点，刚刚好。',
  '如果今天有点乱，就从一杯简单好喝的开始重新排序。'
]

const MOOD_COPY = {
  fresh: {
    title: '清爽签',
    sentence: '今天适合给自己留一点风，气泡升起来的时候，事情也会变轻。',
    hint: '清爽、轻快、适合把节奏重新打开。'
  },
  sweet: {
    title: '甜口签',
    sentence: '今天可以对自己好一点，甜味不是退让，是一种温柔的补给。',
    hint: '柔和、顺口、适合奖励一个认真生活的人。'
  },
  coffee: {
    title: '夜色签',
    sentence: '今天适合晚一点收尾，让咖啡香把疲惫慢慢折起来。',
    hint: '适合夜晚、放松和一点不动声色的精神。'
  },
  party: {
    title: '相聚签',
    sentence: '今天的好运适合被分享，叫上朋友，气氛会比计划里更好。',
    hint: '聚会友好、材料好买，适合把场子轻轻打开。'
  },
  mellow: {
    title: '微醺签',
    sentence: '今天不必很用力，微醺一点，答案会自己浮上来。',
    hint: '轻松、低负担，适合慢慢进入状态。'
  }
}

const DRINK_COPY = {
  'gin-tonic': {
    title: '清风签',
    sentence: '今天适合把复杂的事调淡一点，冰和青柠会替你留住清醒。',
    hint: '清爽、利落，适合从一口干净的气泡感开始。'
  },
  'mojito': {
    title: '薄荷签',
    sentence: '今天会有一点新鲜的风，别急着赶路，让薄荷先把心情叫醒。',
    hint: '薄荷、青柠和气泡，适合想把状态重新打开的时候。'
  },
  'whisky-highball': {
    title: '高球签',
    sentence: '今天适合把锋芒藏进气泡里，稳稳地轻松一点。',
    hint: '威士忌的骨架加上苏打的轻盈，适合下班后慢慢回神。'
  },
  'whiskey-sour': {
    title: '酸甜签',
    sentence: '今天的答案不会太直白，先让酸甜把犹豫摇匀。',
    hint: '酸甜、绵密、带一点正式感，适合认真奖励自己。'
  },
  'cuba-libre': {
    title: '自由签',
    sentence: '今天适合把规则放松一点，可乐的甜会把气氛推开。',
    hint: '朗姆、可乐和青柠，适合轻松、直接、有人一起笑。'
  },
  'paloma': {
    title: '粉柚签',
    sentence: '今天别把自己绷太紧，柚子的微苦会带来刚好的明亮。',
    hint: '果味、清爽、微苦，适合想喝得漂亮但不甜腻。'
  },
  'margarita': {
    title: '盐边签',
    sentence: '今天适合给边界撒一点盐，酸味过后会更清楚自己想要什么。',
    hint: '龙舌兰、青柠和盐边，适合有一点锋利的好心情。'
  },
  'moscow-mule': {
    title: '姜风签',
    sentence: '今天需要一点轻轻的冲劲，姜味会把迟疑推到后面。',
    hint: '姜汽水、青柠和伏特加，适合想让身体先醒过来。'
  },
  'negroni': {
    title: '苦橙签',
    sentence: '今天不必只选甜的，成熟的好运也可以带一点苦味。',
    hint: '苦甜、草本、很有存在感，适合慢慢喝的一杯。'
  },
  'mimosa': {
    title: '晨光签',
    sentence: '今天适合把光倒进杯子里，橙色会让事情看起来更温柔。',
    hint: '橙汁和起泡酒，轻盈明亮，适合从好心情开场。'
  },
  'aperol-spritz': {
    title: '橙光签',
    sentence: '今天适合坐得松一点，让橙色气泡把时间拉长。',
    hint: '低度、橙香、微苦甜，适合黄昏和不赶时间的人。'
  },
  'daiquiri': {
    title: '青柠签',
    sentence: '今天适合简单一点，青柠的酸会把多余的念头切开。',
    hint: '朗姆、青柠和一点甜，干净直接，不需要太多装饰。'
  },
  'espresso-martini': {
    title: '夜醒签',
    sentence: '今天适合把疲惫变成精神，咖啡香会在夜里亮一下。',
    hint: '咖啡感、顺滑、适合晚一点仍想保持漂亮状态。'
  },
  'white-russian': {
    title: '奶油签',
    sentence: '今天可以软下来一点，奶香会把锋利的部分慢慢包住。',
    hint: '咖啡、奶香、甜润，适合把夜晚调得更松弛。'
  },
  'vodka-orange': {
    title: '橙汁签',
    sentence: '今天适合选一个不费力的快乐，橙汁会把微醺藏得很好。',
    hint: '果汁感强、好入口，适合想简单喝一杯的时候。'
  },
  'old-fashioned': {
    title: '古典签',
    sentence: '今天适合慢慢来，真正稳的东西不需要太多解释。',
    hint: '威士忌、糖和苦精，适合安静、笃定、有余味的晚上。'
  },
  'tom-collins': {
    title: '柠檬签',
    sentence: '今天适合把空气调亮一点，柠檬和气泡会给你一个轻快的尾音。',
    hint: '金酒、柠檬和苏打，清爽但不单薄。'
  },
  'aviation': {
    title: '云层签',
    sentence: '今天适合把视线抬高一点，有些答案会在云层变薄时出现。',
    hint: '金酒、柠檬和紫罗兰花香，优雅但不甜腻。'
  },
  'bees-knees': {
    title: '蜂蜜签',
    sentence: '今天适合用柔软解决硬问题，蜂蜜会把尖锐的边角慢慢抹平。',
    hint: '蜂蜜、柠檬和金酒，酸甜清爽又很圆润。'
  },
  'clover-club': {
    title: '莓光签',
    sentence: '今天会有一小片好运靠近你，像莓果色落在杯沿那样安静。',
    hint: '莓果酸甜和绵密泡沫，适合漂亮但不轻飘的一杯。'
  },
  'french-75': {
    title: '庆祝签',
    sentence: '今天可以把一件小事当成值得庆祝的事，气泡会替你鼓掌。',
    hint: '金酒、柠檬和起泡酒，轻盈明亮，很有仪式感。'
  },
  'manhattan': {
    title: '街灯签',
    sentence: '今天适合慢慢走，不急着解释自己，成熟的余味会留下来。',
    hint: '威士忌、甜味美思和苦精，老派、稳重、酒感明显。'
  },
  'boulevardier': {
    title: '橙苦签',
    sentence: '今天的锋利可以藏在体面里，苦甜之后会更知道分寸。',
    hint: '威士忌版内格罗尼，厚实、苦甜，适合餐前和夜晚。'
  },
  'sazerac': {
    title: '老城签',
    sentence: '今天适合留一点硬气，真正确定的东西不需要大声。',
    hint: '威士忌、苦精和茴香气息，强酒感老派短饮。'
  },
  'penicillin': {
    title: '姜火签',
    sentence: '今天需要一点暖意把疲惫推开，姜和蜂蜜会帮你重新起势。',
    hint: '威士忌、柠檬、蜂蜜姜和一点烟熏，温暖又有层次。'
  },
  'paper-plane': {
    title: '折纸签',
    sentence: '今天适合轻轻转向，酸甜和苦味会把犹豫折成新的路线。',
    hint: '波本、阿佩罗、阿玛罗和柠檬，现代经典的利落平衡。'
  },
  'mai-tai': {
    title: '海岛签',
    sentence: '今天适合给自己一段出走感，哪怕只是把青柠挤进杯里。',
    hint: '朗姆、青柠和杏仁香，热带但不只是甜。'
  },
  'jungle-bird': {
    title: '热带签',
    sentence: '今天的好事带一点野心，菠萝的明亮和苦味刚好互相撑住。',
    hint: '朗姆、菠萝和金巴利，热带感里带着成熟苦甜。'
  },
  'dark-n-stormy': {
    title: '风暴签',
    sentence: '今天不用躲开风，姜味升起来的时候，你会比想象中更稳。',
    hint: '黑朗姆和姜啤，清爽、辛香，步骤短但气氛足。'
  },
  'tommys-margarita': {
    title: '青柠签',
    sentence: '今天适合删掉多余装饰，留下真正明亮的那一口。',
    hint: '龙舌兰、青柠和糖浆，更干净的玛格丽特方向。'
  },
  'naked-and-famous': {
    title: '烟橙签',
    sentence: '今天可以大胆一点，烟熏和橙色会替你把存在感点亮。',
    hint: '梅斯卡尔、阿佩罗、黄查特和青柠，小杯但记忆很强。'
  },
  'cosmopolitan': {
    title: '霓虹签',
    sentence: '今天适合把状态调得漂亮一点，酸甜会让脚步更轻。',
    hint: '伏特加、蔓越莓、青柠和橙香，好看且辨识度高。'
  },
  'sidecar': {
    title: '暖橙签',
    sentence: '今天适合用一点老派温度收尾，橙香会把夜色磨得更圆。',
    hint: '干邑、橙味利口酒和柠檬，酸甜利落又有暖感。'
  }
}

function dateKey(date) {
  const value = date || new Date()
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function hash(value) {
  let result = 2166136261
  const text = String(value || '')
  for (let index = 0; index < text.length; index += 1) {
    result ^= text.charCodeAt(index)
    result += (result << 1) + (result << 4) + (result << 7) + (result << 8) + (result << 24)
  }
  return result >>> 0
}

function randomSeed() {
  return `seed-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
}

function getUserSeed() {
  const key = 'randomDrinkUserSeed'
  let seed = ''
  try {
    seed = wx.getStorageSync(key)
    if (!seed) {
      seed = randomSeed()
      wx.setStorageSync(key, seed)
    }
  } catch (err) {
    seed = randomSeed()
  }
  return seed
}

function moodKey(item) {
  const tags = item.tags || []
  const flavor = item.flavor || {}
  const name = item.name || ''
  if (tags.includes('聚会') || tags.includes('朋友小聚') || item.type === 'scheme') return 'party'
  if (tags.includes('咖啡感') || name.includes('咖啡')) return 'coffee'
  if (tags.includes('甜口') || tags.includes('奶香') || flavor.sweet >= 4) return 'sweet'
  if (flavor.fresh >= 4 || tags.includes('清爽') || tags.includes('气泡感')) return 'fresh'
  return 'mellow'
}

function pickBySeed(seed, currentDate) {
  const items = recommend.getItemsByIds(PICK_POOL)
  const pool = items.length ? items : recommend.getAllItems().slice(0, 16)
  const index = pool.length ? hash(`${seed}:${dateKey(currentDate)}`) % pool.length : 0
  return pool[index]
}

function buildPick(options = {}) {
  const seed = options.seed || getUserSeed()
  const forcedId = options.id || ''
  const item = forcedId ? recommend.findDetail(forcedId) : pickBySeed(seed, options.date)
  if (!item) return null

  const card = drinkView.detailView(item)
  const mood = DRINK_COPY[item.id] || MOOD_COPY[moodKey(item)] || MOOD_COPY.mellow
  const sentenceIndex = hash(`${item.id}:${dateKey(options.date)}:sentence`) % FALLBACK_SENTENCES.length

  return {
    id: item.id,
    date: dateKey(options.date),
    title: mood.title,
    sentence: mood.sentence || FALLBACK_SENTENCES[sentenceIndex],
    hint: mood.hint,
    detail: card,
    tags: (item.tags || []).slice(0, 3),
    shareTitle: `随机来一杯：${item.name}`,
    shareText: `${item.name}｜${mood.hint}`
  }
}

function previewItems() {
  return recommend.getItemsByIds(PICK_POOL.slice(0, 5)).map((item) => drinkView.resultCard(item))
}

module.exports = {
  buildPick,
  previewItems,
  dateKey
}
