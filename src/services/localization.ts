import type { Recipe } from "@/models/recipe"
import type { LocalizedContent, LocalizedRecipe } from "@/models/localization"
import useContentStore from '@/stores/content'
import { measurementRegExp } from "@/assets/reg-exps"
import { parseMeasurement } from "@/utils/measurement.utils"
import { localizedMeasurementHTML } from "@/utils/localization.utils"

function localizeRecipeInstructions(recipe: Recipe, localizedContent: LocalizedContent): string[] | undefined {
  const instructions = recipe.instructions.get(localizedContent.language)
  if (!instructions) {
    return []
  }
  
  return instructions.map(ins => {
    const regExp = new RegExp(measurementRegExp, 'g')
    const result = [...ins.matchAll(regExp)].reduce((str, m) => {
      const wholeMatch = m[0]
      const parsedMeasurement = parseMeasurement(wholeMatch)
      const replacement = parsedMeasurement ? localizedMeasurementHTML(parsedMeasurement) : wholeMatch
      
      return str.replace(wholeMatch, replacement)
    }, ins)
    
    return result
  })
}

export function localizeRecipe(recipe: Recipe): LocalizedRecipe | undefined {
  const localizedContent = useContentStore().localized
  if (!localizedContent) {
    return undefined
  }
  
  return {
    ...recipe,
    localizedIngredients: recipe.ingredients.map(ri => {
      return {
        ...ri,
        localizedNote: ri.note?.get(localizedContent.language),
        name: localizedContent.ingredients.get(ri.key) ?? `{${ri.key}}`,
      }
    }),
    localizedInstructions: localizeRecipeInstructions(recipe, localizedContent),
    title: localizedContent.recipes.get(recipe.key) ?? `{${recipe.key}}`,
  }
}
