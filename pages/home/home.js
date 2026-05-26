const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    keyword: '',
    actionEntries: [
      { title: '去便利店买', desc: '下楼5分钟就能搞定', note: '少买少错', iconClass: 'icon-store', path: '/pages/convenience/convenience', featured: true },
      { title: '家里有什么', desc: '先看看现在能做什么', note: '少补货', iconClass: 'icon-home', path: '/pages/pantry/pantry' },
      { title: '找一杯好喝的', desc: '从甜口、清爽、微醺开始', note: '先选口味', iconClass: 'icon-glass', path: '/pages/flavor-list/flavor-list' },
      { title: '第一次尝试', desc: '几乎喝不出酒味也能喝', note: '新手友好', iconClass: 'icon-first', path: '/pages/beginner/beginner' }
    ],
    directEntries: [
      { title: '便利店能买齐', desc: '只买 2-3 样，今晚就能做', path: '/pages/convenience/convenience' },
      { title: '几乎喝不出酒味', desc: '前半口像冰饮，后面才有感觉', path: '/pages/results/results?mode=tag&value=低酒精&title=几乎喝不出酒味' },
      { title: '家里现在就能做', desc: '先看不用出门的方案', path: '/pages/pantry/pantry' }
    ]
  },

  onLoad() {
    contentStore.getContent()
  },

  onInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onHotTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
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
