import type { Unit, TemperatureEstimate } from "@/assets/types/data-sheet.types"
import type { IngredientKey } from "@/assets/types/inventory.types"
import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/types/catalog.types"
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
