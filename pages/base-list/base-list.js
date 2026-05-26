const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')

Page({
  data: {
    bases: data.bases.map((item) => illustrations.decorateBase(item))
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      this.setData({ bases: content.bases.map((item) => illustrations.decorateBase(item)) })
    })
  },

  onBaseTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/base-detail/base-detail?id=${id}` })
  }
})
