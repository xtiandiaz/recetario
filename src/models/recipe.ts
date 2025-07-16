import type { Language } from "./localization"
import type { Measurement } from "./measurement"
import type { Ingredient } from "./inventory"
import { IngredientKey } from "@/assets/types/inventory.types"
import type { TemperatureEstimate } from "@/assets/types/data-sheet.types"
import type { CategoryKey, RecipeKey } from "@/assets/types/catalog.types"

export type RecipeEntry = { key: RecipeKey, title: string }

export interface RawRecipeIngredient {
  amount: string
  key: IngredientKey
  
  note?: { [key: string]: string }
  optional?: boolean
  temperature?: string
}

export interface RawRecipe {
  category: CategoryKey
  ingredients: RawRecipeIngredient[]
  instructions: { [key: string]: string[] }
  key: RecipeKey
  
  origin?: string
}

export interface RecipeIngredient extends Ingredient {  
  amount?: Measurement
  note?: Map<Language, string>
  optional?: boolean
  temperature?: Measurement | TemperatureEstimate
}

export interface Recipe {
  category: CategoryKey
  ingredients: RecipeIngredient[]
  instructions: Map<Language, string[]>
  key: RecipeKey
  origin?: string
}
