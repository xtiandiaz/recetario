import type { Ingredient } from "./ingredient"

export enum RecipeKey {
  PitaBread = 'pita-bread'
}

export interface Recipe {
  ingredients: Ingredient[]
  key: RecipeKey
}
