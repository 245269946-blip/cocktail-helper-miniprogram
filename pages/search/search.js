const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const recommend = require('../../utils/recommend')
const share = require('../../utils/share')

let pageContent = data

function visibleRecipes(content) {
  return (content.recipes || []).filter((item) => item && !item.hidden)
}

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function recipeMatchesBase(recipe, base) {
  const recipeBase = normalize(recipe.base)
  const baseName = normalize(base.name)
  const baseId = normalize(base.id)
  return recipeBase === baseName ||
    baseName.includes(recipeBase) ||
    recipeBase.includes(baseName) ||
    (baseId === 'brandy' && (recipeBase.includes('干邑') || recipeBase.includes('白兰地'))) ||
    (baseId === 'whisky' && recipeBase.includes('威士忌'))
}

Page({
  data: {
    keyword: '',
    hotKeywords: data.hotKeywords,
    recentSearches: [],
    catalogGroups: [],
    visibleGroups: [],
    allCount: 0
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      pageContent = content
      const catalogGroups = this.buildCatalogGroups(content)
      this.setData({
        hotKeywords: content.hotKeywords || [],
        recentSearches: wx.getStorageSync('recentSearches') || [],
        catalogGroups,
        visibleGroups: catalogGroups,
        allCount: visibleRecipes(content).length
      })
    })
  },

  onShow() {
    const recent = wx.getStorageSync('recentSearches') || []
    if (recent.length !== (this.data.recentSearches || []).length) {
      this.setData({ recentSearches: recent })
    }
  },

  buildCatalogGroups(content) {
    const recipes = visibleRecipes(content)
    const used = new Set()
    const groups = (content.bases || []).map((base) => {
      const items = recipes
        .filter((recipe) => recipeMatchesBase(recipe, base))
        .map((item) => this.toCatalogCard(item))
      items.forEach((item) => used.add(item.id))
      return {
        id: base.id,
        title: base.name,
        subtitle: base.subtitle || '',
        items
      }
    }).filter((group) => group.items.length)

    const others = recipes
      .filter((recipe) => !used.has(recipe.id))
      .map((item) => this.toCatalogCard(item))

    if (others.length) {
      groups.push({
        id: 'others',
        title: '其他喝法',
        subtitle: '果酒、起泡酒和低酒精方向',
        items: others
      })
    }

    return groups
  },

  toCatalogCard(item) {
    const card = drinkView.resultCard(item)
    return Object.assign({}, card, {
      base: item.base,
      aliases: item.aliases || [],
      searchText: [
        item.name,
        item.enName,
        item.base,
        item.reason,
        ...(item.tags || []),
        ...(item.aliases || []),
        ...(item.scenes || []),
        ...recommend.materialNames(item)
      ].map(normalize).join(' ')
    })
  },

  onInput(event) {
    const keyword = event.detail.value || ''
    this.setData({
      keyword,
      visibleGroups: this.filterGroups(keyword)
    })
  },

  filterGroups(keyword) {
    const key = normalize(keyword)
    if (!key) return this.data.catalogGroups
    return (this.data.catalogGroups || []).map((group) => {
      const groupMatched = normalize(group.title).includes(key) || key.includes(normalize(group.title))
      const items = group.items.filter((item) => {
        return groupMatched || item.searchText.includes(key) || key.includes(normalize(item.name))
      })
      return Object.assign({}, group, { items })
    }).filter((group) => group.items.length)
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onKeywordTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    this.saveRecent(keyword)
    this.setData({
      keyword,
      visibleGroups: this.filterGroups(keyword)
    })
  },

  onRecipeTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onClearSearch() {
    this.setData({
      keyword: '',
      visibleGroups: this.data.catalogGroups
    })
  },

  onClearRecent() {
    wx.removeStorageSync('recentSearches')
    this.setData({ recentSearches: [] })
  },

  saveRecent(keyword) {
    const text = String(keyword || '').trim()
    if (!text) return
    const recent = wx.getStorageSync('recentSearches') || []
    const next = [text].concat(recent.filter((item) => item !== text)).slice(0, 8)
    wx.setStorageSync('recentSearches', next)
    this.setData({ recentSearches: next })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '完整鸡尾酒目录，按基酒直接挑一杯',
      path: '/pages/search/search',
      imageUrl: '/assets/p2/recipe-gin-tonic-hero.png'
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '完整鸡尾酒目录，按基酒直接挑一杯',
      imageUrl: '/assets/p2/recipe-gin-tonic-hero.png'
    })
  }
})
