const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')

let pageContent = data

Page({
  data: {
    keyword: '',
    isFocused: false,
    hotKeywords: data.hotKeywords,
    recentSearches: [],
    suggestionGroups: [],
    featuredRecipes: [
      { id: 'gin-tonic', name: '金汤力', image: illustrations.drinkPath('gin-tonic', 'card'), tags: ['清爽', '经典', '新手'] },
      { id: 'whiskey-sour', name: '威士忌酸', image: illustrations.drinkPath('whiskey-sour', 'card'), tags: ['酸甜', '泡沫感', '经典'] },
      { id: 'cuba-libre', name: '自由古巴', image: illustrations.drinkPath('cuba-libre', 'card'), tags: ['经典', '可乐', '聚会'] },
      { id: 'mojito', name: '莫吉托', image: illustrations.drinkPath('mojito', 'card'), tags: ['薄荷', '气泡感', '夏天'] },
      { id: 'white-russian', name: '白俄罗斯', image: illustrations.drinkPath('white-russian', 'card'), tags: ['咖啡奶感', '顺滑', '夜晚'] }
    ]
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      pageContent = content
      this.setData({
        hotKeywords: content.hotKeywords,
        recentSearches: wx.getStorageSync('recentSearches') || [],
        suggestionGroups: this.buildSuggestionGroups('')
      })
    })
  },

  onShow() {
    /* 每次显示时刷新搜索历史（首页搜索后可能更新）*/
    const recent = wx.getStorageSync('recentSearches') || []
    if (recent.length !== (this.data.recentSearches || []).length) {
      this.setData({ recentSearches: recent })
    }
  },

  onInput(event) {
    const keyword = event.detail.value
    this.setData({
      keyword,
      suggestionGroups: this.buildSuggestionGroups(keyword)
    })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onFocus() {
    this.setData({ isFocused: true })
  },

  onBlur() {
    this.setData({ isFocused: false })
  },

  onKeywordTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onRecipeTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onClearRecent() {
    wx.removeStorageSync('recentSearches')
    this.setData({ recentSearches: [] })
  },

  buildSuggestionGroups(keyword) {
    const key = (keyword || '').trim()
    const content = pageContent
    if (!key) {
      return [
        { title: '热门', items: (content.hotKeywords || []).slice(0, 3) },
        { title: '按酒底', items: ['金酒兑什么', '威士忌怎么喝', '伏特加兑什么'] },
        { title: '按材料', items: ['气泡水能做什么', '咖啡怎么调好喝', '果汁能调什么'] }
      ]
    }

    const base = (content.bases || []).find((item) => key.includes(item.name) || key.toLowerCase().includes(item.id))
    if (base) {
      const recipes = base.recipes || {}
      return [
        { title: '精准匹配', items: (recipes.first || []).concat(recipes.classic || []).map((id) => this.nameById(id)).filter(Boolean).slice(0, 3) },
        { title: '条件搜索', items: [`${base.name}兑什么`, `新手${base.name}`, `便利店能做的${base.name}`] },
        { title: '低门槛方向', items: [`${base.name}低酒感`, `${base.name}不苦`, `${base.name}清爽`] }
      ]
    }

    const ingredient = (content.ingredients || []).find((item) => key.includes(item.name))
    if (ingredient) {
      return [
        { title: '精准匹配', items: (ingredient.recipes || []).map((id) => this.nameById(id)).filter(Boolean).slice(0, 3) },
        { title: '条件搜索', items: [`${ingredient.name}能调什么`, `${ingredient.name}兑什么酒`, `便利店${ingredient.name}调酒`] },
        { title: '搭配方向', items: (ingredient.goodWith || []).slice(0, 3).map((name) => `${name}+${ingredient.name}`) }
      ]
    }

    const mapping = (content.searchMappings || []).find((item) => {
      return (item.keywords || []).some((word) => word.includes(key) || key.includes(word))
    })
    if (mapping) {
      return [
        { title: '精准匹配', items: (mapping.recipeIds || []).map((id) => this.nameById(id)).filter(Boolean).slice(0, 3) },
        { title: '条件搜索', items: (mapping.keywords || []).slice(0, 3) },
        { title: '继续缩小', items: ['新手友好', '便利店能买齐', '低酒感'] }
      ]
    }

    // 未命中任何数据：key 太短或完全没匹配，展示热门词
    if (key.length < 2) {
      return [
        { title: '热门搜索', items: (content.hotKeywords || []).slice(0, 4) },
        { title: '按酒底找', items: ['金酒兑什么', '威士忌怎么喝', '伏特加兑什么'] },
        { title: '按场景找', items: ['聚会喝什么', '夏天喝什么', '便利店调酒'] }
      ]
    }

    // 有关键词但无精确匹配：给条件搜索建议 + 热门兜底
    return [
      { title: '试试这些搜索', items: [`${key}怎么喝`, `${key}兑什么`, `${key}便利店`] },
      { title: '热门', items: (content.hotKeywords || []).slice(0, 3) },
      { title: '按场景找', items: ['聚会喝什么', '夏天喝什么', '新手友好', '便利店调酒'] }
    ]
  },

  nameById(id) {
    const item = ((pageContent.recipes || []).concat(pageContent.schemes || [])).find((recipe) => recipe.id === id)
    return item ? item.name : ''
  }
})
