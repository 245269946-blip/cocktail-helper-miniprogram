const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    showSplash: true,
    keyword: '',
    isFocused: false,
    hotKeywords: ['气泡水', '柠檬茶', '咖啡特调', '可乐能调什么', '便利店饮品', '无酒精', '甜口', '低酒感'],
    recentSearches: [],
    actionEntries: [
      { title: '家里有什么', desc: '先看看现在能直接做什么', note: '少补货', iconClass: 'icon-home', path: '/pages/pantry/pantry', featured: true },
      { title: '便利店饮品', desc: '下楼 5 分钟买齐材料', note: '照着买', iconClass: 'icon-store', path: '/pages/convenience/convenience' },
      { title: '按材料找', desc: '从可乐、茶、咖啡、果汁开始', note: '更明确', iconClass: 'icon-glass', path: '/pages/ingredient-list/ingredient-list' }
    ],
    directEntries: [
      { title: '便利店能买齐', desc: '只买 2-3 样，今晚就能做', keyword: '便利店饮品' },
      { title: '无酒精也好喝', desc: '气泡、茶、咖啡都能做成特调', keyword: '无酒精' },
      { title: '像冰饮一样清爽', desc: '青柠、气泡、冰块优先', keyword: '清爽气泡' }
    ]
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      const hotKeywords = (content.hotKeywords || []).slice(0, 8)
      this.setData({
        hotKeywords: ['气泡水', '柠檬茶', '咖啡特调'].concat(hotKeywords).slice(0, 8),
        recentSearches: wx.getStorageSync('recentSearches') || []
      })
    })
  },

  onStart() {
    this.setData({ showSplash: false })
  },

  onInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    this.saveRecent(keyword)
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

  onHotTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onDirectSearch(event) {
    const keyword = event.currentTarget.dataset.keyword
    if (!keyword) return
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  saveRecent(keyword) {
    const next = [keyword].concat(this.data.recentSearches.filter((item) => item !== keyword)).slice(0, 6)
    wx.setStorageSync('recentSearches', next)
    this.setData({ recentSearches: next })
  },

  onNavigate(event) {
    const path = event.currentTarget.dataset.path
    if (!path) return

    if (path === '/pages/search/search' || path === '/pages/home/home' || path === '/pages/collections/collections') {
      wx.switchTab({ url: path })
      return
    }

    wx.navigateTo({ url: path })
  }
})
