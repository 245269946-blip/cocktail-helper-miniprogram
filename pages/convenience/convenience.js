const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const share = require('../../utils/share')

const CONVENIENCE_DRINK_IDS = ['cv-gin-tonic', 'cv-cuba-libre', 'cv-vodka-soda', 'cv-screwdriver']

Page({
  data: {
    allPlaces: ['便利店', '超市', '家里', '宿舍/租房', '聚会前临时采购'],
    allMoods: ['清爽', '甜口', '酸甜', '奶香', '果味', '茶感', '咖啡感', '微醺', '低酒精', '无酒精'],
    places: [],
    moods: [],
    place: '便利店',
    selectedMoods: ['清爽', '微醺'],
    /* 新增: 主推方案 + 更多方案 */
    mainPackage: null,
    moreSchemes: [],
    results: []
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then(() => {
      this.refreshView()
    })
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/home/home' }) })
  },

  onMore() {
    wx.showActionSheet({ itemList: ['刷新方案', '分享给朋友'] })
  },

  showPlacePicker() {
    wx.showActionSheet({
      itemList: this.data.allPlaces,
      success: (res) => {
        this.setData({ place: this.data.allPlaces[res.tapIndex] }, () => this.refreshResults())
      }
    })
  },

  showMoodPicker() {
    wx.showActionSheet({
      itemList: this.data.allMoods,
      success: (res) => {
        const mood = this.data.allMoods[res.tapIndex]
        const selected = this.data.selectedMoods.slice()
        if (selected.includes(mood)) {
          selected.splice(selected.indexOf(mood), 1)
        } else {
          selected.push(mood)
          if (selected.length > 3) selected.shift()
        }
        this.setData({ selectedMoods: selected }, () => this.refreshResults())
      }
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
    if (results.length < 5) {
      const fallback = recommend.filterConvenience(this.data.place, [])
      results = results.concat(fallback.filter((item) => !results.some((exists) => exists.id === item.id)))
    }
    const cardResults = results.map((item, index) => drinkView.packageView(item, index))

    // 构建便利店具体酒品组合包和更多方案
    const packageRecipes = recommend.getItemsByIds(CONVENIENCE_DRINK_IDS)
    const mainPackage = packageRecipes.length ? this.buildConveniencePackage(packageRecipes) : null
    const moreSchemes = cardResults.slice(0, 5).map((item) => this.enrichMiniCard(item))

    this.setData({
      places: this.data.allPlaces.map((label) => ({ label, active: label === this.data.place })),
      moods: this.data.allMoods.map((label) => ({ label, active: this.data.selectedMoods.indexOf(label) >= 0 })),
      results: cardResults,
      mainPackage,
      moreSchemes
    })
  },

  buildConveniencePackage(items) {
    const packageItems = items.slice(0, 4).map((item) => {
      const card = drinkView.resultCard(item)
      return {
        id: item.id,
        name: item.name,
        desc: this.shortPackageDesc(item),
        illustration: card.illustration,
        tags: (item.tags || []).slice(0, 2)
      }
    })
    return {
      name: '711 今晚微醺套餐',
      tags: ['便利店', '具体酒品', '照着买', '今晚能做'],
      desc: '按便利店能买到的小瓶酒和软饮整理成 4 杯具体喝法，先挑一杯买材料；柠檬、薄荷都只是加分项。',
      price: '约 35-80 元',
      ids: packageItems.map((item) => item.id),
      items: packageItems,
      tip: '不爱气泡水就换茶饮、果汁、雪碧或可乐；喜欢什么饮料就先用它把风味做顺。'
    }
  },

  shortPackageDesc(item) {
    if (!item) return '照着买'
    if (item.id === 'cv-gin-tonic') return '清爽入门'
    if (item.id === 'cv-cuba-libre') return '甜口聚会'
    if (item.id === 'cv-vodka-soda') return '低糖清爽'
    if (item.id === 'cv-screwdriver') return '果汁好入口'
    return ((item.tags || [])[1]) || '今晚能做'
  },

  enrichMiniCard(item) {
    return Object.assign({}, item, {
      name: item.name || item.packageTitle,
      desc: item.packageIntro || item.desc || '简单好做'
    })
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onPackageTap() {
    if (!this.data.mainPackage || !this.data.mainPackage.ids.length) return
    wx.navigateTo({
      url: `/pages/results/results?mode=ids&value=${encodeURIComponent(this.data.mainPackage.ids.join(','))}&title=${encodeURIComponent(this.data.mainPackage.name)}`
    })
  },

  shareOptions() {
    const moodText = (this.data.selectedMoods || []).join('、')
    return {
      title: `${this.data.place || '便利店'}微醺怎么配${moodText ? `：${moodText}` : ''}`,
      imageUrl: '/assets/layer2/card-store.png'
    }
  },

  onShareAppMessage() {
    return share.appMessage({
      title: this.shareOptions().title,
      path: '/pages/convenience/convenience',
      imageUrl: this.shareOptions().imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  }
})
