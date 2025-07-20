import type { Language } from "./localization"
import type { Measurement } from "./measurement"
import type { Ingredient } from "./inventory"
import { IngredientKey } from "@/assets/keys/inventory.keys"
import type { IngredientCut, TemperatureEstimate } from "@/assets/keys/data-sheet.keys"
import type { CategoryKey, RecipeKey } from "@/assets/keys/catalog.keys"

export type RecipeEntry = { key: RecipeKey, title: string }

export interface RawRecipeIngredient {
  key: IngredientKey
  
  amount?: string
  cut?: IngredientCut
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
  description?: { [key: string]: string }
  portions?: number
}

export interface RecipeIngredient extends Ingredient {  
  amount?: Measurement
  cut?: IngredientCut
  note?: Map<Language, string>
  optional?: boolean
  temperature?: Measurement | TemperatureEstimate
}

export interface Recipe {
  category: CategoryKey
  ingredients: RecipeIngredient[]
  instructions: Map<Language, string[]>
  key: RecipeKey
  
  description?: Map<Language, string>
  origin?: string
  portions?: number 
}
