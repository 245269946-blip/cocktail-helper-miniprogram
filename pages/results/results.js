const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const visualSystem = require('../../utils/visualSystem')

function uniqueItems(items) {
  const result = []
  ;(items || []).forEach((item) => {
    if (item && !result.some((exists) => exists.id === item.id)) result.push(item)
  })
  return result
}

function cards(items) {
  return uniqueItems(items).slice(0, 8).map((item) => drinkView.resultCard(item))
}

function cardItems(items, limit) {
  return uniqueItems(items).slice(0, limit || 4).map((item) => drinkView.resultCard(item))
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
    decisionIntro: null,
    mainRecommendation: null,
    extensionSections: [],
    results: [],
    exploreOptions: [
      { title: '更适合新手', value: '新手友好' },
      { title: '更清爽', value: '清爽' },
      { title: '更便利店', value: '便利店' },
      { title: '更低酒感', value: '低酒精' }
    ]
  },

  onLoad(options) {
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
      const decision = this.buildDecision(value, results)
      decisionIntro = decision.intro
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = results.length ? '先给最推荐的一杯，再往下看更简单、便利店和替代喝法。' : '暂时没有精确匹配，可以换成酒名、基酒、材料或口感试试。'
    } else if (mode === 'tag') {
      results = recommend.filterByTag(value)
      const decision = this.buildGeneralDecision(results, value)
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = `按“${value}”整理出的可选方案。`
    } else if (mode === 'ids') {
      results = recommend.getItemsByIds(value.split(','))
      const decision = this.buildGeneralDecision(results, title)
      mainRecommendation = decision.main
      extensionSections = decision.sections
      subtitle = '根据你的选择生成的推荐。'
    }

    const mainId = mainRecommendation && mainRecommendation.id
    const resultCards = cards(mainId ? results.filter((item) => item.id !== mainId) : results)

    wx.setNavigationBarTitle({ title })
    this.setData({
      title,
      subtitle,
      themeClass: visualSystem.themeClass(mainRecommendation || results[0], value || title),
      decisionIntro,
      mainRecommendation,
      extensionSections,
      results: resultCards
    })
  },

  buildDecision(keyword, results) {
    const key = (keyword || '').trim()
    const all = recommend.getAllItems()
    const base = recommend.getContent().bases.find((item) => key.includes(item.name) || key.toLowerCase().includes(item.id))
    const ingredient = recommend.getContent().ingredients.find((item) => key.includes(item.name))

    if (base) {
      const recipeIds = base.recipes || {}
      const allBaseItems = recommend.getItemsByIds(Array.from(new Set(Object.values(recipeIds).flat())))
      const beginnerItems = recommend.getItemsByIds(recipeIds.beginner || [])
      const mainSource = beginnerItems.length ? beginnerItems : recommend.getItemsByIds(recipeIds.classic || [])
      const main = mainSource[0] ? drinkView.resultCard(mainSource[0]) : null
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
      const main = recipeItems[0] ? drinkView.resultCard(recipeItems[0]) : null
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
    return {
      intro: {
        label: '搜索结果',
        title: `${keyword || '这类喝法'}最推荐先看这杯`,
        tags: mainItem.tags || []
      },
      main: drinkView.resultCard(mainItem),
      sections: [
        makeSection('更简单', '步骤更短，材料更少。', items.filter((item) => (item.flavor || {}).difficulty <= 2), mainId),
        makeSection('便利店版本', '临时采购更容易凑齐。', items.filter((item) => (item.tags || []).includes('便利店') || item.type === 'scheme'), mainId),
        makeSection('更甜版本', '入口更软，不想太苦时选这组。', items.filter((item) => (item.tags || []).includes('甜口') || (item.flavor || {}).sweet >= 4), mainId),
        makeSection('更低酒感', '轻一点，更像饮料。', items.filter((item) => (item.tags || []).includes('低酒精') || (item.flavor || {}).alcohol <= 1), mainId),
        makeSection('类似喝法', '喜欢主推这杯，可以继续试这些。', recommend.getItemsByIds(mainItem.similar || []), mainId)
      ].filter((section) => section.items.length)
    }
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
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
