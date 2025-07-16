import type { Consistency, Density } from "./data-sheet"
import type { Language } from "./localization"
import type { Measurement, TemperatureMeasurement } from "./measurement"
import { IngredientKey } from "@/assets/types/inventory.types"
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

export interface RecipeIngredient {
  key: IngredientKey
  
  amount?: Measurement
  consistency?: Consistency
  density?: Density
  note?: Map<Language, string>
  optional: boolean
  temperature?: Measurement | TemperatureMeasurement
}

export interface Recipe {
  category: CategoryKey
  ingredients: RecipeIngredient[]
  instructions: Map<Language, string[]>
  key: RecipeKey
  origin?: string
}
