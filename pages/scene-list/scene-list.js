const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    collections: data.sceneCollections
  },

  onLoad() {
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
  }
})
