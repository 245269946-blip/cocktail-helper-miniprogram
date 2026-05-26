const data = require('../../utils/data')
const recommend = require('../../utils/recommend')
const contentStore = require('../../utils/contentStore')
const drinkView = require('../../utils/drinkView')

Page({
  data: {
    rawGroups: data.pantryGroups,
    groups: [],
    selected: [],
    result: null,
    sections: []
  },

  onLoad() {
    contentStore.getContent().then((content) => {
      this.setData({ rawGroups: content.pantryGroups }, () => this.updateGroups())
    })
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

  buildSection(key, title, desc, items, actionText) {
    return {
      key,
      desc,
      title,
      items: items.map((item) => Object.assign({}, item, {
        missingText: item.missing && item.missing.length ? item.missing.join('、') : '',
        actionText,
        visualClass: drinkView.visualClass(item)
      }))
    }
  },

  updateGroups() {
    const selected = this.data.selected
    this.setData({
      groups: this.data.rawGroups.map((group) => ({
        title: group.title,
        items: group.items.map((name) => ({
          name,
          active: selected.indexOf(name) >= 0
        }))
      }))
    })
  },

  onClear() {
    this.setData({ selected: [], result: null, sections: [] }, () => this.updateGroups())
  },

  onDetailTap(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
