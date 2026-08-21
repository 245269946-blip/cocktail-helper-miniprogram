const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const cloudImageResolver = require('../../utils/cloudImageResolver')
const share = require('../../utils/share')

Page({
  data: {
    items: []
  },

  onShow() {
    share.enableShareMenu()
    contentStore.getContent().then(() => {
      const favorites = wx.getStorageSync('favorites') || []
      cloudImageResolver.resolve({
        items: recommend.getItemsByIds(favorites).map((item) => drinkView.resultCard(item))
      }).then((resolved) => {
        this.setData(resolved)
      })
    })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onGoHome() {
    wx.switchTab({ url: '/pages/home/home' })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '把喜欢的调酒配方收藏起来，下次直接照做',
      path: '/pages/home/home',
      imageUrl: share.DEFAULT_IMAGE
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '把喜欢的调酒配方收藏起来，下次直接照做',
      imageUrl: share.DEFAULT_IMAGE
    })
  }
})
