const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')

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
      { key: 'classic', title: '最经典配方' },
      { key: 'beginner', title: '新手友好配方' },
      { key: 'convenience', title: '便利店能搭什么' },
      { key: 'sweet', title: '甜口版' },
      { key: 'fresh', title: '清爽版' },
      { key: 'friendly', title: '女生更容易接受版' },
      { key: 'advanced', title: '进阶版' }
    ]

    const sections = sectionMeta.map((meta) => ({
      title: meta.title,
      items: recommend.getItemsByIds(base.recipes[meta.key] || [])
    }))

    wx.setNavigationBarTitle({ title: base.name })
    this.setData({ base, sections })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
