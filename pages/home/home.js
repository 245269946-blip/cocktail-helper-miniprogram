const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')
const share = require('../../utils/share')
const randomDrink = require('../../utils/randomDrink')

Page({
  data: {
    showSplash: true,
    keyword: '',
    isFocused: false,
    hotKeywords: ['金酒兑什么', '威士忌酸', '白俄罗斯', '可乐桶', '帕洛玛', '清爽气泡', '甜口', '新手第一杯'],
    recentSearches: [],
    demandTags: [
      { label: '金汤力', keyword: '金汤力', desc: '经典 / 清爽' },
      { label: '便利店调酒', keyword: '便利店调酒', desc: '下楼买 / 马上兑' },
      { label: '低酒感', keyword: '低酒感', desc: '轻微醺 / 好入口' }
    ],
    featuredRecipes: [
      { id: 'gin-tonic', name: '金汤力', image: illustrations.drinkPath('gin-tonic', 'card'), demand: '想喝清爽经典', reason: '冰块、青柠和汤力水，第一杯不容易错。', tags: ['清爽', '经典', '新手'] },
      { id: 'whiskey-sour', name: '威士忌酸', image: illustrations.drinkPath('whiskey-sour', 'card'), demand: '想喝经典酸甜', reason: '厚泡沫、柠檬和威士忌，像在家做一杯正式鸡尾酒。', tags: ['酸甜', '泡沫感', '经典'] },
      { id: 'mojito', name: '莫吉托', image: illustrations.drinkPath('mojito', 'card'), demand: '想喝薄荷气泡', reason: '青柠、薄荷和气泡水，适合夏天和新手。', tags: ['薄荷', '气泡感', '低门槛'] },
      { id: 'cuba-libre', name: '自由古巴', image: illustrations.drinkPath('cuba-libre', 'card'), demand: '想喝可乐朗姆', reason: '朗姆、可乐和青柠，经典、直接，也适合朋友局。', tags: ['经典', '可乐', '聚会'] },
      { id: 'white-russian', name: '白俄罗斯', image: illustrations.drinkPath('white-russian', 'card'), demand: '想喝咖啡奶感', reason: '咖啡棕和奶油白融合，适合夜晚放松。', tags: ['咖啡感', '奶香', '顺滑'] }
    ],
    randomPreview: [],
    firstRecipe: {
      id: 'gin-tonic',
      name: '金汤力',
      image: illustrations.drinkPath('gin-tonic', 'card'),
      demand: '今晚第一杯推荐',
      reason: '冰块、青柠和汤力水，清爽、不太甜，第一杯不容易出错。',
      tags: ['清爽', '气泡感', '新手友好']
    },
    toolEntries: [
      {
        title: '家里有什么',
        desc: '选材料，直接看能做哪些酒。',
        tags: ['选材料', '出配方'],
        image: '/assets/layer2/header-cocktail.png',
        theme: 'pantry',
        path: '/pages/pantry/pantry'
      },
      {
        title: '便利店微醺',
        desc: '按便利店能买到的东西配一杯。',
        tags: ['能买齐', '马上调'],
        image: '/assets/layer2/card-pantry.png',
        theme: 'store',
        path: '/pages/convenience/convenience'
      },
      {
        title: '按基酒找',
        desc: '有金酒、伏特加、威士忌？直接看配方。',
        tags: ['按酒找', '看配方'],
        image: '/assets/layer2/card-base.png',
        theme: 'base',
        path: '/pages/base-list/base-list'
      }
    ]
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      const hotKeywords = (content.hotKeywords || []).slice(0, 8)
      this.setData({
        hotKeywords: ['金酒兑什么', '威士忌酸', '白俄罗斯', '可乐桶', '帕洛玛'].concat(hotKeywords).slice(0, 8),
        recentSearches: wx.getStorageSync('recentSearches') || [],
        randomPreview: randomDrink.previewItems()
      })
    })
  },

  /* ====== Layer 1: 启动页交互 ====== */
  onStart() {
    this.setData({ showSplash: false })
  },

  onTapProfile() {
    wx.switchTab({ url: '/pages/collections/collections' })
  },

  onRecipeTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  /* ====== Layer 2: 搜索交互 ====== */
  onInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onFocus() {
    this.setData({ isFocused: true })
  },

  onBlur() {
    this.setData({ isFocused: false })
  },

  onHotTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onDemandTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    if (!keyword) return
    this.saveRecent(keyword)
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  saveRecent(keyword) {
    const next = [keyword].concat(this.data.recentSearches.filter((item) => item !== keyword)).slice(0, 6)
    wx.setStorageSync('recentSearches', next)
    this.setData({ recentSearches: next })
  },

  onNavigate(event) {
    const path = event.currentTarget.dataset.path
    if (!path) return

    if (path === '/pages/search/search' || path === '/pages/home/home' || path === '/pages/collections/collections') {
      wx.switchTab({ url: path })
      return
    }

    wx.navigateTo({ url: path })
  },

  onRandomDrinkTap() {
    wx.navigateTo({ url: '/pages/random-drink/random-drink' })
  },

  onShareAppMessage() {
    return share.appMessage({
      title: '今晚想喝什么，调酒助手帮你配',
      path: '/pages/home/home',
      imageUrl: '/assets/layer1/splash-hero.png'
    })
  },

  onShareTimeline() {
    return share.timeline({
      title: '今晚想喝什么，调酒助手帮你配',
      imageUrl: '/assets/layer1/splash-hero.png'
    })
  }
})
