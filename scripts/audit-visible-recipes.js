const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const recipes = JSON.parse(fs.readFileSync(path.join(root, 'cloud-data', 'recipes.json'), 'utf8'))
const illustrations = require(path.join(root, 'utils', 'illustrations'))

const visible = recipes.filter((item) => item && !item.hidden)
const byId = new Map(recipes.map((item) => [item.id, item]))
const cloudDir = path.join(root, '_cloud_upload', 'cocktail-images', 'v1.0.5', 'p2')
const expectedPrefix = 'cloud://cloud1-d0gsasl6gcb3f22c5.636c-cloud1-d0gsasl6gcb3f22c5-1472356778/v1.0.5/p2/'
const requiredFlavor = ['sweet', 'sour', 'alcohol', 'fresh', 'difficulty']
const issues = []

function add(id, issue) {
  issues.push({ id, issue })
}

function existsCloud(url) {
  if (!url || !url.startsWith(expectedPrefix)) return false
  return fs.existsSync(path.join(cloudDir, url.slice(expectedPrefix.length)))
}

for (const item of visible) {
  const id = item.id
  if (!id) add(id, 'missing id')
  if (!item.name) add(id, 'missing name')
  if (!item.enName) add(id, 'missing enName')
  if (!item.base) add(id, 'missing base')
  if (!Array.isArray(item.aliases) || item.aliases.length < 1) add(id, 'aliases empty')
  if (!Array.isArray(item.tags) || item.tags.length < 3) add(id, 'tags less than 3')
  if (!item.reason || item.reason.length < 8) add(id, 'reason too short')
  if (!item.flavor) {
    add(id, 'missing flavor')
  } else {
    requiredFlavor.forEach((key) => {
      if (typeof item.flavor[key] !== 'number') add(id, `missing flavor.${key}`)
    })
  }
  ;['standard', 'convenience', 'simple'].forEach((key) => {
    if (!item.materials || !Array.isArray(item.materials[key]) || item.materials[key].length < 2) {
      add(id, `materials.${key} incomplete`)
    }
  })
  if (!Array.isArray(item.steps) || item.steps.length < 3) add(id, 'steps less than 3')
  if (!Array.isArray(item.scenes) || item.scenes.length < 2) add(id, 'scenes less than 2')
  if (!Array.isArray(item.substitutes) || item.substitutes.length < 2) add(id, 'substitutes less than 2')
  ;(item.similar || []).forEach((sim) => {
    if (!byId.has(sim)) add(id, `similar missing target ${sim}`)
  })

  const card = illustrations.drinkPath(item, 'card')
  const feature = illustrations.featurePath(item)
  if (!card.startsWith(expectedPrefix)) add(id, `card not cloud ${card}`)
  if (!feature.startsWith(expectedPrefix)) add(id, `feature not cloud ${feature}`)
  if (!existsCloud(card)) add(id, `card cloud output missing ${card}`)
  if (!existsCloud(feature)) add(id, `feature cloud output missing ${feature}`)
}

const cloudFiles = fs.readdirSync(cloudDir).filter((name) => /-(card|feature)\.jpg$/.test(name))
const result = {
  visibleRecipes: visible.length,
  cloudImageFiles: cloudFiles.length,
  issues
}

console.log(JSON.stringify(result, null, 2))
if (issues.length) process.exit(1)
