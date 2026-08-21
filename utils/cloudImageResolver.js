const memoryCache = {}

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
  if (isCloudUrl(value)) return memoryCache[value] || value
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
          }
        })
        resolve()
      },
      fail() {
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
  isCloudUrl
}
