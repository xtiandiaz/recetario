import type { Inventory } from "@/models/inventory";
import type { RawRecipeIngredient, RecipeIngredient, RawRecipe, Recipe } from "@/models/recipe";
import { parseMeasurement } from "./measurement.utils";
import type { TemperatureEstimate } from "@/assets/types/data-sheet.types";
import '@/assets/tungsten/extensions/map.extensions'

export function refineRawRecipeIngredient(
  rawRecipeIngredient: RawRecipeIngredient, 
  inventory: Inventory,
): RecipeIngredient {
  const amount = parseMeasurement(rawRecipeIngredient.amount)
  const ingredient = inventory.ingredients.find(i => i.key === rawRecipeIngredient.key)
  
  const rawTemperature = rawRecipeIngredient.temperature
  const temperature = rawTemperature ? (parseMeasurement(rawTemperature) ?? rawTemperature as TemperatureEstimate) : undefined
  
  return {
    ...ingredient,
    amount,
    key: rawRecipeIngredient.key,
    note: rawRecipeIngredient.note ? Map.fromObject(rawRecipeIngredient.note) : undefined,
    optional: rawRecipeIngredient.optional === true,
    temperature
  }
}

export function refineRawRecipe(rawRecipe: RawRecipe, inventory: Inventory): Recipe {
  return {
    category: rawRecipe.category,
    ingredients: rawRecipe.ingredients.map(ri => refineRawRecipeIngredient(ri, inventory)),
    instructions: Map.fromObject(rawRecipe.instructions),
    key: rawRecipe.key,
    origin: rawRecipe.origin,
    portions: rawRecipe.portions
  }
}
