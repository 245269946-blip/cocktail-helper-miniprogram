const CLOUD_IMAGE_BASE = ''
const CLOUD_IMAGE_VERSION = 'v1.0.5'

function cleanBase(base) {
  return String(base || '').trim().replace(/\/+$/, '')
}

function joinRemote(base, path) {
  const root = cleanBase(base)
  if (!root) return ''
  if (root.startsWith('cloud://')) return `${root}/${path}`
  return `${root}/${path}`
}

function withRemote(path, fallback) {
  const remote = joinRemote(CLOUD_IMAGE_BASE, path)
  return remote || fallback
}

function drinkImage(slug, variant, fallback) {
  const safeSlug = String(slug || '').trim()
  const safeVariant = String(variant || 'card').trim()
  if (!safeSlug) return fallback
  return withRemote(`cocktail-images/${CLOUD_IMAGE_VERSION}/p2/recipe-${safeSlug}-${safeVariant}.jpg`, fallback)
}

function drinkVisual(slug, fallback) {
  return {
    card: drinkImage(slug, 'card', fallback.card),
    hero: drinkImage(slug, 'card', fallback.hero || fallback.card),
    thumb: drinkImage(slug, 'card', fallback.thumb || fallback.card)
  }
}

function featureImage(slug, fallback) {
  return drinkImage(slug, 'feature', fallback)
}

module.exports = {
  CLOUD_IMAGE_BASE,
  CLOUD_IMAGE_VERSION,
  drinkImage,
  drinkVisual,
  featureImage
}
