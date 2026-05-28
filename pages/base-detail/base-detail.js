const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    base: null,
    sections: []
  },

  onLoad(options) {
    contentStore.getContent().then(() => this.loadBase(options))
  },

  loadBase(options) {
    const base = recommend.findBase(options.id)
    if (!base) return

    const sectionMeta = [
      { key: 'first', title: '第一杯推荐' },
      { key: 'beginner', title: '新手推荐' },
      { key: 'convenience', title: '便利店方案' },
      { key: 'lowAlcohol', title: '低酒感方案' },
      { key: 'classic', title: '基础经典款' },
      { key: 'sweet', title: '甜口版' },
      { key: 'fresh', title: '清爽版' },
      { key: 'friendly', title: '女生更容易接受版' },
      { key: 'advanced', title: '进阶版' }
    ]

    const sections = sectionMeta.map((meta) => ({
      title: meta.title,
      items: recommend.getItemsByIds(base.recipes[meta.key] || []).map((item) => drinkView.resultCard(item))
    }))

    wx.setNavigationBarTitle({ title: base.name })
    this.setData({ base: illustrations.decorateBase(base), sections })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
