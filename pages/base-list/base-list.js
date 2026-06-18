const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')
const share = require('../../utils/share')

Page({
  data: {
    bases: data.bases.map((item) => illustrations.decorateBase(item))
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      this.setData({ bases: content.bases.map((item) => illustrations.decorateBase(item)) })
    })
  },

  onBaseTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/base-detail/base-detail?id=${id}` })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '按基酒找喝法，家里有什么酒就从什么开始',
      path: '/pages/base-list/base-list',
      imageUrl: '/assets/layer2/card-base.png'
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '按基酒找喝法，家里有什么酒就从什么开始',
      imageUrl: '/assets/layer2/card-base.png'
    })
  }
})
