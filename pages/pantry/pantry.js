const data = require('../../utils/data')
const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')
const share = require('../../utils/share')

Page({
  data: {
    rawGroups: data.pantryGroups,
    groups: [],
    query: '',
    selected: [],
    result: null,
    sections: [],
    queryCards: [],
    starterCards: []
  },

  onLoad() {
    share.enableShareMenu()
    contentStore.getContent().then((content) => {
      this.setData({
        rawGroups: content.pantryGroups,
        starterCards: this.buildStarterCards([
          'gin-tonic',
          'cuba-libre',
          'whisky-highball',
          'vodka-orange',
          'mojito',
          'paloma',
          'moscow-mule',
          'white-russian',
          'aperol-spritz',
          'bees-knees'
        ])
      }, () => this.updateGroups())
    })
  },

  onInput(event) {
    const query = event.detail.value || ''
    this.setData({
      query,
      queryCards: this.buildQueryCards(query)
    }, () => this.updateGroups())
  },

  onToggle(event) {
    const value = event.currentTarget.dataset.value
    const selected = this.data.selected.slice()
    const index = selected.indexOf(value)
    if (index >= 0) {
      selected.splice(index, 1)
    } else {
      selected.push(value)
    }
    this.setData({ selected }, () => {
      this.updateGroups()
      this.refresh()
    })
  },

  refresh() {
    const result = recommend.pantryRecommend(this.data.selected)
    this.setData({
      result,
      sections: [
        this.buildSection('ready', 'A. 现在直接能做', '不用补货，今晚聚会直接能用。', result.ready, '直接做'),
        this.buildSection('missingOne', 'B. 只差 1 样', '补上这一样就能立刻开始。', result.missingOne, '补 1 样'),
        this.buildSection('convenienceFill', 'C. 去便利店补一下', '顺手下楼买一下，5 分钟能齐。', result.convenienceFill, '马上补'),
        this.buildSection('upgrade', 'D. 升级版更好喝', '多补一点材料，口感会明显更完整。', result.upgrade, '升级口感')
      ]
    })
  },

  buildStarterCards(ids) {
    return recommend.getItemsByIds(ids).map((item) => Object.assign({}, drinkView.resultCard(item), {
      actionText: '先看看'
    }))
  },

  buildQueryCards(query) {
    const key = (query || '').trim()
    if (!key) return []
    return recommend.search(key).slice(0, 4).map((item) => Object.assign({}, drinkView.resultCard(item), {
      actionText: '相关配方'
    }))
  },

  buildSection(key, title, desc, items, actionText) {
    return {
      key,
      desc,
      title,
      items: items.map((item) => Object.assign({}, item, {
        missingText: item.missing && item.missing.length ? item.missing.join('、') : '',
        actionText,
        visualClass: drinkView.visualClass(item),
        illustration: drinkView.resultCard(item).illustration
      }))
    }
  },

  updateGroups() {
    const selected = this.data.selected
    const key = (this.data.query || '').trim().toLowerCase()
    this.setData({
      groups: this.data.rawGroups.map((group) => ({
        title: group.title,
        items: group.items
          .filter((name) => {
            if (!key) return true
            return name.toLowerCase().includes(key) || key.includes(name.toLowerCase())
          })
          .map((name) => ({
            name,
            active: selected.indexOf(name) >= 0
          }))
      })).filter((group) => group.items.length)
    })
  },

  onClear() {
    this.setData({ selected: [], result: null, sections: [] }, () => this.updateGroups())
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  shareOptions() {
    const selectedText = (this.data.selected || []).slice(0, 3).join('、')
    return {
      title: selectedText ? `家里有${selectedText}，能调什么？` : '选家里现有材料，看看今晚能调什么',
      imageUrl: '/assets/layer2/card-pantry.png'
    }
  },

  onShareAppMessage() {
    return share.appMessage({
      title: this.shareOptions().title,
      path: '/pages/pantry/pantry',
      imageUrl: this.shareOptions().imageUrl
    })
  },

  onShareTimeline() {
    return share.timeline(this.shareOptions())
  }
})
