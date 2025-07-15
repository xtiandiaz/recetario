import type { Unit, TemperatureEstimateKey } from "@/assets/types/data-sheet.types"
import type { IngredientKey } from "@/assets/types/inventory.types"
import type { SectionKey, CategoryKey, RecipeKey } from "@/assets/types/catalog.types"
import type { Recipe, RecipeIngredient } from "./recipe"

export enum Language {
  Spanish = 'es',
}

export enum LocalizedStringKey {
  Text_Optional = 'text-optional',
  Title_Ingredients = 'title-ingredients',
  Title_Instructions = 'title-instructions',
}

export type RawLocalizedContent = {
  [key: string]: object 
}

export interface LocalizedContent {
  categories: Map<CategoryKey, string>
  ingredients: Map<IngredientKey, string>
  language: Language
  other: Map<LocalizedStringKey, string>
  recipes: Map<RecipeKey, string>
  sections: Map<SectionKey, string>
  temperatureEstimates: Map<TemperatureEstimateKey, string>
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
