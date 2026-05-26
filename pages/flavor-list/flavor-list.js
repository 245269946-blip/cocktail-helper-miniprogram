const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    collections: data.flavorCollections
  },

  onLoad() {
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
  }
})
