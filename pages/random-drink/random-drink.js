const contentStore = require('../../utils/contentStore')
const randomDrink = require('../../utils/randomDrink')
const cloudImageResolver = require('../../utils/cloudImageResolver')
const share = require('../../utils/share')

Page({
  data: {
    pick: null,
    fromShare: false
  },

  onLoad(options) {
    share.enableShareMenu()
    contentStore.getContent().then(() => {
      const pick = randomDrink.buildPick({ id: options.id })
      if (!pick) return
      wx.setNavigationBarTitle({ title: '随机来一杯' })
      cloudImageResolver.resolve({
        pick,
        fromShare: !!options.id
      }).then((resolved) => {
        this.setData(resolved)
      })
    })
  },

  onDetailTap() {
    if (!this.data.pick) return
    wx.navigateTo({ url: `/pages/detail/detail?id=${this.data.pick.id}` })
  },

  onDrawMine() {
    const pick = randomDrink.buildPick()
    if (!pick) return
    cloudImageResolver.resolve({ pick, fromShare: false }).then((resolved) => {
      this.setData(resolved)
    })
  },

  shareOptions() {
    const pick = this.data.pick || {}
    const detail = pick.detail || {}
    return {
      title: pick.shareTitle || '随机来一杯｜调酒助手',
      query: { id: pick.id },
      imageUrl: detail.thumbnail || detail.illustration || share.DEFAULT_IMAGE
    }
  },

  onShareAppMessage() {
    const options = this.shareOptions()
    return share.appMessage({
      title: options.title,
      path: '/pages/random-drink/random-drink',
      query: options.query,
      imageUrl: options.imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  }
})
