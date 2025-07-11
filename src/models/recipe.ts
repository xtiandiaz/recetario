import type { CategoryKey } from "./catalog"
import type { RawIngredient, Ingredient } from "./ingredient"
import type { Language } from "./localization"

export enum RecipeKey {
  Focaccia = 'focaccia',
  Pita = 'pita',
  Pizza = 'pizza',
  RusticBread = 'rustic-bread',
  Tabbouleh = 'tabbouleh',
  BabaGanoush = 'baba-ganoush',
  Tzatziki = 'tzatziki',
}

export type RecipeEntry = { key: RecipeKey, title: string }

export interface RecipeInstructions {
  language: Language
  steps: string[]
}

export interface RawRecipe {
  category: CategoryKey
  ingredients: RawIngredient[]
  instructions: RecipeInstructions[]
  key: RecipeKey
  
  origin?: string
}

export interface RecipeSummary {
  category: CategoryKey
  key: RecipeKey
  title: string
}

export interface Recipe extends RecipeSummary {
  ingredients: Ingredient[]
  instructions: RecipeInstructions[]
  origin?: string
}
