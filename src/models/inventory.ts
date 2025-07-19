import { IngredientKey } from "@/assets/keys/inventory.keys"
import { Consistency, DensityKey } from "@/assets/keys/data-sheet.keys"

export interface Ingredient {
  key: IngredientKey
  
  consistency?: Consistency
  density?: DensityKey
}

export interface Inventory {
  ingredients: Ingredient[]
}
