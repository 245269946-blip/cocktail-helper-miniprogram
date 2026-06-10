const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const visualSystem = require('../../utils/visualSystem')
const drinkProcess = require('../../utils/drinkProcess')

function actionPreviewSteps(detail) {
  const steps = (detail.steps || []).slice(0, 3)
  const icons = ['🧊', '🍶', '🥄']
  if (!steps.length) {
    return [
      { icon: '🧊', text: '加冰' },
      { icon: '🍶', text: '倒酒' },
      { icon: '🥄', text: '混合' }
    ]
  }
  return steps.map((step, index) => {
    const raw = String(step || '')
    let text = raw.replace(/[。.]$/, '').slice(0, 8)
    if (/冰|杯/.test(raw) && index === 0) text = '准备冰杯'
    if (/倒入|加入/.test(raw)) text = index === 0 ? '倒入基酒' : '加入材料'
    if (/补|倒满/.test(raw)) text = '补喜欢的饮料'
    if (/摇|shake/i.test(raw)) text = '摇到冰冷'
    if (/搅/.test(raw)) text = '轻轻搅匀'
    if (/柠檬|薄荷|装饰/.test(raw)) text = '辅料可选'
    if (/滤入|倒入杯/.test(raw)) text = '倒入杯中'
    return { icon: icons[index] || '✓', text }
  })
}

Page({
  data: {
    detail: null,
    themeClass: 'theme-gin',
    scoreRows: [],
    actionPreviewSteps: [],
    processGuide: null,
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
    const processGuide = drinkProcess.getProcess(detail)
    viewDetail.steps = processGuide.steps || viewDetail.steps
    viewDetail.actionLine = processGuide.actionLine || viewDetail.actionLine

    const isConvenienceRecipe = (detail.id || '').indexOf('cv-') === 0
    const materialSections = isConvenienceRecipe
      ? [
        { title: '便利店购买清单', items: detail.materials.convenience || detail.materials.standard || [] },
        { title: '替换思路', items: detail.substitutes || [] }
      ]
      : [
        { title: '标准版', items: detail.materials.standard || [] },
        { title: '便利店替代版', items: detail.materials.convenience || [] },
        { title: '家里简化版', items: detail.materials.simple || [] }
      ]

    const similarItems = recommend.getItemsByIds(detail.similar || [])
    const isFavorite = favorites.indexOf(detail.id) >= 0

    wx.setNavigationBarTitle({ title: detail.name })
    this.setData({
      detail: viewDetail,
      themeClass: visualSystem.themeClass(detail),
      scoreRows: viewDetail.scoreRows,
      actionPreviewSteps: processGuide.quickSteps || actionPreviewSteps(detail),
      processGuide,
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
