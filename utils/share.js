const DEFAULT_TITLE = '调酒助手'
const DEFAULT_PATH = '/pages/home/home'
const DEFAULT_IMAGE = '/assets/p2/base-gin-tonic-result.png'

function encodeQuery(params) {
  return Object.keys(params || {})
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&')
}

function withQuery(path, params) {
  const query = encodeQuery(params)
  return query ? `${path}?${query}` : path
}

function enableShareMenu() {
  if (!wx.showShareMenu) return
  wx.showShareMenu({
    menus: ['shareAppMessage', 'shareTimeline']
  })
}

function appMessage(options = {}) {
  return {
    title: options.title || DEFAULT_TITLE,
    path: withQuery(options.path || DEFAULT_PATH, options.query || options.params),
    imageUrl: options.imageUrl || DEFAULT_IMAGE
  }
}

function timeline(options = {}) {
  return {
    title: options.title || DEFAULT_TITLE,
    query: typeof options.query === 'string' ? options.query : encodeQuery(options.query || options.params),
    imageUrl: options.imageUrl || DEFAULT_IMAGE
  }
}

module.exports = {
  DEFAULT_TITLE,
  DEFAULT_PATH,
  DEFAULT_IMAGE,
  encodeQuery,
  withQuery,
  enableShareMenu,
  appMessage,
  timeline
}
