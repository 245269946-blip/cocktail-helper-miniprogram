const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')

const lowAlcoholLabels = {
  'cola-lemon-zero': '可乐 + 柠檬 + 冰块',
  'sprite-lemon-zero': '雪碧 + 柠檬 + 冰块',
  'orange-soda-zero': '橙汁 + 气泡水 + 冰块',
  'coffee-tonic-zero': '咖啡 + 汤力水 + 冰块',
  'milk-coffee-zero': '牛奶 + 咖啡 + 冰块',
  'tea-lemon-zero': '茶 + 柠檬 + 冰块',
  'soda-lemon-zero': '气泡水 + 柠檬 + 冰块',
  'grapefruit-soda-zero': '葡萄柚汁 + 气泡水 + 冰块',
  'apple-soda-zero': '苹果汁 + 气泡水 + 冰块'
}

Page({
  data: {
    ingredient: null,
    recipes: [],
    lowAlcohol: []
  },

  onLoad(options) {
    contentStore.getContent().then(() => this.loadIngredient(options))
  },

  loadIngredient(options) {
    const ingredient = recommend.findIngredient(options.id)
    if (!ingredient) return

    const recipes = recommend.getItemsByIds(ingredient.recipes || [])
    const lowAlcohol = (ingredient.lowAlcohol || []).map((id) => lowAlcoholLabels[id] || id)

    wx.setNavigationBarTitle({ title: ingredient.name })
    this.setData({ ingredient, recipes, lowAlcohol })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
