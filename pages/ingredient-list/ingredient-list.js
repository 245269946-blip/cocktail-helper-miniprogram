const data = require('../../utils/data')
const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    categories: data.ingredientCategories
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      this.setData({ categories: content.ingredientCategories })
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
  }
})
