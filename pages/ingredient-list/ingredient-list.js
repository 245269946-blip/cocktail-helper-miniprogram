const data = require('../../utils/data')
const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')
const share = require('../../utils/share')

Page({
  data: {
    categories: illustrations.ingredientGroups(data.ingredientCategories)
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      this.setData({ categories: illustrations.ingredientGroups(content.ingredientCategories) })
    })
  },

  onIngredientTap(event) {
    const name = event.currentTarget.dataset.name
    const item = recommend.findIngredient(name)
    if (!item) {
      wx.navigateTo({
        url: `/pages/results/results?mode=search&value=${encodeURIComponent(name)}&title=${encodeURIComponent(name)}`
      })
      return
    }
    wx.navigateTo({ url: `/pages/ingredient-detail/ingredient-detail?id=${item.id}` })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '按材料找调酒：可乐、气泡水、咖啡都能搭',
      path: '/pages/ingredient-list/ingredient-list',
      imageUrl: '/assets/layer2/header-cocktail.png'
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '按材料找调酒：可乐、气泡水、咖啡都能搭',
      imageUrl: '/assets/layer2/header-cocktail.png'
    })
  }
})
