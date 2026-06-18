const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const share = require('../../utils/share')

Page({
  data: {
    level: '可以有一点',
    flavor: '清爽',
    buy: '便利店',
    levelOptions: [],
    flavorOptions: [],
    buyOptions: [],
    results: []
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then(() => {
      this.refresh()
    })
  },

  onOptionTap(event) {
    const group = event.currentTarget.dataset.group
    const value = event.currentTarget.dataset.value
    this.setData({ [group]: value }, () => this.refresh())
  },

  refresh() {
    const levelRaw = ['几乎不要酒味', '可以有一点', '想明显微醺', '想要酒感强一点']
    const flavorRaw = ['甜口', '酸甜', '清爽', '奶香', '果味', '茶感', '咖啡感', '苦甜']
    const buyRaw = ['家里现有', '便利店', '超市', '外卖/电商']
    let results = recommend.beginnerRecommend(this.data.level, this.data.flavor, this.data.buy)
    if (!results.length) {
      results = recommend.beginnerRecommend(this.data.level, '', this.data.buy)
    }
    this.setData({
      levelOptions: levelRaw.map((label) => ({ label, active: label === this.data.level })),
      flavorOptions: flavorRaw.map((label) => ({ label, active: label === this.data.flavor })),
      buyOptions: buyRaw.map((label) => ({ label, active: label === this.data.buy })),
      results: results.map((item) => drinkView.resultCard(item))
    })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  shareOptions() {
    return {
      title: `新手调酒：${this.data.flavor}、${this.data.level}、${this.data.buy}可做`,
      imageUrl: '/assets/layer2/header-cocktail.png'
    }
  },

  onShareAppMessage() {
    return share.appMessage({
      title: this.shareOptions().title,
      path: '/pages/beginner/beginner',
      imageUrl: this.shareOptions().imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  }
})
