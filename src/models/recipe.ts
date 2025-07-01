import type { CategoryKey } from "./catalog"
import type { Ingredient } from "./ingredient"
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

export interface Recipe {
  category: CategoryKey
  ingredients: Ingredient[]
  instructions: RecipeInstructions[]
  key: RecipeKey
  
  title?: string
  origin?: string
}
