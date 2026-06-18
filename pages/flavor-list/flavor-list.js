const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const share = require('../../utils/share')

Page({
  data: {
    collections: data.flavorCollections
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      this.setData({ collections: content.flavorCollections })
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
      title: '按口味找调酒：甜口、清爽、低酒感都能选',
      path: '/pages/flavor-list/flavor-list',
      imageUrl: share.DEFAULT_IMAGE
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '按口味找调酒：甜口、清爽、低酒感都能选',
      imageUrl: share.DEFAULT_IMAGE
    })
  }
})
