const ingredientSlugs = {
  可乐: 'cola',
  雪碧: 'sprite',
  气泡水: 'soda-water',
  汤力水: 'tonic-water',
  橙汁: 'orange-juice',
  葡萄柚汁: 'grapefruit-juice',
  苹果汁: 'apple-juice',
  乌龙茶: 'oolong',
  柠檬茶: 'lemon-tea',
  绿茶: 'green-tea',
  冷萃咖啡: 'cold-brew',
  浓缩咖啡: 'espresso',
  咖啡: 'coffee',
  茶: 'tea',
  牛奶: 'milk',
  椰奶: 'coconut-milk',
  柠檬: 'lemon',
  青柠: 'lime',
  橙子: 'orange',
  薄荷: 'mint',
  冰块: 'ice',
  糖: 'sugar',
  盐: 'salt',
  蜂蜜: 'honey'
}

function drinkPath(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId && itemOrId.id
  return id ? `/assets/illustrations/drinks/${id}.png` : ''
}

function basePath(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId && itemOrId.id
  return id ? `/assets/illustrations/bases/${id}.png` : ''
}

function ingredientPath(nameOrItem) {
  const name = typeof nameOrItem === 'string' ? nameOrItem : (nameOrItem && (nameOrItem.name || nameOrItem.id))
  const slug = ingredientSlugs[name] || name
  return slug ? `/assets/illustrations/ingredients/${slug}.png` : ''
}

function decorateDrink(item) {
  return Object.assign({}, item, { illustration: drinkPath(item) })
}

function decorateBase(item) {
  return Object.assign({}, item, { illustration: basePath(item) })
}

function decorateIngredient(item) {
  return Object.assign({}, item, { illustration: ingredientPath(item) })
}

function ingredientChoice(name) {
  return { name, illustration: ingredientPath(name) }
}

function ingredientGroups(groups) {
  return (groups || []).map((group) => ({
    title: group.title,
    items: (group.items || []).map(ingredientChoice)
  }))
}

module.exports = {
  drinkPath,
  basePath,
  ingredientPath,
  decorateDrink,
  decorateBase,
  decorateIngredient,
  ingredientChoice,
  ingredientGroups
}
