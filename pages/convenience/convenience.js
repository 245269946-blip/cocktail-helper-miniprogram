const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    allPlaces: ['便利店', '超市', '家里', '宿舍/租房', '聚会前临时采购'],
    allMoods: ['清爽', '甜口', '酸甜', '奶香', '果味', '茶感', '咖啡感', '微醺', '低酒精', '无酒精'],
    places: [],
    moods: [],
    place: '便利店',
    selectedMoods: ['清爽'],
    results: []
  },

  onLoad() {
    contentStore.getContent().then(() => {
      this.refreshView()
    })
  },

  onPlaceTap(event) {
    this.setData({ place: event.currentTarget.dataset.value }, () => this.refreshResults())
  },

  onMoodTap(event) {
    const value = event.currentTarget.dataset.value
    const selected = this.data.selectedMoods.slice()
    const index = selected.indexOf(value)
    if (index >= 0) {
      selected.splice(index, 1)
    } else {
      selected.push(value)
    }
    this.setData({ selectedMoods: selected }, () => this.refreshResults())
  },

  refreshView() {
    this.setData({
      places: this.data.allPlaces.map((label) => ({ label, active: label === this.data.place })),
      moods: this.data.allMoods.map((label) => ({ label, active: this.data.selectedMoods.indexOf(label) >= 0 }))
    })
    this.refreshResults()
  },

  refreshResults() {
    let results = recommend.filterConvenience(this.data.place, this.data.selectedMoods)
    if (!results.length) results = recommend.filterConvenience(this.data.place, [])
    this.setData({
      places: this.data.allPlaces.map((label) => ({ label, active: label === this.data.place })),
      moods: this.data.allMoods.map((label) => ({ label, active: this.data.selectedMoods.indexOf(label) >= 0 })),
      results: results.map((item, index) => drinkView.packageView(item, index))
    })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
