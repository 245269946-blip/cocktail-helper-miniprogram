const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    bases: data.bases
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      this.setData({ bases: content.bases })
    })
  },

  onBaseTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/base-detail/base-detail?id=${id}` })
  }
})
