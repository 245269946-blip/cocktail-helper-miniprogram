const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    items: []
  },

  onShow() {
    contentStore.getContent().then(() => {
      const favorites = wx.getStorageSync('favorites') || []
      this.setData({ items: recommend.getItemsByIds(favorites).map((item) => drinkView.resultCard(item)) })
    })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onGoHome() {
    wx.switchTab({ url: '/pages/home/home' })
  }
})
