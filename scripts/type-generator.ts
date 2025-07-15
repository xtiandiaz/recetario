import FS from 'fs'
import dataSheet from '../src/assets/json/data-sheet.json'
import inventory from '../src/assets/json/inventory.json'
import catalog from '../src/assets/json/catalog.json'
import '../src/assets/tungsten/extensions/array.extensions'
import { pascalCase } from 'change-case'

type DataSet = [string, string[], string[]?]

const enumTemplate = (name: string, rawKeys: string[], values?: string[]) => {
  return `export const enum ${name} {
${rawKeys.sort().map((k, i) => `  ${pascalCase(k)} = "${values?.[i] ?? k}"`).join(',\n')}
}`
}

const keysTemplate = (...keySets: DataSet[]) => {
  return `/* File automatically generated; DO NOT edit! */

${keySets.sort().map(ks => enumTemplate(ks[0], ks[1], ks[2])).join('\n\n')}
`
}

(async function main() {
  const keysPath = './src/assets/types/'
  
  const consistencyKeys = dataSheet.consistencies.map(c => c.key)
  const densityRawKeys = dataSheet.densities.map(d => d.key)
  const priorities = dataSheet.priorities
  const temperatureEstimateKeys = dataSheet.temperatureEstimates.map(te => te.key)
  const unitRawKeys = dataSheet.units.map(u => u.key)
  const unitKinds = dataSheet.units.map(u => u.kind).uniqued()
  
  await FS.promises.writeFile(
    `${keysPath}/data-sheet.types.ts`, 
    keysTemplate(
      ['ConsistencyKey', consistencyKeys],
      ['DensityKey', densityRawKeys],
      ['Priority', priorities],
      ['TemperatureEstimateKey', temperatureEstimateKeys],
      ['Unit', unitRawKeys, dataSheet.units.map(u => u.symbol)],
      ['UnitKind', unitKinds],
    )
  )
  
  const ingredientRawKeys = inventory.ingredients.map(i => i.key)
  
  await FS.promises.writeFile(
    `${keysPath}/inventory.types.ts`, 
    keysTemplate(['IngredientKey', ingredientRawKeys])
  )
  
  const sectionRawKeys = catalog.sections.map(s => s.key)
  const categoryRawKeys = catalog.sections.flatMap(s => s.categories.map(c => c.key))
  const recipeRawKeys = catalog.sections.flatMap(s => s.categories.flatMap(c => c.recipes))
  
  await FS.promises.writeFile(
    `${keysPath}/catalog.types.ts`, 
    keysTemplate(
      ['SectionKey', sectionRawKeys],
      ['CategoryKey', categoryRawKeys],
      ['RecipeKey', recipeRawKeys],
    )
  )
})()
