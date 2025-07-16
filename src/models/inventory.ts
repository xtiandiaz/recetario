import { IngredientKey } from "@/assets/types/inventory.types"
import { Consistency, DensityKey } from "@/assets/types/data-sheet.types"

export interface Ingredient {
  key: IngredientKey
  
  consistency?: Consistency
  densityKey?: DensityKey
}

export interface Inventory {
  ingredients: Ingredient[]
}
