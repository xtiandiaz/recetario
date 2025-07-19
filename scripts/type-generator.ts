import FS from 'fs'
import dataSheet from '../src/assets/json/data-sheet.json'
import inventory from '../src/assets/json/inventory.json'
import catalog from '../src/assets/json/catalog.json'
import '../src/assets/tungsten/extensions/array.extensions'
import { pascalCase } from 'change-case'

const keysPath = './src/assets/keys'

const enumTemplate = (name: string, rawKeys: string[], values?: string[]) => {
  return `export const enum ${name} {
${rawKeys.sort().map((k, i) => `  ${pascalCase(k)} = "${values?.[i] ?? k}"`).join(',\n')}
}`
}

const keysTemplate = (...keySets: [string, string[], string[]?][]) => {
  return `/* File automatically generated; DO NOT edit! */

${keySets.sort().map(ks => enumTemplate(ks[0], ks[1], ks[2])).join('\n\n')}
`
}

async function generateTsKeys() { 
  const consistencies = dataSheet.consistencies
  const densityRawKeys = dataSheet.densities.map(d => d.key)
  const ingredientCuts = dataSheet.ingredientCuts
  const temperatureEstimates = dataSheet.temperatureEstimates
  const unitRawKeys = dataSheet.units.map(u => u.key)
  
  await FS.promises.writeFile(
    `${keysPath}/data-sheet.keys.ts`, 
    keysTemplate(
      ['Consistency', consistencies],
      ['DensityKey', densityRawKeys],
      ['IngredientCut', ingredientCuts],
      ['TemperatureEstimate', temperatureEstimates],
      ['Unit', unitRawKeys, dataSheet.units.map(u => u.symbol)]
    )
  )
  
  const ingredientRawKeys = inventory.ingredients.map(i => i.key)
  
  await FS.promises.writeFile(
    `${keysPath}/inventory.keys.ts`, 
    keysTemplate(['IngredientKey', ingredientRawKeys])
  )
  
  const sectionRawKeys = catalog.sections.map(s => s.key)
  const categoryRawKeys = catalog.sections.flatMap(s => s.categories.map(c => c.key))
  const recipeRawKeys = catalog.sections.flatMap(s => s.categories.flatMap(c => c.recipes))
  
  await FS.promises.writeFile(
    `${keysPath}/catalog.keys.ts`, 
    keysTemplate(
      ['SectionKey', sectionRawKeys],
      ['CategoryKey', categoryRawKeys],
      ['RecipeKey', recipeRawKeys],
    )
  )
}

const scssMapTemplate = (name: string, keyValuePairs: [string, string][]) => {
  return `$${name}: (
${keyValuePairs.sort().map((k) => `  '${k[0]}': '${k[1]}'`).join(',\n')}
);`
}

async function generateScssKeys() {  
  await FS.promises.writeFile(
    `${keysPath}/_theme-keys.scss`, 
    scssMapTemplate(
      "category-colors",
      catalog.sections.flatMap(s => s.categories).map(c => [c.key, c.color])
    )
  )
}

(async function main() {
  await generateTsKeys()
  await generateScssKeys()
})()
