const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const illustrations = require('../../utils/illustrations')
const drinkView = require('../../utils/drinkView')
const share = require('../../utils/share')

Page({
  data: {
    base: null,
    /* 新增字段 */
    searchTabs: [],
    mainRecipe: null,
    quickFilters: [],
    pairingItems: [],
    pairingPool: [],
    pairingOffset: 0,
    sections: []
  },

  onLoad(options) {
    share.enableShareMenu()
    contentStore.getContent().then(() => this.loadBase(options))
  },

  loadBase(options) {
    const base = recommend.findBase(options.id)
    if (!base) return

    const sectionMeta = [
      { key: 'first', title: '第一杯推荐' },
      { key: 'beginner', title: '新手推荐' },
      { key: 'convenience', title: '便利店方案' },
      { key: 'lowAlcohol', title: '低酒感方案' },
      { key: 'classic', title: '基础经典款' },
      { key: 'sweet', title: '甜口版' },
      { key: 'fresh', title: '清爽版' },
      { key: 'friendly', title: '女生更容易接受版' },
      { key: 'advanced', title: '进阶版' }
    ]

    const sections = sectionMeta.map((meta) => ({
      title: meta.title,
      items: recommend.getItemsByIds(base.recipes[meta.key] || []).map((item) => drinkView.resultCard(item))
    }))

    // 构建 Tab 搜索栏
    const searchTabs = this.buildSearchTabs(base)

    // 构建主推荐
    const firstRecipes = recommend.getItemsByIds(base.recipes.first || base.recipes.classic || [])
    const mainRecipe = firstRecipes[0] ? this.enrichMainRecipe(firstRecipes[0]) : null

    // 构建快捷筛选
    const quickFilters = this.buildQuickFilters(base)

    // 构建搭配列表
    const allSectionItems = []
    sections.forEach((section) => {
      ;(section.items || []).forEach((item) => {
        if (item && !allSectionItems.some((exists) => exists.id === item.id)) allSectionItems.push(item)
      })
    })
    const pairingItems = allSectionItems.slice(0, 6).map((item) => this.enrichPairingItem(item))

    wx.setNavigationBarTitle({ title: base.name + '喝法' })
    this.setData({
      base: illustrations.decorateBase(base),
      sections,
      searchTabs,
      mainRecipe,
      quickFilters,
      pairingItems,
      pairingPool: allSectionItems,
      pairingOffset: 0
    })
  },

  buildSearchTabs(base) {
    const first = recommend.getItemsByIds((base.recipes && (base.recipes.first || base.recipes.classic)) || [])
    const firstName = first[0] ? first[0].name : base.name
    return [
      { label: `${firstName}怎么做`, active: true, keyword: firstName },
      { label: `${base.name}加什么好喝`, active: false, keyword: `${base.name}怎么喝` },
      { label: `${base.name}新手推荐`, active: false, keyword: `新手${base.name}` },
      { label: `${base.name}完整酒单`, active: false, keyword: base.name }
    ]
  },

  enrichMainRecipe(item) {
    const card = drinkView.resultCard(item)
    return Object.assign({}, card, {
      nameEn: item.enName || item.nameEn || '',
      tags: item.tags || ['经典', '气泡感', '慵感', '低门槛'],
      desc: item.desc || item.reason || card.entryLine || '经典不踩雷，入口顺滑，最容易上手的喝法。',
      illustration: illustrations.drinkPath(item, 'hero'),
      speechBubble: item.speechBubble || this.speechBubbleFor(item)
    })
  },

  speechBubbleFor(item) {
    const tags = item.tags || []
    if (tags.includes('清爽')) return '冰和柑橘\n把入口打开'
    if (tags.includes('苦甜')) return '苦甜收尾\n更有层次'
    if (tags.includes('咖啡感')) return '咖啡香\n撑住夜晚'
    if (tags.includes('热带')) return '热带果香\n更适合分享'
    if (tags.includes('经典')) return '经典比例\n先从这杯'
    return '从这杯开始\n更不容易错'
  },

  buildQuickFilters(base) {
    const bName = base.name
    return [
      { label: '更清爽', desc: '少甜更清爽的喝法', keyword: bName + '清爽' },
      { label: '便利店可做', desc: '现在就能买到材料', keyword: '便利店' },
      { label: '更低酒感', desc: '轻松微醺不上头', keyword: '低酒感' },
      { label: '完整酒单', desc: '更多' + bName + '喝法', keyword: bName }
    ]
  },

  enrichPairingItem(item) {
    return Object.assign({}, item, {
      nameEn: item.nameEn || '',
      tags: item.tags || ['清爽'],
      desc: item.desc || item.entryLine || ''
    })
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/home/home' }) })
  },

  onMore() {
    wx.showActionSheet({ itemList: ['收藏基酒', '分享给朋友'] })
  },

  onTabTap(e) {
    const idx = e.currentTarget.dataset.index
    const tabs = this.data.searchTabs.map((t, i) => ({ ...t, active: i === idx }))
    this.setData({ searchTabs: tabs })
    const keyword = tabs[idx] && tabs[idx].keyword
    if (keyword) {
      wx.navigateTo({
        url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
      })
    }
  },

  onQuickFilter(e) {
    const keyword = e.currentTarget.dataset.keyword
    if (keyword) {
      wx.navigateTo({
        url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
      })
    }
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onRefreshPairings() {
    const pool = this.data.pairingPool || []
    if (pool.length <= 6) {
      wx.showToast({ title: '已是全部搭配', icon: 'none' })
      return
    }
    const nextOffset = (this.data.pairingOffset + 3) % pool.length
    const nextItems = pool.slice(nextOffset).concat(pool.slice(0, nextOffset)).slice(0, 6)
    this.setData({
      pairingItems: nextItems.map((item) => this.enrichPairingItem(item)),
      pairingOffset: nextOffset
    })
  },

  shareOptions() {
    const base = this.data.base || {}
    return {
      title: base.name ? `${base.name}可以这样喝｜调酒助手` : '按基酒找喝法｜调酒助手',
      query: { id: base.id },
      imageUrl: base.illustration || '/assets/layer2/card-base.png'
    }
  },

  onShareAppMessage() {
    const options = this.shareOptions()
    return share.appMessage({
      title: options.title,
      path: '/pages/base-detail/base-detail',
      query: options.query,
      imageUrl: options.imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  }
})
