import type { Consistency, Density } from '@/models/data-sheet'
import { IngredientKey } from "@/assets/types/inventory.types"
import { ConsistencyKey, DensityKey } from "@/assets/types/data-sheet.types"

export interface RawIngredient {
  key: IngredientKey
  
  consistency?: ConsistencyKey
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
