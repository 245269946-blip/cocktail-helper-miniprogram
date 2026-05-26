const fs = require('fs')
const path = require('path')
const data = require('../utils/data')

const outputDir = path.join(__dirname, '..', 'cloud-data')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

function writeJson(name, value) {
  fs.writeFileSync(
    path.join(outputDir, `${name}.json`),
    JSON.stringify(value, null, 2),
    'utf8'
  )
}

writeJson('recipes', data.recipes)
writeJson('schemes', data.schemes)
writeJson('bases', data.bases)
writeJson('ingredients', data.ingredients)
writeJson('appContent', {
  _id: 'main',
  hotKeywords: data.hotKeywords,
  quickEntries: data.quickEntries,
  homeCards: data.homeCards,
  ingredientCategories: data.ingredientCategories,
  pantryGroups: data.pantryGroups,
  flavorCollections: data.flavorCollections,
  sceneCollections: data.sceneCollections
})

console.log(`Cloud data exported to ${outputDir}`)
