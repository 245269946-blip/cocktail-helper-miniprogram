const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const share = require('../../utils/share')

Page({
  data: {
    collections: data.sceneCollections
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      this.setData({ collections: content.sceneCollections })
    })
  },

  onTap(event) {
    const value = event.currentTarget.dataset.value
    const title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/results/results?mode=tag&value=${encodeURIComponent(value)}&title=${encodeURIComponent(title)}`
    })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '按场景找调酒：聚会、夏夜、新手第一杯',
      path: '/pages/scene-list/scene-list',
      imageUrl: '/assets/scenes/scene-header.png'
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '按场景找调酒：聚会、夏夜、新手第一杯',
      imageUrl: '/assets/scenes/scene-header.png'
    })
  }
})
