const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    title: '推荐结果',
    subtitle: '',
    results: [],
    exploreOptions: [
      { title: '猜你喜欢', desc: '更像奶茶一点', value: '奶香' },
      { title: '类似风味', desc: '甜口但不腻', value: '甜口' },
      { title: '同样少材料', desc: '只买 2 样就能做', value: '低门槛' },
      { title: '便利店可替代', desc: '5 分钟买齐', value: '便利店' }
    ]
  },

  onLoad(options) {
    contentStore.getContent().then(() => this.loadResults(options))
  },

  loadResults(options) {
    const mode = options.mode || 'tag'
    const value = decodeURIComponent(options.value || '')
    const title = decodeURIComponent(options.title || value || '推荐结果')
    let results = []
    let subtitle = ''

    if (mode === 'search') {
      results = recommend.search(value)
      subtitle = results.length ? '先帮你判断哪杯更适合现在喝。' : '暂时没有精确匹配，可以换成材料、基酒或风味试试。'
    } else if (mode === 'tag') {
      results = recommend.filterByTag(value)
      subtitle = `按“${value}”整理出的今晚可选方案。`
    } else if (mode === 'ids') {
      results = recommend.getItemsByIds(value.split(','))
      subtitle = '根据你的选择生成的推荐。'
    }

    wx.setNavigationBarTitle({ title })
    this.setData({ title, subtitle, results: results.map((item) => drinkView.resultCard(item)) })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onSearchAgain() {
    wx.switchTab({ url: '/pages/search/search' })
  },

  onExploreTap(event) {
    const value = event.currentTarget.dataset.value
    const title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/results/results?mode=tag&value=${encodeURIComponent(value)}&title=${encodeURIComponent(title)}`
    })
  }
})
