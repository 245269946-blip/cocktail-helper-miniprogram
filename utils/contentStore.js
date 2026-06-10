const localData = require('./data')
const recommend = require('./recommend')

const COLLECTIONS = ['recipes', 'schemes', 'bases', 'ingredients']
const SINGLE_DOC_ID = 'main'

// 各集合必填字段，用于云端数据校验
const REQUIRED_FIELDS = {
  recipes: ['id', 'name', 'materials', 'steps', 'tags', 'flavor'],
  schemes: ['id', 'name', 'materials', 'steps', 'tags'],
  bases: ['id', 'name', 'recipes'],
  ingredients: ['id', 'name', 'recipes']
}

let contentCache = null
let loadingPromise = null

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function validateItems(name, items) {
  const required = REQUIRED_FIELDS[name]
  if (!required) return items
  return items.filter((item) => {
    return required.every((field) => item[field] !== undefined && item[field] !== null)
  })
}

function mergeContent(remote) {
  const merged = clone(localData)
  if (!remote) return merged

  COLLECTIONS.forEach((name) => {
    if (remote[name] && remote[name].length) {
      merged[name] = validateItems(name, remote[name])
    }
  })

  const appContent = remote.appContent || {}
  Object.keys(appContent).forEach((key) => {
    if (appContent[key]) merged[key] = appContent[key]
  })

  return merged
}

function canUseCloud() {
  const app = typeof getApp === 'function' ? getApp() : null
  return !!(typeof wx !== 'undefined' && wx.cloud && app && app.globalData && app.globalData.cloudEnabled)
}

function readCollection(db, name) {
  return db.collection(name).limit(100).get().then((res) => {
    return (res.data || []).map((item) => {
      const copy = Object.assign({}, item)
      delete copy._id
      delete copy._openid
      return copy
    })
  })
}

function readAppContent(db) {
  return db.collection('appContent').doc(SINGLE_DOC_ID).get().then((res) => {
    const data = Object.assign({}, res.data || {})
    delete data._id
    delete data._openid
    return data
  }).catch(() => ({}))
}

function readRemoteContent() {
  if (!canUseCloud()) return Promise.resolve(null)

  const db = wx.cloud.database()
  const jobs = COLLECTIONS.map((name) => readCollection(db, name).then((items) => [name, items]).catch(() => [name, []]))
  jobs.push(readAppContent(db).then((appContent) => ['appContent', appContent]))

  return Promise.all(jobs).then((entries) => {
    const remote = {}
    entries.forEach(([key, value]) => {
      remote[key] = value
    })
    const hasRemoteList = COLLECTIONS.some((name) => remote[name] && remote[name].length)
    return hasRemoteList ? remote : null
  })
}

function getContent(options) {
  const opts = options || {}
  if (contentCache && !opts.refresh) return Promise.resolve(contentCache)
  if (loadingPromise && !opts.refresh) return loadingPromise

  loadingPromise = readRemoteContent()
    .then((remote) => {
      contentCache = mergeContent(remote)
      recommend.useContent(contentCache)
      return contentCache
    })
    .catch(() => {
      contentCache = mergeContent(null)
      recommend.useContent(contentCache)
      return contentCache
    })
    .then((content) => {
      loadingPromise = null
      return content
    })

  return loadingPromise
}

function getLocalContent() {
  const content = mergeContent(null)
  recommend.useContent(content)
  return content
}

module.exports = {
  getContent,
  getLocalContent
}
