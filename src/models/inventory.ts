import type { Density } from "./data-sheet"
import { IngredientKey } from "@/assets/keys/inventory.keys"
import { Consistency, DensityKey } from "@/assets/keys/data-sheet.keys"

export interface RawIngredient {
  key: IngredientKey
  
  consistency?: Consistency
  density?: DensityKey
}

export interface RawInventory {
  ingredients: RawIngredient[]
}

export interface Ingredient {
  key: IngredientKey
  
  consistency?: Consistency
  density?: Density
}

export interface Inventory {
  ingredients: Ingredient[]
}
