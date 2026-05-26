const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    detail: null,
    scoreRows: [],
    materialSections: [],
    exploreOptions: [],
    similarItems: [],
    isFavorite: false,
    favoriteText: '收藏'
  },

  onLoad(options) {
    contentStore.getContent().then(() => this.loadDetail(options))
  },

  loadDetail(options) {
    const detail = recommend.findDetail(options.id)
    if (!detail) return

    const favorites = wx.getStorageSync('favorites') || []
    const viewDetail = drinkView.detailView(detail)

    const materialSections = [
      { title: '标准版', items: detail.materials.standard || [] },
      { title: '便利店替代版', items: detail.materials.convenience || [] },
      { title: '家里简化版', items: detail.materials.simple || [] }
    ]

    const similarItems = recommend.getItemsByIds(detail.similar || [])
    const isFavorite = favorites.indexOf(detail.id) >= 0

    wx.setNavigationBarTitle({ title: detail.name })
    this.setData({
      detail: viewDetail,
      scoreRows: viewDetail.scoreRows,
      materialSections,
      exploreOptions: viewDetail.exploreOptions,
      similarItems,
      isFavorite,
      favoriteText: isFavorite ? '已收藏' : '收藏'
    })
  },

  onToggleFavorite() {
    const detail = this.data.detail
    if (!detail) return
    const favorites = wx.getStorageSync('favorites') || []
    const index = favorites.indexOf(detail.id)
    let isFavorite = false
    if (index >= 0) {
      favorites.splice(index, 1)
    } else {
      favorites.push(detail.id)
      isFavorite = true
    }
    wx.setStorageSync('favorites', favorites)
    this.setData({
      isFavorite,
      favoriteText: isFavorite ? '已收藏' : '收藏'
    })
  },

  onSimilarTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onExploreTap(event) {
    const value = event.currentTarget.dataset.value
    const title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(value)}&title=${encodeURIComponent(title)}`
    })
  }
})
