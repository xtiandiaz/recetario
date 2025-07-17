import type { Catalog, Category } from "@/models/catalog"
import type { Recipe } from "@/models/recipe"
import type { 
  LocalizedCatalog, 
  LocalizedCategory, 
  LocalizedContent, 
  LocalizedRecipe
} from "@/models/localization"
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
      const replacement = parsedMeasurement ? localizedMeasurementHTML(parsedMeasurement, 1) : wholeMatch
      
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

export function localizeCategory(category: Category, localizedContent: LocalizedContent): LocalizedCategory {
  return {
    ...category,
    recipeSummaries: category.recipes.map(
      rKey => {
        return {
          category: category.key,
          key: rKey,
          title: localizedContent.recipes.get(rKey) ?? `{${rKey}}`
        }
      }
    ).sort((a, b) => a.title.localeCompare(b.title)),
    title: localizedContent.categories.get(category.key) ?? `${category.key}`
  }
}

export function localizeCatalog(catalog: Catalog): LocalizedCatalog | undefined {
  const localizedContent = useContentStore().localized
  if (!localizedContent) {
    return undefined
  }
  
  return {
    sections: catalog.sections.map(
      s => {
        return {
          categories: s.categories
            .map(c => localizeCategory(c, localizedContent))
            .sort((a, b) => a.title.localeCompare(b.title)),
          title: localizedContent.sections.get(s.key) ?? `${s.key}`
        }
      }
    ).sort((a, b) => a.title.localeCompare(b.title)),
  }
}
