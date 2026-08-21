const memoryCache = {}
const LOCAL_FEATURE_SLUGS = {
  'gin-tonic': true,
  'whiskey-sour': true,
  'mojito': true,
  'cuba-libre': true,
  'white-russian': true
}

function isCloudUrl(value) {
  return typeof value === 'string' && value.indexOf('cloud://') === 0
}

function collectCloudUrls(value, urls) {
  if (!value) return
  if (isCloudUrl(value)) {
    urls.add(value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectCloudUrls(item, urls))
    return
  }
  if (typeof value === 'object') {
    Object.keys(value).forEach((key) => collectCloudUrls(value[key], urls))
  }
}

function replaceCloudUrls(value) {
  if (!value) return value
  if (isCloudUrl(value)) return memoryCache[value] || fallbackForCloudUrl(value)
  if (Array.isArray(value)) return value.map(replaceCloudUrls)
  if (typeof value === 'object') {
    const next = Object.assign({}, value)
    Object.keys(next).forEach((key) => {
      next[key] = replaceCloudUrls(next[key])
    })
    return next
  }
  return value
}

function fallbackForCloudUrl(value) {
  const fileName = String(value || '').split('/').pop()
  const match = /^recipe-(.+)-(card|feature)\.jpg$/.exec(fileName)
  if (!match) return value

  const slug = match[1]
  const variant = match[2]
  if (variant === 'feature' && LOCAL_FEATURE_SLUGS[slug]) {
    return `/assets/p2/${fileName}`
  }
  return `/assets/p2/recipe-${slug}-card.jpg`
}

function chunk(list, size) {
  const chunks = []
  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size))
  }
  return chunks
}

function resolveChunk(fileList) {
  return new Promise((resolve) => {
    if (typeof wx === 'undefined' || !wx.cloud || !wx.cloud.getTempFileURL) {
      resolve()
      return
    }
    wx.cloud.getTempFileURL({
      fileList,
      success(res) {
        ;(res.fileList || []).forEach((item) => {
          if (item && item.fileID && item.tempFileURL) {
            memoryCache[item.fileID] = item.tempFileURL
          } else if (item && item.fileID && typeof console !== 'undefined' && console.warn) {
            console.warn('[cloud-image] temp url unavailable', item.fileID, item.status, item.errMsg)
          }
        })
        resolve()
      },
      fail(err) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[cloud-image] getTempFileURL failed', err && err.errMsg ? err.errMsg : err)
        }
        resolve()
      }
    })
  })
}

function resolve(value) {
  const urls = new Set()
  collectCloudUrls(value, urls)
  const pending = Array.from(urls).filter((url) => !memoryCache[url])
  if (!pending.length) return Promise.resolve(replaceCloudUrls(value))
  return Promise.all(chunk(pending, 50).map(resolveChunk)).then(() => replaceCloudUrls(value))
}

module.exports = {
  resolve,
  isCloudUrl,
  fallbackForCloudUrl
}
