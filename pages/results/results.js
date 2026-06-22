const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const illustrations = require('../../utils/illustrations')
const visualSystem = require('../../utils/visualSystem')
const share = require('../../utils/share')

function uniqueItems(items) {
  const result = []
  ;(items || []).forEach((item) => {
    if (item && !result.some((exists) => exists.id === item.id)) result.push(item)
  })
  return result
}

function normalizeQuery(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '')
}

function isExactRecipeQuery(keyword, item) {
  if (!keyword || !item) return false
  const key = normalizeQuery(keyword)
  const fields = [item.id, item.name, item.enName || item.englishName || '', ...(item.aliases || [])]
  return fields.some((field) => normalizeQuery(field) === key)
}

function cards(items) {
  return uniqueItems(items).slice(0, 8).map((item) => drinkView.resultCard(item))
}

function cardItems(items, limit) {
  return uniqueItems(items).slice(0, limit || 4).map((item) => drinkView.resultCard(item))
}

function recommendationCard(item) {
  const card = drinkView.resultCard(item)
  return Object.assign({}, card, { illustration: illustrations.drinkPath(item, 'card') })
}

function makeSection(title, desc, items, excludeId) {
  const filtered = uniqueItems(items).filter((item) => item && item.id !== excludeId)
  return {
    title,
    desc,
    items: cardItems(filtered, 4)
  }
}

Page({
  data: {
    title: '推荐结果',
    subtitle: '',
    themeClass: 'theme-gin',
    totalCount: 0,
    searchKeyword: '',
    decoImage: '/assets/p2/base-gin-tonic-result.png',
    trendingSearches: ['金汤力', '莫吉托', '威士忌可乐', '百利甜牛奶', '梅酒苏打'],
    decisionIntro: null,
    mainRecommendation: null,
    primaryResults: [],
    extraResults: [],
    showAllResults: false,
    extensionSections: [],
    results: [],
    shareMode: 'tag',
    shareValue: '',
    shareTitle: '推荐结果'
  },

  onLoad(options) {
    share.enableShareMenu()
    contentStore.getContent().then(() => this.loadResults(options))
  },

  loadResults(options) {
    const mode = options.mode || 'tag'
    const value = decodeURIComponent(options.value || '')
    const title = decodeURIComponent(options.title || value || '推荐结果')
    let results = []
    let subtitle = ''
    let decisionIntro = null
    let mainRecommendation = null
    let extensionSections = []

    if (mode === 'search') {
      results = recommend.search(value)
      /* 兜底：如果精确搜索无结果，尝试用别名目标再搜一次 */
      if (!results.length && value) {
        const aliases = recommend.getContent().searchAliases || {}
        const aliasTarget = aliases[(value || '').trim().toLowerCase()]
        if (aliasTarget && aliasTarget !== value) {
          results = recommend.search(aliasTarget)
        }
        /* 如果别名目标是ID（如gin-tonic）且仍无结果，用原始keyword做中文名匹配 */
        if (!results.length && value && aliasTarget && !aliasTarget.includes(' ') && !/[\u4e00-\u9fff]/.test(aliasTarget)) {
          const all = recommend.getAllItems()
          const key = (value || '').trim().toLowerCase()
          const nameMatch = all.find((item) => (item.name || '').toLowerCase() === key)
          if (nameMatch) results = [nameMatch]
        }
      }
      /* 再兜底：按名称全字段模糊搜索 */
      if (!results.length && value) {
        const all = recommend.getAllItems()
        const key = (value || '').trim().toLowerCase()
        results = all.filter((item) => {
          const fields = [item.name, item.enName || '', item.base || '', ...(item.aliases || []), ...(item.tags || [])]
          return fields.some((f) => f.toLowerCase().includes(key) || key.includes(f.toLowerCase()))
        })
      }
      const decision = this.buildDecision(value, results)
      decisionIntro = decision.intro
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = results.length ? '先给最推荐的一杯，再往下看更简单、便利店和替代喝法。' : '暂时没有精确匹配，可以换成酒名、基酒、材料或口感试试。'
    } else if (mode === 'tag') {
      results = recommend.filterByTag(value)
      const decision = this.buildGeneralDecision(results, value)
      decisionIntro = decision.intro
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = `按“${value}”整理出的可选方案。`
    } else if (mode === 'ids') {
      results = recommend.getItemsByIds(value.split(','))
      const decision = this.buildGeneralDecision(results, title)
      decisionIntro = decision.intro
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = '根据你的选择生成的推荐。'
    }

    const mainId = mainRecommendation && mainRecommendation.id
    const resultCards = cards(mainId ? results.filter((item) => item.id !== mainId) : results)
    const allResultsCount = results.length
    const primaryResults = resultCards.slice(0, 3)
    const extraResults = resultCards.slice(3)

    const resolvedTheme = visualSystem.themeClass(mainRecommendation || results[0], value || title)
    const decoImage = illustrations.basePath(mainRecommendation || results[0] || value || title)
    const displayKeyword = mode === 'ids' ? title : (value || title)

    wx.setNavigationBarTitle({ title })
    this.setData({
      title,
      subtitle,
      totalCount: allResultsCount,
      searchKeyword: displayKeyword,
      themeClass: resolvedTheme,
      decoImage,
      decisionIntro,
      mainRecommendation,
      primaryResults,
      extraResults,
      showAllResults: false,
      extensionSections,
      results: resultCards,
      shareMode: mode,
      shareValue: value,
      shareTitle: title
    })
  },

  buildDecision(keyword, results) {
    const key = (keyword || '').trim()
    const items = uniqueItems(results)
    const exactMain = items.find((item) => isExactRecipeQuery(key, item))
    if (exactMain) {
      return this.buildGeneralDecision([exactMain].concat(items.filter((item) => item.id !== exactMain.id)), keyword)
    }
    const all = recommend.getAllItems()
    const base = recommend.getContent().bases.find((item) => key.includes(item.name) || key.toLowerCase().includes(item.id))
    const ingredient = recommend.getContent().ingredients.find((item) => key.includes(item.name))

    if (base) {
      const recipeIds = base.recipes || {}
      const allBaseItems = recommend.getItemsByIds(Array.from(new Set(Object.values(recipeIds).flat())))
      const beginnerItems = recommend.getItemsByIds(recipeIds.beginner || [])
      const mainSource = beginnerItems.length ? beginnerItems : recommend.getItemsByIds(recipeIds.classic || [])
      const main = mainSource[0] ? recommendationCard(mainSource[0]) : null
      const mainId = main && main.id
      return {
        intro: {
          label: '按基酒找喝法',
          title: `${base.name}最推荐从这杯开始`,
          tags: base.tags || []
        },
        sections: [
          makeSection('更简单', '步骤更短，适合现在就做。', beginnerItems, mainId),
          makeSection('便利店版本', '冰杯、小瓶酒和常见饮料就能完成。', recommend.getItemsByIds(recipeIds.convenience || []), mainId),
          makeSection('更甜版本', '入口更软，不想太苦时选这组。', recommend.getItemsByIds(recipeIds.sweet || []), mainId),
          makeSection('更低酒感', '减少冲击感，更像饮料一点。', allBaseItems.filter((item) => (item.flavor || {}).alcohol <= 2), mainId),
          makeSection('类似喝法', '已经喜欢这杯时，可以顺着喝法继续扩展。', recommend.getItemsByIds((mainSource[0] && mainSource[0].similar) || []), mainId)
        ].filter((section) => section.items.length),
        main
      }
    }

    if (ingredient) {
      const recipeItems = recommend.getItemsByIds(ingredient.recipes || [])
      const main = recipeItems[0] ? recommendationCard(recipeItems[0]) : null
      const mainId = main && main.id
      return {
        intro: {
          label: '按材料找喝法',
          title: `${ingredient.name}最推荐这样搭`,
          tags: ingredient.goodWith || ingredient.tags || []
        },
        sections: [
          makeSection('更简单', '材料少、比例稳，适合直接照做。', recipeItems.filter((item) => (item.flavor || {}).difficulty <= 2), mainId),
          makeSection('便利店版本', '能用常见小酒和饮料快速凑齐。', recipeItems.filter((item) => (item.tags || []).includes('便利店')), mainId),
          makeSection('更低酒感', '像饮料一点，适合先轻轻试一杯。', all.filter((item) => (item.tags || []).includes('低酒精') || (item.flavor || {}).alcohol <= 1), mainId),
          makeSection('类似喝法', '如果这个搭配顺口，可以继续试这些。', recommend.getItemsByIds((recipeItems[0] && recipeItems[0].similar) || []), mainId)
        ].filter((section) => section.items.length),
        main
      }
    }

    return this.buildGeneralDecision(results, keyword)
  },

  buildGeneralDecision(results, keyword) {
    const items = uniqueItems(results)
    if (!items.length) return { intro: null, main: null, sections: [] }
    const mainItem = items[0]
    const mainId = mainItem.id
    const key = (keyword || '').trim()

    // 根据搜索关键词意图动态构建分区
    const isParty = key.includes('聚会') || key.includes('party') || key.includes('朋友')
    const isSummer = key.includes('夏天') || key.includes('夏日') || key.includes('清爽')
    const isFresh = key.includes('清爽') || key.includes('气泡') || key.includes('冰饮') || key.includes('解腻')
    const isLowAlcohol = key.includes('低酒') || key.includes('微醺') || key.includes('新手') || key.includes('低度')
    const isSweet = key.includes('甜') || key.includes('女生') || key.includes('奶香')
    const isConvenience = key.includes('便利店') || key.includes('简单') || key.includes('快手') || key.includes('懒人')
    const isCafe = key.includes('咖啡') || key.includes('下午')

    // 基础分区池
    const sectionPool = {
      easier: makeSection('更简单', '步骤更短，材料更少。', items.filter((item) => (item.flavor || {}).difficulty <= 2), mainId),
      convenience: makeSection('便利店版本', '临时采购更容易凑齐。', items.filter((item) => (item.tags || []).includes('便利店') || item.type === 'scheme'), mainId),
      sweeter: makeSection('更甜版本', '入口更软，不想太苦时选这组。', items.filter((item) => (item.tags || []).includes('甜口') || (item.flavor || {}).sweet >= 4), mainId),
      lower: makeSection('更低酒感', '轻一点，更像饮料。', items.filter((item) => (item.tags || []).includes('低酒精') || (item.flavor || {}).alcohol <= 1), mainId),
      similar: makeSection('类似喝法', '喜欢主推这杯，可以继续试这些。', recommend.getItemsByIds(mainItem.similar || []), mainId),
      party: makeSection('聚会友好', '能做多杯，不容易翻车。', items.filter((item) => (item.tags || []).includes('聚会') || (item.tags || []).includes('朋友小聚')), mainId),
      fresh: makeSection('更清爽', '气泡、柑橘、薄荷方向。', items.filter((item) => (item.flavor || {}).fresh >= 4 || (item.tags || []).includes('清爽')), mainId),
      batch: makeSection('批量出杯', '材料好买，适合多人。', items.filter((item) => (item.tags || []).includes('聚会') || item.type === 'scheme'), mainId)
    }

    // 根据意图排列分区优先级
    let orderedKeys
    if (isParty) {
      orderedKeys = ['party', 'batch', 'easier', 'sweeter', 'lower', 'similar']
    } else if (isSummer || isFresh) {
      orderedKeys = ['fresh', 'easier', 'lower', 'sweeter', 'similar', 'convenience']
    } else if (isLowAlcohol) {
      orderedKeys = ['lower', 'easier', 'sweeter', 'fresh', 'similar', 'convenience']
    } else if (isSweet) {
      orderedKeys = ['sweeter', 'lower', 'easier', 'fresh', 'similar', 'convenience']
    } else if (isConvenience) {
      orderedKeys = ['convenience', 'easier', 'sweeter', 'lower', 'similar']
    } else if (isCafe) {
      orderedKeys = ['easier', 'sweeter', 'lower', 'similar']
    } else {
      orderedKeys = ['easier', 'sweeter', 'lower', 'fresh', 'similar', 'convenience']
    }

    const sections = orderedKeys.map((key) => sectionPool[key]).filter((section) => section && section.items.length)

    return {
      intro: {
        label: '搜索结果',
        title: `${keyword || '这类喝法'}最推荐先看这杯`,
        tags: mainItem.tags || []
      },
      main: recommendationCard(mainItem),
      sections
    }
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/home/home' }) })
  },

  onShare() {
    share.enableShareMenu()
    wx.showToast({ title: '可从右上角菜单分享', icon: 'none' })
  },

  onShareAppMessage() {
    const options = this.shareOptions()
    return share.appMessage({
      title: options.title,
      path: '/pages/results/results',
      query: options.query,
      imageUrl: options.imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  },

  shareOptions() {
    return {
      title: `${this.data.shareTitle || this.data.title || '推荐结果'}｜调酒助手`,
      query: {
        mode: this.data.shareMode || 'tag',
        value: this.data.shareValue || this.data.searchKeyword || '',
        title: this.data.shareTitle || this.data.title || '推荐结果'
      },
      imageUrl: this.data.decoImage || share.DEFAULT_IMAGE
    }
  },

  onExtCardTap(event) {
    const id = event.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
    }
  },

  onToggleMoreResults() {
    this.setData({ showAllResults: !this.data.showAllResults })
  },

  onTrendTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    if (keyword) {
      wx.redirectTo({
        url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
      })
    }
  },

  onSearchAgain() {
    wx.switchTab({ url: '/pages/search/search' })
  },

  onExploreTap(event) {
    const value = event.currentTarget.dataset.value
    const title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/results/results?mode=tag&value=${encodeURIComponent(value)}&title=${encodeURIComponent(title)}`
    })
  }
})
