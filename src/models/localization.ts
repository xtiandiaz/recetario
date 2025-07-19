import type { Unit, TemperatureEstimate, IngredientCut } from "@/assets/keys/data-sheet.keys"
import type { IngredientKey } from "@/assets/keys/inventory.keys"
import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/keys/catalog.keys"
import type { Category} from '@/models/catalog'
import type { Recipe, RecipeIngredient } from "./recipe"

export enum Language {
  Spanish = 'es',
}

export type RawLocalizedContent = {
  [key: string]: object
}

export interface LocalizedContent {
  categories: Map<CategoryKey, string>
  ingredientCuts: Map<IngredientCut, string>
  ingredients: Map<IngredientKey, string>
  language: Language
  other: Map<string, string>
  recipes: Map<RecipeKey, string>
  sections: Map<SectionKey, string>
  temperatureEstimates: Map<TemperatureEstimate, string>
  units: Map<Unit, string>
}

export interface LocalizedRecipeIngredient extends RecipeIngredient {
  name: string
  
  localizedCut?: string
  localizedNote?: string
}

export interface LocalizedRecipe extends Recipe {
  localizedIngredients: LocalizedRecipeIngredient[]
  title: string
  
  localizedInstructions?: string[]
}

export interface LocalizedRecipeSummary {
  category: CategoryKey
  key: RecipeKey
  title: string
}

export interface LocalizedCategory extends Category {
  recipeSummaries: LocalizedRecipeSummary[]
  title: string
}

export interface LocalizedSection {
  categories: LocalizedCategory[]
  title: string
}

export interface LocalizedCatalog {
  sections: LocalizedSection[]
}
