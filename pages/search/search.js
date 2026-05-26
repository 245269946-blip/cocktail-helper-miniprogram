const data = require('../../utils/data')
const contentStore = require('../../utils/contentStore')

Page({
  data: {
    keyword: '',
    hotKeywords: data.hotKeywords,
    suggestionGroups: []
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      this.setData({
        hotKeywords: content.hotKeywords,
        suggestionGroups: this.buildSuggestionGroups('')
      })
    })
  },

  onInput(event) {
    const keyword = event.detail.value
    this.setData({
      keyword,
      suggestionGroups: this.buildSuggestionGroups(keyword)
    })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  onKeywordTap(event) {
    const keyword = event.currentTarget.dataset.keyword
    wx.navigateTo({
      url: `/pages/results/results?mode=search&value=${encodeURIComponent(keyword)}&title=${encodeURIComponent(keyword)}`
    })
  },

  buildSuggestionGroups(keyword) {
    const key = (keyword || '').trim()
    if (!key) {
      return [
        { title: '精准匹配', items: ['金汤力', '百利甜牛奶', '莫吉托'] },
        { title: '条件搜索', items: ['便利店能做的金酒', '不苦的金酒', '新手金酒'] },
        { title: '场景延展', items: ['下班微醺', '夏天清爽', '女生聚会'] }
      ]
    }
    return [
      { title: '精准匹配', items: [`${key}汤力`, `${key}苏打`, `${key}菲士`] },
      { title: '条件搜索', items: [`便利店能做的${key}`, `不苦的${key}`, `新手${key}`] },
      { title: '场景延展', items: ['下班微醺', '夏天清爽', '女生聚会'] }
    ]
  }
})
