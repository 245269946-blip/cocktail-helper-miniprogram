const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

let pageContent = data

Page({
  data: {
    keyword: '',
    isFocused: false,
    hotKeywords: data.hotKeywords,
    suggestionGroups: []
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      pageContent = content
      this.setData({
        hotKeywords: content.hotKeywords,
        suggestionGroups: this.buildSuggestionGroups('')
      })
    })
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

  buildSuggestionGroups(keyword) {
    const key = (keyword || '').trim()
    const content = pageContent
    if (!key) {
      return [
        { title: '精准匹配', items: ['咖啡汤力', '梅酒苏打', '百利甜牛奶'] },
        { title: '条件搜索', items: ['气泡水能做什么', '咖啡怎么调好喝', '可乐能调什么'] },
        { title: '材料搜索', items: ['果汁能调什么', '茶饮能调什么', '便利店饮品'] }
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

    return [
      { title: '精准匹配', items: ['咖啡汤力', '梅酒苏打', '百利甜牛奶'] },
      { title: '条件搜索', items: [`${key}怎么喝`, `${key}兑什么`, `${key}便利店`] },
      { title: '继续缩小', items: ['新手友好', '低酒感', '便利店饮品'] }
    ]
  },

  nameById(id) {
    const item = ((pageContent.recipes || []).concat(pageContent.schemes || [])).find((recipe) => recipe.id === id)
    return item ? item.name : ''
  }
})
