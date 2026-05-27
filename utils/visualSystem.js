const visualThemes = {
  gin: {
    id: 'gin',
    name: '金酒',
    className: 'theme-gin',
    keywords: ['金酒', '金汤力', 'gin'],
    mood: ['青柠', '冰感', '气泡', '透明', '夏夜'],
    palette: {
      primary: '#2f948c',
      secondary: '#8edbd5',
      accent: '#d8ef70',
      paper: '#fff7e5',
      liquid: '#73d7c9'
    },
    materials: ['透明玻璃', '气泡水', '冷凝水', '清透冰块'],
    elements: ['高球杯', '青柠圆片', '细气泡', '透明液体']
  },
  whisky: {
    id: 'whisky',
    name: '威士忌',
    className: 'theme-whisky',
    keywords: ['威士忌', 'whisky', 'whiskey', 'highball'],
    mood: ['琥珀', '木桌', '夜晚', '冰球', '暖光'],
    palette: {
      primary: '#a86f32',
      secondary: '#e3ad63',
      accent: '#ffd27a',
      paper: '#fff1d6',
      liquid: '#c77b35'
    },
    materials: ['厚底玻璃', '冰球', '轻木纹', '温暖灯光'],
    elements: ['矮杯', '大冰球', '琥珀液体', '小瓶标签']
  },
  baileys: {
    id: 'baileys',
    name: '百利甜',
    className: 'theme-baileys',
    keywords: ['百利', '奶香', '牛奶', '咖啡', '巧克力', 'baileys'],
    mood: ['奶香', '咖啡', '巧克力', '丝滑', '甜品感'],
    palette: {
      primary: '#9b6a48',
      secondary: '#d8b58d',
      accent: '#f0d8b8',
      paper: '#fff5e8',
      liquid: '#d8b184'
    },
    materials: ['牛奶旋涡', '咖啡泡沫', '柔软布料', '甜品桌面'],
    elements: ['奶油色液体', '咖啡杯', '巧克力碎片', '轻泡沫']
  },
  vodka: {
    id: 'vodka',
    name: '伏特加',
    className: 'theme-vodka',
    keywords: ['伏特加', 'vodka'],
    mood: ['透明', '冷蓝', '冰块', '干净', '柠檬'],
    palette: {
      primary: '#3c9fc4',
      secondary: '#a8dff1',
      accent: '#f5df72',
      paper: '#f8fdff',
      liquid: '#9fdff0'
    },
    materials: ['冷玻璃', '大冰块', '透明液体', '极简冷光'],
    elements: ['透明杯', '柠檬角', '冰块', '简洁瓶身']
  },
  rum: {
    id: 'rum',
    name: '朗姆',
    className: 'theme-rum',
    keywords: ['朗姆', '莫吉托', '薄荷', 'mojito', 'rum'],
    mood: ['热带水果', '薄荷', '橙黄', '夏天', '酸甜'],
    palette: {
      primary: '#d8893a',
      secondary: '#9bd6a6',
      accent: '#ffd56f',
      paper: '#fff3d8',
      liquid: '#f5ad64'
    },
    materials: ['水果切片', '薄荷叶', '碎冰', '夏天光感'],
    elements: ['莫吉托杯', '薄荷叶', '青柠', '热带水果']
  },
  convenience: {
    id: 'convenience',
    name: '便利店调酒',
    className: 'theme-convenience',
    keywords: ['便利店', '购买清单', '冰杯', '临时采购'],
    mood: ['冰柜', '夜晚便利店', '小瓶饮料', '冷光', '即时满足'],
    palette: {
      primary: '#2f948c',
      secondary: '#9edfe8',
      accent: '#f6db76',
      paper: '#fff7e5',
      liquid: '#93d8d0'
    },
    materials: ['塑料瓶', '冰杯', '小票贴纸', '冰柜反光'],
    elements: ['冰杯', '小瓶酒', '饮料瓶', '便利店标签', '冷柜光带']
  },
  beginner: {
    id: 'beginner',
    name: '新手友好',
    className: 'theme-beginner',
    keywords: ['新手', '低门槛', '不翻车'],
    mood: ['安全', '干净', '容易成功'],
    palette: {
      primary: '#4faaa2',
      secondary: '#d9f4ea',
      accent: '#ffe49a',
      paper: '#fff9e9',
      liquid: '#bce9dd'
    },
    materials: ['留白', '简单杯型', '少量冰块'],
    elements: ['简单杯子', '1-2 个材料', '清晰步骤符号']
  },
  lowAlcohol: {
    id: 'lowAlcohol',
    name: '更低酒感',
    className: 'theme-low-alcohol',
    keywords: ['低酒精', '低酒感', '微醺', '不刺激'],
    mood: ['轻', '柔和', '不刺激', '像饮料'],
    palette: {
      primary: '#6eb8ab',
      secondary: '#dcefe8',
      accent: '#ffd1b8',
      paper: '#fff8ec',
      liquid: '#ccebdc'
    },
    materials: ['水果汁感', '低透明度液体', '轻气泡'],
    elements: ['水果切片', '浅色液体', '细气泡', '小杯或高球杯']
  }
}

const themePriority = ['gin', 'whisky', 'baileys', 'vodka', 'rum', 'convenience', 'beginner', 'lowAlcohol']

function normalizeText(value) {
  return String(value || '').toLowerCase()
}

function themeText(item, extra) {
  const tags = (item && item.tags) || []
  const pieces = [
    extra,
    item && item.id,
    item && item.name,
    item && item.enName,
    item && item.base,
    tags.join(' ')
  ]
  return normalizeText(pieces.filter(Boolean).join(' '))
}

function resolveTheme(item, extra) {
  const text = themeText(item, extra)
  const matched = themePriority.find((themeId) => {
    const theme = visualThemes[themeId]
    return theme.keywords.some((keyword) => text.includes(normalizeText(keyword)))
  })
  return visualThemes[matched || 'gin']
}

function themeClass(item, extra) {
  return resolveTheme(item, extra).className
}

function themePalette(item, extra) {
  return resolveTheme(item, extra).palette
}

module.exports = {
  visualThemes,
  themePriority,
  resolveTheme,
  themeClass,
  themePalette
}
